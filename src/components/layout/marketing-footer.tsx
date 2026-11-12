import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { FRAME } from "@/components/marketing/frame";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/#features", label: "Features" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Company",
    links: [{ href: "/about", label: "About" }],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/register", label: "Create an account" },
    ],
  },
];

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className={`${FRAME} py-14`}>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link href="/" aria-label="UXLedger home" className="inline-block rounded-md">
              <Logo size="md" showTagline={false} />
            </Link>
            <p className="mt-4 max-w-xs text-[15px] text-muted-foreground">
              Better experience, Lower debt. A register for the UX debt your team already knows about.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {COLUMNS.map((column) => (
              <div key={column.title}>
                <h2 className="text-sm font-bold">{column.title}</h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[15px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <p className="mt-14 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} UXLedger. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
