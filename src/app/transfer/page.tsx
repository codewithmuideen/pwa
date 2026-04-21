"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeftRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  Globe2,
  Landmark,
  Loader2,
  ShieldAlert,
  User,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/lib/auth";
import { BANKS } from "@/lib/bank-data";

type Mode = "domestic" | "international";

type FieldErrors = Partial<
  Record<
    | "bankName"
    | "routingNumber"
    | "accountNumber"
    | "accountHolder"
    | "swift"
    | "country"
    | "amount",
    string
  >
>;

type Verified = {
  bank: string;
  country: "US" | "CA";
  maskedAccount: string;
  accountHolder: string;
  accountType?: "Checking" | "Savings";
};

type VerifyApiResponse =
  | { ok: true; verified: Verified }
  | {
      ok: false;
      error?: string;
      errors?: {
        field: keyof FieldErrors;
        message: string;
      }[];
    };

const formatAmount = (raw: string) => {
  const cleaned = raw.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 2) return parts[0] + "." + parts.slice(1).join("");
  if (parts[1]) parts[1] = parts[1].slice(0, 2);
  return parts.join(".");
};

export default function TransferPage() {
  return (
    <AppShell>
      <TransferContent />
    </AppShell>
  );
}

function TransferContent() {
  const { user } = useAuth();
  const [mode, setMode] = useState<Mode>("domestic");

  // Recipient fields
  const [bankName, setBankName] = useState("");
  const [accountHolder, setAccountHolder] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [swift, setSwift] = useState("");
  const [country, setCountry] = useState("");

  // Payment fields (unlocked after verification)
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");

  // UI state
  const [errors, setErrors] = useState<FieldErrors>({});
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState<Verified | null>(null);
  const [verifyFailed, setVerifyFailed] = useState<{
    title: string;
    message: string;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [transferError, setTransferError] = useState("");

  const detectedCountry: "US" | "CA" = useMemo(() => {
    const match = BANKS.find(
      (b) =>
        b.name.toLowerCase() === bankName.trim().toLowerCase() ||
        b.aliases?.some((a) => a.toLowerCase() === bankName.trim().toLowerCase()),
    );
    return match?.country ?? "US";
  }, [bankName]);

  const resetVerification = () => {
    setVerified(null);
    setVerifyFailed(null);
    setTransferError("");
  };

  const summarizeFailure = (fieldErrors: FieldErrors): {
    title: string;
    message: string;
  } => {
    if (fieldErrors.bankName) {
      return {
        title: "Bank not recognized",
        message:
          "We couldn't find that bank in our directory. Double-check the spelling, or choose a bank from the suggestions as you type.",
      };
    }
    if (fieldErrors.routingNumber) {
      return {
        title: "Routing number doesn't match",
        message: fieldErrors.routingNumber,
      };
    }
    if (fieldErrors.accountNumber) {
      return {
        title: "Account not found",
        message:
          "The account number format is invalid for this bank. Please confirm the number on a check or with the recipient.",
      };
    }
    if (fieldErrors.accountHolder) {
      return {
        title: "Account holder name invalid",
        message: fieldErrors.accountHolder,
      };
    }
    return {
      title: "Verification failed",
      message:
        "We couldn't verify this recipient account. Please review the details and try again.",
    };
  };

  const handleVerify = async () => {
    setTransferError("");
    const next: FieldErrors = {};

    if (mode === "international") {
      if (!swift.trim()) next.swift = "Enter a SWIFT/BIC code.";
      else if (!/^[A-Z0-9]{8}$|^[A-Z0-9]{11}$/i.test(swift.trim()))
        next.swift = "SWIFT/BIC must be 8 or 11 alphanumeric characters.";
      if (!country.trim()) next.country = "Select a country.";
    }

    if (Object.keys(next).length > 0 && mode === "international") {
      setErrors(next);
      return;
    }

    setErrors({});
    setVerifying(true);

    try {
      const res = await fetch("/api/verify-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bankName,
          routingNumber,
          accountNumber,
          accountHolder,
          country: detectedCountry,
        }),
      });

      const data: VerifyApiResponse = await res.json();

      if (!data.ok) {
        const mapped: FieldErrors = {};
        if (data.errors) {
          for (const err of data.errors) {
            mapped[err.field] = err.message;
          }
        }
        setErrors(mapped);
        setVerified(null);
        setVerifyFailed(
          data.error
            ? { title: "Verification failed", message: data.error }
            : summarizeFailure(mapped),
        );
      } else {
        setVerified(data.verified);
        setErrors({});
        setVerifyFailed(null);
      }
    } catch {
      setVerifyFailed({
        title: "Can't reach verification service",
        message:
          "We couldn't connect to our bank network. Check your connection and try again in a moment.",
      });
      setVerified(null);
    } finally {
      setVerifying(false);
    }
  };

  const validateAmount = (): FieldErrors => {
    const next: FieldErrors = {};
    const numeric = parseFloat(amount);
    if (!amount.trim()) {
      next.amount = "Enter an amount to send.";
    } else if (Number.isNaN(numeric) || numeric <= 0) {
      next.amount = "Amount must be greater than $0.00.";
    } else if (user && numeric > user.availableBalance) {
      next.amount =
        "You don't have sufficient available balance for this transfer.";
    } else if (numeric > 50000) {
      next.amount = "Online transfers are limited to $50,000 per transaction.";
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verified) return;
    const amountErrors = validateAmount();
    if (Object.keys(amountErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...amountErrors }));
      return;
    }
    setErrors({});
    setSubmitting(true);

    // Simulate bank-side review — every transfer returns the reactivation notice.
    await new Promise((r) => setTimeout(r, 1200));

    setTransferError(
      "Your transaction cannot be processed at this time. This account has been flagged and is temporarily restricted from outgoing transfers. Please visit your nearest Citizens Bank branch with a valid government-issued ID to reactivate your account. Reference: TXN-" +
        Math.random().toString(36).slice(2, 10).toUpperCase(),
    );
    setSubmitting(false);
  };

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0D5A50]">Transfer Funds</h1>
        <p className="mt-1 text-sm text-[#4A4A4A]">
          Send a domestic or international wire from your Citizens account.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-card">
        <div className="grid grid-cols-2 gap-3 p-1 bg-[#F6F7F8] rounded-xl mb-8">
          <button
            onClick={() => {
              setMode("domestic");
              resetVerification();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === "domestic"
                ? "bg-white text-[#147A6B] shadow-card"
                : "text-[#4A4A4A] hover:text-[#147A6B]"
            }`}
          >
            <Building2 size={16} /> Domestic (US & Canada)
          </button>
          <button
            onClick={() => {
              setMode("international");
              resetVerification();
            }}
            className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              mode === "international"
                ? "bg-white text-[#147A6B] shadow-card"
                : "text-[#4A4A4A] hover:text-[#147A6B]"
            }`}
          >
            <Globe2 size={16} /> International
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* From */}
          <div className="rounded-xl bg-[#F6F7F8] p-4">
            <p className="text-xs uppercase tracking-wider text-[#4A4A4A]">From</p>
            <p className="mt-1 font-semibold text-[#1A1A1A]">{user.accountType}</p>
            <p className="text-sm text-[#4A4A4A]">
              •••• {user.accountNumber.slice(-4)} • Avail $
              {user.availableBalance.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>

          {/* Recipient section */}
          <fieldset
            disabled={Boolean(verified)}
            className="space-y-4 disabled:opacity-60"
          >
            <div>
              <label
                htmlFor="bankName"
                className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5"
              >
                Recipient&rsquo;s bank name
              </label>
              <div
                className={`relative flex items-center border ${
                  errors.bankName ? "border-red-500" : "border-[#E6E8EB]"
                } bg-white rounded-xl focus-within:border-[#147A6B] focus-within:ring-2 focus-within:ring-[#147A6B]/20 transition-all`}
              >
                <span className="pl-4 text-[#4A4A4A] pointer-events-none">
                  <Landmark size={16} />
                </span>
                <input
                  id="bankName"
                  list="bank-options"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                    resetVerification();
                  }}
                  placeholder="Citizens Bank, Chase, RBC, Scotiabank…"
                  className="flex-1 bg-transparent px-4 py-3 text-[15px] text-[#1A1A1A] placeholder-[#9AA0A6] outline-none"
                />
                <datalist id="bank-options">
                  {BANKS.map((b) => (
                    <option key={b.name} value={b.name}>
                      {b.country === "US" ? "US" : "Canada"} · {b.code}
                    </option>
                  ))}
                </datalist>
              </div>
              {errors.bankName ? (
                <p className="mt-1.5 text-xs text-red-600">{errors.bankName}</p>
              ) : (
                <p className="mt-1.5 text-xs text-[#4A4A4A]">
                  Start typing to pick from major US &amp; Canadian banks.
                </p>
              )}
            </div>

            <Input
              label="Account holder's full name"
              placeholder="John Doe"
              icon={<User size={16} />}
              value={accountHolder}
              onChange={(e) => {
                setAccountHolder(e.target.value);
                resetVerification();
              }}
              error={errors.accountHolder}
            />

            <Input
              label="Recipient account number"
              placeholder={detectedCountry === "CA" ? "7–12 digits" : "6–17 digits"}
              value={accountNumber}
              onChange={(e) => {
                setAccountNumber(e.target.value.replace(/\D/g, ""));
                resetVerification();
              }}
              inputMode="numeric"
              error={errors.accountNumber}
            />

            {mode === "domestic" ? (
              <Input
                label={
                  detectedCountry === "CA"
                    ? "Institution + transit (8 digits)"
                    : "Routing number (ABA, 9 digits)"
                }
                placeholder={
                  detectedCountry === "CA" ? "e.g. 00312345" : "e.g. 036076150"
                }
                value={routingNumber}
                onChange={(e) => {
                  setRoutingNumber(e.target.value.replace(/\D/g, ""));
                  resetVerification();
                }}
                inputMode="numeric"
                maxLength={detectedCountry === "CA" ? 8 : 9}
                error={errors.routingNumber}
              />
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                <Input
                  label="SWIFT / BIC"
                  placeholder="e.g. CHASUS33"
                  value={swift}
                  onChange={(e) => {
                    setSwift(e.target.value.toUpperCase());
                    resetVerification();
                  }}
                  maxLength={11}
                  error={errors.swift}
                />
                <Input
                  label="Country"
                  placeholder="United Kingdom"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    resetVerification();
                  }}
                  error={errors.country}
                />
              </div>
            )}

            {!verified && (
              <Button
                type="button"
                variant="secondary"
                fullWidth
                size="lg"
                disabled={verifying}
                onClick={handleVerify}
              >
                {verifying ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Verifying account…
                  </>
                ) : (
                  <>
                    <ShieldAlert size={16} /> Verify recipient account
                  </>
                )}
              </Button>
            )}
          </fieldset>

          {verifyFailed && !verified && (
            <div
              role="alert"
              className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <span className="flex-none h-12 w-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                  <ShieldAlert size={22} />
                </span>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-red-700">
                    Verification failed
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#1A1A1A]">
                    {verifyFailed.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#4A4A4A] leading-relaxed">
                    {verifyFailed.message}
                  </p>
                  <p className="mt-3 text-[12px] text-[#4A4A4A]">
                    Update the highlighted fields above and verify again.
                  </p>
                </div>
              </div>
            </div>
          )}

          {verified && (
            <div
              role="status"
              className="relative overflow-hidden rounded-2xl border border-[#147A6B]/30 bg-gradient-to-br from-[#147A6B]/10 via-white to-white p-5 shadow-sm"
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-[#147A6B]/10 blur-2xl"
              />
              <div className="relative flex items-start gap-4">
                <span className="flex-none h-12 w-12 rounded-full bg-[#147A6B] text-white flex items-center justify-center shadow-lift">
                  <CheckCircle2 size={22} />
                </span>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0D5A50] flex items-center gap-1.5">
                    Account verified
                    <BadgeCheck size={14} className="text-[#147A6B]" />
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-[#0D5A50]">
                    {verified.accountHolder}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#1A1A1A]">
                    {verified.bank}{" "}
                    <span className="text-[#4A4A4A]">({verified.country})</span>
                  </p>
                  <p className="text-[13px] text-[#4A4A4A] font-mono mt-0.5">
                    {verified.maskedAccount}
                    {verified.accountType && (
                      <span className="ml-2 font-sans">· {verified.accountType}</span>
                    )}
                  </p>
                  <p className="mt-3 text-[12px] text-[#0D5A50]">
                    You&rsquo;re all set - continue below to enter the amount.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetVerification}
                  className="text-[12px] font-semibold text-[#147A6B] hover:underline shrink-0"
                >
                  Edit
                </button>
              </div>
            </div>
          )}

          <fieldset disabled={!verified} className="space-y-4 disabled:opacity-40">
            <Input
              label="Amount (USD)"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(formatAmount(e.target.value))}
              inputMode="decimal"
              error={errors.amount}
            />
            <Input
              label="Memo (optional)"
              placeholder="Reason for transfer"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
            />
          </fieldset>

          {transferError && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 border border-red-200 px-4 py-4"
            >
              <div className="flex items-start gap-3">
                <span className="flex-none h-9 w-9 rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                  <AlertCircle size={18} />
                </span>
                <div className="flex-1 text-sm text-red-800 leading-relaxed">
                  <p className="font-semibold">Transfer cannot be processed</p>
                  <p className="mt-1">{transferError}</p>
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            fullWidth
            size="lg"
            disabled={!verified || submitting}
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Reviewing transfer…
              </>
            ) : (
              <>
                <ArrowLeftRight size={16} /> Review &amp; Send
              </>
            )}
          </Button>

          <p className="text-[11px] text-[#4A4A4A] text-center leading-relaxed">
            Wire transfers are reviewed for security. Domestic wires typically
            deliver the same business day.
          </p>
        </form>
      </div>
    </div>
  );
}
