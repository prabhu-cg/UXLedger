import { cn } from "@/lib/utils";

export function AboutContent({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 text-sm leading-relaxed text-muted-foreground", className)}>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Why UXLedger Exists</h3>
        <p>
          UX debt usually lives in the worst possible place: a spreadsheet
          nobody opens twice, a Slack thread that gets buried, or a
          designer&apos;s memory. It gets found, then forgotten, then
          rediscovered by a customer months later — after it&apos;s already
          cost you trust.
        </p>
        <p className="mt-3">
          UXLedger gives usability, accessibility, and content issues the
          same rigor engineering teams give bugs: a register, a severity, an
          owner, and a status that moves. Every project gets a health score
          so you can see, at a glance, whether the experience is getting
          better or worse.
        </p>
      </section>

      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">What It Tracks</h3>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <span className="font-medium text-foreground">9 debt categories</span> — usability,
            accessibility, content, design system, visual design, interaction
            design, technical constraint, performance, and research findings.
          </li>
          <li>
            <span className="font-medium text-foreground">4 severity levels</span> — critical,
            high, medium, and low, each weighted differently in the health score.
          </li>
          <li>
            <span className="font-medium text-foreground">5 statuses</span> — open, in progress,
            resolved, won&apos;t fix, and deferred, so nothing sits unaccounted for.
          </li>
          <li>
            <span className="font-medium text-foreground">Health score</span> — a weighted
            composite across open, unresolved items that moves as you fix things.
          </li>
          <li>
            <span className="font-medium text-foreground">CSV &amp; Excel export</span> — for
            stakeholder reviews and reporting outside the app.
          </li>
        </ul>
      </section>

      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Tech Stack</h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Frontend</p>
            <p className="text-foreground">Next.js (App Router, Turbopack)</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Styling</p>
            <p className="text-foreground">Tailwind CSS</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Language</p>
            <p className="text-foreground">TypeScript</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Backend</p>
            <p className="text-foreground">Supabase (Postgres, Auth, Storage)</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Forms &amp; Validation</p>
            <p className="text-foreground">React Hook Form + Zod</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Tables &amp; Charts</p>
            <p className="text-foreground">TanStack Table + Recharts</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Rich Text</p>
            <p className="text-foreground">Tiptap</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground/70">Hosting</p>
            <p className="text-foreground">Vercel (Fluid Compute)</p>
          </div>
        </div>
      </section>

      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Who built UXLedger, and why</h3>
        <p>
          UXLedger was built by me, Prabhu Raja, a senior designer with 15+ years of
          experience across four industries. I work on enterprise products, design
          systems and digital experiences, with a simple aim: designing clarity from
          complexity.
        </p>
        <p className="mt-3">
          I built it because my process ends with measuring the result, and UX debt
          rarely gets measured. The four steps are to understand the problem, simplify
          it, systemise the solution and measure what changed. UXLedger applies that
          same discipline to UX findings, giving them the structure engineering teams
          already give to bugs.
        </p>
        <p className="mt-3">
          It is an independent project. I scoped, designed and built it myself, with
          AI in the loop, as part of how I now take products from idea to shipped.
          You can see more of my work at{" "}
          <a
            href="https://prabhuraja.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-4 hover:no-underline"
          >
            prabhuraja.vercel.app
          </a>
          .
        </p>
        <p className="mt-3">
          Feedback, feature requests, or just want to say hello:{" "}
          <a href="mailto:prabhu_cg@proton.me" className="font-medium text-foreground underline underline-offset-4 hover:no-underline">
            prabhu_cg@proton.me
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export function PrivacyContent({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6 text-sm leading-relaxed text-muted-foreground", className)}>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">What we collect</h3>
        <p>
          UXLedger collects the account information you provide at sign-up
          (name, email, password) and the project and debt-item data you
          create while using the product — including any screenshots or
          files you attach.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">How we use it</h3>
        <p>
          Your data is used solely to operate UXLedger: authenticating you,
          storing your projects and debt register, generating your dashboard
          and reports, and sending account-related emails (password resets,
          for example). We do not sell your data.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Storage & security</h3>
        <p>
          Data is stored in Supabase (PostgreSQL and object storage) with
          Row-Level Security enabled, so your projects and debt items are
          only ever accessible to your account. Passwords are managed by
          Supabase Auth and are never stored in plain text.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Your choices</h3>
        <p>
          You can edit or delete your projects and debt items at any time
          from within the app. To request a full export or deletion of your
          account data, contact us using the details below.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Contact</h3>
        <p>
          Questions about this policy can be sent to the address listed on
          your UXLedger account&apos;s support channel.
        </p>
      </section>
    </div>
  );
}

export function TermsContent({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6 text-sm leading-relaxed text-muted-foreground", className)}>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Using UXLedger</h3>
        <p>
          By creating an account, you agree to use UXLedger to track,
          prioritise, and resolve UX debt for your own products, and not to
          misuse the service — including attempting to access another
          account&apos;s projects or data.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Your content</h3>
        <p>
          You retain ownership of everything you create in UXLedger —
          projects, debt items, descriptions, comments, and attachments.
          You&apos;re responsible for the content you upload and for having
          the right to share it.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Availability</h3>
        <p>
          UXLedger is provided on an &ldquo;as is&rdquo; basis. We aim for
          high availability but don&apos;t guarantee the service will be
          uninterrupted or error-free.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Termination</h3>
        <p>
          You can delete your account at any time. We may suspend accounts
          that violate these terms or attempt to compromise the security of
          the service.
        </p>
      </section>
      <section>
        <h3 className="mb-1.5 text-sm font-bold text-foreground">Changes</h3>
        <p>
          We may update these terms as UXLedger evolves. Continued use of the
          product after a change means you accept the updated terms.
        </p>
      </section>
    </div>
  );
}
