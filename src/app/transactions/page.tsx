"use client";

import { useMemo, useState } from "react";
import { Calendar, Filter, Search } from "lucide-react";
import AppShell from "@/components/AppShell";
import TransactionRow from "@/components/TransactionRow";
import { useAuth } from "@/lib/auth";
import { getTransactions } from "@/lib/data";

export default function TransactionsPage() {
  return (
    <AppShell>
      <TransactionsContent />
    </AppShell>
  );
}

function TransactionsContent() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const allTxns = useMemo(
    () => (user ? getTransactions(user.transactionKey) : []),
    [user]
  );

  const categories = useMemo(() => {
    const s = new Set<string>();
    allTxns.forEach((t) => s.add(t.category));
    return ["All", ...Array.from(s).sort()];
  }, [allTxns]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const from = fromDate ? new Date(fromDate).getTime() : null;
    const to = toDate ? new Date(toDate).getTime() + 86400000 - 1 : null;
    return allTxns.filter((t) => {
      if (category !== "All" && t.category !== category) return false;
      const tDate = new Date(t.date).getTime();
      if (from && tDate < from) return false;
      if (to && tDate > to) return false;
      if (q) {
        const hay = `${t.merchant} ${t.description} ${t.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allTxns, category, fromDate, toDate, query]);

  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0D5A50]">Transactions</h1>
        <p className="mt-1 text-sm text-[#4A4A4A]">
          {filtered.length} of {allTxns.length} transactions
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-card">
        <div className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr] gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search merchant, description"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6E8EB] bg-white text-sm focus:border-[#147A6B] focus:outline-none focus:ring-2 focus:ring-[#147A6B]/20"
            />
          </div>
          <div className="relative">
            <Filter
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6E8EB] bg-white text-sm focus:border-[#147A6B] focus:outline-none focus:ring-2 focus:ring-[#147A6B]/20 appearance-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] pointer-events-none"
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              aria-label="From date"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6E8EB] bg-white text-sm focus:border-[#147A6B] focus:outline-none focus:ring-2 focus:ring-[#147A6B]/20"
            />
          </div>
          <div className="relative">
            <Calendar
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A4A4A] pointer-events-none"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              aria-label="To date"
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-[#E6E8EB] bg-white text-sm focus:border-[#147A6B] focus:outline-none focus:ring-2 focus:ring-[#147A6B]/20"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="divide-y divide-[#E6E8EB]">
          {filtered.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-sm text-[#4A4A4A]">
                No transactions match your filters.
              </p>
            </div>
          ) : (
            filtered.map((t) => <TransactionRow key={t.id} t={t} />)
          )}
        </div>
      </div>
    </div>
  );
}
