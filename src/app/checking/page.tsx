import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Checking Accounts | Citizens Bank" };

export default function CheckingPage() {
  return (
    <InfoPage
      eyebrow="Checking Accounts"
      title="Free checking that works for real life"
      description="No monthly fees, no minimum balance, and a $400 bonus when you open a new Quest® Checking account with qualifying direct deposits."
      heroImage="/card-0.webp"
      bullets={[
        "$0 monthly maintenance fees",
        "60,000+ surcharge-free ATMs nationwide",
        "Instant card freeze from the mobile app",
        "Early direct deposit — get paid up to 2 days early",
      ]}
      stats={[
        { value: "$400", label: "Welcome bonus" },
        { value: "$0", label: "Monthly fees" },
        { value: "60k+", label: "Free ATMs" },
        { value: "2 days", label: "Early deposit" },
      ]}
      features={[
        { title: "Quest® Checking", desc: "Our flagship account with relationship rates and priority customer service." },
        { title: "Student Checking", desc: "Built for ages 17–24 with no fees and financial wellness tools." },
        { title: "Second Chance Checking", desc: "For customers rebuilding — simple checking with responsible guardrails." },
        { title: "Overdraft grace", desc: "24-hour grace period to bring your balance positive with no fee." },
      ]}
      faqs={[
        { q: "What's the minimum opening deposit?", a: "Just $25 to open your first Citizens checking account." },
        { q: "Can I switch from my current bank?", a: "Yes. Our switch kit walks you through moving direct deposits and bill pay in under 10 minutes." },
      ]}
    />
  );
}
