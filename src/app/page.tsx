import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  ChevronRight,
  CircleCheck,
  FileSpreadsheet,
  FileText,
  Gauge,
  LayoutDashboard,
  ListChecks,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const stats = [
  { value: "9", label: "Debt categories" },
  { value: "4", label: "Severity levels" },
  { value: "2", label: "Export formats" },
  { value: "Free", label: "To get started" },
];

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
    step: "01",
    title: "Create a project",
    description: "Set up a project for each product or surface you're tracking, with a custom colour to keep things organised.",
  },
  {
    step: "02",
    title: "Log UX debt",
    description: "Record issues as you find them — severity, category, description, and supporting screenshots.",
  },
  {
    step: "03",
    title: "Track & prioritise",
    description: "Watch the dashboard's health score, category breakdown, and 30-day trend to know what to fix next.",
  },
  {
    step: "04",
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

const severityBreakdown = [
  { label: "Critical", count: 2, percent: 10, color: "#ef4444" },
  { label: "High", count: 4, percent: 20, color: "#f97316" },
  { label: "Medium", count: 6, percent: 30, color: "#f59e0b" },
  { label: "Low", count: 8, percent: 40, color: "#3b82f6" },
];

export default async function LandingPage() {
  const user = await getUser();
  if (user) redirect("/dashboard");

  return (
    <div className="bg-background">
      <MarketingHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-background pb-20 pt-20 sm:pb-28 sm:pt-28">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-secondary opacity-60 blur-3xl" />
          <div className="absolute -top-20 right-0 h-[400px] w-[400px] translate-x-1/3 rounded-full bg-primary opacity-[0.08] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-1.5">
            <Sparkles className="size-3.5 shrink-0 fill-primary text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wide text-primary">
              <span className="sm:hidden">Free to start</span>
              <span className="hidden sm:inline">Free to start · No credit card needed</span>
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            Track UX debt. Fix what matters.
            <br />
            Ship better experiences.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-muted-foreground text-balance">
            UXLedger is where product and design teams log usability, accessibility,
            and content issues, prioritise them by severity, and prove the product is
            getting better over time.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/register">
                Get started free
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 border-t border-border pt-10 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-extrabold text-primary sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              What UXLedger does
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Everything you need to manage UX debt.
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:border-primary hover:shadow-md"
              >
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                  <feature.icon className="size-5 text-primary" />
                </div>
                <h3 className="mb-2 text-base font-bold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="how-it-works" className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
              How it works
            </p>
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              From messy notes to a clean register in minutes
            </h2>
          </div>
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex size-16 items-center justify-center rounded-full border-2 border-primary/20 bg-background shadow-sm">
                  <span className="text-lg font-extrabold text-primary">{s.step}</span>
                </div>
                <ChevronRight className="absolute -right-4 top-4 hidden size-8 text-border lg:block" />
                <h3 className="mb-2 text-base font-bold">{s.title}</h3>
                <p className="max-w-[220px] text-sm leading-relaxed text-muted-foreground">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="bg-secondary py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary">
                Built for product & design teams
              </p>
              <h2 className="text-3xl font-extrabold leading-snug sm:text-4xl">
                See product health.
                <br />
                Not just a spreadsheet.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Most teams track UX debt in a spreadsheet nobody opens twice. UXLedger
                turns it into a living register with severity, ownership, and a health
                score that moves as you fix things.
              </p>
              <ul className="mt-8 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-border bg-background p-8 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Product Health
                  </div>
                  <div className="text-sm text-muted-foreground">Checkout redesign</div>
                </div>
                <div className="flex size-16 items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/10">
                  <div>
                    <div className="text-center text-2xl font-extrabold text-primary">82</div>
                    <div className="text-center text-[10px] font-semibold text-primary/70">score</div>
                  </div>
                </div>
              </div>
              {severityBreakdown.map((row) => (
                <div key={row.label} className="mb-3 last:mb-0">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-bold">{row.count}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full transition-all"
                      style={{ width: `${row.percent}%`, backgroundColor: row.color }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <span className="text-xs text-muted-foreground">Avg. resolution time</span>
                <span className="text-2xl font-extrabold">
                  6.2<span className="text-base text-muted-foreground">d</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-primary-foreground sm:text-4xl">
            Start tracking your UX debt today
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            Free to get started. No credit card required.
          </p>
          <div className="mt-8">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">
                Get started free
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
