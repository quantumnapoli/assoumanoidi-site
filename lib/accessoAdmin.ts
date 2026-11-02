import { timingSafeEqual } from "node:crypto";

/**
 * Accesso al pannello delle richieste: password HTTP Basic (il nome utente non conta).
 * La password è nella variabile d'ambiente ADMIN_PASSWORD di Netlify, mai nel repository.
 * Se la variabile non è impostata, il pannello resta chiuso.
 */

export function pannelloConfigurato(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function autorizzato(request: Request): boolean {
  const atteso = process.env.ADMIN_PASSWORD;
  if (!atteso) return false;
  const intestazione = request.headers.get("authorization") ?? "";
  if (!intestazione.startsWith("Basic ")) return false;
  const decodificato = Buffer.from(intestazione.slice(6), "base64").toString("utf8");
  const due = decodificato.indexOf(":");
  const password = due >= 0 ? decodificato.slice(due + 1) : "";
  const a = Buffer.from(password);
  const b = Buffer.from(atteso);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const RICHIESTA_CREDENZIALI = {
  "WWW-Authenticate": 'Basic realm="Richieste AssoUmanoidi", charset="UTF-8"',
};

export const INTESTAZIONI_PRIVATE = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};
