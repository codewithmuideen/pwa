import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Site Map | Citizens Bank" };

const sections = [
  {
    title: "Personal",
    links: [
      { label: "Personal Banking", href: "/personal" },
      { label: "Checking Accounts", href: "/checking" },
      { label: "Savings & CDs", href: "/savings" },
      { label: "Credit Cards", href: "/credit-cards" },
      { label: "Home Loans", href: "/home-loans" },
      { label: "Auto Loans", href: "/auto-loans" },
      { label: "Student Loans", href: "/student-loans" },
    ],
  },
  {
    title: "Business & Wealth",
    links: [
      { label: "Business Banking", href: "/business" },
      { label: "Wealth Management", href: "/wealth" },
      { label: "Commercial Banking", href: "/commercial" },
      { label: "Investor Relations", href: "/investors" },
    ],
  },
  {
    title: "Online Banking",
    links: [
      { label: "Sign In", href: "/login" },
      { label: "Open an Account", href: "/register" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Transfer", href: "/transfer" },
      { label: "Deposit", href: "/deposit" },
      { label: "Pay Bills", href: "/pay-bills" },
      { label: "Transactions", href: "/transactions" },
      { label: "Profile", href: "/profile" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Community", href: "/community" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Learning Center", href: "/learning-center" },
      { label: "Security Center", href: "/security" },
      { label: "Privacy & Legal", href: "/privacy" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-hero-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[#0D5A50]">
              Site Map
            </h1>
            <p className="mt-4 text-[#4A4A4A] max-w-2xl mx-auto">
              Everything on citizens.com — organized so you can find what you need.
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl shadow-card p-7">
                <h2 className="font-semibold text-lg text-[#0D5A50]">{s.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {s.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="text-sm text-[#4A4A4A] hover:text-[#147A6B] transition-colors"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
