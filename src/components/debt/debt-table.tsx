"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { Plus, Search, SlidersHorizontal, AlertTriangle, Pencil, Trash2, ChevronUp, ChevronDown, Eye, MoreVertical } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { SeverityBadge } from "./severity-badge";
import { StatusBadge } from "./status-badge";
import { DebtForm } from "./debt-form";
import { DebtDetail } from "./debt-detail";
import { StagedAttachments } from "./staged-attachments";
import { Attachments } from "./attachments";
import { useToast } from "@/hooks/use-toast";
import { formatDate, cn } from "@/lib/utils";
import { uploadAttachmentFile } from "@/lib/attachments";
import { CATEGORY_LABELS, SEVERITY_LABELS, STATUS_LABELS, type DebtItem } from "@/types";
import type { DebtInput } from "@/lib/validations/debt";

interface DebtTableProps {
  projectId: string;
  readOnly?: boolean;
}

export function DebtTable({ projectId, readOnly = false }: DebtTableProps) {
  const [items, setItems] = useState<DebtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);
  const [editItem, setEditItem] = useState<DebtItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<DebtItem | null>(null);
  const [viewItem, setViewItem] = useState<DebtItem | null>(null);
  const [deleting, setDeleting] = useState(false);
  const { toast } = useToast();
  const supabase = createClient();

  const load = useCallback(async () => {
    const { data } = await supabase
      .from("debt_items")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });
    setItems((data as DebtItem[]) ?? []);
    setLoading(false);
  }, [projectId]);

  useEffect(() => { load(); }, [load]);

  const columns: ColumnDef<DebtItem>[] = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <button
          className="text-left font-medium text-sm hover:text-primary-text transition-colors max-w-[320px] truncate block"
          onClick={() => setViewItem(row.original)}
          title={row.getValue("title")}
        >
          {row.getValue("title")}
        </button>
      ),
    },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => <SeverityBadge severity={row.getValue("severity")} />,
      filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {CATEGORY_LABELS[row.getValue("category") as keyof typeof CATEGORY_LABELS]}
        </span>
      ),
      filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
    },
    {
      accessorKey: "due_date",
      header: "Due",
      cell: ({ row }) => {
        const due = row.getValue<string | null>("due_date");
        if (!due) return <span className="text-xs text-muted-foreground">—</span>;
        const overdue = new Date(due) < new Date() && row.original.status !== "resolved";
        return (
          <span className={cn("text-xs", overdue ? "text-destructive font-medium" : "text-muted-foreground")}>
            {formatDate(due)}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">{formatDate(row.getValue("created_at"))}</span>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Row actions">
              <MoreVertical className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setViewItem(row.original)}>
              <Eye className="mr-2 h-4 w-4" /> View details
            </DropdownMenuItem>
            {!readOnly && (
              <>
                <DropdownMenuItem onClick={() => setEditItem(row.original)}>
                  <Pencil className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteItem(row.original)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting, columnFilters, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  async function handleCreate(values: DebtInput) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("debt_items")
      .insert({ ...values, project_id: projectId, created_by: user.id })
      .select().single<DebtItem>();
    if (error || !data) { toast({ variant: "destructive", title: "Error", description: error?.message }); return; }
    setItems((prev) => [data, ...prev]);
    setCreateOpen(false);

    if (stagedFiles.length > 0) {
      const results = await Promise.all(
        stagedFiles.map((file) => uploadAttachmentFile(supabase, { file, debtItemId: data.id, userId: user.id }))
      );
      const failed = results.filter((r) => r.error).length;
      setStagedFiles([]);
      if (failed > 0) {
        toast({ variant: "destructive", title: "Some attachments failed to upload", description: `${failed} of ${results.length} file(s) could not be attached.` });
      }
    }
    toast({ title: "Debt item created" });
  }

  async function handleEdit(values: DebtInput) {
    if (!editItem) return;
    const { data, error } = await supabase
      .from("debt_items").update(values).eq("id", editItem.id).select().single<DebtItem>();
    if (error || !data) { toast({ variant: "destructive", title: "Error", description: error?.message }); return; }
    setItems((prev) => prev.map((i) => i.id === data.id ? data : i));
    setEditItem(null);
    toast({ title: "Debt item updated" });
  }

  async function handleDelete() {
    if (!deleteItem) return;
    setDeleting(true);
    const { error } = await supabase.from("debt_items").delete().eq("id", deleteItem.id);
    if (error) { toast({ variant: "destructive", title: "Error", description: error.message }); setDeleting(false); return; }
    setItems((prev) => prev.filter((i) => i.id !== deleteItem.id));
    setDeleteItem(null);
    setDeleting(false);
    toast({ title: "Debt item deleted" });
  }

  return (
    <>
      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search debt items..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9 w-56"
              />
            </div>
            <Select
              value={(table.getColumn("severity")?.getFilterValue() as string) ?? "all"}
              onValueChange={(v) => table.getColumn("severity")?.setFilterValue(v === "all" ? undefined : v)}
            >
              <SelectTrigger className="w-44">
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All severities</SelectItem>
                {Object.entries(SEVERITY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
              onValueChange={(v) => table.getColumn("status")?.setFilterValue(v === "all" ? undefined : v)}
            >
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {Object.entries(STATUS_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          {!readOnly && (
            <Button onClick={() => setCreateOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add debt item
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="bg-muted/50 hover:bg-muted/50">
                  {hg.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <button
                          className={cn(
                            "flex items-center gap-1",
                            header.column.getCanSort() && "cursor-pointer select-none hover:text-foreground"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() === "asc" && <ChevronUp className="h-3 w-3" />}
                          {header.column.getIsSorted() === "desc" && <ChevronDown className="h-3 w-3" />}
                        </button>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i}>
                    {columns.map((_, j) => (
                      <TableCell key={j}><Skeleton className="h-4 w-24" /></TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} className="py-20 text-center">
                    <AlertTriangle className="h-8 w-8 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-sm font-medium">No debt items found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {globalFilter || columnFilters.length ? "Try adjusting your filters" : "Add your first debt item to get started"}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground">
          {table.getFilteredRowModel().rows.length} of {items.length} items
        </p>
      </div>

      {/* Create drawer */}
      <Sheet
        open={createOpen}
        onOpenChange={(o) => {
          setCreateOpen(o);
          if (!o) setStagedFiles([]);
        }}
      >
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Add debt item</SheetTitle>
            <SheetDescription>Log a new UX debt item for this project</SheetDescription>
          </SheetHeader>
          <DebtForm onSubmit={handleCreate} submitLabel="Create item">
            <StagedAttachments files={stagedFiles} onChange={setStagedFiles} />
          </DebtForm>
        </SheetContent>
      </Sheet>

      {/* Edit drawer */}
      <Sheet open={!!editItem} onOpenChange={(o) => !o && setEditItem(null)}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Edit debt item</SheetTitle>
          </SheetHeader>
          {editItem && (
            <DebtForm defaultValues={editItem} onSubmit={handleEdit} submitLabel="Save changes">
              <Attachments debtItemId={editItem.id} />
            </DebtForm>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete confirm */}
      <Sheet open={!!deleteItem} onOpenChange={(o) => !o && setDeleteItem(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Delete debt item?</SheetTitle>
            <SheetDescription>
              This will permanently delete <strong>{deleteItem?.title}</strong> along with all comments and attachments.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting…" : "Delete"}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Detail view */}
      <Sheet open={!!viewItem} onOpenChange={(o) => !o && setViewItem(null)}>
        <SheetContent className="sm:max-w-xl">
          {viewItem && (
            <DebtDetail item={viewItem} onClose={() => setViewItem(null)} readOnly={readOnly} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
