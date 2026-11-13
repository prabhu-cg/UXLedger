import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";

/**
 * The brand panel on the auth pages (from `lg` up): a photograph of hand-drawn website wireframes
 * and a pen, the raw material UX debt is found in, under a flat charcoal scrim that keeps the white
 * text readable on every part of it.
 * The photo is atmosphere, not proof: it shows a sketchbook and no faces.
 *
 * Photo: "Website wireframe sketch on paper" by Compagnons on Unsplash
 * (https://unsplash.com/photos/website-wireframe-sketch-on-paper-4UGmm3WRUoQ),
 * free to use under the Unsplash License.
 */
export function AuthAside() {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden bg-[var(--panel-base)] p-12 lg:flex lg:w-[58%]">
      <Image
        src="/auth/panel.jpg"
        alt=""
        fill
        priority
        sizes="58vw"
        className="object-cover object-[55%_50%]"
      />
      {/* Flat charcoal scrim (no gradient, no tint) keeps the white type above 4.5:1. */}
      <div aria-hidden="true" className="absolute inset-0 bg-[var(--panel-scrim)]/75" />

      <Link
        href="/"
        className="relative w-fit rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-white/60"
      >
        <Logo variant="light" showTagline={false} />
      </Link>

      <div className="relative max-w-lg">
        <span
          className="-ml-3 block leading-none text-white/20 select-none"
          style={{ fontSize: "10rem", lineHeight: 1 }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote className="-mt-6 font-display text-[1.75rem] leading-snug text-white">
          Track what&apos;s broken, fix what matters, ship better experiences.
        </blockquote>
        <p className="mt-5 text-sm font-medium tracking-wide text-white/80">— The UXLedger philosophy</p>
      </div>

      <p className="relative text-xs text-white/70">
        © {new Date().getFullYear()} UXLedger. All rights reserved.
      </p>
    </div>
  );
}

/** The mark, name and tagline above the form. Shown on every screen size. */
export function AuthFormLogo() {
  return (
    <Link
      href="/"
      className="mb-6 flex flex-col items-center rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:mb-8"
    >
      <Logo size="lg" layout="stack" showTagline taglineClassName="text-sm" />
    </Link>
  );
}
