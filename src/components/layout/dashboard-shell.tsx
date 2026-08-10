"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Breadcrumb } from "@/components/layout/breadcrumb";
import { Navbar } from "@/components/layout/navbar";
import { Sidebar } from "@/components/layout/sidebar";
import { dashboardNavigation } from "@/lib/navigation";
import type { SessionPayload, UserRole } from "@/types";

function pageTitle(pathname: string) {
  const segment = pathname.split("/").filter(Boolean).at(-1) ?? "dashboard";

  return segment
    .split("-")
    .map((part) => part[0]?.toUpperCase() + part.slice(1))
    .join(" ");
}

type DashboardShellProps = {
  children: ReactNode;
  role: UserRole;
  user: SessionPayload;
};

export function DashboardShell({ children, role, user }: DashboardShellProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const title = useMemo(() => pageTitle(pathname), [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50 md:grid md:grid-cols-[18rem_1fr]">
      <Sidebar
        activePath={pathname}
        items={dashboardNavigation[role]}
        onClose={() => setOpen(false)}
        open={open}
        role={role}
      />
      <div className="min-w-0">
        <Navbar
          onLogout={handleLogout}
          onMenuClick={() => setOpen(true)}
          title={title}
          user={user}
        />
        <main id="main-content" className="px-4 py-6 sm:px-6 lg:px-8">
          <Breadcrumb pathname={pathname} />
          <div className="mt-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
