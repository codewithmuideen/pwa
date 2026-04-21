import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Learning Center | Citizens Bank" };

export default function LearningCenterPage() {
  return (
    <InfoPage
      eyebrow="Learning Center"
      title="Money lessons that actually help"
      description="Budgeting, saving, investing, and home buying — plain-language guides and calculators that take the mystery out of your money."
      heroImage="/student-2.webp"
      bullets={[
        "Step-by-step guides for every life stage",
        "Financial calculators for mortgages, savings, and retirement",
        "Video explainers on credit, investing, and taxes",
        "Weekly newsletter with expert tips",
      ]}
      features={[
        { title: "Budgeting basics", desc: "Build a budget that actually sticks — including zero-based and 50/30/20 methods." },
        { title: "Credit score", desc: "What makes up your score and how to improve it in 30, 60, and 90 days." },
        { title: "First-time homebuyer", desc: "From pre-approval to closing: a complete walkthrough of buying your first home." },
        { title: "Retirement planning", desc: "401(k), IRA, and Roth basics — and how to decide between them." },
        { title: "Mortgage calculator", desc: "See monthly payments including PMI, taxes, and insurance before you apply." },
        { title: "Savings calculator", desc: "Project how much your savings will grow at different rates and contribution levels." },
      ]}
      primaryCtaLabel="Browse guides"
      primaryCtaHref="/learning-center"
    />
  );
}
