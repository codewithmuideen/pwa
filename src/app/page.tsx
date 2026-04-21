import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CreditCard,
  Gem,
  Home as HomeIcon,
  PiggyBank,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wallet,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const quickActions = [
  {
    icon: Wallet,
    title: "Checking",
    href: "/checking",
    desc: "Earn a $400 bonus with qualifying Quest\u00ae Checking activity.",
  },
  {
    icon: CreditCard,
    title: "Credit Cards",
    href: "/credit-cards",
    desc: "Cash Back Plus\u00ae, travel rewards, and 0% intro APR options.",
  },
  {
    icon: HomeIcon,
    title: "Home Loans",
    desc: "Explore mortgages, refinancing, and home equity solutions.",
    href: "/home-loans",
  },
  {
    icon: PiggyBank,
    title: "Savings",
    desc: "High-yield savings and CDs with competitive rates.",
    href: "/savings",
  },
];

const products = [
  {
    title: "Personal Banking",
    image: "/women-1.webp",
    href: "/personal",
    bullets: [
      "Everyday checking & savings",
      "Credit cards with smart rewards",
      "Auto and personal loans",
    ],
    cta: "Explore personal banking",
  },
  {
    title: "Wealth Management",
    image: "/advisor.webp",
    href: "/wealth",
    bullets: [
      "Private client advisory",
      "Portfolio & retirement planning",
      "Trust and estate services",
    ],
    cta: "Discover Citizens Wealth",
  },
  {
    title: "Business Banking",
    image: "/corperate.webp",
    href: "/business",
    bullets: [
      "Business checking & lending",
      "Treasury & payment solutions",
      "Merchant services and payroll",
    ],
    cta: "Grow your business",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#147A6B]/10 text-[#0D5A50] text-xs font-semibold">
                <Sparkles size={12} /> New for 2026
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0D5A50] leading-[1.05]">
                Helping you bank better, every day
              </h1>
              <p className="mt-5 text-lg text-[#4A4A4A] leading-relaxed max-w-xl">
                From simple checking to personalized wealth advice — open an
                account in minutes, manage money on the go, and get help from real
                humans when you need it.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C44D28] text-white font-semibold hover:bg-[#a6401f] shadow-soft hover:shadow-lift transition-all"
                >
                  Open Checking <ArrowRight size={16} />
                </Link>
                <Link
                  href="#products"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#147A6B] text-[#147A6B] font-semibold hover:bg-[#147A6B] hover:text-white transition-all"
                >
                  Learn more
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-[#4A4A4A]">
                <span className="inline-flex items-center gap-1.5">
                  <BadgeCheck size={16} className="text-[#147A6B]" /> FDIC Insured
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-[#147A6B]" /> 24/7 Fraud Monitoring
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[5/6] rounded-3xl overflow-hidden shadow-lift relative">
                <Image
                  src="/hero-0.webp"
                  alt="Citizens Bank lifestyle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="hidden md:flex absolute -left-8 bottom-12 bg-white rounded-2xl shadow-lift p-5 items-center gap-3 max-w-xs">
                <div className="h-11 w-11 rounded-full bg-[#147A6B]/10 flex items-center justify-center text-[#147A6B]">
                  <Gem size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">
                    $400 checking bonus
                  </p>
                  <p className="text-xs text-[#4A4A4A]">Limited-time offer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick action cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map(({ icon: Icon, title, desc, href }) => (
              <Link
                key={title}
                href={href}
                className="group bg-white rounded-2xl p-6 shadow-card hover:shadow-lift transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-xl bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center mb-4 group-hover:bg-[#147A6B] group-hover:text-white transition-colors">
                  <Icon size={22} />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A1A]">{title}</h3>
                <p className="mt-1.5 text-sm text-[#4A4A4A]">{desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#147A6B]">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured offer */}
        <section className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-3xl bg-[#0D5A50] text-white p-8 sm:p-14">
              <div
                aria-hidden
                className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#C44D28]/20 blur-3xl"
              />
              <div
                aria-hidden
                className="absolute -left-10 -bottom-16 h-64 w-64 rounded-full bg-white/5 blur-3xl"
              />
              <div className="relative grid md:grid-cols-[1.4fr_auto] gap-8 items-center">
                <div>
                  <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10">
                    Limited-time offer
                  </span>
                  <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                    $400 bonus when you open a new Quest{String.fromCharCode(174)} Checking
                  </h2>
                  <p className="mt-4 text-white/85 max-w-xl">
                    Open a new Citizens Quest{String.fromCharCode(174)} Checking account and set up qualifying
                    direct deposits within 60 days to earn your bonus. Member FDIC.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#C44D28] text-white font-semibold hover:bg-[#a6401f] shadow-soft transition-all"
                >
                  Claim $400 <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section id="products" className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0D5A50]">
                Find the right fit for your financial life
              </h2>
              <p className="mt-4 text-[#4A4A4A]">
                From your first paycheck to your legacy plan, Citizens delivers
                thoughtful banking, lending, and wealth guidance at every stage.
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {products.map((p) => (
                <article
                  key={p.title}
                  className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lift transition-all hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#0D5A50]">{p.title}</h3>
                    <ul className="mt-4 space-y-2">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm text-[#4A4A4A]">
                          <BadgeCheck size={16} className="text-[#147A6B] mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={p.href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#C44D28] hover:gap-2 transition-all"
                    >
                      {p.cta} <ArrowRight size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile app section */}
        <section className="mt-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center bg-white rounded-3xl p-8 sm:p-12 shadow-card">
              <div className="relative order-2 lg:order-1">
                <div className="relative mx-auto aspect-[9/16] max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-lift">
                  <Image
                    src="/app-0.webp"
                    alt="Citizens Mobile app screenshot"
                    fill
                    sizes="(max-width: 1024px) 100vw, 320px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#147A6B]/10 text-[#0D5A50] text-xs font-semibold">
                  <Smartphone size={12} /> Citizens Mobile
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-[#0D5A50]">
                  Bank on the go with Citizens Mobile
                </h2>
                <p className="mt-4 text-[#4A4A4A] max-w-lg">
                  Deposit checks, transfer funds, pay bills, and manage your
                  accounts - all from your phone. Biometric sign-in keeps your
                  money secure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: ShieldCheck,
                  title: "FDIC Insured",
                  desc: "Your deposits are protected up to $250,000 per depositor, per ownership category.",
                },
                {
                  icon: BadgeCheck,
                  title: "24/7 Fraud Monitoring",
                  desc: "We watch your accounts around the clock and alert you to suspicious activity instantly.",
                },
                {
                  icon: Building2,
                  title: "Secure Sign-In",
                  desc: "Multi-factor authentication and biometric login keep unauthorized users out.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl p-7 shadow-card"
                >
                  <div className="h-11 w-11 rounded-xl bg-[#147A6B]/10 text-[#147A6B] flex items-center justify-center mb-4">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-lg text-[#1A1A1A]">{title}</h3>
                  <p className="mt-1.5 text-sm text-[#4A4A4A] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
