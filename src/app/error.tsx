"use client";

import { useEffect } from "react";
import { StatusPage } from "@/components/marketing/status-page";
import { Button } from "@/components/ui/button";
import "./marketing.css";

/** Route-level 500. Never renders raw error text; the digest goes to the console only. */
export default function RootError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[ui] route error", error.digest ?? "");
  }, [error]);

  return (
    <StatusPage
      eyebrow="Error 500"
      code="500"
      title="Something broke on our side."
      description="We couldn't load this page. Try again, and if it keeps happening come back in a few minutes."
      actions={
        <>
          <Button onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="outline">
            <a href="/">Back to home</a>
          </Button>
        </>
      }
    />
  );
}
