"use client";

import { PageHeader } from "@/components/layout/page-header";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DebtTable } from "@/components/debt/debt-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { isSampleProject } from "@/lib/sample-projects";
import type { Project } from "@/types";

export default function DebtPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", user.id)
        .order("name");
      const list = (data as Project[]) ?? [];
      setProjects(list);
      if (list.length > 0) setSelectedProject(list[0].id);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <PageHeader
        className="mb-6"
        title="Debt Register"
        description="All UX debt items for the selected project"
        actions={
        loading ? (
          <Skeleton className="h-9 w-48" />
        ) : (
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Select project" />
            </SelectTrigger>
            <SelectContent>
              {projects.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full shrink-0 inline-block" style={{ backgroundColor: p.color }} />
                    {p.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
        }
      />

      {!loading && selectedProject ? (
        <DebtTable
          projectId={selectedProject}
          readOnly={isSampleProject(
            projects.find((p) => p.id === selectedProject)?.name ?? ""
          )}
        />
      ) : !loading && projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Create a project first to start adding debt items.
        </p>
      ) : null}
    </div>
  );
}
