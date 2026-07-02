"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_LABELS, type DebtByCategoryData } from "@/types";

interface Props {
  data: DebtByCategoryData[];
}

export function DebtByCategoryChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    name: CATEGORY_LABELS[d.category as keyof typeof CATEGORY_LABELS] ?? d.category,
  }));

  if (!data.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">Debt by Category</CardTitle>
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
        <CardTitle className="text-sm font-medium text-muted-foreground">Debt by Category</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={formatted} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-35}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              wrapperStyle={{ fontSize: 12 }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid var(--border)",
                background: "var(--popover)",
                color: "var(--popover-foreground)",
              }}
            />
            <Bar dataKey="count" name="Items" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
