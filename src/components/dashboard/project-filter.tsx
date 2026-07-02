"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectFilterProps {
  projects: { id: string; name: string }[];
  selected: string;
}

export function ProjectFilter({ projects, selected }: ProjectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("project");
    } else {
      params.set("project", value);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <Select value={selected} onValueChange={handleChange}>
      <SelectTrigger className="h-9 w-[200px]">
        <SelectValue placeholder="All projects" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All projects</SelectItem>
        {projects.map((project) => (
          <SelectItem key={project.id} value={project.id}>
            {project.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
