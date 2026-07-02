import { z } from "zod";

export const projectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be under 100 characters"),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional()
    .or(z.literal("")),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex colour"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
