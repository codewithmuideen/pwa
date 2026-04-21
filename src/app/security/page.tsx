import InfoPage from "@/components/InfoPage";

export const metadata = { title: "Security Center | Citizens Bank" };

export default function SecurityPage() {
  return (
    <InfoPage
      eyebrow="Security Center"
      title="Your money. Protected on every front."
      description="Bank-grade encryption, 24/7 fraud monitoring, biometric authentication, and a $0 liability guarantee on unauthorized transactions."
      heroImage="/more-4.webp"
      bullets={[
        "Multi-factor authentication and biometric sign-in",
        "Real-time fraud alerts via SMS, email, and push",
        "Instant card freeze from the mobile app",
        "$0 liability for unauthorized transactions",
      ]}
      stats={[
        { value: "24/7", label: "Fraud monitoring" },
        { value: "$0", label: "Unauthorized liability" },
        { value: "AES-256", label: "Encryption at rest" },
        { value: "FIDO2", label: "Passkey support" },
      ]}
      features={[
        { title: "Account takeover protection", desc: "Device fingerprinting and behavioral analytics detect suspicious sign-ins before they succeed." },
        { title: "Card controls", desc: "Freeze, unfreeze, and set merchant or location restrictions directly from your phone." },
        { title: "Scam awareness", desc: "Weekly updates on the latest scams targeting bank customers, with clear guidance on how to respond." },
        { title: "Report fraud", desc: "Dedicated fraud hotline answered by a human in under 2 minutes, 24/7." },
      ]}
      primaryCtaLabel="Report fraud"
      primaryCtaHref="/contact"
      faqs={[
        { q: "What do I do if I see an unauthorized transaction?", a: "Freeze your card in the app immediately, then call our fraud hotline at 1-800-922-9999." },
        { q: "Is biometric sign-in safe?", a: "Yes. Biometric data never leaves your device — we only receive a cryptographic signature confirming the match." },
      ]}
    />
  );
}
