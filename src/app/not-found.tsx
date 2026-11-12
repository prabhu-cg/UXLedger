import type { Metadata } from "next";
import Link from "next/link";
import { StatusPage } from "@/components/marketing/status-page";
import { PathHint } from "@/components/marketing/path-hint";
import { Button } from "@/components/ui/button";
import "./marketing.css";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <StatusPage
      eyebrow="Error 404"
      code="404"
      title="This page didn't make the register."
      description="It's broken, moved, or never existed. UXLedger can't log what isn't there."
      actions={
        <>
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Go to home</Link>
          </Button>
        </>
      }
      hint={<PathHint />}
    />
  );
}
