import { type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accent?: "default" | "red" | "green" | "amber" | "indigo";
}

const accentMap = {
  default: "bg-primary/10 text-primary",
  red: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  green: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  amber: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accent = "default",
}: MetricCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <p className="text-3xl font-bold mt-1 tabular-nums">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium mt-2",
                  trend.value >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
              </p>
            )}
          </div>
          <div className={cn("rounded-xl p-2.5 shrink-0 ml-4", accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
