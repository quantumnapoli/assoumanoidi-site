import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Bilingue } from "../components/Bilingue";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { Testata } from "../components/Testata";
import { COLOPHON, DATI_RIVISTA, type TestiColophon } from "../rivista-testi";

/** Una riga è «in sospeso» quando il documento dice che la pratica è in corso. */
const inSospeso = (val: string) => /^(in corso|pending)/i.test(val);

function Corpo({ t, sito }: { t: TestiColophon; sito: Lingua }) {
  const it = t.lingua === "it";
  const righe = [...t.editoriale];

  // Sede legale e codice fiscale: il documento li lasciava come segnaposto.
  // Compaiono solo se compilati in DATI_RIVISTA, subito dopo l'editore.
  const opzionali = [
    DATI_RIVISTA.sedeLegale && { et: t.etichetteOpzionali.sedeLegale, val: DATI_RIVISTA.sedeLegale },
    DATI_RIVISTA.codiceFiscale && { et: t.etichetteOpzionali.codiceFiscale, val: DATI_RIVISTA.codiceFiscale },
  ].filter((r): r is { et: string; val: string } => Boolean(r));
  righe.splice(1, 0, ...opzionali);

  return (
    <>
      <header className="au-pag-testa">
        <div className="art">{t.articolo}</div>
        <Testata className="au-pag-testata" />
        <h1>Colophon</h1>
        <p className="au-pag-intro" style={{ marginTop: 22 }}>
          {t.intro}
        </p>
      </header>

      <section className="au-pag-corpo">
        <dl className="au-riv-righe">
          {righe.map((r) => (
            <div className="au-riv-riga" key={r.et}>
              <dt>{r.et}</dt>
              <dd className={inSospeso(r.val) ? "sospeso" : undefined}>{r.val}</dd>
            </div>
          ))}
        </dl>

        <div className="au-riv-blocchi">
          {t.pubblicazione.map((s) => (
            <section className="au-riv-blocco" key={s.titolo}>
              <h2>{s.titolo}</h2>
              <p>{s.testo}</p>
            </section>
          ))}

          <aside className="au-riv-evidenza">
            <h2>{t.onlineFirst.titolo}</h2>
            <p>{t.onlineFirst.testo}</p>
          </aside>

          {t.legale.map((s) => (
            <section className="au-riv-blocco" key={s.titolo}>
              <h2>{s.titolo}</h2>
              <p>{s.testo}</p>
            </section>
          ))}
        </div>

        <nav className="au-doc-rimandi">
          <span className="au-doc-rimandi-tit">{it ? "Per proseguire" : "Continue"}</span>
          <a href={PAGINE.normeAutori[sito]}>{it ? "Norme per gli autori →" : "Author guidelines →"}</a>
          <a href={`${PAGINE.home[sito]}#rivista`.replace("//", "/")}>
            {it ? "La rivista →" : "The journal →"}
          </a>
        </nav>
      </section>
    </>
  );
}

export function Colophon({ lingua }: { lingua: Lingua }) {
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
        altraLingua={PAGINE.colophon[altra(lingua)]}
      />
      <main className="au-pagina au-doc">
        <Bilingue
          iniziale={lingua}
          it={<Corpo t={COLOPHON.it} sito={lingua} />}
          en={<Corpo t={COLOPHON.en} sito={lingua} />}
        />
      </main>
      <Piede lingua={lingua} />
    </>
  );
}
