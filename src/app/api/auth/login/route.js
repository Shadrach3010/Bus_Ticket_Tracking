import { NextResponse } from "next/server";

import { getSessionCookieOptions } from "@/lib/auth/session";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/token";
import {
  findUserByCredentials,
  getPublicUser,
} from "@/lib/auth/mock-users";
import { roleEntryRoutes } from "@/lib/constants";
import { emailPattern, isUserRole } from "@/lib/validation";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const role = String(body.role ?? "passenger");

  if (!emailPattern.test(email) || password.length < 8 || !isUserRole(role)) {
    return NextResponse.json(
      { message: "Enter valid login credentials." },
      { status: 400 },
    );
  }

  const user = findUserByCredentials(email, password, role);

  if (!user) {
    return NextResponse.json(
      { message: "Account not found or password is incorrect." },
      { status: 401 },
    );
  }

  const publicUser = getPublicUser(user);
  const token = createSessionToken(publicUser);
  const response = NextResponse.json({
    user: publicUser,
    redirectTo: roleEntryRoutes[publicUser.role],
  });

  response.cookies.set(
    SESSION_COOKIE_NAME,
    token,
    getSessionCookieOptions(),
  );

  return response;
}
