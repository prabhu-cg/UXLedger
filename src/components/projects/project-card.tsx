"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectForm } from "./project-form";
import type { Project } from "@/types";
import type { ProjectInput } from "@/lib/validations/project";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  debtCount?: number;
  onUpdate: (values: ProjectInput) => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ProjectCard({ project, debtCount = 0, onUpdate, onDelete }: ProjectCardProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleEdit(values: ProjectInput) {
    await onUpdate(values);
    setEditOpen(false);
  }

  async function handleDelete() {
    setDeleting(true);
    await onDelete();
    setDeleteOpen(false);
    setDeleting(false);
  }

  return (
    <>
      <Card className="group">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <span
                className="w-4 h-4 rounded-full shrink-0 mt-0.5"
                style={{ backgroundColor: project.color }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <h3 className="font-semibold text-sm truncate">{project.name}</h3>
                {project.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {project.description}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Project options"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditOpen(true)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{debtCount} debt item{debtCount !== 1 ? "s" : ""}</span>
            <span>Created {formatDate(project.created_at)}</span>
          </div>

          <div className="mt-3">
            <Link href={`/projects/${project.id}`}>
              <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs">
                View project <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Edit drawer */}
      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit project</SheetTitle>
            <SheetDescription>Update your project details</SheetDescription>
          </SheetHeader>
          <ProjectForm defaultValues={project} onSubmit={handleEdit} submitLabel="Save changes" />
        </SheetContent>
      </Sheet>

      {/* Delete confirm */}
      <Sheet open={deleteOpen} onOpenChange={setDeleteOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Delete project?</SheetTitle>
            <SheetDescription>
              This will permanently delete <strong>{project.name}</strong> and all its debt items, comments, and attachments. This cannot be undone.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete project"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
