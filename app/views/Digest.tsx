import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { Testata } from "../components/Testata";

/**
 * Il Digest vive su Humanoide (humanoideonline.com/digest). Qui AssoUmanoidi, che ne è l'editore, ne mostra le ultime notizie
 * leggendo il feed pubblico e rimanda alla notizia completa su Humanoide: il testo sta in un solo posto.
 */
const FEED = process.env.DIGEST_FEED_URL ?? "https://humanoideonline.com/digest/feed.json";
const HOME = { it: "https://humanoideonline.com/digest", en: "https://humanoideonline.com/en/digest" };

type Voce = {
  id: number; date: string | null; category: Record<Lingua, string>; title: Record<Lingua, string>; summary: Record<Lingua, string>;
  url: Record<Lingua, string>; image: { thumb: string; alt: Record<Lingua, string | null> } | null;
};

async function ultime(n: number): Promise<Voce[] | null> {
  try {
    const r = await fetch(`${FEED}?n=${n}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    if (!r.ok) return null;
    const j = (await r.json()) as { items?: Voce[] };
    return Array.isArray(j.items) ? j.items : null;
  } catch {
    return null; // il Digest non risponde: la pagina resta in piedi con il solo rimando
  }
}

const T = {
  it: {
    articolo: "Humanoide – Digest", titolo: "Le notizie sugli umanoidi", vai: "Tutte le notizie su Humanoide",
    intro: "Il Digest di Humanoide, la rivista di AssoUmanoidi: notizie brevi sui robot umanoidi, dalle aziende, dai centri di ricerca e dalle testate di settore, sempre con la fonte citata.",
    vuoto: "Le ultime notizie non sono disponibili in questo momento.", leggi: "Leggi su Humanoide",
  },
  en: {
    articolo: "Humanoide – Digest", titolo: "Humanoid robot news", vai: "All the news on Humanoide",
    intro: "The Humanoide Digest, from AssoUmanoidi's journal: short news on humanoid robots from companies, research labs and trade outlets, always with the source cited.",
    vuoto: "The latest news is not available right now.", leggi: "Read on Humanoide",
  },
};

const data = (d: string | null, l: Lingua) =>
  d ? new Date(`${d}T12:00:00Z`).toLocaleDateString(l === "it" ? "it-IT" : "en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Rome" }) : "";

export async function Digest({ lingua }: { lingua: Lingua }) {
  const { NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  const t = T[lingua];
  const voci = await ultime(12);
  return (
    <>
      <Nav sottopagina lingua={lingua} voci={NAV(ROTTE)} testi={NAV_TESTI} aderisci={ROTTE.aderisci} altraLingua={PAGINE.digest[altra(lingua)]} />
      <main className="au-pagina au-doc">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <Testata className="au-pag-testata" />
          <h1>{t.titolo}</h1>
          <p className="au-pag-intro" style={{ marginTop: 22 }}>{t.intro}</p>
          <p style={{ marginTop: 28 }}><a className="btn btn-pieno btn-lg" href={HOME[lingua]}>{t.vai} →</a></p>
        </header>
        <section className="au-pag-corpo">
          {voci?.length ? (
            <div className="au-dg-griglia">
              {voci.map((v) => (
                <a className="au-dg-card" key={v.id} href={v.url[lingua]}>
                  <div className="ph">{v.image && <img src={v.image.thumb} alt={v.image.alt[lingua] ?? ""} width={640} height={360} loading="lazy" />}</div>
                  <div className="tx">
                    <div className="au-dg-meta"><time dateTime={v.date ?? undefined}>{data(v.date, lingua)}</time><span>{v.category[lingua]}</span></div>
                    <h2>{v.title[lingua]}</h2>
                    <p>{v.summary[lingua]}</p>
                    <span className="au-dg-leggi">{t.leggi} →</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <p className="au-pag-intro">{t.vuoto} <a href={HOME[lingua]}>{t.vai} →</a></p>
          )}
        </section>
      </main>
      <Piede lingua={lingua} />
    </>
  );
}
