import { NextRequest, NextResponse } from "next/server";
import { DEMO_COOKIE, DEMO_TOKEN } from "../../../lib/demoAccess";

/** Solo il percorso, e solo se il Referer è dello stesso sito: niente redirect verso l'esterno. */
function paginaDiPartenza(request: NextRequest) {
  try {
    const r = new URL(request.headers.get("referer") ?? "");
    if (r.origin === new URL(request.url).origin && r.pathname.startsWith("/") && !r.pathname.startsWith("//")) {
      return r.pathname;
    }
  } catch {
    /* Referer assente o illeggibile */
  }
  return "/";
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = formData.get("password");
  const expectedPassword = process.env.DEMO_PASSWORD ?? "Asso Umanoidi";

  // si torna alla pagina da cui si è partiti (anche sotto /en), non sempre alla home
  const dove = paginaDiPartenza(request);

  if (password !== expectedPassword) {
    return NextResponse.redirect(new URL(`${dove}?erro=1`, request.url), 303);
  }

  const response = NextResponse.redirect(new URL(dove, request.url), 303);
  response.cookies.set(DEMO_COOKIE, DEMO_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}

