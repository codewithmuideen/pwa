import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Credit Cards | Citizens Bank" };

export default function CreditCardsPage() {
  return (
    <InfoPage
      eyebrow="Credit Cards"
      title="Rewards-rich cards for every lifestyle"
      description="From everyday cash back to travel rewards and 0% intro APR — Citizens credit cards reward the way you actually spend."
      heroImage="/card-1.webp"
      bullets={[
        "Up to 2% cash back on every purchase",
        "Premium travel rewards with lounge access",
        "0% intro APR for 15 months on balance transfers",
        "No foreign transaction fees on travel cards",
      ]}
      stats={[
        { value: "2%", label: "Cash back" },
        { value: "15mo", label: "0% intro APR" },
        { value: "$0", label: "Annual fee options" },
        { value: "5x", label: "Points on travel" },
      ]}
      features={[
        { title: "Cash Back Plus®", desc: "Unlimited 2% cash back on every purchase, every day — no categories to track." },
        { title: "Travel Rewards Elite", desc: "5x points on travel, Priority Pass lounge access, and annual travel credit." },
        { title: "Balance Transfer", desc: "0% intro APR for 15 months on transferred balances with $0 transfer fees." },
        { title: "Student Rewards", desc: "Build credit responsibly with 1% cash back and credit education tools." },
      ]}
      faqs={[
        { q: "Can I see if I'll qualify without hurting my credit?", a: "Yes. Our pre-approval tool uses a soft credit check that won't affect your score." },
      ]}
    />
  );
}
