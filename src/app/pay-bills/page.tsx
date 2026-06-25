"use client";

import { useState } from "react";
import { CheckCircle2, DollarSign, Landmark, Plus, Receipt, Users, X } from "lucide-react";
import AppShell from "@/components/AppShell";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/lib/auth";
import {
  formatCurrency,
  formatDate,
  getBillPayments,
  getPayees,
  type BillPayment,
  type Payee,
} from "@/lib/data";

type Tab = "payees" | "payments";

export default function PayBillsPage() {
  return (
    <AppShell>
      <PayBillsContent />
    </AppShell>
  );
}

function AddPayeeModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (payee: Payee) => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = ["Phone", "Internet", "Utilities", "Insurance", "Loan", "Rent", "Subscription"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!name.trim()) next.name = "Payee name is required.";
    if (!category) next.category = "Select a category.";
    if (accountNumber.length < 4)
      next.accountNumber = "Enter at least 4 digits.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const newPayee: Payee = {
      id: `p_new_${Date.now()}`,
      name: name.trim(),
      accountLast4: accountNumber.slice(-4),
      category,
    };
    onAdd(newPayee);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lift p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0D5A50]">Add Payee</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-[#F6F7F8] inline-flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <Input
            label="Payee name"
            placeholder="e.g. Verizon Wireless"
            icon={<Landmark size={16} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />

          <div>
            <label className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-all ${
                    category === c
                      ? "bg-[#147A6B] text-white"
                      : "bg-[#F6F7F8] text-[#4A4A4A] hover:bg-[#E6E8EB]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            {errors.category && (
              <p className="mt-1.5 text-xs text-red-600">{errors.category}</p>
            )}
          </div>

          <Input
            label="Account number"
            placeholder="e.g. 4521"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            inputMode="numeric"
            error={errors.accountNumber}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" size="md" fullWidth>
              <Plus size={16} /> Add Payee
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddPaymentModal({
  onClose,
  onAdd,
  payees,
}: {
  onClose: () => void;
  onAdd: (payment: BillPayment) => void;
  payees: Payee[];
}) {
  const [payee, setPayee] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!payee) next.payee = "Select a payee.";
    const num = parseFloat(amount);
    if (!amount.trim()) next.amount = "Enter an amount.";
    else if (Number.isNaN(num) || num <= 0) next.amount = "Enter a valid amount.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const newPayment: BillPayment = {
      id: `bp_new_${Date.now()}`,
      payee,
      amount: num,
      date: new Date().toISOString(),
      status: "Pending",
    };
    onAdd(newPayment);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-lift p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#0D5A50]">Add Payment</h2>
          <button
            onClick={onClose}
            className="h-9 w-9 rounded-full hover:bg-[#F6F7F8] inline-flex items-center justify-center transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-[13px] font-medium text-[#1A1A1A] mb-1.5">
              Payee
            </label>
            <select
              value={payee}
              onChange={(e) => setPayee(e.target.value)}
              className={`w-full h-12 px-4 rounded-xl border ${
                errors.payee ? "border-red-500" : "border-[#E6E8EB]"
              } bg-white text-[15px] text-[#1A1A1A] outline-none focus:border-[#147A6B] focus:ring-2 focus:ring-[#147A6B]/20 transition-all`}
            >
              <option value="">Select a payee</option>
              {payees.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name} — {p.category}
                </option>
              ))}
            </select>
            {errors.payee && (
              <p className="mt-1.5 text-xs text-red-600">{errors.payee}</p>
            )}
          </div>

          <Input
            label="Amount"
            placeholder="0.00"
            icon={<DollarSign size={16} />}
            value={amount}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/[^\d.]/g, "");
              const parts = cleaned.split(".");
              if (parts.length > 2) return;
              if (parts[1] && parts[1].length > 2) return;
              setAmount(cleaned);
            }}
            inputMode="decimal"
            error={errors.amount}
          />

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              size="md"
              fullWidth
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="secondary" size="md" fullWidth>
              <Plus size={16} /> Pay Now
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PayBillsContent() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("payees");
  const [showAddModal, setShowAddModal] = useState(false);
  const [extraPayees, setExtraPayees] = useState<Payee[]>([]);
  const [extraPayments, setExtraPayments] = useState<BillPayment[]>([]);

  if (!user) return null;
  const payees = [...getPayees(user.transactionKey), ...extraPayees];
  const payments = [...getBillPayments(user.transactionKey), ...extraPayments];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-[#0D5A50]">Pay Bills</h1>
          <p className="mt-1 text-sm text-[#4A4A4A]">
            Manage your payees and track recent bill payments.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} /> {tab === "payments" ? "Add Payment" : "Add Payee"}
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

      {showAddModal && tab === "payees" && (
        <AddPayeeModal
          onClose={() => setShowAddModal(false)}
          onAdd={(payee) => {
            setExtraPayees((prev) => [...prev, payee]);
            setShowAddModal(false);
          }}
        />
      )}
      {showAddModal && tab === "payments" && (
        <AddPaymentModal
          onClose={() => setShowAddModal(false)}
          payees={payees}
          onAdd={(payment) => {
            setExtraPayments((prev) => [payment, ...prev]);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
