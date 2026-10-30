import type { Metadata } from "next";
import { CARICHE, ROTTE, type Membro } from "../contenuti";
import { LinkFuturo } from "../components/Futuro";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

export const metadata: Metadata = {
  title: "Cariche sociali — AssoUmanoidi",
  description:
    "Gli organi di AssoUmanoidi e le persone che li compongono: Consiglio direttivo, Collegio dei probiviri, Consiglio scientifico.",
  alternates: { canonical: "/cariche-sociali" },
};

/** I due siti personali citati nelle biografie diventano link; il resto del testo resta com'è. */
const SITI = /(gabrielegobbo\.it|marcomarsili\.it)/;
function conLink(testo: string) {
  return testo.split(SITI).map((p, i) =>
    SITI.test(p) ? (
      <a href={`https://${p}`} target="_blank" rel="noopener noreferrer" key={i}>
        {p}
      </a>
    ) : (
      p
    ),
  );
}

/** Iniziali per chi non ha ancora una fotografia: «Stefano Colombara» → «SC». */
const iniziali = (nome: string) =>
  nome
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Profilo({ m }: { m: Membro }) {
  const [primo, ...resto] = m.bio ?? [];
  return (
    <>
      <div className="au-car-testa">
        {m.foto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="au-car-foto"
            src={m.foto}
            width={256}
            height={256}
            alt={`Ritratto di ${m.persona}`}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="au-car-foto monogramma" aria-hidden="true">
            {iniziali(m.persona)}
          </div>
        )}
        <div className="au-car-id">
          <div className="au-car-riga">
            <em>{m.ruolo}</em>
            {m.camera && <i className="au-car-camera">{m.camera}</i>}
          </div>
          <h3 className="au-car-nome">{m.persona}</h3>
        </div>
      </div>

      <div className="au-car-corpo">
        <p className="au-car-bio">{conLink(primo)}</p>
        {resto.length > 0 && (
          <details className="au-car-resto">
            <summary>Leggi la biografia completa</summary>
            {resto.map((p) => (
              <p className="au-car-bio" key={p.slice(0, 24)}>
                {conLink(p)}
              </p>
            ))}
          </details>
        )}
      </div>
    </>
  );
}

export default function CaricheSociali() {
  return (
    <>
      <Nav sottopagina />

      <main className="au-pagina au-doc">
        <header className="au-pag-testa">
          <div className="art">{CARICHE.articolo}</div>
          <h1>
            {CARICHE.soprattitolo}
            <br />
            <span className="h">{CARICHE.titolo}</span>
          </h1>
          <div className="au-pag-testa-in">
            <p className="au-pag-intro">{CARICHE.intro}</p>
            {CARICHE.mandato && <div className="au-car-mandato dati">{CARICHE.mandato}</div>}
          </div>
        </header>

        <section className="au-pag-corpo">
          {/* finché i nomi sono segnaposto lo si dice, invece di lasciar credere
              che siano le nomine vere: togliere `avviso` in contenuti.ts */}
          {CARICHE.avviso && (
            <p className="au-car-avviso" role="note">
              <strong>Provvisorio</strong>
              {CARICHE.avviso}
            </p>
          )}

          <div className="au-car-organi">
            {CARICHE.organi.map((o) => (
              <article
                className={`au-car-organo${o.membri.every((m: Membro) => m.bio) ? " profili" : ""}`}
                key={o.nome}
              >
                <header>
                  <h2>{o.nome}</h2>
                  <p>{o.testo}</p>
                </header>
                <ul className="au-car-membri">
                  {(o.membri as Membro[]).map((m, i) =>
                    m.bio ? (
                      <li className="profilo" key={`${m.ruolo}-${i}`}>
                        <Profilo m={m} />
                      </li>
                    ) : (
                      /* `persona` vuota → "Da nominare": la carica esiste comunque,
                         e si vede a colpo d'occhio che cosa manca ancora. */
                      <li className={m.persona ? undefined : "vuota"} key={`${m.ruolo}-${i}`}>
                        <div className="au-car-riga">
                          <em>{m.ruolo}</em>
                          {m.camera && <i className="au-car-camera">{m.camera}</i>}
                        </div>
                        <span>{m.persona || CARICHE.daNominare}</span>
                        {m.nota && <p className="au-car-nota">{m.nota}</p>}
                      </li>
                    ),
                  )}
                </ul>
              </article>
            ))}
          </div>

          <div className="au-car-note">
            <p>{CARICHE.nota}</p>
            <p>{CARICHE.camere}</p>
          </div>

          <nav className="au-doc-rimandi">
            <span className="au-doc-rimandi-tit">Documenti collegati</span>
            <a href={ROTTE.statuto.href}>Statuto →</a>
            <LinkFuturo chiave="consiglioScientifico">Consiglio Scientifico →</LinkFuturo>
            <LinkFuturo chiave="chiSiamo">Chi siamo →</LinkFuturo>
            <a href="/#camere">Le tre Camere →</a>
          </nav>
        </section>
      </main>

      <Piede />
    </>
  );
}
