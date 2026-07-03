"use client";

import { useState, useEffect, useRef } from "react";
import { Upload, File as FileIcon, Trash2, Download, Paperclip } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { formatFileSize, formatDate } from "@/lib/utils";
import { validateAttachmentFile, pastedImageFile, uploadAttachmentFile } from "@/lib/attachments";
import type { Attachment } from "@/types";

interface AttachmentsProps {
  debtItemId: string;
}

export function Attachments({ debtItemId }: AttachmentsProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from("attachments")
        .select("*")
        .eq("debt_item_id", debtItemId)
        .order("created_at", { ascending: false });
      setAttachments((data as Attachment[]) ?? []);
      setLoading(false);
    }
    load();
  }, [debtItemId]);

  async function uploadFile(file: File) {
    const validationError = validateAttachmentFile(file);
    if (validationError) {
      toast({ variant: "destructive", title: "Can't attach that file", description: validationError });
      return;
    }

    setUploading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setUploading(false); return; }

    const { data, error } = await uploadAttachmentFile(supabase, { file, debtItemId, userId: user.id });

    if (error || !data) {
      toast({ variant: "destructive", title: "Upload failed", description: error });
    } else {
      setAttachments((prev) => [data, ...prev]);
      toast({ title: "File uploaded", description: file.name });
    }
    setUploading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    await uploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        const file = pastedImageFile(item);
        if (file) {
          e.preventDefault();
          uploadFile(file);
          break;
        }
      }
    }
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debtItemId]);

  async function handleDelete(attachment: Attachment) {
    await supabase.storage.from("attachments").remove([attachment.storage_path]);
    await supabase.from("attachments").delete().eq("id", attachment.id);
    setAttachments((prev) => prev.filter((a) => a.id !== attachment.id));
    toast({ title: "Attachment deleted" });
  }

  async function handleDownload(attachment: Attachment) {
    const { data } = await supabase.storage
      .from("attachments")
      .createSignedUrl(attachment.storage_path, 60);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Paperclip className="h-3.5 w-3.5" />
          Attachments
          {!loading && <span>({attachments.length})</span>}
        </p>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg,.pdf"
            className="sr-only"
            onChange={handleUpload}
            aria-label="Upload attachment"
          />
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-3 w-3" />
            {uploading ? "Uploading…" : "Upload"}
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2].map((i) => <Skeleton key={i} className="h-10 rounded-lg" />)}
        </div>
      ) : attachments.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2">No attachments yet. Upload or paste (⌘/Ctrl+V) a screenshot — PNG, JPG, or PDF, max 10MB.</p>
      ) : (
        <ul className="space-y-1.5">
          {attachments.map((a) => (
            <li key={a.id} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 bg-muted/30">
              <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{a.file_name}</p>
                <p className="text-[10px] text-muted-foreground">
                  {formatFileSize(a.file_size)} · {formatDate(a.created_at)}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDownload(a)} aria-label="Download">
                  <Download className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => handleDelete(a)} aria-label="Delete">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
