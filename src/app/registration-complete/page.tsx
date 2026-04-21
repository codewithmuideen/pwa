"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  MapPin,
  Monitor,
  ShieldCheck,
} from "lucide-react";
import {
  ensureReference,
  getPending,
  type PendingRegistration,
} from "@/lib/registration";

function RegistrationCompleteInner() {
  const router = useRouter();
  const params = useSearchParams();
  const idParam = params.get("id") ?? "";
  const [reg, setReg] = useState<PendingRegistration | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Prefer lookup by id; fall back to most recent pending.
    let found: PendingRegistration | null = null;
    if (idParam) {
      found = ensureReference(idParam);
    }
    if (!found) {
      const pending = getPending();
      if (pending) {
        found = ensureReference(pending.id) ?? pending;
      }
    }

    if (!found || !found.verified) {
      router.replace("/register");
      return;
    }
    setReg(found);
    setReady(true);
  }, [idParam, router]);

  if (!ready || !reg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
        <div className="h-10 w-10 rounded-full border-2 border-[#147A6B]/30 border-t-[#147A6B] animate-spin" />
      </div>
    );
  }

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

      <main className="flex-1 flex items-start justify-center px-4 sm:px-6 pb-16">
        <div className="w-full max-w-2xl">
          <div className="overflow-hidden rounded-3xl bg-white shadow-card border border-[#E6E8EB]">
            <div className="relative bg-balance-gradient px-8 sm:px-12 pt-12 pb-20 text-center text-white">
              <div className="mx-auto relative h-20 w-20 flex items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-white/20 animate-soft-ping" />
                <span className="relative h-20 w-20 rounded-full bg-white flex items-center justify-center text-[#147A6B] animate-check-pop">
                  <CheckCircle2 size={44} strokeWidth={2.4} />
                </span>
              </div>
              <h1 className="mt-6 text-3xl sm:text-4xl font-bold">
                You&rsquo;re almost there, {reg.firstName}
              </h1>
              <p className="mt-3 text-white/85 max-w-xl mx-auto">
                Your enrollment has been received and your email is verified.
                To finalize your account setup and protect against fraud, one
                of our bankers must meet with you in person.
              </p>
            </div>

            <div className="-mt-12 px-4 sm:px-8 pb-10">
              <div className="rounded-2xl bg-white border border-[#E6E8EB] shadow-lift p-6 sm:p-7 border-l-4 border-l-[#147A6B]">
                <div className="flex items-start gap-4">
                  <span className="flex-none h-11 w-11 rounded-xl bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center">
                    <MapPin size={22} />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-[#0D5A50]">
                      Visit your nearest Citizens Bank branch
                    </h2>
                    <p className="mt-1 text-sm text-[#4A4A4A] leading-relaxed">
                      Bring a government-issued photo ID and proof of address
                      (a recent utility bill or lease agreement works).
                    </p>
                    <a
                      href="#"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#147A6B] hover:underline"
                    >
                      Find a branch <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 px-2 sm:px-4">
                <h3 className="text-sm font-semibold tracking-wide uppercase text-[#4A4A4A]">
                  What to expect
                </h3>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-0.5 h-8 w-8 rounded-full bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center">
                      <ShieldCheck size={16} />
                    </span>
                    <span className="text-[15px] text-[#1A1A1A] leading-relaxed">
                      A banker will verify your identity and activate your
                      account.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-0.5 h-8 w-8 rounded-full bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center">
                      <CreditCard size={16} />
                    </span>
                    <span className="text-[15px] text-[#1A1A1A] leading-relaxed">
                      You&rsquo;ll receive your debit card within 7&ndash;10
                      business days.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-none mt-0.5 h-8 w-8 rounded-full bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center">
                      <Monitor size={16} />
                    </span>
                    <span className="text-[15px] text-[#1A1A1A] leading-relaxed">
                      Online and mobile banking will be enabled after
                      in-branch activation.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E6E8EB] bg-[#F6F7F8] p-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#4A4A4A]">
                    Reference number
                  </div>
                  <div className="mt-1 font-mono text-[15px] font-semibold text-[#0D5A50]">
                    {reg.referenceNumber}
                  </div>
                </div>
                <div className="rounded-xl border border-[#E6E8EB] bg-[#F6F7F8] p-4">
                  <div className="text-[11px] uppercase tracking-wider text-[#4A4A4A] flex items-center gap-1.5">
                    <Clock size={12} /> Estimated time
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-[#0D5A50]">
                    10&ndash;15 minutes at the branch
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row-reverse gap-3">
                <Link
                  href="/login"
                  className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#147A6B] text-white font-semibold hover:bg-[#0D5A50] transition-all shadow-soft hover:shadow-lift"
                >
                  Sign in with an existing account{" "}
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/"
                  className="inline-flex flex-1 items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold hover:bg-[#147A6B] hover:text-white transition-all"
                >
                  Return to home
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-[#4A4A4A] leading-relaxed max-w-lg mx-auto">
            Keep your reference number handy &mdash; our bankers will use it to
            locate your enrollment quickly at the branch.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function RegistrationCompletePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
          <div className="h-10 w-10 rounded-full border-2 border-[#147A6B]/30 border-t-[#147A6B] animate-spin" />
        </div>
      }
    >
      <RegistrationCompleteInner />
    </Suspense>
  );
}
