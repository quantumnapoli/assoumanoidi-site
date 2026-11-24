import { SOCIETA, type Societa } from "./societa";

/**
 * Dati dinamici del sito: la directory dei produttori e le notizie dell'associazione.
 *
 * Vivono nel database della piattaforma (repo assoumaniidi-digest, ADR 0011) e si leggono dalla sua API pubblica.
 * Le pagine si rigenerano ogni 5 minuti. Se l'API non risponde la directory ripiega su `societa.ts`
 * (la rilevazione nel codice) e le notizie restano vuote: il sito non si rompe mai per un servizio esterno.
 */

const API = (process.env.ASSO_API_URL ?? "https://web-production-5f011.up.railway.app").replace(/\/$/, "");
export const RINFRESCO = 300;

async function leggi<T>(percorso: string): Promise<T | null> {
  try {
    const r = await fetch(`${API}${percorso}`, { next: { revalidate: RINFRESCO }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    return (await r.json()) as T;
  } catch {
    return null;
  }
}

/** Stesso slug della piattaforma (packages/db: norm + slugify): minuscolo, senza accenti né punteggiatura. */
export function slugDi(nome: string): string {
  return nome
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

type Bilingue = { it: string | null; en: string | null };

export type Produttore = Societa & {
  slug: string;
  premium: boolean;
  logo: string | null;
  frase: Bilingue | null;
};

export type SchedaPremium = {
  tagline: Bilingue;
  description: Bilingue;
  contact: { email: string | null; phone: string | null; address: string | null };
  video: string | null;
  links: { label: string; url: string }[];
  logo: string | null;
  cover: { url: string; alt: string | null } | null;
};

export type SchedaProduttore = Produttore & { profilo: SchedaPremium | null };

type ApiAzienda = {
  slug: string; name: string; website: string | null; domain: string | null; country: string | null; area: string | null;
  type: string | null; stage: string; fullBody: boolean | null; uses: string[]; note: string | null; models: string[];
  siteVerified: boolean; premium: boolean; logo?: string | null; tagline?: Bilingue; profile?: SchedaPremium;
};

const daApi = (a: ApiAzienda): Produttore => ({
  nome: a.name,
  sito: a.website ?? "",
  dominio: a.domain ?? "",
  paese: a.country ?? "",
  area: (a.area ?? "Europa") as Societa["area"],
  modelli: a.models ?? [],
  stadio: a.stage as Societa["stadio"],
  corpoIntero: !!a.fullBody,
  tipo: a.type ?? "",
  usi: a.uses ?? [],
  nota: a.note ?? "",
  sitoVerificato: !!a.siteVerified,
  slug: a.slug,
  premium: !!a.premium,
  logo: a.logo ?? null,
  frase: a.tagline ?? null,
});

export const daFile = (s: Societa): Produttore => ({ ...s, slug: slugDi(s.nome), premium: false, logo: null, frase: null });

/** Tutti i produttori pubblicati, in ordine alfabetico. `fonte` dice da dove vengono (per i log e i conteggi). */
export async function produttori(): Promise<{ lista: Produttore[]; fonte: "database" | "file" }> {
  const r = await leggi<{ items: ApiAzienda[] }>("/api/directory");
  if (r?.items?.length) return { lista: r.items.map(daApi), fonte: "database" };
  return { lista: SOCIETA.map(daFile), fonte: "file" };
}

export async function produttore(slug: string): Promise<SchedaProduttore | null> {
  const a = await leggi<ApiAzienda>(`/api/directory/${encodeURIComponent(slug)}`);
  if (a?.slug) return { ...daApi(a), profilo: a.profile ?? null };
  const s = SOCIETA.find((x) => slugDi(x.nome) === slug);
  return s ? { ...daFile(s), profilo: null } : null;
}

export function conti(lista: Societa[]) {
  return {
    totale: lista.length,
    paesi: new Set(lista.flatMap((s) => s.paese.split(" / ").filter(Boolean))).size,
    sulMercato: lista.filter((s) => s.stadio === "Sul mercato").length,
  };
}

/* ---------------------------------------------------------------- notizie dell'associazione */

export type Notizia = {
  slug: string;
  date: string;
  title: Bilingue;
  summary: Bilingue;
  image: { thumb: string; full: string; alt: string | null } | null;
};
export type NotiziaCompleta = Notizia & { body: Bilingue; updated: string };

export async function notizie(n = 30): Promise<Notizia[]> {
  const r = await leggi<{ items: Notizia[] }>(`/api/notizie?n=${n}`);
  return r?.items ?? [];
}

export async function notizia(slug: string): Promise<NotiziaCompleta | null> {
  const r = await leggi<NotiziaCompleta>(`/api/notizie/${encodeURIComponent(slug)}`);
  return r?.slug ? r : null;
}

/** Testo nella lingua della pagina; l'inglese mancante ripiega sull'italiano. */
export const inLingua = (b: Bilingue | null | undefined, l: "it" | "en") => (b ? (l === "en" ? b.en || b.it : b.it) ?? "" : "");

/** Capoversi separati da una riga vuota. */
export const capoversi = (t: string) => t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
