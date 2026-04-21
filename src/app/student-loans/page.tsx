import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Student Loans | Citizens Bank" };

export default function StudentLoansPage() {
  return (
    <InfoPage
      eyebrow="Student Loans"
      title="Invest in your future without overextending"
      description="Undergraduate, graduate, and refinance loans with competitive rates, flexible repayment, and support from a dedicated student loan specialist."
      heroImage="/student-0.webp"
      bullets={[
        "Undergraduate and graduate school loans",
        "Refinance existing student debt to save",
        "Multi-year approval — one application covers four years",
        "0.25% rate reduction with auto-pay",
      ]}
      stats={[
        { value: "4.49%", label: "APR as low as" },
        { value: "0.25%", label: "Auto-pay discount" },
        { value: "15yr", label: "Repayment terms" },
        { value: "$0", label: "Application fees" },
      ]}
      features={[
        { title: "Undergraduate loans", desc: "Cover tuition, housing, books, and more with fixed or variable rates." },
        { title: "Graduate loans", desc: "Specialized loans for MBA, medical, law, and doctoral programs." },
        { title: "Parent loans", desc: "Help your student with a loan in your name and flexible terms." },
        { title: "Student loan refinance", desc: "Consolidate and lower the rate on federal and private loans you already have." },
      ]}
      faqs={[
        { q: "Do I need a cosigner?", a: "It depends on your credit and income. Many students qualify on their own; a cosigner may secure a lower rate." },
        { q: "Can I release my cosigner later?", a: "Yes. After 36 consecutive on-time payments and meeting credit requirements, you can request cosigner release." },
      ]}
    />
  );
}
