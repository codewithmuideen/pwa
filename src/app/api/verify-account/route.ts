import {
  findBankByName,
  findBankByCode,
  isValidABA,
  isValidCanadianTransit,
  isValidAccountNumber,
  isValidHolderName,
} from "@/lib/bank-data";

type VerifyBody = {
  bankName?: string;
  routingNumber?: string;
  accountNumber?: string;
  accountHolder?: string;
  country?: "US" | "CA";
};

type FieldError = {
  field: "bankName" | "routingNumber" | "accountNumber" | "accountHolder";
  message: string;
};

const normalize = (s: string) =>
  s
    .toLowerCase()
    .replace(/\b(n\.?a\.?|national association|fsb|inc\.?|co\.?|corp\.?|company|and|&|bank|the)\b/g, "")
    .replace(/[^a-z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function bankNamesMatch(userInput: string, authoritative: string): boolean {
  const a = normalize(userInput);
  const b = normalize(authoritative);
  if (!a || !b) return false;
  if (a === b) return true;
  if (a.includes(b) || b.includes(a)) return true;
  const aWords = new Set(a.split(" ").filter((w) => w.length >= 3));
  const bWords = b.split(" ").filter((w) => w.length >= 3);
  return bWords.some((w) => aWords.has(w));
}

export async function POST(request: Request) {
  let body: VerifyBody;
  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return Response.json(
      { ok: false, error: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const bankName = (body.bankName ?? "").trim();
  const routingNumber = (body.routingNumber ?? "").trim();
  const accountNumber = (body.accountNumber ?? "").trim();
  const accountHolder = (body.accountHolder ?? "").trim();
  const country: "US" | "CA" = body.country === "CA" ? "CA" : "US";

  const errors: FieldError[] = [];

  // --- Field presence + format --------------------------------------------
  if (!bankName) {
    errors.push({ field: "bankName", message: "Please enter the recipient's bank name." });
  }

  if (!routingNumber) {
    errors.push({
      field: "routingNumber",
      message:
        country === "US"
          ? "Please enter a 9-digit routing number (ABA)."
          : "Please enter an 8-digit institution + transit number.",
    });
  } else if (country === "US") {
    if (routingNumber.replace(/\D/g, "").length !== 9) {
      errors.push({
        field: "routingNumber",
        message: "Routing number must be exactly 9 digits.",
      });
    } else if (!isValidABA(routingNumber)) {
      errors.push({
        field: "routingNumber",
        message:
          "That routing number fails the ABA checksum — check it against the recipient's check or bank statement.",
      });
    }
  } else if (!isValidCanadianTransit(routingNumber)) {
    errors.push({
      field: "routingNumber",
      message:
        "Enter the institution code (3 digits) followed by the transit number (5 digits), e.g. 00312345.",
    });
  }

  if (!accountNumber) {
    errors.push({ field: "accountNumber", message: "Please enter the recipient's account number." });
  } else if (!isValidAccountNumber(accountNumber, country)) {
    errors.push({
      field: "accountNumber",
      message:
        country === "US"
          ? "Account number must be between 6 and 17 digits."
          : "Account number must be between 7 and 12 digits.",
    });
  }

  if (!accountHolder) {
    errors.push({ field: "accountHolder", message: "Please enter the account holder's full name." });
  } else if (!isValidHolderName(accountHolder)) {
    errors.push({
      field: "accountHolder",
      message: "Account holder name may only contain letters, spaces, hyphens, and apostrophes.",
    });
  }

  if (errors.length > 0) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  // --- Directory lookup ---------------------------------------------------
  const bankByName = findBankByName(bankName);
  const bankByCode = findBankByCode(routingNumber);

  // Case 1: both lookups succeed — they must agree on the same bank.
  if (bankByName && bankByCode) {
    if (bankByName.code !== bankByCode.code) {
      return Response.json(
        {
          ok: false,
          errors: [
            {
              field: "routingNumber",
              message: `Routing ${routingNumber} belongs to ${bankByCode.name}, not ${bankByName.name}. Please correct the routing number or the bank name.`,
            },
          ],
        },
        { status: 422 },
      );
    }
    return Response.json({
      ok: true,
      verified: {
        bank: bankByCode.name,
        country: bankByCode.country,
        maskedAccount: `••••${accountNumber.replace(/\D/g, "").slice(-4)}`,
        accountHolder,
      },
    });
  }

  // Case 2: name resolves but code doesn't — user likely mistyped the routing.
  if (bankByName && !bankByCode) {
    return Response.json(
      {
        ok: false,
        errors: [
          {
            field: "routingNumber",
            message: `That routing number isn't in our directory for ${bankByName.name}. ${bankByName.name}'s primary routing is ${bankByName.code}.`,
          },
        ],
      },
      { status: 422 },
    );
  }

  // Case 3: code resolves but the name doesn't match any bank we know —
  // check whether the typed name is close enough to the routing-directory's
  // bank name. If yes, accept. If not, reject.
  if (!bankByName && bankByCode) {
    if (bankNamesMatch(bankName, bankByCode.name)) {
      return Response.json({
        ok: true,
        verified: {
          bank: bankByCode.name,
          country: bankByCode.country,
          maskedAccount: `••••${accountNumber.replace(/\D/g, "").slice(-4)}`,
          accountHolder,
        },
      });
    }
    return Response.json(
      {
        ok: false,
        errors: [
          {
            field: "bankName",
            message: `Routing ${routingNumber} belongs to ${bankByCode.name}. Please correct the bank name or the routing number.`,
          },
        ],
      },
      { status: 422 },
    );
  }

  // Case 4: neither lookup resolves. The routing number already passed the
  // ABA checksum, so it's a *valid* routing format pointing at a bank we don't
  // carry in our local directory (small regional bank or credit union).
  // Accept it with the user-provided name — this is what lets the user test
  // with any real bank that isn't a top-50 institution.
  return Response.json({
    ok: true,
    verified: {
      bank: bankName,
      country,
      maskedAccount: `••••${accountNumber.replace(/\D/g, "").slice(-4)}`,
      accountHolder,
    },
  });
}
