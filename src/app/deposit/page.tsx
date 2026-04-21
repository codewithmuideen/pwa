"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import AppShell from "@/components/AppShell";

export default function DepositPage() {
  return (
    <AppShell>
      <DepositContent />
    </AppShell>
  );
}

function DepositContent() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0D5A50]">Mobile Deposit</h1>
        <p className="mt-1 text-sm text-[#4A4A4A]">
          Deposit checks using your smartphone camera.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="bg-balance-gradient h-40 flex items-center justify-center">
          <Camera size={56} className="text-white/90" />
        </div>
        <div className="p-6 sm:p-10 text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A]">
            Use the Citizens mobile app
          </h2>
          <p className="mt-3 text-[#4A4A4A] max-w-lg mx-auto">
            For the best deposit experience, we recommend using the Citizens
            mobile app on your Android or iOS device. Snap a photo of the front
            and back of your check and funds appear in your account typically
            within one business day.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold hover:bg-[#147A6B] hover:text-white transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-card p-6">
        <h3 className="font-semibold text-[#1A1A1A]">Deposit limits</h3>
        <dl className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <dt className="text-[#4A4A4A]">Daily limit</dt>
            <dd className="font-semibold text-[#1A1A1A]">$10,000</dd>
          </div>
          <div>
            <dt className="text-[#4A4A4A]">Monthly limit</dt>
            <dd className="font-semibold text-[#1A1A1A]">$25,000</dd>
          </div>
          <div>
            <dt className="text-[#4A4A4A]">Availability</dt>
            <dd className="font-semibold text-[#1A1A1A]">Next business day</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
