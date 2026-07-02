"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DebtBySeverityData } from "@/types";

interface Props {
  data: DebtBySeverityData[];
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "#EF4444",
  high: "#F97316",
  medium: "#F59E0B",
  low: "#3B82F6",
};

const SEVERITY_LABELS: Record<string, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function DebtBySeverityChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    name: SEVERITY_LABELS[d.severity] ?? d.severity,
    color: SEVERITY_COLORS[d.severity] ?? "#6366F1",
  }));

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Debt by Severity</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48 text-sm text-muted-foreground">
          No data yet
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Debt by Severity</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={formatted}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="count"
            >
              {formatted.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              wrapperStyle={{ fontSize: 12 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--popover)",
                color: "var(--popover-foreground)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
