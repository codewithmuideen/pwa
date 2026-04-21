"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertTriangle, ArrowRight, Lock, MapPin, User, X } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/lib/auth";
import { getPendingByEmail, ensureReference } from "@/lib/registration";

const REMEMBER_KEY = "citizens_remember_userid";

interface PendingNotice {
  firstName: string;
  referenceNumber: string;
}

export default function LoginPage() {
  const { signIn, user } = useAuth();
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [pendingNotice, setPendingNotice] = useState<PendingNotice | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) router.replace("/dashboard");
  }, [user, router]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setUserId(saved);
        setRemember(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId.trim() || !password) {
      setError("Please enter your User ID and password.");
      setPendingNotice(null);
      return;
    }
    setError("");
    setPendingNotice(null);
    setSubmitting(true);
    const result = signIn(userId, password);
    if (result.ok) {
      try {
        if (remember) localStorage.setItem(REMEMBER_KEY, userId);
        else localStorage.removeItem(REMEMBER_KEY);
      } catch {
        // ignore
      }
      router.replace("/dashboard");
      return;
    }

    // Not a predefined user. Check if they signed up via /register.
    const match = getPendingByEmail(userId);
    if (match) {
      const withRef = ensureReference(match.id) ?? match;
      setPendingNotice({
        firstName: withRef.firstName,
        referenceNumber: withRef.referenceNumber ?? "ENR-PENDING",
      });
      setError("");
    } else {
      setError(result.error);
    }
    setSubmitting(false);
  };

  return (
    <>
    <Header />
    <main className="flex-1 grid lg:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-160px)]">
      {/* Left — imagery */}
      <div className="relative hidden lg:block">
        <Image
          src="/hero-2.webp"
          alt="Citizens Bank"
          fill
          sizes="55vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D5A50]/85 via-[#147A6B]/55 to-[#147A6B]/20" />
        <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
          <Link href="/">
            <Image
              src="/citizens-logo-white.png"
              alt="Citizens"
              width={180}
              height={44}
              className="h-10 w-auto"
            />
          </Link>
          <div>
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight">
              Welcome back to Citizens.
            </h2>
            <p className="mt-4 text-white/85 max-w-md">
              Sign in to manage your accounts, transfer funds, pay bills, and
              reach your financial goals.
            </p>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden inline-flex">
            <Image
              src="/citizens-logo-green.png"
              alt="Citizens"
              width={170}
              height={42}
              className="h-10 w-auto"
            />
          </Link>
          <h1 className="mt-6 text-3xl font-bold text-[#0D5A50]">Sign In to Citizens</h1>
          <p className="mt-2 text-sm text-[#4A4A4A]">
            Enter your User ID and password to access your accounts.
          </p>

          {pendingNotice && (
            <div className="mt-6 relative rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setPendingNotice(null)}
                className="absolute top-3 right-3 text-amber-700 hover:text-amber-900"
              >
                <X size={16} />
              </button>
              <div className="flex items-start gap-3">
                <span className="flex-none h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <AlertTriangle size={18} />
                </span>
                <div className="flex-1">
                  <h3 className="text-[15px] font-semibold text-amber-900">
                    Account pending activation
                  </h3>
                  <p className="mt-1 text-[13px] text-amber-900/90 leading-relaxed">
                    We found your enrollment, {pendingNotice.firstName}, but
                    your account requires in-branch verification before you
                    can sign in. Please visit a Citizens Bank branch with a
                    valid government-issued ID to complete activation.
                  </p>
                  <p className="mt-2 text-[12px] font-mono text-amber-900/90">
                    Reference: {pendingNotice.referenceNumber}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#147A6B] text-white text-[13px] font-semibold hover:bg-[#0D5A50] transition-colors"
                    >
                      <MapPin size={14} /> Find a branch near me
                    </a>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#147A6B] text-[#147A6B] text-[13px] font-semibold hover:bg-[#147A6B]/5 transition-colors"
                    >
                      Return to home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <Input
              label="User ID"
              placeholder="Enter your User ID"
              autoComplete="username"
              icon={<User size={16} />}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              icon={<Lock size={16} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between">
              <label className="inline-flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-[#147A6B] cursor-pointer"
                />
                <span className="text-sm text-[#1A1A1A]">Remember User ID</span>
              </label>
              <a href="#" className="text-sm text-[#147A6B] hover:underline font-medium">
                Forgot User ID / Password
              </a>
            </div>

            {error && !pendingNotice && (
              <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <Button type="submit" variant="secondary" fullWidth size="lg" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign In"} <ArrowRight size={16} />
            </Button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E6E8EB]" />
            <span className="text-xs uppercase tracking-wider text-[#4A4A4A]">Or</span>
            <div className="flex-1 h-px bg-[#E6E8EB]" />
          </div>

          <div className="text-center">
            <p className="text-sm text-[#4A4A4A]">New to Citizens?</p>
            <Link
              href="/register"
              className="mt-3 inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold hover:bg-[#147A6B] hover:text-white transition-all"
            >
              Enroll now <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-8 text-[11px] text-[#4A4A4A] text-center leading-relaxed">
            Citizens Financial Group, Inc. Member FDIC. By signing in you
            acknowledge our <a href="#" className="underline">Online Services Agreement</a>.
          </p>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
