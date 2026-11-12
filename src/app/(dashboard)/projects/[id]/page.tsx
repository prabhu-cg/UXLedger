import { PageHeader } from "@/components/layout/page-header";
import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DebtTable } from "@/components/debt/debt-table";
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
    <div>
      <PageHeader
        className="mb-6"
        backHref="/projects"
        backLabel="Projects"
        title={
          <span className="flex items-center gap-3">
            <span className="size-4 shrink-0 rounded-full" style={{ backgroundColor: project.color }} aria-hidden="true" />
            {project.name}
            {isSample && <Badge variant="info" className="shrink-0">Sample</Badge>}
          </span>
        }
        description={project.description}
      />

      <DebtTable projectId={project.id} readOnly={isSample} />
    </div>
  );
}
