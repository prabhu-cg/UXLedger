import type { Metadata } from "next";
import { redirect } from "next/navigation";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingDown,
  Activity,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { MetricCard } from "@/components/dashboard/metric-card";
import { HealthScore } from "@/components/dashboard/health-score";
import { DebtByCategoryChart } from "@/components/dashboard/debt-by-category-chart";
import { DebtBySeverityChart } from "@/components/dashboard/debt-by-severity-chart";
import { DebtTrendChart } from "@/components/dashboard/debt-trend-chart";
import { ProjectFilter } from "@/components/dashboard/project-filter";
import { calcHealthScore, type DebtItem, type DebtByCategoryData, type DebtBySeverityData, type DebtTrendData } from "@/types";
import { subDays, format } from "date-fns";

export const metadata: Metadata = { title: "Dashboard" };

interface Props {
  searchParams: Promise<{ project?: string }>;
}

export default async function DashboardPage({ searchParams }: Props) {
  const { project: selectedProjectId = "all" } = await searchParams;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // Projects for the filter dropdown
  const { data: projects = [] } = await supabase
    .from("projects")
    .select("id, name")
    .eq("owner_id", user.id)
    .order("name") as { data: { id: string; name: string }[] | null };

  // Fetch all debt items for this user's projects (optionally scoped to one project)
  let query = supabase
    .from("debt_items")
    .select(`
      id, severity, status, category, created_at, resolved_at,
      project:projects!inner(owner_id)
    `)
    .eq("project.owner_id", user.id);
  if (selectedProjectId !== "all") {
    query = query.eq("project_id", selectedProjectId);
  }
  const { data: items = [] } = await query as { data: (DebtItem & { project: { owner_id: string } })[] | null };

  const safeItems = items ?? [];

  // Metrics
  const total = safeItems.length;
  const open = safeItems.filter((i) => i.status === "open" || i.status === "in_progress").length;
  const closed = safeItems.filter((i) => i.status === "resolved" || i.status === "wont_fix").length;
  const critical = safeItems.filter((i) => i.severity === "critical" && i.status !== "resolved").length;

  // Avg resolution time
  const resolved = safeItems.filter((i) => i.resolved_at);
  const avgResolution =
    resolved.length > 0
      ? Math.round(
          resolved.reduce((acc, i) => {
            const created = new Date(i.created_at).getTime();
            const resolvedAt = new Date(i.resolved_at!).getTime();
            return acc + (resolvedAt - created) / (1000 * 60 * 60 * 24);
          }, 0) / resolved.length
        )
      : null;

  // Health score
  const healthScore = calcHealthScore(safeItems);
  const itemCounts = {
    critical: safeItems.filter((i) => i.severity === "critical" && i.status !== "resolved").length,
    high: safeItems.filter((i) => i.severity === "high" && i.status !== "resolved").length,
    medium: safeItems.filter((i) => i.severity === "medium" && i.status !== "resolved").length,
    low: safeItems.filter((i) => i.severity === "low" && i.status !== "resolved").length,
  };

  // Category breakdown
  const categoryMap: Record<string, number> = {};
  safeItems.forEach((i) => {
    categoryMap[i.category] = (categoryMap[i.category] ?? 0) + 1;
  });
  const categoryData: DebtByCategoryData[] = Object.entries(categoryMap)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  // Severity breakdown
  const severityMap: Record<string, number> = {};
  safeItems.forEach((i) => {
    severityMap[i.severity] = (severityMap[i.severity] ?? 0) + 1;
  });
  const severityData: DebtBySeverityData[] = Object.entries(severityMap).map(([severity, count]) => ({
    severity,
    count,
  }));

  // Trend: last 30 days
  const trendData: DebtTrendData[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, "yyyy-MM-dd");
    const openCount = safeItems.filter(
      (item) =>
        new Date(item.created_at) <= date &&
        (item.resolved_at === null || new Date(item.resolved_at) > date) &&
        item.status !== "wont_fix"
    ).length;
    const resolvedCount = safeItems.filter(
      (item) =>
        item.resolved_at !== null && format(new Date(item.resolved_at), "yyyy-MM-dd") === dateStr
    ).length;
    trendData.push({ date: dateStr, open: openCount, resolved: resolvedCount });
  }

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Overview of UX debt across all your projects
          </p>
        </div>
        <ProjectFilter projects={projects ?? []} selected={selectedProjectId} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Total Debt"
          value={total}
          icon={Activity}
          accent="indigo"
        />
        <MetricCard
          title="Open"
          value={open}
          icon={AlertTriangle}
          accent="amber"
        />
        <MetricCard
          title="Closed"
          value={closed}
          icon={CheckCircle2}
          accent="green"
        />
        <MetricCard
          title="Critical (Open)"
          value={critical}
          icon={TrendingDown}
          accent="red"
        />
        <MetricCard
          title="Avg Resolution"
          value={avgResolution !== null ? `${avgResolution}d` : "—"}
          subtitle="days to resolve"
          icon={Clock}
          accent="default"
        />
      </div>

      {/* Health score + Category chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <HealthScore score={healthScore} itemCounts={itemCounts} />
        <DebtByCategoryChart data={categoryData} />
      </div>

      {/* Severity + Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DebtBySeverityChart data={severityData} />
        <DebtTrendChart data={trendData} />
      </div>
    </div>
  );
}
