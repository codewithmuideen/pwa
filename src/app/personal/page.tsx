import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Personal Banking | Citizens Bank" };

export default function PersonalPage() {
  return (
    <InfoPage
      eyebrow="Personal Banking"
      title="Banking built around your everyday life"
      description="Checking, savings, credit cards, and lending — thoughtful products that grow with you, backed by real humans when you need help."
      heroImage="/women-1.webp"
      bullets={[
        "Free everyday checking with no hidden fees",
        "Competitive savings rates with daily compounding",
        "Smart credit cards that reward your spending",
        "Loans with transparent terms and real support",
      ]}
      stats={[
        { value: "$0", label: "Monthly fees" },
        { value: "4.10%", label: "APY on savings" },
        { value: "60k+", label: "Surcharge-free ATMs" },
        { value: "24/7", label: "Customer support" },
      ]}
      features={[
        { title: "Quest® Checking", desc: "Earn a $400 bonus when you open a new Quest Checking account and set up qualifying direct deposits." },
        { title: "High-yield savings", desc: "4.10% APY on balances with no minimum balance, compounded daily." },
        { title: "Rewards credit cards", desc: "Cash Back Plus®, travel rewards, and 0% intro APR options tailored to your spending." },
        { title: "Home & auto loans", desc: "Competitive rates with transparent terms and no application fees." },
        { title: "Biometric mobile app", desc: "Face ID sign-in, instant deposits, and full account control in your pocket." },
        { title: "FDIC Insured", desc: "Your deposits are protected up to $250,000 per depositor." },
      ]}
      faqs={[
        { q: "Are there monthly fees?", a: "No. Our everyday checking has no monthly maintenance fee and no minimum balance requirement." },
        { q: "Can I open an account online?", a: "Yes. The entire account opening process takes about 5 minutes and is fully online." },
        { q: "Is my money insured?", a: "All deposits are FDIC insured up to $250,000 per depositor, per ownership category." },
      ]}
    />
  );
}
