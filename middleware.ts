import { NextRequest, NextResponse } from "next/server";
import { DEMO_COOKIE, DEMO_TOKEN } from "./lib/demoAccess";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname === "/benvenuto" ||
    request.cookies.get(DEMO_COOKIE)?.value === DEMO_TOKEN
  ) {
    return NextResponse.next();
  }

  const welcomeUrl = request.nextUrl.clone();
  welcomeUrl.pathname = "/benvenuto";
  return NextResponse.rewrite(welcomeUrl);
}

export const config = {
  matcher: ["/((?!api/accesso|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

