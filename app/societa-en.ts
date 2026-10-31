import type { Societa } from "./societa";
import type { Lingua } from "./lingue";

/**
 * Etichette della directory in inglese. I dati restano in italiano in `societa.ts`
 * (sono la chiave dei filtri); qui si traduce solo ciò che si mostra.
 * Se un valore nuovo non è in tabella si vede in italiano, e `tsc` non se ne accorge:
 * per questo `vista` lo segnala in console in sviluppo.
 */

const PAESE: Record<string, string> = {
  Australia: "Australia",
  Canada: "Canada",
  Cina: "China",
  "Corea del Sud": "South Korea",
  Francia: "France",
  "Francia / Cina": "France / China",
  Germania: "Germany",
  Giappone: "Japan",
  "Hong Kong": "Hong Kong",
  India: "India",
  Iran: "Iran",
  Israele: "Israel",
  Italia: "Italy",
  Norvegia: "Norway",
  Polonia: "Poland",
  "Regno Unito": "United Kingdom",
  Russia: "Russia",
  Singapore: "Singapore",
  Spagna: "Spain",
  "Stati Uniti": "United States",
  Svezia: "Sweden",
  Taiwan: "Taiwan",
  Turchia: "Turkey",
  Vietnam: "Vietnam",
};

const AREA: Record<string, string> = {
  Asia: "Asia",
  Europa: "Europe",
  "Medio Oriente": "Middle East",
  "Nord America": "North America",
  Oceania: "Oceania",
  "Sud America": "South America",
};

const TIPO: Record<string, string> = {
  "Azienda privata": "Private company",
  "Azienda quotata": "Listed company",
  "Istituto di ricerca": "Research institute",
  "Laboratorio aziendale": "Corporate lab",
  "Laboratorio di ricerca": "Research lab",
  "Università / laboratorio": "University / lab",
};

const STADIO: Record<string, string> = {
  "Sul mercato": "On the market",
  "In pilot": "In pilot",
  "In sviluppo": "In development",
};

const USO: Record<string, string> = {
  accoglienza: "hospitality",
  assistenza: "assistance",
  casa: "home",
  educazione: "education",
  intrattenimento: "entertainment",
  ispezione: "inspection",
  "lavoro generico": "general labor",
  logistica: "logistics",
  manifattura: "manufacturing",
  retail: "retail",
  ricerca: "research",
  sanità: "healthcare",
  servizi: "services",
  sicurezza: "security",
  sviluppo: "development",
  teleoperazione: "teleoperation",
};

const tr = (tabella: Record<string, string>, v: string) => {
  if (!(v in tabella) && process.env.NODE_ENV !== "production") {
    console.warn(`[societa-en] manca la traduzione di «${v}»`);
  }
  return tabella[v] ?? v;
};

/** Riga della directory pronta da mostrare, nella lingua scelta. */
export type RigaDirectory = {
  nome: string;
  sito: string;
  dominio: string;
  sitoVerificato: boolean;
  sulMercato: boolean;
  paese: string;
  area: string;
  tipo: string;
  stadio: string;
  modelli: string[];
  usi: string[];
};

export function vista(s: Societa, l: Lingua): RigaDirectory {
  const en = l === "en";
  return {
    nome: s.nome,
    sito: s.sito,
    dominio: s.dominio,
    sitoVerificato: s.sitoVerificato,
    sulMercato: s.stadio === "Sul mercato",
    paese: en ? s.paese.split(" / ").map((p) => tr(PAESE, p)).join(" / ") : s.paese,
    area: en ? tr(AREA, s.area) : s.area,
    tipo: en ? tr(TIPO, s.tipo) : s.tipo,
    stadio: en ? tr(STADIO, s.stadio) : s.stadio,
    modelli: s.modelli,
    usi: en ? s.usi.map((u) => tr(USO, u)) : s.usi,
  };
}
