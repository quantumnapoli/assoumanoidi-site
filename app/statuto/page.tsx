import type { Metadata } from "next";
import { ROTTE, STATUTO } from "../contenuti";
import { LinkFuturo } from "../components/Futuro";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

export const metadata: Metadata = {
  title: "Statuto — AssoUmanoidi",
  description:
    "Lo statuto di AssoUmanoidi: costituzione, soci, organi, patrimonio. Il testo integrale, per titolo e articolo.",
  alternates: { canonical: "/statuto" },
};

export default function Statuto() {
  return (
    <>
      <Nav sottopagina />

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
                  Scarica lo statuto (PDF)
                </a>
              </div>
            )}
          </div>
        </header>

        <section className="au-pag-corpo">
          <nav className="au-doc-indice" aria-label="Indice dei titoli">
            {STATUTO.titoli.map((t) => (
              <a key={t.numero} href={`#titolo-${t.numero}`}>
                <em>Titolo {t.numero}</em>
                <span>{t.titolo}</span>
              </a>
            ))}
          </nav>

          {STATUTO.titoli.map((t) => (
            <section className="au-doc-titolo" id={`titolo-${t.numero}`} key={t.numero}>
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
            <a href={ROTTE.cariche.href}>Cariche sociali →</a>
            <LinkFuturo chiave="codiceEtico">Codice etico →</LinkFuturo>
            <LinkFuturo chiave="cartaPagina">Carta dei diritti e dei doveri →</LinkFuturo>
            <a href="/#camere">Le tre Camere →</a>
          </nav>
        </section>
      </main>

      <Piede />
    </>
  );
}
