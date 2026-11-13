"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TiptapEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export function TiptapEditor({
  content = "",
  onChange,
  placeholder = "Describe the UX debt item...",
  readOnly = false,
}: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({ placeholder }),
      Link.configure({ openOnClick: false }),
    ],
    content,
    editable: !readOnly,
    onUpdate({ editor }) {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const tools = [
    {
      icon: Bold,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      icon: UnderlineIcon,
      label: "Underline",
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      icon: Heading2,
      label: "Heading",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: List,
      label: "Bullet list",
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Ordered list",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
  ];

  return (
    <div className="border border-input bg-card rounded-lg overflow-hidden focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/40">
      {!readOnly && (
        <div className="flex items-center gap-0.5 px-2 py-1.5 border-b border-border bg-surface">
          {tools.map(({ icon: Icon, label, action, active }) => (
            <Button
              key={label}
              type="button"
              variant="ghost"
              size="icon"
              className={cn("h-7 w-7 rounded-md", active && "bg-primary-soft text-primary-text hover:bg-primary-soft")}
              onClick={action}
              aria-label={label}
              aria-pressed={active}
            >
              <Icon className="h-3.5 w-3.5" />
            </Button>
          ))}
        </div>
      )}
      <EditorContent
        editor={editor}
        className={cn(
          "prose prose-sm max-w-none px-3 py-2 text-sm",
          readOnly && "pointer-events-none"
        )}
      />
    </div>
  );
}
