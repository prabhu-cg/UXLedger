import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  FileText,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AppWindow, PreviewFigure } from "@/components/marketing/app-window";
import { FRAME, Lede, Section, SectionHeading } from "@/components/marketing/frame";
import { LaptopMockup } from "@/components/marketing/laptop-mockup";
import { PointerHighlight } from "@/components/marketing/pointer-highlight";
import "./marketing.css";
import { MarketingHeader } from "@/components/layout/marketing-header";
import { MarketingFooter } from "@/components/layout/marketing-footer";

async function getUser() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return null;
  }
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

const features = [
  {
    icon: ListChecks,
    title: "Full debt register",
    description:
      "Log every UX debt item with severity, status, category, and owner. Filter, sort, and search across every project.",
  },
  {
    icon: FileText,
    title: "Rich descriptions",
    description:
      "Capture context with a full rich-text editor so nothing gets lost between the person who found it and the person who fixes it.",
  },
  {
    icon: Paperclip,
    title: "Attachments & comments",
    description:
      "Attach screenshots and files up to 10MB, then discuss and resolve issues right on the debt item with threaded comments.",
  },
  {
    icon: Gauge,
    title: "Product health score",
    description:
      "A single 0–100 score, colour-coded by severity mix, so you can see product health at a glance and track it over time.",
  },
  {
    icon: LayoutDashboard,
    title: "Visual dashboards",
    description:
      "Debt by category, debt by severity, and a 30-day trend line — the whole picture without opening a spreadsheet.",
  },
  {
    icon: FileSpreadsheet,
    title: "Reports & export",
    description:
      "Filter by project and export clean CSV or Excel reports for stakeholders, reviews, and roadmap planning.",
  },
];

const steps = [
  {
    title: "Create a project",
    description: "Set up a project for each product or surface you're tracking, with a custom colour to keep things organised.",
  },
  {
    title: "Log UX debt",
    description: "Record issues as you find them — severity, category, description, and supporting screenshots.",
  },
  {
    title: "Track & prioritise",
    description: "Watch the dashboard's health score, category breakdown, and 30-day trend to know what to fix next.",
  },
  {
    title: "Export & report",
    description: "Pull a CSV or Excel report whenever you need to share progress with your team or stakeholders.",
  },
];

const checklist = [
  "Severity-weighted health score that moves as you fix things",
  "Full audit trail — comments and status history on every item",
  "File attachments up to 10MB per debt item",
  "CSV and Excel export for stakeholder reviews",
  "Row-level security — your projects are isolated to your account",
];

const faqs = [
  {
    q: "Is UXLedger free?",
    a: "Yes. You can sign up and start tracking UX debt for free, and no credit card is needed.",
  },
  {
    q: "How is the health score calculated?",
    a: "A project starts at 100. Every item that is still open, in progress or deferred deducts points by severity: 10 for critical, 5 for high, 2 for medium and 1 for low. Resolved and won't-fix items no longer count, and the score never goes below 0.",
  },
  {
    q: "What can I attach to a debt item?",
    a: "Screenshots and files up to 10MB per item, plus threaded comments, so the context stays with the issue.",
  },
  {
    q: "Who can see my projects?",
    a: "Only you. Row-level security keeps every project isolated to your account.",
  },
  {
    q: "What can I export?",
    a: "Your debt register as a CSV or Excel report, filtered by project, ready for stakeholder reviews and roadmap planning.",
  },
];

const register = [
  { title: "Checkout error copy blames the user", severity: "critical", label: "Critical", status: "in_progress", statusLabel: "In progress" },
  { title: "Icon-only buttons have no accessible name", severity: "high", label: "High", status: "open", statusLabel: "Open" },
  { title: "Date picker ignores keyboard input", severity: "medium", label: "Medium", status: "open", statusLabel: "Open" },
  { title: "Inconsistent empty-state wording", severity: "low", label: "Low", status: "resolved", statusLabel: "Resolved" },
] as const;

export default async function LandingPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");

  return (
    <div className="marketing min-h-svh">
      <MarketingHeader />

      <main>
        {/* Hero */}
        <section className="hero-aura overflow-hidden">
          <div className={`${FRAME} pt-20 pb-20 text-center sm:pt-28 sm:pb-28`}>
            <div className="rise mx-auto max-w-4xl">
              <h1 className="text-[clamp(2.5rem,6.2vw,4.75rem)] leading-[1.04] font-extrabold tracking-[-0.04em]">
                Track UX debt. Fix what
                <PointerHighlight>matters</PointerHighlight>
              </h1>
              <Lede className="mx-auto mt-8 text-[1.125rem] sm:text-[1.25rem]">
                UXLedger is where product and design teams log usability, accessibility, and content issues,
                prioritise them by severity, and show the product getting better over time.
              </Lede>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
                <Button asChild className="h-12 rounded-full px-8 text-base font-bold">
                  <Link href="/register">
                    Get started free
                    <ArrowRight />
                  </Link>
                </Button>
                <Link
                  href="/login"
                  className="text-[15px] font-semibold text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  Sign in
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Free to start. No credit card needed.</p>
            </div>

            <div className="rise rise-delay mt-16">
              <LaptopMockup
                src="/marketing/app-dashboard.jpg"
                darkSrc="/marketing/app-dashboard-dark.jpg"
                alt="The UXLedger dashboard: debt totals, a product health score, and charts by category, severity and trend."
              />
              <p className="mt-8 text-sm text-muted-foreground">
                The dashboard in the real app, shown with sample data.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <Section id="features" tone="sand" labelledBy="features-title">
          <SectionHeading id="features-title" className="max-w-[18ch]">
            Everything you need to manage UX debt.
          </SectionHeading>
          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article key={feature.title} className="border-t border-border-strong pt-6">
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
                    <feature.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="text-xl font-extrabold tracking-[-0.025em]">{feature.title}</h3>
                </div>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-muted-foreground">{feature.description}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Workflow */}
        <Section id="how-it-works" labelledBy="how-title">
          <SectionHeading id="how-title" className="max-w-[20ch]">
            From messy notes to a clean register in minutes.
          </SectionHeading>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.title} className="relative border-t-2 border-primary pt-8">
                <span aria-hidden className="absolute -top-[7px] left-0 size-3 rounded-full bg-primary" />
                <h3 className="text-xl font-extrabold tracking-[-0.025em]">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* Differentiation */}
        <Section tone="sand" labelledBy="why-title">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <SectionHeading id="why-title">See product health. Not just a spreadsheet.</SectionHeading>
              <Lede className="mt-6">
                Most teams track UX debt in a spreadsheet nobody opens twice. UXLedger turns it into a living
                register with severity, ownership, and a health score that moves as you fix things.
              </Lede>
              <ul className="mt-8 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 size-4 shrink-0 text-primary-text" aria-hidden />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <PreviewFigure caption="The debt register, filtered and sorted. Sample data, not a real project.">
                <AppWindow title="Debt register · Checkout redesign">
                  <ul className="divide-y divide-border">
                    {register.map((row) => (
                      <li key={row.title} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold">{row.title}</span>
                        <Badge variant={row.severity}>{row.label}</Badge>
                        <Badge variant={row.status} className="hidden sm:inline-flex">
                          {row.statusLabel}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </AppWindow>
              </PreviewFigure>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section id="faq" labelledBy="faq-title">
          <div className="grid gap-12 lg:grid-cols-12">
            <SectionHeading id="faq-title" className="lg:col-span-4">
              Questions, answered.
            </SectionHeading>
            <div className="faq lg:col-span-8">
              {faqs.map((item) => (
                <details key={item.q} className="group border-t border-border-strong last:border-b">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50">
                    {item.q}
                    <span
                      aria-hidden
                      className="faq-icon flex size-8 shrink-0 items-center justify-center rounded-full border border-border-strong text-xl leading-none transition-transform duration-200"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-[62ch] pb-6 leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* Final CTA */}
        <section className="on-primary bg-primary text-primary-foreground" aria-labelledby="cta-title">
          <div className={`${FRAME} py-20 text-center sm:py-24`}>
            <h2
              id="cta-title"
              className="mx-auto max-w-[20ch] text-[clamp(2rem,4.6vw,3.25rem)] leading-[1.05] font-extrabold tracking-[-0.03em]"
            >
              Start tracking your UX debt today
            </h2>
            <p className="mx-auto mt-5 max-w-[48ch] text-lg text-primary-foreground/90">
              Free to get started. No credit card required.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild className="h-11 bg-white px-6 font-bold text-[var(--terracotta)] hover:bg-white/90">
                <Link href="/register">
                  Get started free
                  <ArrowRight />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                className="h-11 border-white/70 px-6 font-bold text-primary-foreground hover:bg-white/10"
              >
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
