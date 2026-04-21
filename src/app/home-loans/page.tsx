import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Home Loans & Mortgages | Citizens Bank" };

export default function HomeLoansPage() {
  return (
    <InfoPage
      eyebrow="Home Loans"
      title="Financing the place you'll call home"
      description="Purchase, refinance, and home equity solutions with transparent terms, fast approvals, and a dedicated loan officer from application to closing."
      heroImage="/mortgage.webp"
      bullets={[
        "Fixed and adjustable-rate mortgages",
        "FHA, VA, and jumbo loan programs",
        "Home equity lines of credit (HELOC)",
        "Online pre-approval in under 15 minutes",
      ]}
      stats={[
        { value: "15 min", label: "Pre-approval" },
        { value: "21 days", label: "Average close" },
        { value: "$0", label: "Application fee" },
        { value: "95%", label: "On-time close rate" },
      ]}
      features={[
        { title: "Purchase mortgages", desc: "Conventional, FHA, VA, and jumbo — with a rate lock that protects you for 90 days." },
        { title: "Refinance", desc: "Lower your rate, shorten your term, or cash out equity with a streamlined process." },
        { title: "HELOC", desc: "Access up to 85% of your home's equity with competitive variable rates." },
        { title: "First-time buyer programs", desc: "Down payment assistance up to $10,000 and reduced closing costs." },
      ]}
      faqs={[
        { q: "How much home can I afford?", a: "Use our affordability calculator or schedule a 15-minute call with a loan officer for a personalized analysis." },
        { q: "Do you offer rate locks?", a: "Yes. Lock your rate for up to 90 days at no cost during the application process." },
      ]}
    />
  );
}
