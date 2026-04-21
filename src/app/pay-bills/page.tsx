"use client";

import { useState } from "react";
import { CheckCircle2, Plus, Receipt, Users } from "lucide-react";
import AppShell from "@/components/AppShell";
import Button from "@/components/Button";
import { useAuth } from "@/lib/auth";
import { formatCurrency, formatDate, getBillPayments, getPayees } from "@/lib/data";

type Tab = "payees" | "payments";

export default function PayBillsPage() {
  return (
    <AppShell>
      <PayBillsContent />
    </AppShell>
  );
}

function PayBillsContent() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("payees");

  if (!user) return null;
  const payees = getPayees(user.transactionKey);
  const payments = getBillPayments(user.transactionKey);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-[#0D5A50]">Pay Bills</h1>
          <p className="mt-1 text-sm text-[#4A4A4A]">
            Manage your payees and track recent bill payments.
          </p>
        </div>
        <Button variant="primary" size="md">
          <Plus size={16} /> Add Payee
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 p-1 bg-[#F6F7F8] rounded-xl mb-6 max-w-sm">
        <button
          onClick={() => setTab("payees")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === "payees"
              ? "bg-white text-[#147A6B] shadow-card"
              : "text-[#4A4A4A] hover:text-[#147A6B]"
          }`}
        >
          <Users size={16} /> Payees
        </button>
        <button
          onClick={() => setTab("payments")}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            tab === "payments"
              ? "bg-white text-[#147A6B] shadow-card"
              : "text-[#4A4A4A] hover:text-[#147A6B]"
          }`}
        >
          <Receipt size={16} /> Payments
        </button>
      </div>

      {tab === "payees" ? (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-[#E6E8EB]">
            {payees.length === 0 ? (
              <div className="p-10 text-center text-sm text-[#4A4A4A]">
                No payees yet. Add one to get started.
              </div>
            ) : (
              payees.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-[#F6F7F8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center font-semibold">
                      {p.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1A1A1A]">
                        {p.name}
                      </p>
                      <p className="text-xs text-[#4A4A4A]">
                        {p.category} • Acct •••• {p.accountLast4}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Pay
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="divide-y divide-[#E6E8EB]">
            {payments.length === 0 ? (
              <div className="p-10 text-center text-sm text-[#4A4A4A]">
                No bill payments yet.
              </div>
            ) : (
              payments.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-[#F6F7F8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#1A1A1A]">
                        {p.payee}
                      </p>
                      <p className="text-xs text-[#4A4A4A]">
                        {formatDate(p.date)} • {p.status}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-sm text-[#1A1A1A]">
                    {formatCurrency(p.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
