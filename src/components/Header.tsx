"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MapPin, Phone, Search, Shield, X } from "lucide-react";
import { useEffect, useState } from "react";

const nav = [
  { label: "Personal", href: "/personal" },
  { label: "Business", href: "/business" },
  { label: "Wealth", href: "/wealth" },
  { label: "Commercial", href: "/commercial" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      {/* Utility bar */}
      <div className="bg-gradient-to-r from-[#0A4840] via-[#0D5A50] to-[#0A4840] text-white text-[11px] sm:text-[12px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
          <Link href="/security" className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Shield size={12} className="shrink-0" />
            <span className="hidden xs:inline">Secure Banking</span>
            <span className="xs:hidden">Secure</span>
          </Link>
          <a href="tel:1-800-922-9999" className="hidden sm:inline-flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={12} /> Customer Service
          </a>
          <Link href="/contact" className="hidden sm:inline-flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <MapPin size={12} /> Locations
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <MapPin size={12} className="sm:hidden shrink-0" />
            <span>Find ATM</span>
          </Link>
        </div>
      </div>

      {/* Main nav — logo + actions */}
      <div className="border-b border-[#E6E8EB]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 flex items-center justify-between gap-3">
          <div className="flex items-center gap-10 min-w-0">
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/citizens-bank-logo-big.png"
                alt="Citizens Bank"
                width={320}
                height={80}
                className="h-14 sm:h-16 lg:h-20 w-auto"
                priority
              />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {nav.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  className="text-[15px] font-medium text-[#1A1A1A] hover:text-[#147A6B] transition-colors relative py-7"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              aria-label="Search"
              className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F6F7F8] transition-colors"
            >
              <Search size={18} />
            </button>
            {/* Sign In — visible on mobile between logo and menu */}
            <Link
              href="/login"
              className="inline-flex items-center px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold text-[13px] sm:text-sm hover:bg-[#147A6B] hover:text-white active:scale-95 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#C44D28] text-white font-semibold text-sm hover:bg-[#a6401f] shadow-soft hover:shadow-lift transition-all"
            >
              Open an Account
            </Link>
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label="Menu"
              aria-expanded={open}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full text-[#1A1A1A] hover:bg-[#F6F7F8] active:scale-95 transition-all"
            >
              {open ? (
                <X size={22} />
              ) : (
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="7" x2="19" y2="7" />
                  <line x1="3" y1="11" x2="19" y2="11" />
                  <line x1="11" y1="15" x2="19" y2="15" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar — mobile only, premium accent strip */}
      <div className="lg:hidden border-b border-[#E6E8EB]/70 bg-[#F6F7F8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5">
          <button
            aria-label="Search Citizens Bank"
            className="w-full inline-flex items-center gap-2.5 h-10 px-4 rounded-full bg-white border border-[#E6E8EB] text-[13px] text-[#6B7280] shadow-sm hover:shadow-md hover:border-[#147A6B]/40 transition-all"
          >
            <Search size={15} className="text-[#147A6B]" />
            <span className="flex-1 text-left">Search accounts, branches, help…</span>
            <span className="hidden xs:inline-flex items-center gap-1 text-[11px] font-semibold text-[#147A6B]">
              Search <ChevronRight size={12} />
            </span>
          </button>
        </div>
      </div>

    </header>

      {/* Mobile slide-in drawer — rendered outside <header> so backdrop-filter on header doesn't trap `position: fixed` */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <div
          className="absolute inset-0 bg-[#0A1F1C]/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between h-16 px-5 border-b border-[#E6E8EB]">
            <span className="text-[13px] font-semibold tracking-wider text-[#147A6B] uppercase">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="h-10 w-10 inline-flex items-center justify-center rounded-full hover:bg-[#F6F7F8] active:scale-95 transition-all"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="flex flex-col gap-1">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="group flex items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-[#1A1A1A] hover:bg-[#F6F7F8] transition-colors"
                >
                  {n.label}
                  <ChevronRight
                    size={16}
                    className="text-[#9CA3AF] group-hover:text-[#147A6B] group-hover:translate-x-0.5 transition-all"
                  />
                </a>
              ))}
            </div>

            <div className="h-px bg-[#E6E8EB] my-4" />

            <div className="flex flex-col gap-1 text-[14px] text-[#4B5563]">
              <a
                href="tel:1-800-922-9999"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F6F7F8] transition-colors"
              >
                <Phone size={16} className="text-[#147A6B]" /> Customer Service
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#F6F7F8] transition-colors"
              >
                <MapPin size={16} className="text-[#147A6B]" /> Locations & ATMs
              </Link>
            </div>
          </nav>

          <div className="p-5 border-t border-[#E6E8EB] bg-[#F6F7F8]/50 flex flex-col gap-2.5">
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-[#C44D28] text-white font-semibold text-[15px] hover:bg-[#a6401f] shadow-soft transition-all"
            >
              Open an Account
            </Link>
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center px-5 py-3 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold text-[15px] hover:bg-[#147A6B] hover:text-white transition-all"
            >
              Sign In
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
