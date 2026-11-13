"use client";

import { useEffect } from "react";
import { DM_Sans, Newsreader } from "next/font/google";
import { StatusPage } from "@/components/marketing/status-page";
import { Button } from "@/components/ui/button";
import "./globals.css";
import "./marketing.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const newsreader = Newsreader({ subsets: ["latin"], weight: "500", variable: "--font-newsreader", display: "swap" });

/** Last resort: the root layout itself failed, so this page supplies its own <html> and <body>. */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[ui] global error", error.digest ?? "");
  }, [error]);

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${newsreader.variable} font-sans`}>
        <StatusPage
          eyebrow="Error 500"
      code="500"
          title="Something broke on our side."
          description="The app hit an unexpected error. Try again, and if it keeps happening come back in a few minutes."
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
      </body>
    </html>
  );
}
