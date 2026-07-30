import Link from "next/link";
import { LogIn, UserPlus } from "lucide-react";

import { AppLogo } from "@/components/layout/app-logo";
import { ButtonLink } from "@/components/ui/button-link";
import { publicNavItems } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <AppLogo />
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {publicNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/login" variant="ghost" icon={LogIn}>
            Login
          </ButtonLink>
          <ButtonLink
            href="/register"
            variant="primary"
            icon={UserPlus}
            className="hidden sm:inline-flex"
          >
            Register
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
