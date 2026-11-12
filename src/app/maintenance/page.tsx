import type { Metadata } from "next";
import { StatusPage } from "@/components/marketing/status-page";
import "../marketing.css";

export const metadata: Metadata = {
  title: "Down for maintenance",
  robots: { index: false, follow: false },
};

/** Served with a 503 by the middleware while MAINTENANCE_MODE=true. */
export default function MaintenancePage() {
  return (
    <StatusPage
      eyebrow="Maintenance"
      title="We're tuning the ledger."
      description="UXLedger is down for a short maintenance window. Your projects and debt items are safe. Please check back soon."
    />
  );
}
