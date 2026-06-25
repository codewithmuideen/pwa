"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import OtpInput from "@/components/OtpInput";
import { useAuth } from "@/lib/auth";

const RESEND_SECONDS = 60;

function LoginOtpInner() {
  const router = useRouter();
  const params = useSearchParams();
  const { signInById } = useAuth();

  const userInternalId = params.get("uid") ?? "";
  const maskedEmail = params.get("email") ?? "";

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [resendBusy, setResendBusy] = useState(false);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!userInternalId) {
      router.replace("/login");
    }
  }, [userInternalId, router]);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const id = window.setInterval(() => {
      setResendCountdown((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, [resendCountdown]);

  const handleComplete = useCallback(
    async (value: string) => {
      setVerifying(true);
      setError(null);

      try {
        const res = await fetch("/api/verify-login-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userInternalId, code: value }),
        });
        const data = await res.json();

        if (!data.ok) {
          setVerifying(false);
          if (data.error === "expired") {
            setError("This code has expired. Tap Resend code to get a new one.");
          } else if (data.error === "invalid") {
            setError("That code doesn't match. Double-check the digits and try again.");
          } else {
            setError(data.error || "Verification failed. Please try again.");
          }
          setCode("");
          return;
        }

        setVerified(true);
        signInById(userInternalId);
        window.setTimeout(() => {
          router.replace("/dashboard");
        }, 1500);
      } catch {
        setVerifying(false);
        setError("Something went wrong. Please try again.");
        setCode("");
      }
    },
    [userInternalId, signInById, router]
  );

  const handleResend = async () => {
    if (resendCountdown > 0 || resendBusy) return;
    setResendBusy(true);

    try {
      const res = await fetch("/api/send-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userInternalId }),
      });
      const data = await res.json();
      setResendBusy(false);

      if (!data.ok) {
        setError("Couldn't resend the code. Please sign in again.");
        return;
      }

      setError(null);
      setInfoMessage("A new verification code has been sent to your email.");
      setResendCountdown(RESEND_SECONDS);
      window.setTimeout(() => setInfoMessage(null), 5000);
    } catch {
      setResendBusy(false);
      setError("Couldn't resend the code. Please try again.");
    }
  };

  if (!userInternalId) return null;

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
                  Identity verified
                </h1>
                <p className="mt-3 text-[#4A4A4A]">
                  Signing you in to your account&hellip;
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
                    Verify your identity
                  </h1>
                  <p className="mt-3 text-sm sm:text-[15px] text-[#4A4A4A] leading-relaxed max-w-md">
                    We sent a 6-digit verification code to{" "}
                    <span className="font-semibold text-[#1A1A1A]">
                      {maskedEmail}
                    </span>
                    . Enter it below to complete sign-in.
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

                <div className="mt-8 text-center text-sm text-[#4A4A4A]">
                  Didn&rsquo;t receive it?{" "}
                  {resendCountdown > 0 ? (
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
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-sm text-[#4A4A4A] hover:text-[#147A6B] transition-colors"
                  >
                    <ArrowLeft size={14} /> Back to sign in
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

export default function LoginOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
          <div className="h-10 w-10 rounded-full border-2 border-[#147A6B]/30 border-t-[#147A6B] animate-spin" />
        </div>
      }
    >
      <LoginOtpInner />
    </Suspense>
  );
}
