import type { Metadata } from "next";
import { ReadPage } from "@/components/marketing/frame";
import { TermsContent } from "@/components/layout/legal-content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms for using UXLedger.",
};

export default function TermsPage() {
  return (
    <ReadPage title="Terms of Service">
      <TermsContent className="[&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:tracking-[-0.025em] [&_h3]:mb-3 text-base" />
    </ReadPage>
  );
}
