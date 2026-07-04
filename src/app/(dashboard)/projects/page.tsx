"use client";

import { useState, useEffect } from "react";
import { Plus, FolderOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectForm } from "@/components/projects/project-form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useProjectStore } from "@/stores/project-store";
import type { Project } from "@/types";
import type { ProjectInput } from "@/lib/validations/project";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [debtCounts, setDebtCounts] = useState<Record<string, number>>({});
  const { projects, setProjects, addProject, updateProject, removeProject } = useProjectStore();
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (data) {
        setProjects(data as Project[]);

        // Fetch debt counts
        const { data: counts } = await supabase
          .from("debt_items")
          .select("project_id")
          .in("project_id", data.map((p) => p.id));

        if (counts) {
          const map: Record<string, number> = {};
          counts.forEach((c) => {
            map[c.project_id] = (map[c.project_id] ?? 0) + 1;
          });
          setDebtCounts(map);
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleCreate(values: ProjectInput) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("projects")
      .insert({ ...values, owner_id: user.id })
      .select()
      .single<Project>();

    if (error || !data) {
      toast({ variant: "destructive", title: "Error", description: error?.message });
      return;
    }
    addProject(data);
    setCreateOpen(false);
    toast({ title: "Project created", description: data.name });
  }

  function handleUpdate(project: Project) {
    return async (values: ProjectInput) => {
      const { data, error } = await supabase
        .from("projects")
        .update(values)
        .eq("id", project.id)
        .select()
        .single<Project>();

      if (error || !data) {
        toast({ variant: "destructive", title: "Error", description: error?.message });
        return;
      }
      updateProject(data);
      toast({ title: "Project updated" });
    };
  }

  function handleDelete(project: Project) {
    return async () => {
      const { error } = await supabase.from("projects").delete().eq("id", project.id);
      if (error) {
        toast({ variant: "destructive", title: "Error", description: error.message });
        return;
      }
      removeProject(project.id);
      toast({ title: "Project deleted" });
    };
  }

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Sheet open={createOpen} onOpenChange={setCreateOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New project
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Create project</SheetTitle>
              <SheetDescription>
                Add a new project to start tracking UX debt
              </SheetDescription>
            </SheetHeader>
            <ProjectForm onSubmit={handleCreate} submitLabel="Create project" />
          </SheetContent>
        </Sheet>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <FolderOpen className="h-12 w-12 text-muted-foreground/40 mb-4" />
          <h3 className="text-base font-semibold mb-1">No projects yet</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-xs">
            Create your first project to start logging and managing UX debt.
          </p>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Create project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              debtCount={debtCounts[project.id] ?? 0}
              onUpdate={handleUpdate(project)}
              onDelete={handleDelete(project)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
