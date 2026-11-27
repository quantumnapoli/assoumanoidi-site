import type { MetadataRoute } from "next";
import { haScheda, modelli, notizie, produttoriPremium } from "./dati";
import { PAGINE, type Pagina } from "./lingue";

const SITO = "https://assoumanoidi.it";

export const revalidate = 3600;

/** Una voce per pagina e lingua, con il gemello nell'altra lingua (hreflang); più le schede dei produttori e le notizie. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const coppia = (it: string, en: string, lastModified?: string) => {
    const languages = { it: `${SITO}${it}`, en: `${SITO}${en}` };
    return [
      { url: languages.it, alternates: { languages }, ...(lastModified ? { lastModified } : {}) },
      { url: languages.en, alternates: { languages }, ...(lastModified ? { lastModified } : {}) },
    ];
  };
  const pagine = (Object.keys(PAGINE) as Pagina[]).flatMap((p) => coppia(PAGINE[p].it, PAGINE[p].en));
  const schede = (await produttoriPremium()).flatMap((p) => coppia(`${PAGINE.directory.it}/${p.slug}`, `${PAGINE.directory.en}/${p.slug}`));
  const news = (await notizie(50)).flatMap((n) => coppia(`${PAGINE.notizie.it}/${n.slug}`, `${PAGINE.notizie.en}/${n.slug}`, n.date));
  const mod = (await modelli()).filter(haScheda).flatMap((m) => coppia(`${PAGINE.modelli.it}/${m.slug}`, `${PAGINE.modelli.en}/${m.slug}`, m.updated ?? undefined));
  return [...pagine, ...schede, ...news, ...mod];
}
