import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Community | Citizens Bank" };

export default function CommunityPage() {
  return (
    <InfoPage
      eyebrow="Community Impact"
      title="Banking that invests in the places we serve"
      description="Over $50 billion committed to affordable housing, small business lending, and community development in the neighborhoods we call home."
      heroImage="/women-4.webp"
      bullets={[
        "Affordable housing and first-time homebuyer programs",
        "Small business grants and BIPOC founder support",
        "Financial education and youth banking curriculum",
        "Employee volunteer matching — 200,000+ hours annually",
      ]}
      stats={[
        { value: "$50B", label: "Community commitment" },
        { value: "200k+", label: "Volunteer hours/yr" },
        { value: "$25M", label: "Annual grants" },
        { value: "14 states", label: "Of impact" },
      ]}
      features={[
        { title: "Citizens Helping Citizens", desc: "Employee volunteer network that mobilizes 200k+ hours per year in local communities." },
        { title: "Small business grants", desc: "Partner with local chambers to award $5k–$50k grants to women- and minority-owned businesses." },
        { title: "Financial education", desc: "Free money-management curriculum in partnership with over 1,200 public schools." },
        { title: "Community Reinvestment Act", desc: "CRA-qualifying investments in affordable housing, small business, and community services." },
      ]}
    />
  );
}
