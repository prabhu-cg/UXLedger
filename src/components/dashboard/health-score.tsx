"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getHealthScoreColor } from "@/types";

interface HealthScoreProps {
  score: number;
  itemCounts?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export function HealthScore({ score, itemCounts }: HealthScoreProps) {
  const color = getHealthScoreColor(score);

  const colorMap = {
    green: {
      ring: "text-success",
      bg: "bg-success",
      label: "Healthy",
      badge: "bg-success-soft text-success",
    },
    amber: {
      ring: "text-warning",
      bg: "bg-warning",
      label: "Needs attention",
      badge: "bg-warning-soft text-warning",
    },
    red: {
      ring: "text-destructive",
      bg: "bg-destructive",
      label: "Critical",
      badge: "bg-destructive-soft text-destructive",
    },
  };

  const c = colorMap[color];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Product Health Score
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center gap-6">
          {/* Score circle */}
          <div className="relative flex-shrink-0">
            <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
              <circle cx="48" cy="48" r="40" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/30" />
              <circle
                cx="48"
                cy="48"
                r="40"
                fill="none"
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 40}`}
                strokeDashoffset={`${2 * Math.PI * 40 * (1 - score / 100)}`}
                strokeLinecap="round"
                className={cn("transition-all duration-700", c.ring)}
                stroke="currentColor"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("text-2xl font-bold tabular-nums", c.ring)}>{score}</span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", c.badge)}>
                {c.label}
              </span>
            </div>
            {itemCounts && (
              <div className="space-y-1.5">
                {[
                  { label: "Critical (×10pts)", count: itemCounts.critical, color: "bg-destructive" },
                  { label: "High (×5pts)", count: itemCounts.high, color: "bg-primary" },
                  { label: "Medium (×2pts)", count: itemCounts.medium, color: "bg-warning" },
                  { label: "Low (×1pt)", count: itemCounts.low, color: "bg-info" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs">
                    <div className={cn("w-2 h-2 rounded-full shrink-0", item.color)} />
                    <span className="text-muted-foreground flex-1">{item.label}</span>
                    <span className="font-semibold tabular-nums">{item.count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <Progress
            value={score}
            className={cn("[&>div]:transition-all [&>div]:duration-700", {
              "[&>div]:bg-success": color === "green",
              "[&>div]:bg-warning": color === "amber",
              "[&>div]:bg-destructive": color === "red",
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
