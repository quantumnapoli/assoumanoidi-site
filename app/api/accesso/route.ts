import { NextRequest, NextResponse } from "next/server";
import { DEMO_COOKIE, DEMO_TOKEN } from "../../../lib/demoAccess";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");
  const expectedPassword = process.env.DEMO_PASSWORD ?? "Asso Umanoidi";

  if (password !== expectedPassword) {
    return NextResponse.redirect(new URL("/?erro=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/", request.url), 303);
  response.cookies.set(DEMO_COOKIE, DEMO_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

