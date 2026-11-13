import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** 20px pill, 12px medium. Severity and status map onto the shared status pairs. */
const badgeVariants = cva(
  "inline-flex h-5 items-center gap-1 rounded-full px-2 text-xs font-semibold whitespace-nowrap focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-primary-soft text-primary-text",
        secondary: "bg-muted text-muted-foreground",
        destructive: "bg-destructive-soft text-destructive",
        outline: "border border-border-strong bg-background text-foreground",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning",
        info: "bg-info-soft text-info",
        // Severity
        critical: "bg-destructive-soft text-destructive",
        high: "bg-primary-soft text-primary-text",
        medium: "bg-warning-soft text-warning",
        low: "bg-info-soft text-info",
        // Status
        open: "border border-border bg-muted text-muted-foreground",
        in_progress: "bg-info-soft text-info",
        resolved: "bg-success-soft text-success",
        wont_fix: "border border-border-strong bg-background text-muted-foreground",
        deferred: "bg-warning-soft text-warning",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
