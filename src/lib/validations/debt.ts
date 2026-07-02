import { z } from "zod";

export const debtSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(200, "Title must be under 200 characters"),
  description: z.string().optional().or(z.literal("")),
  severity: z.enum(["critical", "high", "medium", "low"]),
  status: z.enum(["open", "in_progress", "resolved", "wont_fix", "deferred"]),
  category: z.enum([
    "usability",
    "accessibility",
    "content",
    "design_system",
    "visual_design",
    "interaction_design",
    "technical_constraint",
    "performance",
    "research_finding",
  ]),
  assigned_to: z.string().uuid().optional().nullable(),
  due_date: z.string().optional().nullable(),
});

export type DebtInput = z.infer<typeof debtSchema>;
