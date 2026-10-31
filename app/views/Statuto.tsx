import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { LinkFuturo } from "../components/Futuro";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

export function Statuto({ lingua }: { lingua: Lingua }) {
  const { STATUTO, NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={PAGINE.statuto[altra(lingua)]}
      />

      <main className="au-pagina au-doc">
        <header className="au-pag-testa">
          <div className="art">{STATUTO.articolo}</div>
          <h1>
            {STATUTO.soprattitolo}
            <br />
            <span className="h">{STATUTO.titolo}</span>
          </h1>
          <div className="au-pag-testa-in">
            <p className="au-pag-intro">{STATUTO.intro}</p>
            {STATUTO.pdf && (
              <div className="au-doc-azioni">
                <a className="btn btn-lg btn-pieno" href={STATUTO.pdf} download>
                  {STATUTO.ui.scarica}
                </a>
              </div>
            )}
          </div>
        </header>

        <section className="au-pag-corpo">
          <nav className="au-doc-indice" aria-label={STATUTO.ui.indice}>
            {STATUTO.titoli.map((t) => (
              <a key={t.numero} href={`#titolo-${t.numero}`}>
                <em>
                  {STATUTO.ui.titolo} {t.numero}
                </em>
                <span>{t.titolo}</span>
              </a>
            ))}
          </nav>

          {/* il testo integrale resta nell'originale italiano: lo dichiara `lang` */}
          {STATUTO.titoli.map((t) => (
            <section
              className="au-doc-titolo"
              id={`titolo-${t.numero}`}
              key={t.numero}
              lang={STATUTO.linguaTesto}
            >
              <h2 className="au-doc-titolo-tit">
                <span className="dati">Titolo {t.numero}</span>
                {t.titolo}
              </h2>

              <ol className="au-doc-articoli">
                {t.articoli.map((a) => (
                  <li className="au-doc-articolo" id={`art-${a.num}`} key={a.num}>
                    <span className="au-doc-num dati">Art. {a.num}</span>
                    <div>
                      <h3>{a.titolo}</h3>
                      {a.testo.map((paragrafo, i) => (
                        <p key={i}>{paragrafo}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}

          <nav className="au-doc-rimandi">
            <span className="au-doc-rimandi-tit">{STATUTO.rimandi}</span>
            <a href={ROTTE.cariche.href}>{STATUTO.ui.cariche}</a>
            <LinkFuturo chiave="codiceEtico">{STATUTO.ui.codice}</LinkFuturo>
            <LinkFuturo chiave="cartaPagina">{STATUTO.ui.carta}</LinkFuturo>
            <a href={`${lingua === "en" ? "/en" : "/"}#camere`}>{STATUTO.ui.camere}</a>
          </nav>
        </section>
      </main>

      <Piede lingua={lingua} />
    </>
  );
}
