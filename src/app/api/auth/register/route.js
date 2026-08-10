import { NextResponse } from "next/server";

import { getSessionCookieOptions } from "@/lib/auth/session";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/token";
import {
  createPassengerUser,
  emailExists,
  getPublicUser,
} from "@/lib/auth/mock-users";
import { roleEntryRoutes } from "@/lib/constants";
import {
  emailPattern,
  phonePattern,
  validatePassword,
} from "@/lib/validation";

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const firstName = String(body.firstName ?? "").trim();
  const middleName = String(body.middleName ?? "").trim();
  const lastName = String(body.lastName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const nationalId = String(body.nationalId ?? "").trim();
  const password = String(body.password ?? "");
  const confirmPassword = String(body.confirmPassword ?? "");

  if (!firstName || !lastName || !emailPattern.test(email)) {
    return NextResponse.json(
      { message: "Enter valid passenger details." },
      { status: 400 },
    );
  }

  if (!phonePattern.test(phone)) {
    return NextResponse.json(
      { message: "Enter a valid phone number." },
      { status: 400 },
    );
  }

  const passwordError = validatePassword(password);

  if (passwordError || password !== confirmPassword) {
    return NextResponse.json(
      { message: "Password validation failed." },
      { status: 400 },
    );
  }

  if (emailExists(email)) {
    return NextResponse.json(
      { message: "A passenger account already exists for this email." },
      { status: 409 },
    );
  }

  const user = createPassengerUser({
    firstName,
    middleName,
    lastName,
    email,
    phone,
    nationalId,
    password,
  });
  const publicUser = getPublicUser(user);
  const token = createSessionToken(publicUser);
  const response = NextResponse.json({
    user: publicUser,
    redirectTo: roleEntryRoutes.passenger,
  });

  response.cookies.set(
    SESSION_COOKIE_NAME,
    token,
    getSessionCookieOptions(),
  );

  return response;
}
