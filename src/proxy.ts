import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { roleEntryRoutes } from "@/lib/constants";
import { parseSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/token";
import type { UserRole } from "@/types";

const protectedPrefixes: Array<{ prefix: string; role: UserRole }> = [
  { prefix: "/passenger", role: "passenger" },
  { prefix: "/conductor", role: "conductor" },
  { prefix: "/admin", role: "administrator" },
];

const authRoutes = ["/login", "/register", "/forgot-password"];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = parseSessionToken(
    request.cookies.get(SESSION_COOKIE_NAME)?.value,
  );
  const protectedRoute = protectedPrefixes.find(({ prefix }) =>
    pathname.startsWith(prefix),
  );

  if (protectedRoute && !session) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (protectedRoute && session && session.role !== protectedRoute.role) {
    return NextResponse.redirect(new URL(roleEntryRoutes[session.role], request.url));
  }

  if (session && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(roleEntryRoutes[session.role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
