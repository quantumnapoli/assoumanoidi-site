import type { MetadataRoute } from "next";
import { PAGINE, type Pagina } from "./lingue";

const SITO = "https://assoumanoidi.it";

/** Una voce per pagina e lingua, con il gemello nell'altra lingua (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGINE) as Pagina[]).flatMap((p) => {
    const languages = { it: `${SITO}${PAGINE[p].it}`, en: `${SITO}${PAGINE[p].en}` };
    return [
      { url: languages.it, alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
}
