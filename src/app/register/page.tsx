"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Calendar, Lock, Mail, Phone, ShieldCheck } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  createPendingRegistration,
  scorePassword,
  type PasswordStrength,
} from "@/lib/registration";

type FieldErrors = Partial<
  Record<
    | "firstName"
    | "lastName"
    | "email"
    | "phone"
    | "dob"
    | "ssn"
    | "password"
    | "confirm"
    | "terms",
    string
  >
>;

const strengthLabel: Record<PasswordStrength, string> = {
  empty: "",
  weak: "Weak",
  fair: "Fair",
  strong: "Strong",
};

const strengthColor: Record<PasswordStrength, string> = {
  empty: "bg-[#E6E8EB]",
  weak: "bg-red-400",
  fair: "bg-amber-400",
  strong: "bg-[#147A6B]",
};

const strengthWidth: Record<PasswordStrength, string> = {
  empty: "w-0",
  weak: "w-1/3",
  fair: "w-2/3",
  strong: "w-full",
};

const formatDob = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 8);
  const parts: string[] = [];
  if (digits.length >= 1) parts.push(digits.slice(0, 2));
  if (digits.length >= 3) parts.push(digits.slice(2, 4));
  if (digits.length >= 5) parts.push(digits.slice(4, 8));
  return parts.join("/");
};

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => scorePassword(password), [password]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";

    const emailTrimmed = email.trim();
    if (!emailTrimmed) {
      next.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      next.email = "Enter a valid email address.";
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length !== 10) {
      next.phone = "Enter a 10-digit phone number.";
    }

    const dobDigits = dob.replace(/\D/g, "");
    if (dobDigits.length !== 8) {
      next.dob = "Enter date of birth as MM/DD/YYYY.";
    } else {
      const mm = parseInt(dobDigits.slice(0, 2), 10);
      const dd = parseInt(dobDigits.slice(2, 4), 10);
      const yyyy = parseInt(dobDigits.slice(4, 8), 10);
      const currentYear = new Date().getFullYear();
      if (
        mm < 1 ||
        mm > 12 ||
        dd < 1 ||
        dd > 31 ||
        yyyy < 1900 ||
        yyyy > currentYear
      ) {
        next.dob = "Enter a valid date of birth.";
      }
    }

    if (!/^\d{4}$/.test(ssn)) {
      next.ssn = "Enter the last 4 digits of your SSN.";
    }

    if (!password) {
      next.password = "Create a password.";
    } else if (password.length < 8) {
      next.password = "Password must be at least 8 characters.";
    } else if (strength === "weak") {
      next.password = "Use a mix of letters, numbers, and symbols.";
    }

    if (!confirm) {
      next.confirm = "Confirm your password.";
    } else if (password !== confirm) {
      next.confirm = "Passwords do not match.";
    }

    if (!agreed) {
      next.terms = "You must agree to continue.";
    }

    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fieldErrors = validate();
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    const reg = createPendingRegistration({
      email,
      firstName,
      lastName,
      phone,
      dob,
      ssnLast4: ssn,
    });

    router.push(`/verify-email?email=${encodeURIComponent(reg.email)}`);
  };

  return (
    <>
    <Header />
    <main className="flex-1 grid lg:grid-cols-[1.1fr_1fr] min-h-[calc(100vh-160px)]">
      <div className="relative hidden lg:block">
        <Image
          src="/hero-3.jpg"
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
              Start your Citizens journey.
            </h2>
            <p className="mt-4 text-white/85 max-w-md">
              Open an account in minutes. We&rsquo;ll verify your identity
              securely and a banker will help you finish activation at your
              nearest branch.
            </p>
            <div className="mt-8 flex items-center gap-3 text-white/90 text-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <ShieldCheck size={18} />
              </span>
              <span>Bank-level encryption &middot; FDIC insured</span>
            </div>
          </div>
        </div>
      </div>

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
          <h1 className="mt-6 text-3xl font-bold text-[#0D5A50]">
            Enroll in Online Banking
          </h1>
          <p className="mt-2 text-sm text-[#4A4A4A]">
            Create your Citizens profile to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4" noValidate>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="First Name"
                placeholder="First name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={errors.firstName}
              />
              <Input
                label="Last Name"
                placeholder="Last name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={errors.lastName}
              />
            </div>

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              icon={<Mail size={16} />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />

            <Input
              label="Phone"
              type="tel"
              placeholder="(555) 555-1234"
              autoComplete="tel"
              icon={<Phone size={16} />}
              value={phone}
              onChange={(e) => setPhone(formatPhone(e.target.value))}
              error={errors.phone}
              inputMode="tel"
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Date of Birth"
                placeholder="MM/DD/YYYY"
                autoComplete="bday"
                icon={<Calendar size={16} />}
                value={dob}
                onChange={(e) => setDob(formatDob(e.target.value))}
                error={errors.dob}
                inputMode="numeric"
                maxLength={10}
              />
              <Input
                label="SSN (last 4)"
                type="password"
                placeholder="****"
                autoComplete="off"
                icon={<ShieldCheck size={16} />}
                value={ssn}
                onChange={(e) =>
                  setSsn(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                error={errors.ssn}
                inputMode="numeric"
                maxLength={4}
              />
            </div>

            <div>
              <Input
                label="Create Password"
                type="password"
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                icon={<Lock size={16} />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-[#E6E8EB] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${strengthColor[strength]} ${strengthWidth[strength]}`}
                    />
                  </div>
                  <p className="mt-1 text-[11px] text-[#4A4A4A]">
                    Password strength:{" "}
                    <span
                      className={`font-semibold ${
                        strength === "strong"
                          ? "text-[#0D5A50]"
                          : strength === "fair"
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {strengthLabel[strength]}
                    </span>
                  </p>
                </div>
              )}
            </div>

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              autoComplete="new-password"
              icon={<Lock size={16} />}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={errors.confirm}
            />

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-[#147A6B] cursor-pointer"
              />
              <span className="text-[13px] leading-relaxed text-[#1A1A1A]">
                I agree to Citizens Bank&rsquo;s{" "}
                <a href="#" className="text-[#147A6B] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#147A6B] underline">
                  Privacy Policy
                </a>
                .
              </span>
            </label>
            {errors.terms && (
              <p className="-mt-2 text-xs text-red-600">{errors.terms}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              size="lg"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Create account"}{" "}
              <ArrowRight size={16} />
            </Button>
          </form>

          <p className="mt-6 text-sm text-[#4A4A4A] text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#147A6B] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>

          <p className="mt-8 text-[11px] text-[#4A4A4A] text-center leading-relaxed">
            Citizens Financial Group, Inc. Member FDIC.
          </p>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
