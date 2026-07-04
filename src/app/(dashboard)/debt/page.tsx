"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { DebtTable } from "@/components/debt/debt-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
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
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Debt Register</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            All UX debt items for the selected project
          </p>
        </div>
        {loading ? (
          <Skeleton className="h-9 w-48" />
        ) : (
          <Select value={selectedProject} onValueChange={setSelectedProject}>
            <SelectTrigger className="w-56">
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
        )}
      </div>

      {!loading && selectedProject ? (
        <DebtTable projectId={selectedProject} />
      ) : !loading && projects.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Create a project first to start adding debt items.
        </p>
      ) : null}
    </div>
  );
}
