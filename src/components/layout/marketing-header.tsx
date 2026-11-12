"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { FRAME } from "@/components/marketing/frame";
import { Logo } from "@/components/layout/logo";
import { ThemeMenu } from "@/components/layout/theme-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export function MarketingHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/92 backdrop-blur-md">
      <div className={cn(FRAME, "flex h-16 items-center justify-between gap-4")}>
        <Link href="/" aria-label="UXLedger home" className="rounded-md">
          <Logo size="sm" showTagline={false} />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-[15px] font-semibold text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeMenu />
          <Button asChild variant="ghost" className="font-semibold">
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild className="font-semibold">
            <Link href="/register">Start free</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeMenu />
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Primary" className="border-t border-border bg-background md:hidden">
          <ul className={cn(FRAME, "flex flex-col py-3")}>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-1 py-3 text-lg font-semibold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-4">
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="lg">
                <Link href="/register">Start free</Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
