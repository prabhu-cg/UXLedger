import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import type { Profile } from "@/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single<Profile>();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <a
        href="#main-content"
        className="sr-only z-[60] rounded-md bg-background px-4 py-2 text-sm font-semibold focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar profile={profile} />
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto outline-none">
          {/* One shared page column, as in Yedara. Bottom space keeps the last row clear of the edge. */}
          <div className="mx-auto w-full max-w-[1400px] px-4 pt-6 pb-24 sm:px-6 lg:px-8 lg:pt-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
