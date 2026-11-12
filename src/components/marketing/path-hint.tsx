"use client";

import { usePathname } from "next/navigation";

/** "Looking for /x?" line on the 404 page, built from the address the visitor actually asked for. */
export function PathHint() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  return (
    <>
      Looking for{" "}
      <code className="rounded bg-primary-soft px-1.5 py-0.5 font-mono break-all text-primary-text">
        {pathname.length > 48 ? `${pathname.slice(0, 47)}…` : pathname}
      </code>
      ? It&apos;s not in this ledger.
    </>
  );
}
