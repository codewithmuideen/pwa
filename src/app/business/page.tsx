import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Business Banking | Citizens Bank" };

export default function BusinessPage() {
  return (
    <InfoPage
      eyebrow="Business Banking"
      title="Banking that works as hard as you do"
      description="From startups to established enterprises — checking, lending, treasury, and payment tools designed to keep your cash flowing and your team paid."
      heroImage="/corperate.webp"
      bullets={[
        "Business checking with unlimited transactions",
        "Lines of credit and SBA lending programs",
        "Treasury management and ACH origination",
        "Merchant services and integrated payroll",
      ]}
      stats={[
        { value: "250k+", label: "Businesses served" },
        { value: "$0", label: "Wire fees for Prime accounts" },
        { value: "Same-day", label: "ACH processing" },
        { value: "98%", label: "Loan decisions in 48h" },
      ]}
      features={[
        { title: "Business Advantage Checking", desc: "Unlimited transactions, integrated bill pay, and detailed cash-flow reporting." },
        { title: "SBA & conventional lending", desc: "Term loans, equipment financing, and commercial mortgages from a dedicated banker." },
        { title: "Treasury management", desc: "Automated sweeps, positive pay, and real-time account visibility across entities." },
        { title: "Merchant services", desc: "Accept every major card, tap-to-pay, and online checkout with next-day funding." },
        { title: "Payroll integration", desc: "One-click payroll funding, 1099 tax tools, and HR workflow automation." },
        { title: "Dedicated business banker", desc: "A single point of contact who knows your business and your industry." },
      ]}
      faqs={[
        { q: "What's required to open a business account?", a: "Your EIN, formation documents, and owner identification. Most openings complete online in under 15 minutes." },
        { q: "Do you lend to early-stage companies?", a: "Yes. We work with startups from pre-revenue through Series B with SBA-backed and conventional products." },
      ]}
    />
  );
}
