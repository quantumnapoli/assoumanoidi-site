import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Bilingue } from "../components/Bilingue";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { Testata } from "../components/Testata";
import { DATI_RIVISTA, NORME, type TestiNorme } from "../rivista-testi";

function Corpo({ t, sito }: { t: TestiNorme; sito: Lingua }) {
  const it = t.lingua === "it";
  const indirizzi = DATI_RIVISTA.emailRedazione && DATI_RIVISTA.emailDirezione;

  return (
    <>
      <header className="au-pag-testa">
        <div className="art">{t.articolo}</div>
        <Testata className="au-pag-testata" />
        <h1>
          {t.soprattitolo}
          <br />
          <span className="h">{t.titolo}</span>
        </h1>
        <p className="au-pag-intro" style={{ marginTop: 22 }}>
          {t.intro}
        </p>
      </header>

      <section className="au-pag-corpo">
        <nav className="au-doc-indice au-riv-indice" aria-label={it ? "Indice" : "Contents"}>
          {t.blocchi.map((b, i) => (
            <a key={b.titolo} href={`#${t.lingua}-n${i}`}>
              <em>{b.numero}</em>
              <span>{b.titolo}</span>
            </a>
          ))}
          <a href={`#${t.lingua}-invio`}>
            <span>{t.invio.titolo}</span>
          </a>
        </nav>

        {t.blocchi.map((b, i) => (
          <section className="au-doc-titolo" id={`${t.lingua}-n${i}`} key={b.titolo}>
            <h2 className="au-doc-titolo-tit">
              {b.numero && <span className="dati">{b.numero}</span>}
              {b.titolo}
            </h2>

            {b.paragrafi?.map((p) => (
              <p className="au-riv-par" key={p}>
                {p}
              </p>
            ))}

            {b.voci && (
              <ul className="au-riv-voci">
                {b.voci.map((v) => (
                  <li className={v.et ? undefined : "senza-et"} key={(v.et ?? "") + v.testo}>
                    {v.et && <span>{v.et}</span>}
                    <p>{v.testo}</p>
                  </li>
                ))}
              </ul>
            )}

            {b.dopo?.map((p) => (
              <p className="au-riv-par" key={p}>
                {p}
              </p>
            ))}
          </section>
        ))}

        <section className="au-doc-titolo" id={`${t.lingua}-invio`}>
          <h2 className="au-doc-titolo-tit">{t.invio.titolo}</h2>
          <p className="au-riv-par">
            {indirizzi
              ? t.invio.inviaA(DATI_RIVISTA.emailRedazione, DATI_RIVISTA.emailDirezione)
              : t.invio.senzaIndirizzi}
          </p>
          <ul className="au-riv-voci">
            <li>
              <span>{t.invio.oggetto.et}</span>
              <p>{t.invio.oggetto.val}</p>
            </li>
          </ul>
        </section>

        <nav className="au-doc-rimandi">
          <span className="au-doc-rimandi-tit">{it ? "Per proseguire" : "Continue"}</span>
          <a href={PAGINE.colophon[sito]}>Colophon →</a>
          <a href={`${PAGINE.home[sito]}#rivista`.replace("//", "/")}>{it ? "La rivista →" : "The journal →"}</a>
        </nav>
      </section>
    </>
  );
}

export function Norme({ lingua }: { lingua: Lingua }) {
  const { NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={PAGINE.normeAutori[altra(lingua)]}
      />
      <main className="au-pagina au-doc">
        <Bilingue
          iniziale={lingua}
          it={<Corpo t={NORME.it} sito={lingua} />}
          en={<Corpo t={NORME.en} sito={lingua} />}
        />
      </main>
      <Piede lingua={lingua} />
    </>
  );
}
