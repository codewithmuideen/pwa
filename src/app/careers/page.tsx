import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Careers | Citizens Bank" };

export default function CareersPage() {
  return (
    <InfoPage
      eyebrow="Careers"
      title="Build your career at Citizens"
      description="Join 18,000+ colleagues building the future of banking. Competitive pay, industry-leading benefits, and a culture where your growth is taken seriously."
      heroImage="/women-3.webp"
      bullets={[
        "Comprehensive health, dental, and vision benefits",
        "Tuition reimbursement up to $5,250/year",
        "Generous 401(k) with 6% employer match",
        "Hybrid and remote roles across every function",
      ]}
      stats={[
        { value: "18,000+", label: "Colleagues" },
        { value: "$5,250", label: "Tuition benefit" },
        { value: "6%", label: "401(k) match" },
        { value: "14 states", label: "Locations" },
      ]}
      features={[
        { title: "Technology & engineering", desc: "Build the platforms that power banking for 5M+ customers — from mobile to mainframe." },
        { title: "Retail & branch banking", desc: "Be the face of Citizens in your community with clear career progression." },
        { title: "Corporate & commercial", desc: "Advise middle-market and enterprise clients on capital, treasury, and M&A." },
        { title: "Wealth & advisory", desc: "Help high-net-worth clients build and protect intergenerational wealth." },
        { title: "Leadership programs", desc: "Accelerated development tracks for emerging leaders across the bank." },
        { title: "Internships", desc: "Summer analyst programs in 20+ disciplines for rising undergraduate and graduate students." },
      ]}
      primaryCtaLabel="Browse open roles"
      primaryCtaHref="/careers"
    />
  );
}
