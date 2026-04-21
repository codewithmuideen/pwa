import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Investor Relations | Citizens Bank" };

export default function InvestorsPage() {
  return (
    <InfoPage
      eyebrow="Investor Relations"
      title="Transparent performance. Disciplined capital."
      description="Citizens Financial Group (NYSE: CFG) reports quarterly earnings and provides ongoing updates on strategy, capital return, and risk management."
      heroImage="/CTZNS-Investor.png"
      bullets={[
        "Quarterly earnings releases and transcripts",
        "Annual report and proxy statement",
        "SEC filings and 8-K announcements",
        "Investor day presentations and webcasts",
      ]}
      stats={[
        { value: "CFG", label: "NYSE ticker" },
        { value: "A-", label: "S&P credit rating" },
        { value: "$240B", label: "Total assets" },
        { value: "4.2%", label: "Dividend yield" },
      ]}
      features={[
        { title: "Latest earnings", desc: "Q4 2025 results, investor presentation, and prepared remarks." },
        { title: "Financial highlights", desc: "Net interest income, efficiency ratio, and return on tangible common equity." },
        { title: "Capital return", desc: "Dividend history and share repurchase program updates." },
        { title: "Governance", desc: "Board of directors, committee charters, and corporate bylaws." },
      ]}
      primaryCtaLabel="Latest earnings"
      primaryCtaHref="/investors"
    />
  );
}
