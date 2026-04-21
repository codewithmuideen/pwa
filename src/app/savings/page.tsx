import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Savings & CDs | Citizens Bank" };

export default function SavingsPage() {
  return (
    <InfoPage
      eyebrow="Savings & CDs"
      title="High-yield savings that reward consistency"
      description="Earn 4.10% APY on every dollar from day one, with no minimum balance and no monthly fees. Plus competitive CD rates at every term."
      heroImage="/card-00.webp"
      bullets={[
        "4.10% APY on all balances",
        "No minimum deposit, no monthly fees",
        "Daily compounding, monthly payout",
        "CDs available from 3 months to 5 years",
      ]}
      stats={[
        { value: "4.10%", label: "APY on savings" },
        { value: "4.75%", label: "Top CD rate (12mo)" },
        { value: "$0", label: "Minimum balance" },
        { value: "FDIC", label: "Insured" },
      ]}
      features={[
        { title: "Online Savings", desc: "Our flagship high-yield account — 4.10% APY with daily compounding." },
        { title: "Emergency fund tools", desc: "Automated sweeps and goal tracking to build a 3–6 month cushion." },
        { title: "CD ladders", desc: "Stagger maturities across 3, 6, 12, and 24 months to capture yield with liquidity." },
        { title: "IRA savings & CDs", desc: "Tax-advantaged retirement savings at competitive rates." },
      ]}
      faqs={[
        { q: "How often is interest paid?", a: "Interest compounds daily and is credited monthly." },
        { q: "Are there withdrawal limits?", a: "Federal Regulation D limits have been lifted — withdraw as often as you need." },
      ]}
    />
  );
}
