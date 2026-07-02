export type DebtSeverity = "critical" | "high" | "medium" | "low";
export type DebtStatus = "open" | "in_progress" | "resolved" | "wont_fix" | "deferred";
export type DebtCategory =
  | "usability"
  | "accessibility"
  | "content"
  | "design_system"
  | "visual_design"
  | "interaction_design"
  | "technical_constraint"
  | "performance"
  | "research_finding";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface DebtItem {
  id: string;
  project_id: string;
  created_by: string;
  assigned_to: string | null;
  title: string;
  description: string | null;
  severity: DebtSeverity;
  status: DebtStatus;
  category: DebtCategory;
  due_date: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  creator?: Profile;
  assignee?: Profile;
  project?: Project;
}

export interface Attachment {
  id: string;
  debt_item_id: string;
  uploaded_by: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string;
  created_at: string;
  uploader?: Profile;
}

export interface Comment {
  id: string;
  debt_item_id: string;
  author_id: string;
  body: string;
  edited_at: string | null;
  created_at: string;
  author?: Profile;
}

export interface DashboardMetrics {
  total: number;
  open: number;
  closed: number;
  critical: number;
  avgResolutionDays: number | null;
  healthScore: number;
}

export interface DebtByCategoryData {
  category: string;
  count: number;
}

export interface DebtBySeverityData {
  severity: string;
  count: number;
}

export interface DebtTrendData {
  date: string;
  open: number;
  resolved: number;
}

export type HealthScoreColor = "green" | "amber" | "red";

export function getHealthScoreColor(score: number): HealthScoreColor {
  if (score >= 80) return "green";
  if (score >= 60) return "amber";
  return "red";
}

export function calcHealthScore(items: Pick<DebtItem, "severity" | "status">[]): number {
  const open = items.filter((i) => i.status !== "resolved" && i.status !== "wont_fix");
  const deductions = open.reduce((acc, item) => {
    if (item.severity === "critical") return acc + 10;
    if (item.severity === "high") return acc + 5;
    if (item.severity === "medium") return acc + 2;
    return acc + 1;
  }, 0);
  return Math.max(0, 100 - deductions);
}

export const SEVERITY_LABELS: Record<DebtSeverity, string> = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const STATUS_LABELS: Record<DebtStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  wont_fix: "Won't Fix",
  deferred: "Deferred",
};

export const CATEGORY_LABELS: Record<DebtCategory, string> = {
  usability: "Usability",
  accessibility: "Accessibility",
  content: "Content",
  design_system: "Design System",
  visual_design: "Visual Design",
  interaction_design: "Interaction Design",
  technical_constraint: "Technical Constraint",
  performance: "Performance",
  research_finding: "Research Finding",
};
