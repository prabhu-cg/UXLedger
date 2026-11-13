"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { projectSchema, type ProjectInput } from "@/lib/validations/project";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types";

const PROJECT_COLORS = [
  "#E8B923", "#4F46E5", "#7C3AED", "#DB2777",
  "#DC2626", "#CA8A04", "#16A34A", "#0891B2",
  "#0284C7", "#475569",
];

interface ProjectFormProps {
  defaultValues?: Partial<Project>;
  onSubmit: (values: ProjectInput) => Promise<void>;
  submitLabel?: string;
}

export function ProjectForm({ defaultValues, onSubmit, submitLabel = "Save" }: ProjectFormProps) {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      description: defaultValues?.description ?? "",
      color: defaultValues?.color ?? "#E8B923",
    },
  });

  const { formState: { isSubmitting }, watch } = form;
  const selectedColor = watch("color");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project name</FormLabel>
              <FormControl>
                <Input placeholder="Mobile Banking App" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Briefly describe this project..."
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colour</FormLabel>
              <FormDescription>Used to identify this project in the UI</FormDescription>
              <FormControl>
                <div className="flex flex-wrap gap-2 mt-1">
                  {PROJECT_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="w-7 h-7 rounded-full border-2 transition-all"
                      style={{
                        backgroundColor: c,
                        borderColor: selectedColor === c ? "#000" : "transparent",
                        outline: selectedColor === c ? `2px solid ${c}` : "none",
                        outlineOffset: 2,
                      }}
                      onClick={() => field.onChange(c)}
                      aria-label={`Select colour ${c}`}
                      aria-pressed={selectedColor === c}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitLabel}
          </Button>
        </div>
      </form>
    </Form>
  );
}
