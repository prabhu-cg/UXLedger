"use client";

import { useEffect, useRef } from "react";
import { Upload, File as FileIcon, Trash2, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { formatFileSize } from "@/lib/utils";
import { validateAttachmentFile, pastedImageFile } from "@/lib/attachments";

interface StagedAttachmentsProps {
  files: File[];
  onChange: (files: File[]) => void;
}

/**
 * Lets a user attach files (or paste a screenshot) before the parent record
 * exists yet — e.g. while creating a new debt item. Files are only held in
 * memory here; the caller uploads them once the record has a real id.
 */
export function StagedAttachments({ files, onChange }: StagedAttachmentsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  function addFile(file: File) {
    const validationError = validateAttachmentFile(file);
    if (validationError) {
      toast({ variant: "destructive", title: "Can't attach that file", description: validationError });
      return;
    }
    onChange([...files, file]);
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) addFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleRemove(index: number) {
    onChange(files.filter((_, i) => i !== index));
  }

  useEffect(() => {
    function handlePaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        const file = pastedImageFile(item);
        if (file) {
          e.preventDefault();
          addFile(file);
          break;
        }
      }
    }
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
          <Paperclip className="h-3.5 w-3.5" />
          Attachments
          {files.length > 0 && <span>({files.length})</span>}
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
            type="button"
            variant="outline"
            size="sm"
            className="h-7 text-xs gap-1.5"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-3 w-3" />
            Upload
          </Button>
        </div>
      </div>

      {files.length === 0 ? (
        <p className="text-xs text-muted-foreground py-2">
          Upload or paste (⌘/Ctrl+V) a screenshot — PNG, JPG, or PDF, max 10MB. Attached on save.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {files.map((file, i) => (
            <li key={`${file.name}-${i}`} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 bg-muted/30">
              <FileIcon className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-destructive hover:text-destructive shrink-0"
                onClick={() => handleRemove(i)}
                aria-label="Remove"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
