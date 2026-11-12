import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/layout/logo-mark";

interface LogoProps {
  variant?: "light" | "dark" | "auto";
  showTagline?: boolean;
  iconOnly?: boolean;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  layout?: "row" | "stack";
  taglineClassName?: string;
}

export function Logo({
  variant = "auto",
  showTagline = true,
  iconOnly = false,
  className,
  size = "md",
  layout = "row",
  taglineClassName,
}: LogoProps) {
  const iconSize = size === "xs" ? 24 : size === "sm" ? 28 : size === "lg" ? 48 : 36;

  return (
    <div
      className={cn(
        "flex transition-[gap] duration-300 ease-in-out",
        layout === "stack"
          ? "flex-col items-center gap-2"
          : cn("items-center", iconOnly ? "gap-0" : "gap-3"),
        className
      )}
    >
      <LogoMark variant={variant} width={iconSize} />
      <div
        className={cn(
          "flex flex-col leading-none",
          layout === "stack"
            ? "items-center text-center"
            : cn(
                "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
                iconOnly ? "max-w-0 opacity-0" : "max-w-[170px] opacity-100"
              )
        )}
      >
        <span
          className={cn(
            "font-bold tracking-tight",
            size === "xs"
              ? "text-sm"
              : size === "sm"
              ? "text-base"
              : size === "lg"
              ? "text-2xl"
              : "text-xl"
          )}
        >
          <span className={variant === "light" ? "text-white" : "text-foreground"}>
            UX
          </span>
          <span className={variant === "light" ? "text-white" : "text-primary-text"}>
            Ledger
          </span>
        </span>
        {showTagline && (
          <span
            className={cn(
              "font-semibold mt-0.5 text-[11px]",
              variant === "light"
                ? "text-white/50"
                : "text-muted-foreground",
              taglineClassName
            )}
          >
            Better experience, Lower debt
          </span>
        )}
      </div>
    </div>
  );
}
