import { NextResponse } from "next/server";

/**
 * Riceve le adesioni dalla landing.
 *
 * ⚠️ V1: valida e registra nei log del server. NON invia email e NON salva da nessuna parte.
 * Prima di andare in produzione collegare qui una delle due cose:
 *   - un invio email (Resend / Postmark / SMTP) verso la casella dell'associazione;
 *   - una riga su un foglio o su un CRM (Airtable, Notion, Supabase…).
 * Finché non è collegato, le adesioni si perdono: la pagina dice "richiesta ricevuta".
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CAMERE = ["persona", "tutor", "organizzazione"];

export async function POST(richiesta: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await richiesta.json();
  } catch {
    return NextResponse.json({ errore: "Corpo della richiesta non leggibile." }, { status: 400 });
  }

  const camera = String(corpo.camera ?? "");
  const email = String(corpo.email ?? "").trim();
  const nome = String(corpo.nome ?? "").trim();

  if (!CAMERE.includes(camera)) {
    return NextResponse.json({ errore: "Camera non valida." }, { status: 400 });
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ errore: "Indirizzo email non valido." }, { status: 400 });
  }
  if (!nome) {
    return NextResponse.json({ errore: "Il nome del referente serve." }, { status: 400 });
  }
  if (!corpo.consenso) {
    return NextResponse.json({ errore: "Manca il consenso al trattamento." }, { status: 400 });
  }

  // TODO(v2): sostituire con invio email / scrittura su CRM.
  console.log("[adesione]", { camera, nome, email, ricevuta: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
