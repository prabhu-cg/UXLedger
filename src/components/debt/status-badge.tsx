import { Badge } from "@/components/ui/badge";
import { STATUS_LABELS, type DebtStatus } from "@/types";

export function StatusBadge({ status }: { status: DebtStatus }) {
  const variantMap: Record<DebtStatus, string> = {
    open: "open",
    in_progress: "in_progress",
    resolved: "resolved",
    wont_fix: "wont_fix",
    deferred: "deferred",
  };
  return (
    <Badge variant={variantMap[status] as "open" | "in_progress" | "resolved" | "wont_fix" | "deferred"}>
      {STATUS_LABELS[status]}
    </Badge>
  );
}
