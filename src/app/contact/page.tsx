import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Contact Us | Citizens Bank" };

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact Us"
      title="Real humans, ready to help 24/7"
      description="Call, chat, or schedule an in-person appointment at a branch near you. Average wait time is under 2 minutes, any time of day."
      heroImage="/advisor-0.webp"
      bullets={[
        "Personal banking: 1-800-922-9999",
        "Business banking: 1-800-600-0008",
        "Fraud & security: 1-800-922-9999 (24/7)",
        "Schedule a branch appointment online",
      ]}
      stats={[
        { value: "<2 min", label: "Avg. hold time" },
        { value: "24/7", label: "Fraud support" },
        { value: "1,100+", label: "Branches" },
        { value: "60k+", label: "ATMs" },
      ]}
      features={[
        { title: "Phone support", desc: "Speak with a US-based specialist about your account, loans, or cards." },
        { title: "Live chat", desc: "In-app and web chat answered in under 60 seconds, 7am–11pm ET daily." },
        { title: "Schedule in-branch", desc: "Book a private appointment with a banker, advisor, or lending specialist." },
        { title: "Accessibility support", desc: "TTY/TDD, large-print statements, and ASL video relay available on request." },
      ]}
      primaryCtaLabel="Call 1-800-922-9999"
      primaryCtaHref="tel:1-800-922-9999"
      secondaryCtaLabel="Book a branch visit"
      secondaryCtaHref="/contact"
    />
  );
}
