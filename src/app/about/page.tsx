import InfoPage from "@/components/InfoPage";

export const metadata = { title: "About Citizens Bank" };

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About Us"
      title="Banking you can trust for 195 years"
      description="Citizens Financial Group is one of the nation's oldest and largest financial institutions, serving millions of customers, companies, and communities across the United States."
      heroImage="/corperate2.webp"
      bullets={[
        "Founded in 1828 in Providence, Rhode Island",
        "Over 1,100 branches across 14 states",
        "Fortune 500 company — NYSE: CFG",
        "Recognized for accessibility, ESG, and community investment",
      ]}
      stats={[
        { value: "195", label: "Years of banking" },
        { value: "$240B", label: "Total assets" },
        { value: "18,000+", label: "Employees" },
        { value: "5M+", label: "Customers" },
      ]}
      features={[
        { title: "Our mission", desc: "Help every customer and community reach their potential through honest, personal banking." },
        { title: "Our values", desc: "Accountability, collaboration, integrity, and a relentless focus on the customer." },
        { title: "ESG commitment", desc: "$50B committed to green financing, diversity, and community development by 2030." },
        { title: "Newsroom", desc: "Press releases, earnings, and leadership updates — all in one place." },
      ]}
    />
  );
}
