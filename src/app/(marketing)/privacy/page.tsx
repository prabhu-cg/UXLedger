import type { Metadata } from "next";
import { ReadPage } from "@/components/marketing/frame";
import { PrivacyContent } from "@/components/layout/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What UXLedger collects, how it is stored, and your choices.",
};

export default function PrivacyPage() {
  return (
    <ReadPage title="Privacy Policy">
      <PrivacyContent className="[&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:tracking-[-0.025em] [&_h3]:mb-3 text-base" />
    </ReadPage>
  );
}
