import "server-only";
import { type JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { env } from "@/env";
import { cache } from "react";
import { NextResponse, type NextRequest } from "next/server";

const key = new TextEncoder().encode(env.AUTH_SECRET);

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7day")
    .sign(key);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload as JWTPayload & {
      userId: string;
      role: string;
      division: string;
      uname: string;
      name?: string;
    };
  } catch (err) {
    console.log("Error decrypting session");
    return null;
  }
}

export async function createSession(
  id: string,
  role: string,
  division: string,
  uname: string,
  name?: string
) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({
    userId: id,
    role: role,
    division: division,
    uname: uname,
    name: name,
    expires: expires,
  });

  cookies().set("session", session, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export const verifySession = cache(async () => {
  const cookie = cookies().get("session")?.value;

  if (!cookie) {
    return { isAuth: false};
  }

  const session = await decrypt(cookie);

  if (!session?.userId) {
    return { isAuth: false};
  }

  return {
    isAuth: true,
    userId: session.userId,
  };
});

export async function updateSession(_request: NextRequest) {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return;
  }

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt({ ...payload, expires: expires }),
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    expires: expires,
    sameSite: "lax",
  });

  return res;
}

export async function deleteSession() {
  cookies().set("session", "", {
    expires: new Date(0),
  });
}
