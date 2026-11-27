import { conti, produttori } from "../dati";
import { vista } from "../societa-en";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Elenco } from "../components/Elenco";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

export async function Directory({ lingua }: { lingua: Lingua }) {
  const { DIRECTORY, SOCIETA_TESTI, NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  const { lista } = await produttori();
  const righe = lista.map((s) => vista(s, lingua));
  const SOCIETA_CONTI = conti(lista);

  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={PAGINE.directory[altra(lingua)]}
      />

      <main className="au-pagina au-dir">
        <header className="au-pag-testa">
          <div className="art">{DIRECTORY.articolo}</div>
          <h1>
            {DIRECTORY.soprattitolo}
            <br />
            <span className="h">{DIRECTORY.titolo}</span>
          </h1>
          <div className="au-pag-testa-in">
            <div>
              <p className="au-pag-intro">{DIRECTORY.intro}</p>
              <p className="au-mod-link"><a href={PAGINE.modelli[lingua]}>{lingua === "it" ? "Modelli e schede tecniche, con il confronto →" : "Models and specs, with comparison →"}</a></p>
            </div>
            <div className="au-dir-conti">
              <div>
                <b className="dati">{SOCIETA_CONTI.totale}</b>
                <span>{DIRECTORY.contatore}</span>
              </div>
              <div>
                <b className="dati">{SOCIETA_CONTI.paesi}</b>
                <span>{SOCIETA_TESTI.conti.paesi}</span>
              </div>
              <div>
                <b className="dati">{SOCIETA_CONTI.sulMercato}</b>
                <span>{SOCIETA_TESTI.conti.sulMercato}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="au-pag-corpo">
          <Elenco righe={righe} t={DIRECTORY} lingua={lingua} base={PAGINE.directory[lingua]} />
          <p className="au-dir-legenda">{DIRECTORY.legenda}</p>
          <p className="au-dir-legenda">{SOCIETA_TESTI.nota}</p>
        </section>
      </main>

      <Piede lingua={lingua} />
    </>
  );
}
