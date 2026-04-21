"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  Receipt,
  Camera,
  FileText,
  UserCircle2,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Bell,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const nav = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Accounts", href: "/dashboard", icon: Wallet },
  { label: "Transactions", href: "/transactions", icon: FileText },
  { label: "Transfers", href: "/transfer", icon: ArrowLeftRight },
  { label: "Pay Bills", href: "/pay-bills", icon: Receipt },
  { label: "Deposits", href: "/deposit", icon: Camera },
  { label: "Profile", href: "/profile", icon: UserCircle2 },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F7F8]">
        <div className="h-10 w-10 border-4 border-[#147A6B] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const initials = `${user.firstName[0] ?? ""}${user.lastName[0] ?? ""}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F8]">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#147A6B] text-white shadow-soft">
        <div className="px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Toggle menu"
              className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition"
            >
              {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <Link href="/dashboard" className="flex items-center">
              <Image
                src="/citizens-logo-white.png"
                alt="Citizens Bank"
                width={140}
                height={36}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              aria-label="Notifications"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-white/10 transition"
            >
              <Bell size={18} />
            </button>
            <div className="relative">
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full hover:bg-white/10 transition"
              >
                <div className="h-9 w-9 rounded-full overflow-hidden bg-white/20 ring-2 ring-white/30 relative shrink-0">
                  <Image
                    src={user.avatar}
                    alt={user.firstName}
                    fill
                    className="object-cover"
                    sizes="36px"
                  />
                </div>
                <span className="hidden sm:block text-sm font-medium">
                  {user.firstName}
                </span>
                <ChevronDown size={16} className="hidden sm:block" />
              </button>
              {menuOpen && (
                <>
                  <button
                    aria-hidden
                    className="fixed inset-0 z-30 cursor-default"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lift overflow-hidden text-[#1A1A1A] z-40">
                    <div className="px-4 py-3 border-b border-[#E6E8EB]">
                      <p className="font-semibold text-sm truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-[#4A4A4A] truncate">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#F6F7F8]"
                    >
                      <UserCircle2 size={16} /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        router.replace("/");
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm hover:bg-[#F6F7F8] text-left"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="hidden sm:block h-9 w-9 rounded-full bg-white/20 items-center justify-center text-xs font-bold">
              <span className="h-full w-full flex items-center justify-center">{initials}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky inset-y-0 left-0 top-0 lg:top-16 z-30 lg:z-auto w-64 bg-white border-r border-[#E6E8EB] h-screen lg:h-[calc(100vh-4rem)] overflow-y-auto transition-transform shadow-lift lg:shadow-none pt-20 lg:pt-0`}
        >
          <nav className="p-4 space-y-1">
            {nav.map((n) => {
              const Icon = n.icon;
              const active = pathname === n.href;
              return (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-colors ${
                    active
                      ? "bg-[#147A6B]/10 text-[#147A6B]"
                      : "text-[#1A1A1A] hover:bg-[#F6F7F8]"
                  }`}
                >
                  <Icon size={18} /> {n.label}
                </Link>
              );
            })}
            <div className="h-px bg-[#E6E8EB] my-3" />
            <button
              onClick={() => {
                signOut();
                router.replace("/");
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium text-red-600 hover:bg-red-50"
            >
              <LogOut size={18} /> Sign Out
            </button>
          </nav>
        </aside>
        {sidebarOpen && (
          <button
            aria-hidden
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden fixed inset-0 z-20 bg-black/40"
          />
        )}

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
