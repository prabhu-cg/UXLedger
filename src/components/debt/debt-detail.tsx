"use client";

import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SeverityBadge } from "./severity-badge";
import { StatusBadge } from "./status-badge";
import { Attachments } from "./attachments";
import { Comments } from "./comments";
import { Separator } from "@/components/ui/separator";
import { CATEGORY_LABELS } from "@/types";
import { formatDate } from "@/lib/utils";
import type { DebtItem } from "@/types";

interface DebtDetailProps {
  item: DebtItem;
  onClose: () => void;
}

export function DebtDetail({ item }: DebtDetailProps) {
  return (
    <>
      <SheetHeader>
        <SheetTitle className="text-base pr-8 leading-snug">{item.title}</SheetTitle>
      </SheetHeader>

      {/* Meta */}
      <div className="flex flex-wrap gap-2 mt-1">
        <SeverityBadge severity={item.severity} />
        <StatusBadge status={item.status} />
        <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold text-muted-foreground">
          {CATEGORY_LABELS[item.category]}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground mt-2">
        <div>
          <span className="font-medium text-foreground block mb-0.5">Created</span>
          {formatDate(item.created_at)}
        </div>
        {item.due_date && (
          <div>
            <span className="font-medium text-foreground block mb-0.5">Due</span>
            {formatDate(item.due_date)}
          </div>
        )}
        {item.resolved_at && (
          <div>
            <span className="font-medium text-foreground block mb-0.5">Resolved</span>
            {formatDate(item.resolved_at)}
          </div>
        )}
      </div>

      {item.description && (
        <>
          <Separator />
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Description</p>
            <div
              className="prose prose-sm max-w-none text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p+p]:mt-2"
              dangerouslySetInnerHTML={{ __html: item.description }}
            />
          </div>
        </>
      )}

      <Separator />
      <Attachments debtItemId={item.id} />

      <Separator />
      <Comments debtItemId={item.id} />
    </>
  );
}
