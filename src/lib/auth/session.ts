import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { roleEntryRoutes } from "@/lib/constants";
import {
  parseSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
} from "@/lib/auth/token";
import type { UserRole } from "@/types";

export async function getServerSession() {
  const cookieJar = await cookies();
  return parseSessionToken(cookieJar.get(SESSION_COOKIE_NAME)?.value);
}

export async function requireRole(role: UserRole) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== role) {
    redirect(roleEntryRoutes[session.role]);
  }

  return session;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
