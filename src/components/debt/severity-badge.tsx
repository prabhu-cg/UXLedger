import { Badge } from "@/components/ui/badge";
import { SEVERITY_LABELS, type DebtSeverity } from "@/types";

export function SeverityBadge({ severity }: { severity: DebtSeverity }) {
  return (
    <Badge variant={severity as "critical" | "high" | "medium" | "low"}>
      {SEVERITY_LABELS[severity]}
    </Badge>
  );
}
