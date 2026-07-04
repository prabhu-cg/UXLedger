import type { Metadata } from "next";

export const metadata: Metadata = { title: "Debt Register" };

export default function DebtLayout({ children }: { children: React.ReactNode }) {
  return children;
}
