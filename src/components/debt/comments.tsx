"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MessageCircle, Pencil, Trash2, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { commentSchema, type CommentInput } from "@/lib/validations/comment";
import { formatDateRelative, getInitials } from "@/lib/utils";
import type { Comment, Profile } from "@/types";

interface CommentsProps {
  debtItemId: string;
  readOnly?: boolean;
}

interface CommentWithAuthor extends Comment {
  author: Profile | undefined;
}

export function Comments({ debtItemId, readOnly = false }: CommentsProps) {
  const [comments, setComments] = useState<CommentWithAuthor[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editBody, setEditBody] = useState("");
  const { toast } = useToast();
  const supabase = createClient();

  const form = useForm<CommentInput>({
    resolver: zodResolver(commentSchema),
    defaultValues: { body: "" },
  });

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setCurrentUserId(user.id);

      const { data } = await supabase
        .from("comments")
        .select("*, author:profiles(*)")
        .eq("debt_item_id", debtItemId)
        .order("created_at", { ascending: true });

      setComments((data as CommentWithAuthor[]) ?? []);
      setLoading(false);
    }
    load();
  }, [debtItemId]);

  async function onSubmit(values: CommentInput) {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from("comments")
      .insert({ debt_item_id: debtItemId, author_id: user.id, body: values.body })
      .select("*, author:profiles(*)")
      .single<CommentWithAuthor>();

    if (error || !data) {
      toast({ variant: "destructive", title: "Error", description: error?.message });
      return;
    }
    setComments((prev) => [...prev, data]);
    form.reset();
  }

  async function handleEdit(comment: CommentWithAuthor) {
    const { data, error } = await supabase
      .from("comments")
      .update({ body: editBody, edited_at: new Date().toISOString() })
      .eq("id", comment.id)
      .select("*, author:profiles(*)")
      .single<CommentWithAuthor>();

    if (error || !data) { toast({ variant: "destructive", title: "Error", description: error?.message }); return; }
    setComments((prev) => prev.map((c) => c.id === data.id ? data : c));
    setEditingId(null);
    setEditBody("");
  }

  async function handleDelete(id: string) {
    await supabase.from("comments").delete().eq("id", id);
    setComments((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Comment deleted" });
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1.5">
        <MessageCircle className="h-3.5 w-3.5" />
        Comments {!loading && `(${comments.length})`}
      </p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => <Skeleton key={i} className="h-16 rounded-lg" />)}
        </div>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-7 w-7 shrink-0 mt-0.5">
                <AvatarFallback className="text-[10px]">
                  {getInitials(comment.author?.full_name)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold">{comment.author?.full_name ?? "Unknown"}</span>
                  <span className="text-[10px] text-muted-foreground">{formatDateRelative(comment.created_at)}</span>
                  {comment.edited_at && <span className="text-[10px] text-muted-foreground">(edited)</span>}
                </div>

                {!readOnly && editingId === comment.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                    <div className="flex gap-1.5">
                      <Button size="sm" className="h-7 text-xs gap-1" onClick={() => handleEdit(comment)}>
                        <Check className="h-3 w-3" /> Save
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 text-xs gap-1" onClick={() => { setEditingId(null); setEditBody(""); }}>
                        <X className="h-3 w-3" /> Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative">
                    <p className="text-sm whitespace-pre-wrap">{comment.body}</p>
                    {!readOnly && comment.author_id === currentUserId && (
                      <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="sm" className="h-6 px-1.5 text-xs gap-1 text-muted-foreground" onClick={() => { setEditingId(comment.id); setEditBody(comment.body); }}>
                          <Pencil className="h-3 w-3" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 px-1.5 text-xs gap-1 text-destructive" onClick={() => handleDelete(comment.id)}>
                          <Trash2 className="h-3 w-3" /> Delete
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New comment */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <Avatar className="h-7 w-7 shrink-0 mt-0.5">
          <AvatarFallback className="text-[10px]">Me</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder={readOnly ? "Comments are disabled for sample projects" : "Add a comment..."}
            rows={2}
            className="text-sm resize-none"
            disabled={readOnly}
            {...form.register("body")}
          />
          {form.formState.errors.body && (
            <p className="text-xs text-destructive">{form.formState.errors.body.message}</p>
          )}
          <Button type="submit" size="sm" disabled={readOnly || form.formState.isSubmitting} className="h-7 text-xs">
            {form.formState.isSubmitting && <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />}
            Post comment
          </Button>
        </div>
      </form>
    </div>
  );
}
