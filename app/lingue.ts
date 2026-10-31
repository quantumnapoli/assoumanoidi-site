/**
 * Le due lingue del sito. L'italiano vive alla radice (`/`, `/directory`…), l'inglese sotto `/en`.
 * Ogni pagina ha il suo gemello nell'altra lingua: la tabella qui sotto è l'unico posto
 * che li lega, e serve al selettore di lingua e ai tag `hreflang`.
 */

export type Lingua = "it" | "en";

export const PAGINE = {
  home: { it: "/", en: "/en" },
  directory: { it: "/directory", en: "/en/directory" },
  cariche: { it: "/cariche-sociali", en: "/en/board" },
  statuto: { it: "/statuto", en: "/en/statute" },
  colophon: { it: "/rivista/colophon", en: "/en/journal/colophon" },
  normeAutori: { it: "/rivista/norme-per-autori", en: "/en/journal/author-guidelines" },
} as const;

export type Pagina = keyof typeof PAGINE;

export const altra = (l: Lingua): Lingua => (l === "it" ? "en" : "it");

/** `alternates` per i metadati: canonical della pagina e gemello nell'altra lingua. */
export const alternative = (p: Pagina, l: Lingua) => ({
  canonical: PAGINE[p][l],
  languages: { it: PAGINE[p].it, en: PAGINE[p].en, "x-default": PAGINE[p].it },
});
