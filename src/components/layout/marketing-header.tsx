import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Get started free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
