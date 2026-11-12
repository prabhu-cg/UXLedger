import { cn } from "@/lib/utils";

/**
 * Product previews are authored mockups of the real screens, filled with invented sample data.
 * Each one is wrapped in a figure that says so and hidden from assistive tech: the caption and
 * the section copy carry the meaning.
 */
export function PreviewFigure({
  children,
  caption,
  className,
}: {
  children: React.ReactNode;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={cn("m-0", className)}>
      <div aria-hidden="true">{children}</div>
      <figcaption className="mt-3 text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

/** A small app window: the quiet frame every preview sits in. */
export function AppWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border-strong bg-card text-left shadow-window",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 truncate text-xs font-semibold text-foreground">{title}</span>
        <span className="ml-auto shrink-0 rounded-full bg-card px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-muted-foreground ring-1 ring-border">
          Sample data
        </span>
      </div>
      {children}
    </div>
  );
}
