import { formatCurrency, formatDate, type Transaction } from "@/lib/data";
import {
  ShoppingBag,
  Coffee,
  Fuel,
  Home,
  Tv,
  Utensils,
  ArrowLeftRight,
  HeartPulse,
  Banknote,
  Briefcase,
  Plane,
  Car,
  Wallet,
} from "lucide-react";

const iconFor = (category: string) => {
  switch (category) {
    case "Shopping":
      return ShoppingBag;
    case "Dining":
      return Utensils;
    case "Coffee":
      return Coffee;
    case "Gas":
      return Fuel;
    case "Subscription":
      return Tv;
    case "Transfer":
      return ArrowLeftRight;
    case "Health":
      return HeartPulse;
    case "Income":
      return Banknote;
    case "Groceries":
      return ShoppingBag;
    case "ATM":
      return Wallet;
    case "Utilities":
      return Home;
    case "Business":
      return Briefcase;
    case "Travel":
      return Plane;
    case "Auto":
    case "Transport":
      return Car;
    case "Housing":
      return Home;
    default:
      return Wallet;
  }
};

const categoryColor = (category: string) => {
  switch (category) {
    case "Income":
      return "bg-emerald-50 text-emerald-700";
    case "Transfer":
      return "bg-blue-50 text-blue-700";
    case "Shopping":
      return "bg-purple-50 text-purple-700";
    case "Dining":
      return "bg-orange-50 text-orange-700";
    case "Gas":
      return "bg-amber-50 text-amber-700";
    case "Subscription":
      return "bg-pink-50 text-pink-700";
    case "Utilities":
      return "bg-sky-50 text-sky-700";
    case "Health":
      return "bg-rose-50 text-rose-700";
    case "Groceries":
      return "bg-lime-50 text-lime-700";
    case "Travel":
      return "bg-cyan-50 text-cyan-700";
    case "ATM":
      return "bg-stone-100 text-stone-700";
    default:
      return "bg-[#F6F7F8] text-[#4A4A4A]";
  }
};

export default function TransactionRow({ t }: { t: Transaction }) {
  const Icon = iconFor(t.category);
  const isCredit = t.type === "credit";

  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-4 hover:bg-[#F6F7F8] transition-colors">
      <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${categoryColor(t.category)}`}
        >
          <Icon size={18} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A] truncate">{t.merchant}</p>
          <p className="text-xs text-[#4A4A4A] truncate">
            {formatDate(t.date)} • {t.description}
          </p>
        </div>
      </div>

      <div className="hidden sm:block">
        <span
          className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${categoryColor(t.category)}`}
        >
          {t.category}
        </span>
      </div>

      <div className="text-right shrink-0">
        <p
          className={`text-sm sm:text-base font-semibold ${
            isCredit ? "text-emerald-600" : "text-[#1A1A1A]"
          }`}
        >
          {isCredit ? "+" : "−"}
          {formatCurrency(t.amount)}
        </p>
        <p
          className={`text-[11px] ${
            t.status === "Pending" ? "text-amber-600" : "text-[#4A4A4A]"
          }`}
        >
          {t.status}
        </p>
      </div>
    </div>
  );
}
