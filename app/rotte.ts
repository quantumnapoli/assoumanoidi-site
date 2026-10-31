import type { Lingua } from "./lingue";

/**
 * Destinazioni del sito, per lingua.
 *
 * Le ancore (`#etica`…) sono uguali nelle due lingue: gli id delle sezioni non cambiano.
 * Le pagine `pronta: false` (V2) fanno aprire la scheda «in elaborazione» invece di un 404:
 * quando la pagina esiste si mette `pronta: true` e lo stesso link comincia a navigare.
 */

export type Destinazione = { href: string; pronta: boolean; esterna?: boolean };

export type Ancora =
  | "associazione"
  | "societa"
  | "asimov"
  | "etica"
  | "camere"
  | "carta"
  | "anagrafe"
  | "rivista"
  | "rete"
  | "aderisci";

export type ChiaveFutura =
  | "cartaPagina"
  | "anagrafePagina"
  | "statuto"
  | "cariche"
  | "directory"
  | "colophon"
  | "normeAutori"
  | "codiceEtico"
  | "chiSiamo"
  | "consiglioScientifico"
  | "contatti";

export type Rotte = Record<Ancora, string> & Record<ChiaveFutura, Destinazione>;

const ANCORE: Record<Ancora, string> = {
  associazione: "#associazione",
  societa: "#societa",
  asimov: "#asimov",
  etica: "#etica",
  camere: "#camere",
  carta: "#carta",
  anagrafe: "#anagrafe",
  rivista: "#rivista",
  rete: "#rete",
  aderisci: "#aderisci",
};

const IT: Rotte = {
  ...ANCORE,
  // V2 — pagine non ancora pubblicate
  cartaPagina: { href: "/carta", pronta: false },
  anagrafePagina: { href: "https://anagrafeumanoidi.it", pronta: false, esterna: true },
  statuto: { href: "/statuto", pronta: true },
  cariche: { href: "/cariche-sociali", pronta: true },
  directory: { href: "/directory", pronta: true },
  colophon: { href: "/rivista/colophon", pronta: true },
  normeAutori: { href: "/rivista/norme-per-autori", pronta: true },
  codiceEtico: { href: "/codice-etico", pronta: false },
  chiSiamo: { href: "/chi-siamo", pronta: false },
  consiglioScientifico: { href: "/consiglio-scientifico", pronta: false },
  contatti: { href: "/contatti", pronta: false },
};

const EN: Rotte = {
  ...ANCORE,
  cartaPagina: { href: "/en/charter", pronta: false },
  anagrafePagina: { href: "https://anagrafeumanoidi.it", pronta: false, esterna: true },
  statuto: { href: "/en/statute", pronta: true },
  cariche: { href: "/en/board", pronta: true },
  directory: { href: "/en/directory", pronta: true },
  colophon: { href: "/en/journal/colophon", pronta: true },
  normeAutori: { href: "/en/journal/author-guidelines", pronta: true },
  codiceEtico: { href: "/en/code-of-ethics", pronta: false },
  chiSiamo: { href: "/en/about", pronta: false },
  consiglioScientifico: { href: "/en/scientific-council", pronta: false },
  contatti: { href: "/en/contact", pronta: false },
};

export const rotte = (l: Lingua): Rotte => (l === "en" ? EN : IT);
