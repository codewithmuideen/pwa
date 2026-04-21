import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Auto Loans | Citizens Bank" };

export default function AutoLoansPage() {
  return (
    <InfoPage
      eyebrow="Auto Loans"
      title="Drive away with the right loan"
      description="New, used, or refinance — competitive rates, fast approvals, and no prepayment penalties. Apply online and get a decision in minutes."
      heroImage="/card-2.webp"
      bullets={[
        "New and used vehicle financing",
        "Refinance to lower your monthly payment",
        "No application fees, no prepayment penalties",
        "Loan terms from 24 to 84 months",
      ]}
      stats={[
        { value: "2 min", label: "Application" },
        { value: "5.49%", label: "APR as low as" },
        { value: "$0", label: "Prepayment penalty" },
        { value: "84mo", label: "Longest term" },
      ]}
      features={[
        { title: "New auto loans", desc: "Finance up to 125% of the MSRP with flexible terms and competitive rates." },
        { title: "Used auto loans", desc: "Loans for vehicles up to 10 years old with rates matching new-car programs." },
        { title: "Refinancing", desc: "Lower your payment or shorten your term with no application or closing fees." },
        { title: "Pre-approval", desc: "Shop with confidence — get approved before you visit the dealer." },
      ]}
      faqs={[
        { q: "How long does approval take?", a: "Most applications get a decision within 2 minutes of submission." },
      ]}
    />
  );
}
