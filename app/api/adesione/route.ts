import { NextResponse } from "next/server";
import { ADESIONI_ATTIVE } from "../../adesioni";
import { campiDaCorpo, salvaRichiesta } from "../../../lib/richieste";

/**
 * Riceve le richieste dal modulo di adesione e le salva in Netlify Blobs.
 * Non invia email: le richieste si consultano in /admin/richieste (accesso con password).
 * Con ADESIONI_ATTIVE=false risponde 503 senza leggere né salvare nulla.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const CAMERE = ["persona", "tutor", "organizzazione"];

export async function POST(richiesta: Request) {
  if (!ADESIONI_ATTIVE) {
    return NextResponse.json({ errore: "Le adesioni online non sono ancora attive." }, { status: 503 });
  }

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

  try {
    await salvaRichiesta({
      id: crypto.randomUUID(),
      ricevuta: new Date().toISOString(),
      camera,
      campi: campiDaCorpo(corpo),
    });
  } catch {
    return NextResponse.json(
      { errore: "Non siamo riusciti a registrare la richiesta. Riprova." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
