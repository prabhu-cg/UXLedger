import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { DebtTable } from "@/components/debt/debt-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isSampleProject } from "@/lib/sample-projects";
import type { Project } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("projects").select("name").eq("id", id).single<{ name: string }>();
  return { title: data?.name ?? "Project" };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user.id)
    .single<Project>();

  if (!project) notFound();

  const isSample = isSampleProject(project.name);

  return (
    <div className="p-6 max-w-[1440px] mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/projects" className="hover:text-foreground transition-colors flex items-center gap-1">
          <ArrowLeft className="h-3.5 w-3.5" /> Projects
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground font-medium">{project.name}</span>
      </nav>

      <div className="flex items-start gap-3 mb-6">
        <div className="w-4 h-4 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: project.color }} />
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-xl font-bold">{project.name}</h1>
            {isSample && (
              <Badge
                variant="outline"
                className="shrink-0 border-transparent bg-blue-100 font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
              >
                Sample
              </Badge>
            )}
          </div>
          {project.description && (
            <p className="text-sm text-muted-foreground">{project.description}</p>
          )}
        </div>
      </div>

      <DebtTable projectId={project.id} readOnly={isSample} />
    </div>
  );
}
