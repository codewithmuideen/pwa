"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  ArrowRight,
  Camera,
  Download,
  Receipt,
  Send,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import BalanceCard from "@/components/BalanceCard";
import TransactionRow from "@/components/TransactionRow";
import { useAuth } from "@/lib/auth";
import { getStatements, getTransactions } from "@/lib/data";

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
};

const quickActions = [
  { label: "Transfer", href: "/transfer", icon: ArrowLeftRight },
  { label: "Pay Bills", href: "/pay-bills", icon: Receipt },
  { label: "Mobile Deposit", href: "/deposit", icon: Camera },
  { label: "Send Money", href: "/transfer", icon: Send },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <DashboardContent />
    </AppShell>
  );
}

function DashboardContent() {
  const { user } = useAuth();
  if (!user) return null;
  const transactions = getTransactions(user.transactionKey).slice(0, 10);
  const statements = getStatements(user.transactionKey, user.balance);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <p className="text-sm text-[#4A4A4A]">{greeting()},</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0D5A50]">
          {user.firstName}
        </h1>
      </div>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        <BalanceCard
          accountType={user.accountType}
          accountNumber={user.accountNumber}
          balance={user.balance}
          availableBalance={user.availableBalance}
          pendingBalance={user.pendingBalance}
          routingNumber={user.routingNumber}
        />

        <div className="bg-white rounded-2xl p-6 shadow-card">
          <h3 className="text-sm font-semibold text-[#1A1A1A]">Quick actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {quickActions.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-start gap-2 p-4 rounded-xl bg-[#F6F7F8] hover:bg-[#147A6B] hover:text-white transition-all"
              >
                <div className="h-9 w-9 rounded-lg bg-white group-hover:bg-white/20 text-[#147A6B] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon size={18} />
                </div>
                <span className="text-sm font-semibold">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div className="mt-8 bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-[#E6E8EB]">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Recent activity</h3>
            <p className="text-xs text-[#4A4A4A] mt-0.5">
              Latest 10 transactions on your account
            </p>
          </div>
          <Link
            href="/transactions"
            className="text-sm font-semibold text-[#147A6B] hover:underline inline-flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="divide-y divide-[#E6E8EB]">
          {transactions.length === 0 && (
            <div className="px-6 py-10 text-center text-sm text-[#4A4A4A]">
              No transactions yet.
            </div>
          )}
          {transactions.map((t) => (
            <TransactionRow key={t.id} t={t} />
          ))}
        </div>
      </div>

      {/* Statements */}
      <div className="mt-8 bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-5 border-b border-[#E6E8EB]">
          <div>
            <h3 className="text-lg font-semibold text-[#1A1A1A]">Statements</h3>
            <p className="text-xs text-[#4A4A4A] mt-0.5">Last 6 months</p>
          </div>
        </div>
        <div className="divide-y divide-[#E6E8EB]">
          {statements.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-[#F6F7F8] transition-colors"
            >
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{s.period}</p>
                <p className="text-xs text-[#4A4A4A]">Closing date • {s.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[#1A1A1A]">
                  {s.balance}
                </span>
                <button
                  aria-label="Download statement"
                  className="h-9 w-9 rounded-full bg-[#F6F7F8] hover:bg-[#147A6B] hover:text-white text-[#147A6B] inline-flex items-center justify-center transition"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
