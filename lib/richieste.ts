import { getStore } from "@netlify/blobs";

/**
 * Richieste dal modulo di adesione, salvate in Netlify Blobs (storage incluso nel sito Netlify).
 * Non si scrive su disco: le funzioni Netlify non hanno un filesystem persistente.
 */

export type Richiesta = {
  id: string;
  ricevuta: string;
  camera: string;
  campi: Record<string, string>;
};

/** Solo questi campi vengono salvati: il resto del corpo della richiesta viene scartato. */
export const CAMPI_AMMESSI = [
  "nome", "email", "citta", "professione", "motivazione",
  "modello", "produttore", "stato", "ambito",
  "organizzazione", "tipo", "ruolo", "sito",
] as const;

const LUNGHEZZA_MAX = 2000;

export function campiDaCorpo(corpo: Record<string, unknown>): Record<string, string> {
  const campi: Record<string, string> = {};
  for (const k of CAMPI_AMMESSI) {
    const v = String(corpo[k] ?? "").trim().slice(0, LUNGHEZZA_MAX);
    if (v) campi[k] = v;
  }
  return campi;
}

const store = () => getStore("richieste");

export async function salvaRichiesta(r: Richiesta): Promise<void> {
  // la chiave inizia con la data: l'elenco si ordina da solo
  await store().setJSON(`${r.ricevuta}_${r.id}`, r);
}

export async function elencoRichieste(): Promise<Richiesta[]> {
  const s = store();
  const { blobs } = await s.list();
  const righe = await Promise.all(
    blobs.map((b) => s.get(b.key, { type: "json" }) as Promise<Richiesta | null>),
  );
  return righe
    .filter((r): r is Richiesta => Boolean(r))
    .sort((a, b) => b.ricevuta.localeCompare(a.ricevuta));
}
