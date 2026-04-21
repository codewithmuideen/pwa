/**
 * Recipient accounts that the transfer verification step recognizes as real.
 *
 * Why this file exists:
 *   There is no free/public API that can confirm a specific account number
 *   exists at a given bank — banks keep that data private by law (GLBA in US,
 *   PIPEDA in Canada). Real fintechs solve this with Plaid Auth, Stripe
 *   Financial Connections, or Early Warning Services — all paid enterprise
 *   integrations. Until one of those is wired up, we maintain this local
 *   directory of known-good recipient accounts.
 *
 * How to add your test accounts:
 *   Drop entries into the VERIFIED_ACCOUNTS array below. Any account number
 *   not listed here returns "Account not found" from /api/verify-account.
 *   Any entry listed here verifies *only* when the holder name matches too.
 *
 *   - bankCode: 9-digit ABA (US) or 3-digit institution (Canada)
 *   - accountNumber: digits only, no spaces/dashes
 *   - holderName: full legal name, case-insensitive match
 *   - accountType: "Checking" or "Savings"
 */

export type VerifiedAccount = {
  bankCode: string;
  accountNumber: string;
  holderName: string;
  accountType: "Checking" | "Savings";
};

export const VERIFIED_ACCOUNTS: VerifiedAccount[] = [
  // Add your test accounts here. Example:
  // { bankCode: "036076150", accountNumber: "6315488734", holderName: "Joanna Gorman", accountType: "Checking" },
];

const cleanDigits = (s: string) => s.replace(/\D/g, "");

const normalizeName = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, " ");

export function findVerifiedAccount(
  bankCode: string,
  accountNumber: string,
): VerifiedAccount | null {
  const code = cleanDigits(bankCode);
  const acct = cleanDigits(accountNumber);
  return (
    VERIFIED_ACCOUNTS.find(
      (a) => a.bankCode === code && a.accountNumber === acct,
    ) ?? null
  );
}

export function holderNameMatches(recorded: string, typed: string): boolean {
  return normalizeName(recorded) === normalizeName(typed);
}
