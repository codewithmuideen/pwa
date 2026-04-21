"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { formatCurrency } from "@/lib/data";

interface BalanceCardProps {
  accountType: string;
  accountNumber: string;
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  routingNumber?: string;
}

export default function BalanceCard({
  accountType,
  accountNumber,
  balance,
  availableBalance,
  pendingBalance,
  routingNumber,
}: BalanceCardProps) {
  const [show, setShow] = useState(true);
  const last4 = accountNumber.slice(-4);

  return (
    <div className="bg-balance-gradient rounded-2xl text-white shadow-soft overflow-hidden relative">
      <div
        aria-hidden
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="absolute -left-10 -bottom-16 h-48 w-48 rounded-full bg-white/5 blur-2xl"
      />
      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-white/70">
              Primary Checking
            </p>
            <h3 className="mt-1 text-lg sm:text-xl font-semibold">
              {accountType}
            </h3>
            <p className="mt-1 text-sm text-white/75 font-mono">
              •••• •••• •••• {last4}
            </p>
          </div>
          <button
            onClick={() => setShow((s) => !s)}
            aria-label="Toggle balance visibility"
            className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            {show ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        </div>

        <div className="mt-8">
          <p className="text-xs uppercase tracking-wider text-white/70">
            Current Balance
          </p>
          <p className="mt-1 text-3xl sm:text-5xl font-bold tracking-tight">
            {show ? formatCurrency(balance) : "$•••••••"}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 pt-6 border-t border-white/15">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/70">
              Available
            </p>
            <p className="mt-1 text-base sm:text-lg font-semibold">
              {show ? formatCurrency(availableBalance) : "$••••"}
            </p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-wider text-white/70">
              Pending
            </p>
            <p className="mt-1 text-base sm:text-lg font-semibold">
              {show ? formatCurrency(pendingBalance) : "$••••"}
            </p>
          </div>
        </div>

        {routingNumber && (
          <p className="mt-5 text-[11px] text-white/60">
            Routing • {routingNumber}
          </p>
        )}
      </div>
    </div>
  );
}
