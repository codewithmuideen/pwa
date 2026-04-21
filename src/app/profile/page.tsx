"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bell, Fingerprint, Lock, LogOut, Mail, MapPin, Phone, Shield, Smartphone } from "lucide-react";
import AppShell from "@/components/AppShell";
import Button from "@/components/Button";
import { useAuth } from "@/lib/auth";

export default function ProfilePage() {
  return (
    <AppShell>
      <ProfileContent />
    </AppShell>
  );
}

function Toggle({ label, description, defaultOn = false, icon: Icon }: {
  label: string;
  description: string;
  defaultOn?: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-4">
      <div className="flex gap-3 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center shrink-0">
          <Icon size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A]">{label}</p>
          <p className="text-xs text-[#4A4A4A]">{description}</p>
        </div>
      </div>
      <button
        onClick={() => setOn((s) => !s)}
        className={`relative h-6 w-11 rounded-full transition-colors shrink-0 ${
          on ? "bg-[#147A6B]" : "bg-[#E6E8EB]"
        }`}
        aria-pressed={on}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function ProfileContent() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  if (!user) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#0D5A50]">Profile</h1>
        <p className="mt-1 text-sm text-[#4A4A4A]">
          Manage your account information and security settings.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-5">
          <div className="h-20 w-20 rounded-full overflow-hidden ring-4 ring-[#147A6B]/10 relative shrink-0">
            <Image
              src={user.avatar}
              alt={user.firstName}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[#1A1A1A]">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-[#4A4A4A]">Member since {user.memberSince}</p>
            <p className="text-xs text-[#4A4A4A] mt-1">
              Citizens ID: {user.userId}
            </p>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          <InfoRow icon={Mail} label="Email" value={user.email} />
          <InfoRow icon={Phone} label="Phone" value={user.phone} />
          <InfoRow
            icon={MapPin}
            label="Account number"
            value={`•••• ${user.accountNumber.slice(-4)}`}
          />
          <InfoRow icon={Shield} label="Routing" value={user.routingNumber} />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl shadow-card p-6 sm:p-8">
        <h3 className="font-semibold text-[#1A1A1A]">Security & notifications</h3>
        <div className="mt-4 divide-y divide-[#E6E8EB]">
          <Toggle
            icon={Fingerprint}
            label="Biometric sign-in"
            description="Use Face ID or Touch ID on supported devices."
            defaultOn
          />
          <Toggle
            icon={Lock}
            label="Two-factor authentication"
            description="Require a one-time code when signing in from a new device."
            defaultOn
          />
          <Toggle
            icon={Bell}
            label="Transaction alerts"
            description="Get notified when money moves in or out of your account."
            defaultOn
          />
          <Toggle
            icon={Smartphone}
            label="Paperless statements"
            description="Go digital and reduce paper clutter."
          />
        </div>
      </div>

      <div className="mt-6">
        <Button
          variant="danger"
          size="lg"
          onClick={() => {
            signOut();
            router.replace("/");
          }}
        >
          <LogOut size={16} /> Sign Out
        </Button>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F6F7F8] p-4">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#4A4A4A]">
        <Icon size={12} />
        {label}
      </div>
      <p className="mt-1 text-sm font-semibold text-[#1A1A1A] truncate">
        {value}
      </p>
    </div>
  );
}
