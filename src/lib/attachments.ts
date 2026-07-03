import type { createClient } from "@/lib/supabase/client";
import type { Attachment } from "@/types";

export const ATTACHMENT_ALLOWED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
export const ATTACHMENT_MAX_SIZE = 10 * 1024 * 1024; // 10MB

export function validateAttachmentFile(file: File): string | null {
  if (!ATTACHMENT_ALLOWED_TYPES.includes(file.type)) {
    return "Only PNG, JPG, and PDF files are allowed.";
  }
  if (file.size > ATTACHMENT_MAX_SIZE) {
    return "Maximum file size is 10MB.";
  }
  return null;
}

/** Reads an image out of clipboard paste data, if present, and names it like a screenshot. */
export function pastedImageFile(item: DataTransferItem): File | null {
  if (item.kind !== "file" || !item.type.startsWith("image/")) return null;
  const file = item.getAsFile();
  if (!file) return null;
  const ext = item.type.split("/")[1] || "png";
  return new File([file], `pasted-screenshot-${Date.now()}.${ext}`, { type: item.type });
}

export async function uploadAttachmentFile(
  supabase: ReturnType<typeof createClient>,
  { file, debtItemId, userId }: { file: File; debtItemId: string; userId: string }
): Promise<{ data?: Attachment; error?: string }> {
  const ext = file.name.split(".").pop();
  const path = `${userId}/${debtItemId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error: uploadError } = await supabase.storage.from("attachments").upload(path, file);
  if (uploadError) return { error: uploadError.message };

  const { data, error } = await supabase
    .from("attachments")
    .insert({
      debt_item_id: debtItemId,
      uploaded_by: userId,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      storage_path: path,
    })
    .select()
    .single<Attachment>();

  if (error || !data) return { error: error?.message ?? "Failed to save attachment" };
  return { data };
}
