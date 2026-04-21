import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Privacy & Legal | Citizens Bank" };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy & Legal"
      title="Your data, your choices"
      description="We collect only what we need to serve you, never sell your information, and give you clear controls over how your data is used."
      heroImage="/more-6.webp"
      bullets={[
        "We never sell your personal information",
        "Clear choices on marketing and data sharing",
        "GLBA, CCPA, and state privacy law compliance",
        "Right to access, delete, and correct your data",
      ]}
      features={[
        { title: "Privacy Policy", desc: "Our complete policy covering what we collect, how we use it, and who we share it with." },
        { title: "Online Privacy Notice", desc: "Cookie preferences, analytics choices, and online tracking controls." },
        { title: "California Privacy Notice", desc: "Your rights under the California Consumer Privacy Act (CCPA)." },
        { title: "Do Not Sell My Info", desc: "We don't sell data, but you can formally opt out of all marketing sharing here." },
        { title: "Terms of Use", desc: "The terms that govern your use of Citizens websites and digital services." },
        { title: "Accessibility", desc: "Our commitment to WCAG 2.2 AA compliance across every digital surface." },
      ]}
      primaryCtaLabel="Manage preferences"
      primaryCtaHref="/privacy"
    />
  );
}
