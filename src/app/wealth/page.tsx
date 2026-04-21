import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Wealth Management | Citizens Bank" };

export default function WealthPage() {
  return (
    <InfoPage
      eyebrow="Wealth Management"
      title="Wealth strategy, refined"
      description="Private client advisory, disciplined portfolio construction, and legacy planning — led by experienced advisors who answer when you call."
      heroImage="/advisor.webp"
      bullets={[
        "Personalized investment strategy and portfolio management",
        "Trust, estate, and intergenerational wealth planning",
        "Retirement and tax-efficient income solutions",
        "Private banking with concierge lending",
      ]}
      stats={[
        { value: "$145B", label: "Assets under advisement" },
        { value: "1,200+", label: "Certified advisors" },
        { value: "195", label: "Years of banking heritage" },
        { value: "Top 10", label: "U.S. private bank" },
      ]}
      features={[
        { title: "Private client advisory", desc: "A senior advisor, a disciplined plan, and review cadence that matches your life." },
        { title: "Portfolio construction", desc: "Diversified strategies across equities, fixed income, and alternatives with risk controls." },
        { title: "Trust & estate services", desc: "Generational wealth transfer, philanthropic strategies, and fiduciary support." },
        { title: "Retirement planning", desc: "Tax-efficient withdrawal strategies and Monte Carlo stress-tested income plans." },
        { title: "Concierge lending", desc: "Jumbo mortgages, securities-based lines of credit, and custom liquidity solutions." },
        { title: "Family office services", desc: "Consolidated reporting, bill pay, and multi-entity coordination for complex households." },
      ]}
      faqs={[
        { q: "What's the minimum to work with an advisor?", a: "Our Private Client relationships typically begin at $1M in investable assets. For household planning we have solutions at every level." },
        { q: "How are advisors compensated?", a: "Fee-based on assets under management. No commissions, no hidden markups, fully disclosed." },
      ]}
    />
  );
}
