import type { Metadata } from "next";
import { ReadPage } from "@/components/marketing/frame";
import { AboutContent } from "@/components/layout/legal-content";

export const metadata: Metadata = {
  title: "About",
  description: "Why UXLedger exists and what it tracks.",
};

export default function AboutPage() {
  return (
    <ReadPage title="About UXLedger" lede="Better experience, Lower debt.">
      <AboutContent className="[&_h3]:text-xl [&_h3]:font-extrabold [&_h3]:tracking-[-0.025em] [&_h3]:mb-3 text-base" />
    </ReadPage>
  );
}
