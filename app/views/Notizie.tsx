import { capoversi, inLingua, type Notizia, type NotiziaCompleta } from "../dati";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

/**
 * Notizie dell'associazione (eventi, comunicati, attività). Le scrive la redazione nell'area riservata
 * della piattaforma; sono separate dal Digest, che è della rivista Humanoide.
 */

export const NOTIZIE_TESTI = {
  it: {
    articolo: "AssoUmanoidi — Notizie",
    soprattitolo: "Notizie",
    titolo: "dall'associazione.",
    intro: "Eventi, comunicati e attività di AssoUmanoidi. Per le notizie sul settore degli umanoidi c'è il Digest della rivista Humanoide.",
    vuoto: "Ancora nessuna notizia: torna a trovarci presto.",
    indietro: "← Tutte le notizie",
    leggi: "Leggi",
    soloIt: "Questa notizia è disponibile solo in italiano.",
  },
  en: {
    articolo: "AssoUmanoidi — News",
    soprattitolo: "News",
    titolo: "from the association.",
    intro: "Events, announcements and activities of AssoUmanoidi. For news about the humanoid industry, see the Digest of Humanoide magazine.",
    vuoto: "No news yet: check back soon.",
    indietro: "← All news",
    leggi: "Read",
    soloIt: "This news item is only available in Italian.",
  },
} as const;

const data = (iso: string, l: Lingua) =>
  new Date(iso).toLocaleDateString(l === "en" ? "en-GB" : "it-IT", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" });

function Guscio({ lingua, altraLingua, children }: { lingua: Lingua; altraLingua: string; children: React.ReactNode }) {
  const { NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  return (
    <>
      <Nav sottopagina lingua={lingua} voci={NAV(ROTTE)} testi={NAV_TESTI} aderisci={ROTTE.aderisci} altraLingua={altraLingua} />
      {children}
      <Piede lingua={lingua} />
    </>
  );
}

export function Notizie({ voci, lingua }: { voci: Notizia[]; lingua: Lingua }) {
  const t = NOTIZIE_TESTI[lingua];
  const base = PAGINE.notizie[lingua];
  return (
    <Guscio lingua={lingua} altraLingua={PAGINE.notizie[altra(lingua)]}>
      <main className="au-pagina au-notizie">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <h1>{t.soprattitolo}<br /><span className="h">{t.titolo}</span></h1>
          <p className="au-pag-intro">{t.intro}</p>
        </header>
        <section className="au-pag-corpo">
          {voci.length ? (
            <ul className="au-not-lista">
              {voci.map((n) => (
                <li key={n.slug}>
                  <a href={`${base}/${n.slug}`}>
                    {n.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={n.image.thumb} alt={n.image.alt ?? ""} loading="lazy" decoding="async" />
                    )}
                    <time dateTime={n.date}>{data(n.date, lingua)}</time>
                    <h2>{inLingua(n.title, lingua)}</h2>
                    {inLingua(n.summary, lingua) && <p>{inLingua(n.summary, lingua)}</p>}
                    <span className="au-not-leggi">{t.leggi} →</span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="au-dir-vuoto">{t.vuoto}</p>
          )}
        </section>
      </main>
    </Guscio>
  );
}

export function NotiziaPagina({ n, lingua }: { n: NotiziaCompleta; lingua: Lingua }) {
  const t = NOTIZIE_TESTI[lingua];
  const soloIt = lingua === "en" && !n.title.en;
  const ld = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: inLingua(n.title, lingua),
    description: inLingua(n.summary, lingua) || undefined,
    datePublished: n.date,
    dateModified: n.updated,
    image: n.image ? [n.image.full] : undefined,
    inLanguage: soloIt ? "it" : lingua,
    author: { "@type": "Organization", name: "AssoUmanoidi", url: "https://assoumanoidi.it" },
    publisher: { "@type": "Organization", name: "AssoUmanoidi", url: "https://assoumanoidi.it" },
  };
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.notizie[altra(lingua)]}/${n.slug}`}>
      <main className="au-pagina au-notizia">
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={PAGINE.notizie[lingua]}>{t.indietro}</a>
          <div className="art"><time dateTime={n.date}>{data(n.date, lingua)}</time></div>
          <h1 lang={soloIt ? "it" : undefined}>{inLingua(n.title, lingua)}</h1>
          {inLingua(n.summary, lingua) && <p className="au-pag-intro" lang={soloIt ? "it" : undefined}>{inLingua(n.summary, lingua)}</p>}
        </header>
        <section className="au-pag-corpo au-not-corpo">
          {n.image && (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={n.image.full} alt={n.image.alt ?? ""} />
            </figure>
          )}
          {soloIt && <p className="au-not-avviso">{t.soloIt}</p>}
          <div lang={soloIt ? "it" : undefined}>
            {capoversi(inLingua(n.body, lingua)).map((c, i) => <p key={i}>{c}</p>)}
          </div>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      </main>
    </Guscio>
  );
}
