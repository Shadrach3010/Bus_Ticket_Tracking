"use client";

import { Bell, LogOut, Menu } from "lucide-react";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { SessionPayload } from "@/types";

type NavbarProps = {
  onLogout: () => void;
  onMenuClick: () => void;
  title: string;
  user: SessionPayload;
};

export function Navbar({ onLogout, onMenuClick, title, user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex min-h-20 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="ghost"
            className="md:hidden"
            onClick={onMenuClick}
            aria-label="Open navigation"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </Button>
          <div>
            <p className="text-sm font-medium text-slate-500">Current page</p>
            <h1 className="text-xl font-bold text-slate-950">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            type="button"
            variant="ghost"
            aria-label="Notifications"
            className="relative"
          >
            <Bell aria-hidden="true" className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-500" />
          </Button>
          <div className="hidden items-center gap-3 sm:flex">
            <Avatar name={user.name} />
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-950">{user.name}</p>
              <p className="text-xs font-medium text-slate-500">{user.email}</p>
            </div>
          </div>
          <Button type="button" variant="secondary" onClick={onLogout}>
            <LogOut aria-hidden="true" className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
