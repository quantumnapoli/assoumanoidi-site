import type { Metadata } from "next";
import { DIRECTORY, SOCIETA_TESTI } from "../contenuti";
import { SOCIETA_CONTI } from "../societa";
import { Elenco } from "../components/Elenco";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

export const metadata: Metadata = {
  title: "Directory dei costruttori di umanoidi — AssoUmanoidi",
  description:
    "Il registro dei costruttori di robot umanoidi: 64 società censite in 21 paesi, con modelli, stato di sviluppo e impieghi. Rilevazione del 21 agosto 2026.",
  alternates: { canonical: "/directory" },
};

export default function Directory() {
  return (
    <>
      <Nav sottopagina />

      <main className="au-pagina au-dir">
        <header className="au-pag-testa">
          <div className="art">{DIRECTORY.articolo}</div>
          <h1>
            {DIRECTORY.soprattitolo}
            <br />
            <span className="h">{DIRECTORY.titolo}</span>
          </h1>
          <div className="au-pag-testa-in">
            <p className="au-pag-intro">{DIRECTORY.intro}</p>
            <div className="au-dir-conti">
              <div>
                <b className="dati">{SOCIETA_CONTI.totale}</b>
                <span>{DIRECTORY.contatore}</span>
              </div>
              <div>
                <b className="dati">{SOCIETA_CONTI.paesi}</b>
                <span>Paesi</span>
              </div>
              <div>
                <b className="dati">{SOCIETA_CONTI.sulMercato}</b>
                <span>Già sul mercato</span>
              </div>
            </div>
          </div>
        </header>

        <section className="au-pag-corpo">
          <Elenco />
          <p className="au-dir-legenda">{DIRECTORY.legenda}</p>
          <p className="au-dir-legenda">{SOCIETA_TESTI.nota}</p>
        </section>
      </main>

      <Piede />
    </>
  );
}
