import type { AuthUser, SessionPayload } from "@/types";

export const SESSION_COOKIE_NAME = "bus_ticket_session";
export const SESSION_MAX_AGE = 60 * 60 * 24;

const tokenHeader = { alg: "none", typ: "JWT" };

function encodeBase64Url(value: unknown) {
  const json = JSON.stringify(value);

  if (typeof btoa === "function") {
    return btoa(json)
      .replaceAll("+", "-")
      .replaceAll("/", "_")
      .replaceAll("=", "");
  }

  return Buffer.from(json)
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function decodeBase64Url<T>(value: string): T {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = base64.padEnd(
    base64.length + ((4 - (base64.length % 4)) % 4),
    "=",
  );

  if (typeof atob === "function") {
    return JSON.parse(atob(padded)) as T;
  }

  return JSON.parse(Buffer.from(padded, "base64").toString("utf8")) as T;
}

export function createSessionToken(user: AuthUser) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    iat: issuedAt,
    exp: issuedAt + SESSION_MAX_AGE,
  };

  return `${encodeBase64Url(tokenHeader)}.${encodeBase64Url(payload)}.mock-signature`;
}

export function parseSessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  try {
    const [, payload] = token.split(".");
    const session = decodeBase64Url<SessionPayload>(payload);
    const now = Math.floor(Date.now() / 1000);

    if (!session.sub || !session.role || session.exp <= now) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
