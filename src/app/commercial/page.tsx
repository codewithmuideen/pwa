import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Commercial Banking | Citizens Bank" };

export default function CommercialPage() {
  return (
    <InfoPage
      eyebrow="Commercial Banking"
      title="Capital solutions for growing companies"
      description="Middle-market banking, treasury, and capital markets expertise for companies that are scaling — delivered by industry-focused bankers."
      heroImage="/corperate-3.webp"
      bullets={[
        "Middle-market and asset-based lending",
        "Capital markets and syndicated finance",
        "Treasury & working capital optimization",
        "Industry coverage: healthcare, technology, industrials, real estate",
      ]}
      stats={[
        { value: "$42B", label: "In commercial loans" },
        { value: "40+", label: "Industry verticals" },
        { value: "50 states", label: "National footprint" },
        { value: "A+", label: "Credit rating" },
      ]}
      features={[
        { title: "Corporate finance", desc: "Senior debt, mezzanine, and acquisition financing tailored to your capital structure." },
        { title: "Capital markets", desc: "Syndicated loans, bond issuance, and private placements led by an experienced desk." },
        { title: "Asset-based lending", desc: "Receivables, inventory, and equipment lines from $5M to $500M+." },
        { title: "Treasury solutions", desc: "Cash management, liquidity sweeps, FX, and multi-currency accounts." },
        { title: "Industry expertise", desc: "Dedicated bankers in healthcare, technology, industrials, and commercial real estate." },
        { title: "International banking", desc: "Trade finance, documentary LCs, and cross-border payment rails." },
      ]}
    />
  );
}
