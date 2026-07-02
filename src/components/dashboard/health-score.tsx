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
      ring: "text-green-600 dark:text-green-400",
      bg: "bg-green-500",
      label: "Healthy",
      badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    amber: {
      ring: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-500",
      label: "Needs attention",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    red: {
      ring: "text-red-600 dark:text-red-400",
      bg: "bg-red-500",
      label: "Critical",
      badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
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
              <span className={cn("inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold", c.badge)}>
                {c.label}
              </span>
            </div>
            {itemCounts && (
              <div className="space-y-1.5">
                {[
                  { label: "Critical (×10pts)", count: itemCounts.critical, color: "bg-red-500" },
                  { label: "High (×5pts)", count: itemCounts.high, color: "bg-orange-500" },
                  { label: "Medium (×2pts)", count: itemCounts.medium, color: "bg-amber-500" },
                  { label: "Low (×1pt)", count: itemCounts.low, color: "bg-blue-500" },
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
              "[&>div]:bg-green-500": color === "green",
              "[&>div]:bg-amber-500": color === "amber",
              "[&>div]:bg-red-500": color === "red",
            })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
