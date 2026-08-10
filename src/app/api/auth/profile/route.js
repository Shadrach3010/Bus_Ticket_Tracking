import { NextResponse } from "next/server";

import {
  findUserById,
  getPublicUser,
  updateUserProfile,
} from "@/lib/auth/mock-users";
import { parseSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth/token";

function getSession(request) {
  return parseSessionToken(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export async function GET(request) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user = findUserById(session.sub);

  return NextResponse.json({
    user: user
      ? getPublicUser(user)
      : {
          id: session.sub,
          name: session.name,
          firstName: session.name.split(" ")[0] ?? "",
          lastName: session.name.split(" ").slice(1).join(" "),
          email: session.email,
          role: session.role,
        },
  });
}

export async function PUT(request) {
  const session = getSession(request);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const user = updateUserProfile(session.sub, {
    firstName: String(body.firstName ?? "").trim(),
    middleName: String(body.middleName ?? "").trim(),
    lastName: String(body.lastName ?? "").trim(),
    phone: String(body.phone ?? "").trim(),
    nationalId: String(body.nationalId ?? "").trim(),
  });

  if (!user) {
    return NextResponse.json({ message: "Profile not found." }, { status: 404 });
  }

  return NextResponse.json({ user: getPublicUser(user) });
}
