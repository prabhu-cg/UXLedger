import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";
import "../marketing.css";

/** Public pages share the header, footer and the `.marketing` palette. */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="marketing min-h-svh">
      <MarketingHeader />
      <main id="main-content">{children}</main>
      <MarketingFooter />
    </div>
  );
}
