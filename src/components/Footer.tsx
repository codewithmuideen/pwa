import Image from "next/image";
import Link from "next/link";

const SocialIcon = ({ label, d }: { label: string; d: string }) => (
  <svg
    role="img"
    aria-label={label}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-4 w-4"
  >
    <path d={d} />
  </svg>
);

const SOCIALS = [
  {
    label: "Facebook",
    d: "M13.5 22v-8h2.7l.4-3.1H13.5V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.63c-.3-.04-1.3-.13-2.45-.13-2.43 0-4.1 1.48-4.1 4.2V10.9H7.5V14h2.65v8h3.35z",
  },
  {
    label: "Twitter",
    d: "M18.244 2H21l-6.52 7.45L22 22h-6.24l-4.87-6.27L5.2 22H2.44l6.98-7.98L2 2h6.4l4.4 5.83L18.244 2zm-2.19 18.05h1.5L8.02 3.83H6.4L16.054 20.05z",
  },
  {
    label: "Instagram",
    d: "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52.01-4.76.07-1.02.05-1.57.22-1.94.36-.49.19-.83.42-1.2.79-.37.37-.6.71-.79 1.2-.14.37-.31.92-.36 1.94-.06 1.24-.07 1.61-.07 4.76s.01 3.52.07 4.76c.05 1.02.22 1.57.36 1.94.19.49.42.83.79 1.2.37.37.71.6 1.2.79.37.14.92.31 1.94.36 1.24.06 1.61.07 4.76.07s3.52-.01 4.76-.07c1.02-.05 1.57-.22 1.94-.36.49-.19.83-.42 1.2-.79.37-.37.6-.71.79-1.2.14-.37.31-.92.36-1.94.06-1.24.07-1.61.07-4.76s-.01-3.52-.07-4.76c-.05-1.02-.22-1.57-.36-1.94a3.34 3.34 0 00-.79-1.2 3.34 3.34 0 00-1.2-.79c-.37-.14-.92-.31-1.94-.36-1.24-.06-1.61-.07-4.76-.07zm0 3.06a5.04 5.04 0 110 10.08 5.04 5.04 0 010-10.08zm0 1.8a3.24 3.24 0 100 6.48 3.24 3.24 0 000-6.48zm5.25-2.04a1.18 1.18 0 110 2.36 1.18 1.18 0 010-2.36z",
  },
  {
    label: "LinkedIn",
    d: "M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.65-1.85 3.39-1.85 3.62 0 4.28 2.38 4.28 5.48v6.26zM5.34 7.43a2.06 2.06 0 11.01-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22 2H2v20h20V2z",
  },
  {
    label: "YouTube",
    d: "M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31.4 31.4 0 000 12a31.4 31.4 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31.4 31.4 0 0024 12a31.4 31.4 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z",
  },
];

type Col = { title: string; links: { label: string; href: string }[] };

const cols: Col[] = [
  {
    title: "Products",
    links: [
      { label: "Checking Accounts", href: "/checking" },
      { label: "Savings & CDs", href: "/savings" },
      { label: "Credit Cards", href: "/credit-cards" },
      { label: "Home Loans", href: "/home-loans" },
      { label: "Auto Loans", href: "/auto-loans" },
      { label: "Student Loans", href: "/student-loans" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Newsroom", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Investor Relations", href: "/investors" },
      { label: "Community", href: "/community" },
      { label: "ESG", href: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Learning Center", href: "/learning-center" },
      { label: "Financial Calculators", href: "/learning-center" },
      { label: "Security Center", href: "/security" },
      { label: "Accessibility", href: "/about" },
      { label: "Customer Service", href: "/contact" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/privacy" },
      { label: "Online Privacy Notice", href: "/privacy" },
      { label: "California Privacy Notice", href: "/privacy" },
      { label: "Do Not Sell My Info", href: "/privacy" },
      { label: "Site Map", href: "/sitemap" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#0D5A50] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Image
              src="/citizens-logo-white.png"
              alt="Citizens Bank"
              width={180}
              height={44}
              className="h-10 w-auto"
            />
            <p className="mt-5 text-sm text-white/80 leading-relaxed max-w-xs">
              Trusted banking for over 195 years. Helping millions of customers
              and communities reach their financial goals.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href="/about"
                  aria-label={s.label}
                  className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
                >
                  <SocialIcon label={s.label} d={s.d} />
                </Link>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-white/75 hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-white/15 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <p className="text-xs text-white/70 leading-relaxed max-w-3xl">
            Citizens Financial Group, Inc. Member FDIC. Deposits are insured up to
            the standard maximum deposit insurance amount for each account
            ownership category. Equal Housing Lender. NMLS ID# 433960.
          </p>
          <p className="text-xs text-white/60 shrink-0">© 2026 Citizens Financial Group, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
