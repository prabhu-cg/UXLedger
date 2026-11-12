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
  default: "bg-primary-soft text-primary-text",
  red: "bg-destructive-soft text-destructive",
  green: "bg-success-soft text-success",
  amber: "bg-warning-soft text-warning",
  indigo: "bg-info-soft text-info",
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
      <CardContent className="p-5 sm:p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-snug text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold mt-1 tabular-nums">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium mt-2",
                  trend.value >= 0 ? "text-success" : "text-destructive"
                )}
              >
                {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
              </p>
            )}
          </div>
          <div className={cn("rounded-lg p-2.5 shrink-0 ml-3", accentMap[accent])}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
