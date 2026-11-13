import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    template: "%s - UXLedger",
    default: "UXLedger — Better experience, Lower debt",
  },
  description:
    "Track, prioritise, and resolve UX debt across your products with UXLedger.",
  keywords: ["UX debt", "design debt", "UX management", "design operations"],
  openGraph: {
    type: "website",
    siteName: "UXLedger",
    title: "UXLedger — Better experience, Lower debt",
    description:
      "Log usability, accessibility and content issues, prioritise them by severity, and show the product getting better over time.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${newsreader.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark"]}
          enableSystem={false}
          storageKey="uxledger-theme"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
