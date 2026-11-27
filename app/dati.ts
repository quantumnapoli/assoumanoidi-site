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
  /* --- scheda top: tutto facoltativo, ogni blocco compare solo se ha contenuto --- */
  /** cifre in evidenza: fondazione, persone, raccolta, sedi… (le scrive l'azienda, la redazione le verifica) */
  numeri?: { valore: string; etichetta: Bilingue }[];
  /** persone chiave che l'azienda sceglie di mostrare */
  persone?: { nome: string; ruolo: Bilingue; foto: string | null; linkedin: string | null }[];
  /** traguardi dal registro eventi (confermati dalla redazione) */
  traguardi?: { data: string; tipo: "funding" | "partnership" | "deployment" | "product" | "order" | "acquisition" | "ipo"; titolo: Bilingue; fonte: { nome: string; url: string } | null }[];
  /** notizie del Digest che parlano dell'azienda */
  notizie?: { titolo: Bilingue; data: string; url: { it: string; en: string } }[];
  galleria?: { url: string; alt: string }[];
  sedi?: { citta: string; ruolo: Bilingue }[];
  /** l'azienda è socia di AssoUmanoidi */
  socio?: boolean;
  /** pagina di prova con dati di esempio: mostra un avviso in cima */
  esempio?: boolean;
};

export type SchedaProduttore = Produttore & { profilo: SchedaPremium | null; schedeModelli?: Modello[] };

type ApiAzienda = {
  slug: string; name: string; website: string | null; domain: string | null; country: string | null; area: string | null;
  type: string | null; stage: string; fullBody: boolean | null; uses: string[]; note: string | null; models: string[];
  siteVerified: boolean; premium: boolean; logo?: string | null; tagline?: Bilingue; profile?: ApiProfilo; modelCards?: Modello[];
};

/** Scheda premium come la manda la piattaforma (chiavi in inglese); `daProfilo` la porta nella forma del sito. */
type ApiProfilo = Omit<SchedaPremium, "numeri" | "persone" | "traguardi" | "notizie" | "galleria" | "sedi" | "socio" | "esempio"> & {
  numbers?: { value: string; label: Bilingue }[];
  people?: { name: string; role: string | null; photo: string | null; linkedin: string | null }[];
  milestones?: { date: string; kind: NonNullable<SchedaPremium["traguardi"]>[number]["tipo"]; title: Bilingue; source: { name: string; url: string } | null }[];
  news?: { date: string; title: Bilingue; url: { it: string; en: string } }[];
  gallery?: { url: string; alt: string }[];
  locations?: { city: string; role: Bilingue }[];
  member?: boolean;
};

export const daProfilo = (p: ApiProfilo): SchedaPremium => {
  const { numbers, people, milestones, news, gallery, locations, member, ...resto } = p;
  return {
    ...resto,
    numeri: (numbers ?? []).map((n) => ({ valore: n.value, etichetta: n.label })),
    persone: (people ?? []).map((x) => ({ nome: x.name, ruolo: { it: x.role, en: x.role }, foto: x.photo, linkedin: x.linkedin })),
    traguardi: (milestones ?? []).map((e) => ({ data: e.date, tipo: e.kind, titolo: e.title, fonte: e.source ? { nome: e.source.name, url: e.source.url } : null })),
    notizie: (news ?? []).map((n) => ({ titolo: n.title, data: n.date, url: n.url })),
    galleria: gallery ?? [],
    sedi: (locations ?? []).map((x) => ({ citta: x.city, ruolo: x.role })),
    socio: !!member,
  };
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

/**
 * La pagina di un produttore esiste solo con un piano premium in corso: per tutti gli altri `null` (pagina non trovata)
 * e dalla directory si va direttamente al loro sito. Se l'API non risponde non c'è modo di sapere chi è premium: nessuna pagina.
 */
export async function produttore(slug: string): Promise<SchedaProduttore | null> {
  const a = await leggi<ApiAzienda>(`/api/directory/${encodeURIComponent(slug)}`);
  if (a?.slug && a.premium) return { ...daApi(a), profilo: a.profile ? daProfilo(a.profile) : null, schedeModelli: a.modelCards ?? [] };
  return null;
}

/** Produttori che hanno la propria pagina (premium in corso): per i percorsi statici e la sitemap. */
export async function produttoriPremium(): Promise<Produttore[]> {
  const { lista, fonte } = await produttori();
  return fonte === "database" ? lista.filter((p) => p.premium) : [];
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

/* ---------------------------------------------------------------- libri sugli umanoidi (area nascosta) */

export type Libro = {
  slug: string; title: { original: string; it: string | null }; author: string; year: number | null; language: string | null; country: string | null;
  kind: string | null; level: string | null; topic: string | null; strands: string[];
  italian: { publisher: string | null; year: number | null; isbn: string | null } | null;
  description: Bilingue; why: string | null; verified: boolean; draft?: boolean;
};
export type LibroCompleto = Libro & { originalEdition: { publisher: string | null; isbn: string | null }; sources: string[] };

/**
 * L'area libri è nascosta: si vede solo con il token di anteprima (?anteprima=…, lo riconosce la piattaforma)
 * oppure, quando sarà il momento, impostando LIBRI_PUBBLICI=1 sul sito. Le pagine con token non vanno mai in cache.
 */
export const libriPubblici = () => process.env.LIBRI_PUBBLICI === "1";

async function leggiLibri<T>(percorso: string, token: string | null): Promise<T | null> {
  const q = token ? `${percorso}${percorso.includes("?") ? "&" : "?"}anteprima=${encodeURIComponent(token)}` : percorso;
  try {
    const r = await fetch(`${API}${q}`, token ? { cache: "no-store", signal: AbortSignal.timeout(8000) } : { next: { revalidate: RINFRESCO }, signal: AbortSignal.timeout(8000) });
    return r.ok ? ((await r.json()) as T) : null;
  } catch {
    return null;
  }
}

/** `null` = area non accessibile (pagina 404). */
export async function libri(token: string | null): Promise<Libro[] | null> {
  const r = await leggiLibri<{ preview: boolean; items: Libro[] }>("/api/libri", token);
  if (!r || (!r.preview && !libriPubblici())) return null;
  return r.items;
}

export async function libro(slug: string, token: string | null): Promise<LibroCompleto | null> {
  const r = await leggiLibri<LibroCompleto & { preview: boolean }>(`/api/libri/${encodeURIComponent(slug)}`, token);
  if (!r || (!r.preview && !libriPubblici())) return null;
  return r;
}

/* ---------------------------------------------------------------- modelli di umanoidi (sottodirectory) */

export type Fonte = { url: string; for: string; nature: string };
export type Modello = {
  slug: string; name: string;
  company: { name: string; slug: string; country: string | null; website: string | null };
  kind: string | null; status: string | null; year: number | null;
  specs: Record<"height_cm" | "weight_kg" | "dof" | "payload_kg" | "battery_h" | "speed_ms", number | null>;
  price: { text: string; value: number | null; currency: string } | null;
  description: Bilingue; sources: Fonte[]; verification: "verificato" | "parziale"; updated: string | null;
};

/** Un modello ha la sua pagina solo se la scheda ha almeno una fonte: niente pagine vuote. */
export const haScheda = (m: Modello) => m.sources.length > 0;

export async function modelli(): Promise<Modello[]> {
  const r = await leggi<{ items: Modello[] }>("/api/modelli");
  return r?.items ?? [];
}

export async function modello(slug: string): Promise<Modello | null> {
  const r = await leggi<Modello>(`/api/modelli/${encodeURIComponent(slug)}`);
  return r?.slug && haScheda(r) ? r : null;
}
