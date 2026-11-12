import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
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
      <body className={`${manrope.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
