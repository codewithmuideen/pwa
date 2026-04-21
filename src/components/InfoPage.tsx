import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Feature = { title: string; desc: string };
type Faq = { q: string; a: string };

export type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  heroImage: string;
  bullets: string[];
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  features?: Feature[];
  faqs?: Faq[];
  stats?: { value: string; label: string }[];
};

export default function InfoPage({
  eyebrow,
  title,
  description,
  heroImage,
  bullets,
  primaryCtaLabel = "Open an Account",
  primaryCtaHref = "/register",
  secondaryCtaLabel = "Sign In",
  secondaryCtaHref = "/login",
  features,
  faqs,
  stats,
}: InfoPageProps) {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#147A6B]/10 text-[#0D5A50] text-xs font-semibold">
                <Sparkles size={12} /> {eyebrow}
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0D5A50] leading-[1.05]">
                {title}
              </h1>
              <p className="mt-5 text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
                {description}
              </p>
              <ul className="mt-7 space-y-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[15px] text-[#1A1A1A]">
                    <BadgeCheck size={18} className="text-[#147A6B] mt-0.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C44D28] text-white font-semibold hover:bg-[#a6401f] shadow-soft hover:shadow-lift transition-all"
                >
                  {primaryCtaLabel} <ArrowRight size={16} />
                </Link>
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold hover:bg-[#147A6B] hover:text-white transition-all"
                >
                  {secondaryCtaLabel}
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[5/6] rounded-3xl overflow-hidden shadow-lift relative">
                <Image
                  src={heroImage}
                  alt={title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden md:flex absolute -left-8 bottom-12 bg-white rounded-2xl shadow-lift p-5 items-center gap-3 max-w-xs">
                <div className="h-11 w-11 rounded-full bg-[#147A6B]/10 flex items-center justify-center text-[#147A6B]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    FDIC Insured
                  </p>
                  <p className="text-xs text-[#4A4A4A]">Your deposits protected</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {stats && stats.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
            <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl sm:text-4xl font-bold text-[#0D5A50]">{s.value}</p>
                  <p className="mt-1 text-sm text-[#4A4A4A]">{s.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {features && features.length > 0 && (
          <section className="mt-20 sm:mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0D5A50]">
                  Everything you need, in one place
                </h2>
                <p className="mt-4 text-[#4A4A4A]">
                  Thoughtfully designed features to help you reach your financial goals faster.
                </p>
              </div>
              <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="bg-white rounded-2xl p-6 shadow-card hover:shadow-lift transition-all hover:-translate-y-1"
                  >
                    <div className="h-11 w-11 rounded-xl bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center mb-4">
                      <BadgeCheck size={20} />
                    </div>
                    <h3 className="font-semibold text-lg text-[#1A1A1A]">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-[#4A4A4A] leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {faqs && faqs.length > 0 && (
          <section className="mt-20 sm:mt-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0D5A50] text-center">
                Frequently asked questions
              </h2>
              <div className="mt-10 space-y-3">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group bg-white rounded-2xl shadow-card p-6 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                      <span className="font-semibold text-[#1A1A1A]">{item.q}</span>
                      <span className="h-7 w-7 rounded-full bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center text-xl leading-none group-open:rotate-45 transition-transform">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-sm text-[#4A4A4A] leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Closing CTA */}
        <section className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#0D5A50] text-white p-8 sm:p-14">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C44D28]/20 blur-3xl"
              />
              <div className="relative grid md:grid-cols-[1.4fr_auto] gap-8 items-center">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                    Ready to get started?
                  </h2>
                  <p className="mt-4 text-white/85 max-w-xl">
                    Open an account online in minutes. No branch visit required.
                  </p>
                </div>
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C44D28] text-white font-semibold hover:bg-[#a6401f] shadow-soft transition-all"
                >
                  {primaryCtaLabel} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
