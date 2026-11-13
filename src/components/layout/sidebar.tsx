"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  AlertTriangle,
  BarChart3,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUIStore } from "@/stores/ui-store";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderOpen },
  { label: "Debt Register", href: "/debt", icon: AlertTriangle },
  { label: "Reports", href: "/reports", icon: BarChart3 },
];

const navLinkClass = (active: boolean, collapsed: boolean) =>
  cn(
    "flex items-center overflow-hidden rounded-full py-2 text-sm font-medium outline-none transition-[padding,gap,color,background-color] duration-300 ease-in-out focus-visible:ring-[3px] focus-visible:ring-ring",
    collapsed ? "gap-0 px-4" : "gap-3 px-3",
    active
      ? "bg-primary-soft font-semibold text-primary-text"
      : "text-muted-foreground hover:bg-muted hover:text-foreground"
  );

const navLabelClass = (collapsed: boolean) =>
  cn(
    "overflow-hidden whitespace-nowrap transition-[max-width,opacity] duration-300 ease-in-out",
    collapsed ? "max-w-0 opacity-0" : "max-w-[9rem] opacity-100"
  );

function NavTooltip({
  label,
  collapsed,
  children,
}: {
  label: string;
  collapsed: boolean;
  children: React.ReactNode;
}) {
  if (!collapsed) return <>{children}</>;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen, sidebarCollapsed, toggleSidebarCollapsed } =
    useUIStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <TooltipProvider delayDuration={200}>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar border-r border-sidebar-border transition-[transform,width] duration-300 ease-in-out lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          sidebarCollapsed ? "w-[72px]" : "w-60"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-5 px-5 shrink-0">
          <Logo
            variant="auto"
            size="xs"
            taglineClassName="text-[11px]"
            iconOnly={sidebarCollapsed}
          />
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "lg:hidden text-sidebar-foreground hover:bg-muted shrink-0 overflow-hidden transition-[max-width,opacity,margin] duration-300 ease-in-out",
              sidebarCollapsed ? "max-w-0 opacity-0 -ml-2" : "max-w-9 opacity-100"
            )}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4 shrink-0" />
          </Button>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav aria-label="Main navigation">
            <ul className="space-y-0.5">
              {navItems.map(({ label, href, icon: Icon }) => {
                const active =
                  href === "/dashboard"
                    ? pathname === "/dashboard"
                    : pathname.startsWith(href);
                return (
                  <li key={href}>
                    <NavTooltip label={label} collapsed={sidebarCollapsed}>
                      <Link
                        href={href}
                        className={navLinkClass(active, sidebarCollapsed)}
                        aria-current={active ? "page" : undefined}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className={navLabelClass(sidebarCollapsed)}>{label}</span>
                      </Link>
                    </NavTooltip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-sidebar-border shrink-0 space-y-0.5">
          <NavTooltip label="Settings" collapsed={sidebarCollapsed}>
            <Link
              href="/settings"
              className={navLinkClass(pathname.startsWith("/settings"), sidebarCollapsed)}
            >
              <Settings className="h-4 w-4 shrink-0" />
              <span className={navLabelClass(sidebarCollapsed)}>Settings</span>
            </Link>
          </NavTooltip>
          <NavTooltip label="Expand" collapsed={sidebarCollapsed}>
            <button
              type="button"
              onClick={toggleSidebarCollapsed}
              className={cn(navLinkClass(false, sidebarCollapsed), "w-full")}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? (
                <PanelLeftOpen className="h-4 w-4 shrink-0" />
              ) : (
                <PanelLeftClose className="h-4 w-4 shrink-0" />
              )}
              <span className={navLabelClass(sidebarCollapsed)}>
                {sidebarCollapsed ? "Expand" : "Collapse"}
              </span>
            </button>
          </NavTooltip>
        </div>
      </aside>
      </TooltipProvider>
    </>
  );
}
