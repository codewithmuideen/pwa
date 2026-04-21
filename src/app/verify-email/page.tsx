"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import OtpInput from "@/components/OtpInput";
import {
  getPendingByEmail,
  resendOtp,
  verifyOtp,
  type PendingRegistration,
} from "@/lib/registration";

const RESEND_SECONDS = 60;

function VerifyEmailInner() {
  const router = useRouter();
  const params = useSearchParams();
  const emailParam = params.get("email") ?? "";
  const tokenParam = params.get("token") ?? "";

  const [ready, setReady] = useState(false);
  const [registration, setRegistration] = useState<PendingRegistration | null>(
    null
  );
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const autoVerifiedRef = useRef(false);

  // Guard: must have email + matching pending registration.
  useEffect(() => {
    if (!emailParam) {
      router.replace("/register");
      return;
    }
    const reg = getPendingByEmail(emailParam);
    if (!reg) {
      router.replace("/register");
      return;
    }
    setRegistration(reg);
    setReady(true);
  }, [emailParam, router]);

  // Countdown for resend.
  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = window.setInterval(() => {
      setResendCountdown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [resendCountdown]);

  const finalize = useCallback(
    (reg: PendingRegistration) => {
      setRegistration(reg);
      setVerified(true);
      window.setTimeout(() => {
        router.replace(`/registration-complete?id=${encodeURIComponent(reg.id)}`);
      }, 2000);
    },
    [router]
  );

  const runVerify = useCallback(
    (value: string) => {
      if (!emailParam) return;
      setVerifying(true);
      setError(null);
      const result = verifyOtp(emailParam, value);
      if (result.ok) {
        finalize(result.registration);
        return;
      }
      setVerifying(false);
      if (result.error === "expired") {
        setError("This code has expired. Tap Resend code to get a new one.");
      } else if (result.error === "not_found") {
        setError("We couldn't find your enrollment. Please sign up again.");
      } else {
        setError("That code doesn't match. Double-check the digits and try again.");
      }
      // Clear code so user can retype
      setCode("");
    },
    [emailParam, finalize]
  );

  // Auto-verify via magic link token (simulates email link click).
  useEffect(() => {
    if (!ready || verified || autoVerifiedRef.current) return;
    if (!tokenParam) return;
    autoVerifiedRef.current = true;
    runVerify(tokenParam);
  }, [ready, tokenParam, verified, runVerify]);

  const handleComplete = (value: string) => {
    runVerify(value);
  };

  const handleResend = () => {
    if (resendCountdown > 0 || resendBusy) return;
    setResendBusy(true);
    const updated = resendOtp(emailParam);
    setResendBusy(false);
    if (!updated) {
      setError("We couldn't resend the code. Please register again.");
      return;
    }
    setRegistration(updated);
    setError(null);
    setInfoMessage("A new verification code has been sent to your email.");
    setResendCountdown(RESEND_SECONDS);
    window.setTimeout(() => setInfoMessage(null), 5000);
  };

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
        <div className="h-10 w-10 rounded-full border-2 border-[#147A6B]/30 border-t-[#147A6B] animate-spin" />
      </div>
    );
  }

  const maskedEmail = emailParam;
  const otpForDemo = registration?.otp ?? "";
  const showResendTimer = resendCountdown > 0;
  const minutes = Math.floor(resendCountdown / 60);
  const seconds = (resendCountdown % 60).toString().padStart(2, "0");

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F8]">
      <header className="px-6 sm:px-10 py-6">
        <Link href="/" className="inline-flex">
          <Image
            src="/citizens-logo-green.png"
            alt="Citizens"
            width={170}
            height={42}
            className="h-10 w-auto"
          />
        </Link>
      </header>

      <main className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 pb-16">
        <div className="w-full max-w-lg">
          <div className="rounded-3xl bg-white shadow-card border border-[#E6E8EB] p-8 sm:p-10">
            {verified ? (
              <div className="text-center">
                <div className="mx-auto relative h-20 w-20 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-[#147A6B]/10 animate-soft-ping" />
                  <span className="relative h-20 w-20 rounded-full bg-[#147A6B] flex items-center justify-center text-white animate-check-pop">
                    <CheckCircle2 size={40} strokeWidth={2.4} />
                  </span>
                </div>
                <h1 className="mt-6 text-3xl font-bold text-[#0D5A50]">
                  Email verified
                </h1>
                <p className="mt-3 text-[#4A4A4A]">
                  Your identity has been confirmed. Redirecting you to the next
                  step&hellip;
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-[#147A6B]">
                  <span className="h-2 w-2 rounded-full bg-[#147A6B] animate-pulse" />
                  One moment
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-16 w-16 flex items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[#147A6B]/10 animate-soft-ping" />
                    <span className="relative h-16 w-16 rounded-full bg-[#147A6B]/10 flex items-center justify-center text-[#147A6B]">
                      <Mail size={28} />
                    </span>
                  </div>
                  <h1 className="mt-6 text-2xl sm:text-3xl font-bold text-[#0D5A50]">
                    Verify your email
                  </h1>
                  <p className="mt-3 text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed max-w-md">
                    We sent a 6-digit code and a secure verification link to{" "}
                    <span className="font-semibold text-[#1A1A1A]">
                      {maskedEmail}
                    </span>
                    . Enter the code below to confirm your identity.
                  </p>
                </div>

                <div className="mt-8">
                  <OtpInput
                    value={code}
                    onChange={(v) => {
                      setCode(v);
                      if (error) setError(null);
                    }}
                    onComplete={handleComplete}
                    error={Boolean(error)}
                    disabled={verifying}
                  />
                </div>

                {error && (
                  <p className="mt-4 text-sm text-red-600 text-center">
                    {error}
                  </p>
                )}
                {infoMessage && !error && (
                  <p className="mt-4 text-sm text-[#0D5A50] text-center">
                    {infoMessage}
                  </p>
                )}

                {otpForDemo && (
                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
                    <span className="font-semibold">Demo code:</span>{" "}
                    <span className="font-mono tracking-wider">
                      {otpForDemo}
                    </span>
                    <span className="block text-[11px] text-amber-800/80 mt-0.5">
                      Shown for testing only. Expires in 10 minutes.
                    </span>
                  </div>
                )}

                <div className="mt-8 text-center text-sm text-[#4A4A4A]">
                  Didn&rsquo;t receive it?{" "}
                  {showResendTimer ? (
                    <span className="text-[#9AA0A6]">
                      Resend in {minutes}:{seconds}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendBusy}
                      className="font-semibold text-[#147A6B] hover:underline disabled:opacity-60"
                    >
                      Resend code
                    </button>
                  )}
                </div>

                <div className="mt-4 text-center">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#147A6B] transition-colors"
                  >
                    <ArrowLeft size={14} /> Verify a different email
                  </Link>
                </div>
              </>
            )}
          </div>

          <p className="mt-6 text-center text-[11px] text-[#4A4A4A] leading-relaxed">
            For your security, this code expires in 10 minutes. Never share it
            with anyone &mdash; Citizens Bank will never ask for your code.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
          <div className="h-10 w-10 rounded-full border-2 border-[#147A6B]/30 border-t-[#147A6B] animate-spin" />
        </div>
      }
    >
      <VerifyEmailInner />
    </Suspense>
  );
}
