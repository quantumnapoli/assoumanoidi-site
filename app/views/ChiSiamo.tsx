import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { Testata } from "../components/Testata";

/** Solo i titoli della pagina: il resto arriva dai testi già presenti nel sito. */
const TITOLI = {
  it: {
    articolo: "La società – Chi siamo",
    titolo: "Chi siamo",
    perche: "Perché esistiamo",
    camere: "Le tre Camere",
    chi: "Chi decide",
    chiTesto: "Gli organi, lo statuto e le persone che li compongono sono pubblici.",
    rimandi: ["Cariche sociali", "Statuto", "Directory dei costruttori"],
    continua: "Per proseguire",
  },
  en: {
    articolo: "The society – About us",
    titolo: "About us",
    perche: "Why we exist",
    camere: "The three Chambers",
    chi: "Who decides",
    chiTesto: "The bodies, the statute and the people who sit on them are public.",
    rimandi: ["Board", "Statute", "Directory of manufacturers"],
    continua: "Continue",
  },
} as const;

export function ChiSiamo({ lingua }: { lingua: Lingua }) {
  const { NAV, NAV_TESTI, HERO, PERCHE, CAMERE } = testi(lingua);
  const ROTTE = rotte(lingua);
  const t = TITOLI[lingua];
  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={PAGINE.chiSiamo[altra(lingua)]}
      />
      <main className="au-pagina au-doc">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <Testata className="au-pag-testata" />
          <h1>{t.titolo}</h1>
          <p className="au-pag-intro" style={{ marginTop: 22 }}>
            {HERO.sottotitolo}
          </p>
        </header>

        <section className="au-pag-corpo">
          <div className="au-riv-blocchi">
            <section className="au-riv-blocco">
              <h2>{t.perche}</h2>
              {PERCHE.paragrafi.map((p) => (
                <p key={p.slice(0, 30)}>{p.replace(/\*\*/g, "")}</p>
              ))}
            </section>

            <aside className="au-riv-evidenza">
              <p>{PERCHE.tesi}</p>
            </aside>

            <section className="au-riv-blocco">
              <h2>{t.camere}</h2>
              <p>{CAMERE.intro}</p>
              {CAMERE.voci.map((v) => (
                <section className="au-riv-blocco" key={v.nome}>
                  <h2>
                    {v.et} · {v.nome}
                  </h2>
                  <p>{v.testo}</p>
                </section>
              ))}
            </section>

            <section className="au-riv-blocco">
              <h2>{t.chi}</h2>
              <p>{t.chiTesto}</p>
            </section>
          </div>

          <nav className="au-doc-rimandi">
            <span className="au-doc-rimandi-tit">{t.continua}</span>
            <a href={PAGINE.cariche[lingua]}>{t.rimandi[0]} →</a>
            <a href={PAGINE.statuto[lingua]}>{t.rimandi[1]} →</a>
            <a href={PAGINE.directory[lingua]}>{t.rimandi[2]} →</a>
          </nav>
        </section>
      </main>
      <Piede lingua={lingua} />
    </>
  );
}
