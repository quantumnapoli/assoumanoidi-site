import { capoversi, inLingua, type Libro, type LibroCompleto } from "../dati";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

/**
 * Libri sugli umanoidi, per la divulgazione. Area NASCOSTA: non è nel menù né nella sitemap, le pagine sono noindex
 * e si aprono solo con il token di anteprima (o con LIBRI_PUBBLICI=1). I testi del catalogo sono in italiano.
 */

export const FILONI = {
  it: {
    narrativa: "Narrativa e fantascienza", creazione: "Creazione e storia degli umanoidi",
    etica: "Etica, società, filosofia", saggistica: "Saggistica e divulgazione",
  },
  en: {
    narrativa: "Fiction and science fiction", creazione: "Building humanoids: history and engineering",
    etica: "Ethics, society, philosophy", saggistica: "Non-fiction and popular science",
  },
} as const;

const T = {
  it: {
    articolo: "AssoUmanoidi — Libri", soprattitolo: "Libri", titolo: "sugli umanoidi.",
    intro: "Una selezione per capire gli umanoidi: i romanzi che li hanno immaginati, i libri su come si costruiscono e le riflessioni su cosa significano per noi.",
    vuoto: "Nessun libro in questa selezione.", indietro: "← Tutti i libri", bozza: "Bozza", soloIt: "Descrizione disponibile solo in italiano.",
    edizioneIt: "Edizione italiana", edizioneOr: "Edizione originale", perche: "Perché leggerlo", fonti: "Fonti consultate", verificare: "Dati in corso di verifica",
    aperto: "Apri", nonTradotto: "Nessuna edizione italiana nota",
  },
  en: {
    articolo: "AssoUmanoidi — Books", soprattitolo: "Books", titolo: "about humanoids.",
    intro: "A selection to understand humanoids: the novels that imagined them, the books on how they are built, and the reflections on what they mean for us.",
    vuoto: "No books in this selection.", indietro: "← All books", bozza: "Draft", soloIt: "Description available in Italian only.",
    edizioneIt: "Italian edition", edizioneOr: "Original edition", perche: "Why read it", fonti: "Sources", verificare: "Details being verified",
    aperto: "Open", nonTradotto: "No Italian edition known",
  },
} as const;

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

const q = (token: string | null) => (token ? `?anteprima=${encodeURIComponent(token)}` : "");
const titolo = (l: Libro, lingua: Lingua) => (lingua === "it" ? l.title.it ?? l.title.original : l.title.original);

export function Libri({ voci, lingua, token, filone }: { voci: Libro[]; lingua: Lingua; token: string | null; filone: string | null }) {
  const t = T[lingua];
  const base = PAGINE.libri[lingua];
  const nomi = FILONI[lingua] as Record<string, string>;
  const mostrati = filone ? voci.filter((v) => v.strands.includes(filone)) : voci;
  const gruppi = Object.keys(nomi).map((k) => [k, mostrati.filter((v) => (v.strands[0] ?? "saggistica") === k)] as const).filter(([, v]) => v.length);
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.libri[altra(lingua)]}${q(token)}`}>
      <main className="au-pagina au-libri">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <h1>{t.soprattitolo}<br /><span className="h">{t.titolo}</span></h1>
          <p className="au-pag-intro">{t.intro}</p>
          <nav className="au-lib-filtri" aria-label="Filtri">
            <a href={`${base}${q(token)}`} aria-current={!filone ? "page" : undefined}>{lingua === "it" ? "Tutti" : "All"}</a>
            {Object.entries(nomi).map(([k, n]) => (
              <a key={k} href={`${base}?${token ? `anteprima=${encodeURIComponent(token)}&` : ""}filone=${k}`} aria-current={filone === k ? "page" : undefined}>{n}</a>
            ))}
          </nav>
        </header>
        <section className="au-pag-corpo">
          {gruppi.length ? gruppi.map(([k, lista]) => (
            <div key={k} className="au-lib-gruppo">
              <h2>{nomi[k]} <span>{lista.length}</span></h2>
              <ul className="au-lib-lista">
                {lista.map((l) => (
                  <li key={l.slug}>
                    <a href={`${base}/${l.slug}${q(token)}`}>
                      <span className="au-lib-aut">{l.author}{l.year ? ` · ${l.year}` : ""}</span>
                      <strong>{titolo(l, lingua)}</strong>
                      {l.title.it && lingua === "it" && l.title.it !== l.title.original && <em>{l.title.original}</em>}
                      <p lang="it">{inLingua(l.description, lingua)}</p>
                      {l.draft && <span className="au-lib-bozza">{t.bozza}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )) : <p className="au-dir-vuoto">{t.vuoto}</p>}
        </section>
      </main>
    </Guscio>
  );
}

export function LibroPagina({ l, lingua, token }: { l: LibroCompleto; lingua: Lingua; token: string | null }) {
  const t = T[lingua];
  const nomi = FILONI[lingua] as Record<string, string>;
  const descr = inLingua(l.description, lingua);
  const soloIt = lingua === "en" && !l.description.en;
  return (
    <Guscio lingua={lingua} altraLingua={`${PAGINE.libri[altra(lingua)]}/${l.slug}${q(token)}`}>
      <main className="au-pagina au-libro">
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={`${PAGINE.libri[lingua]}${q(token)}`}>{t.indietro}</a>
          <div className="art">{l.author}{l.year ? ` · ${l.year}` : ""}{l.draft ? ` · ${t.bozza}` : ""}</div>
          <h1>{titolo(l, lingua)}</h1>
          {l.title.it && l.title.it !== l.title.original && <p className="au-pag-intro">{lingua === "it" ? `Titolo originale: ${l.title.original}` : l.title.original}</p>}
          <p className="au-lib-tag">{[l.strands.map((s) => nomi[s]).filter(Boolean).join(" · "), l.topic].filter(Boolean).join(" — ")}</p>
        </header>
        <section className="au-pag-corpo au-not-corpo">
          {soloIt && <p className="au-not-avviso">{t.soloIt}</p>}
          {descr && <div lang={soloIt ? "it" : undefined}>{capoversi(descr).map((c, i) => <p key={i}>{c}</p>)}</div>}
          {l.why && <><h2>{t.perche}</h2><p lang="it">{l.why}</p></>}
          <dl className="au-lib-edizioni">
            <dt>{t.edizioneIt}</dt>
            <dd>{l.italian ? [l.italian.publisher, l.italian.year, l.italian.isbn && `ISBN ${l.italian.isbn}`].filter(Boolean).join(" · ") || "—" : t.nonTradotto}</dd>
            {(l.originalEdition.publisher || l.originalEdition.isbn) && (
              <><dt>{t.edizioneOr}</dt><dd>{[l.originalEdition.publisher, l.originalEdition.isbn && `ISBN ${l.originalEdition.isbn}`].filter(Boolean).join(" · ")}</dd></>
            )}
          </dl>
          {!l.verified && <p className="au-not-avviso">{t.verificare}</p>}
          {l.sources.length > 0 && (
            <>
              <h2>{t.fonti}</h2>
              <ul className="au-lib-fonti">{l.sources.map((u) => <li key={u}><a href={u} target="_blank" rel="noopener noreferrer nofollow">{u.replace(/^https?:\/\/(www\.)?/, "").slice(0, 70)}</a></li>)}</ul>
            </>
          )}
        </section>
      </main>
    </Guscio>
  );
}
