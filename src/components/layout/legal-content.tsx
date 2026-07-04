export function AboutContent() {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
      <p>
        UXLedger exists because UX debt usually lives in the worst possible
        place: a spreadsheet nobody opens twice, a Slack thread that gets
        buried, or a designer&apos;s memory. It gets found, then forgotten,
        then rediscovered by a customer months later.
      </p>
      <p>
        We built UXLedger to give usability, accessibility, and content
        issues the same rigor engineering teams give bugs — a register, a
        severity, an owner, and a status that moves. Every project gets a
        health score so you can see, at a glance, whether the experience is
        getting better or worse.
      </p>
      <p>
        UXLedger is a small, focused tool: log debt, prioritise it, track it
        on a dashboard, and export it when you need to make the case to the
        rest of the team.
      </p>
    </div>
  );
}

export function PrivacyContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
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

export function TermsContent() {
  return (
    <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
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
