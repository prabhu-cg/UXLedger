"use client";

import { useState, useEffect } from "react";
import { Download, FileText, FileSpreadsheet, BarChart3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SeverityBadge } from "@/components/debt/severity-badge";
import { StatusBadge } from "@/components/debt/status-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CATEGORY_LABELS, type DebtItem, type Project } from "@/types";
import { formatDate } from "@/lib/utils";
import ExcelJS from "exceljs";

export default function ReportsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>("all");
  const [items, setItems] = useState<DebtItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: projs } = await supabase
        .from("projects")
        .select("*")
        .eq("owner_id", user.id)
        .order("name");
      setProjects((projs as Project[]) ?? []);

      const { data: debtItems } = await supabase
        .from("debt_items")
        .select(`*, project:projects!inner(owner_id, name)`)
        .eq("project.owner_id", user.id)
        .order("created_at", { ascending: false });
      setItems((debtItems as DebtItem[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = selectedProject === "all"
    ? items
    : items.filter((i) => i.project_id === selectedProject);

  function toExportRows(data: DebtItem[]) {
    return data.map((i) => ({
      Title: i.title,
      Severity: i.severity,
      Status: i.status,
      Category: CATEGORY_LABELS[i.category] ?? i.category,
      "Due Date": i.due_date ? formatDate(i.due_date) : "",
      "Created At": formatDate(i.created_at),
      "Resolved At": i.resolved_at ? formatDate(i.resolved_at) : "",
    }));
  }

  function exportCSV() {
    const rows = toExportRows(filtered);
    const headers = Object.keys(rows[0] ?? {}).join(",");
    const csv = [
      headers,
      ...rows.map((r) =>
        Object.values(r).map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uxledger-debt-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function exportXLSX() {
    const rows = toExportRows(filtered);
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("UX Debt");

    ws.columns = [
      { header: "Title", key: "Title", width: 50 },
      { header: "Severity", key: "Severity", width: 12 },
      { header: "Status", key: "Status", width: 14 },
      { header: "Category", key: "Category", width: 22 },
      { header: "Due Date", key: "Due Date", width: 14 },
      { header: "Created At", key: "Created At", width: 14 },
      { header: "Resolved At", key: "Resolved At", width: 14 },
    ];

    // Bold header row
    ws.getRow(1).font = { bold: true };

    rows.forEach((row) => ws.addRow(row));

    const buffer = await wb.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uxledger-debt-${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 max-w-[1400px] space-y-6">
      <div>
        <h1 className="text-xl font-bold">Reports</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Export and analyse UX debt data across your projects
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums">{filtered.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              {filtered.filter((i) => i.status === "open" || i.status === "in_progress").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Critical items</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold tabular-nums text-red-600 dark:text-red-400">
              {filtered.filter((i) => i.severity === "critical" && i.status !== "resolved").length}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Debt Register Export
              </CardTitle>
              <CardDescription className="mt-1">
                {filtered.length} item{filtered.length !== 1 ? "s" : ""} ready to export
              </CardDescription>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={selectedProject} onValueChange={setSelectedProject}>
                <SelectTrigger className="h-9 w-44">
                  <SelectValue placeholder="Filter by project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All projects</SelectItem>
                  {projects.map((p) => (
                    <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={exportCSV} disabled={!filtered.length}>
                <FileText className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
              <Button size="sm" onClick={() => exportXLSX()} disabled={!filtered.length}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="rounded-b-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      {[1, 2, 3, 4, 5, 6].map((j) => (
                        <TableCell key={j}><Skeleton className="h-4 w-20" /></TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="py-16 text-center text-sm text-muted-foreground">
                      No data to display
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.slice(0, 50).map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm max-w-[280px] truncate">{item.title}</TableCell>
                      <TableCell><SeverityBadge severity={item.severity} /></TableCell>
                      <TableCell><StatusBadge status={item.status} /></TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {CATEGORY_LABELS[item.category]}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(item.due_date)}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{formatDate(item.created_at)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            {filtered.length > 50 && (
              <p className="text-center text-xs text-muted-foreground py-3">
                Showing 50 of {filtered.length} items. Export to see all.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
