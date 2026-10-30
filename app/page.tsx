import {
  ADESIONE,
  ASIMOV,
  ANAGRAFE,
  CAMERE,
  CARTA,
  HERO,
  MANIFESTO,
  MARQUEE,
  PERCHE,
  PILASTRI,
  RETE,
  RIVISTA,
  ROTTE,
  SOCIETA_TESTI,
} from "./contenuti";
import { SOCIETA, SOCIETA_CONTI } from "./societa";
import { Adesione } from "./components/Adesione";
import { LinkFuturo } from "./components/Futuro";
import { Motore } from "./components/Motore";
import { Nav } from "./components/Nav";
import { Piede } from "./components/Piede";
import { Anello, Marchio } from "./components/Marchio";
import { Testata } from "./components/Testata";

/** Evidenzia i rimandi da una legge all'altra: è lì che si vede la gerarchia. */
function evidenzia(testo: string, rimandi: string[]) {
  if (!rimandi.length) return testo;
  const re = new RegExp(`(${rimandi.join("|")})`, "g");
  return testo
    .split(re)
    .map((p, i) => (rimandi.includes(p) ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>));
}

/** `**testo**` → <strong> */
function forte(t: string) {
  return t
    .split("**")
    .map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>));
}

export default function Home() {
  return (
    <>
      <Nav />

      <Motore>
        {/* ---------------------------------------------------------- intro */}
        <div className="au-intro" aria-hidden="true">
          <div className="au-intro-centro">
            <Marchio />
            <div className="au-intro-parole">
              <span className="au-intro-parola">
                <span className="u">Umani.</span>
              </span>
              <span className="au-intro-parola">
                <span className="h">Umanoidi.</span>
              </span>
              <span className="au-intro-parola">Una società.</span>
              <span className="au-intro-parola">
                Asso<span className="h">Umanoidi</span>
              </span>
            </div>
          </div>
        </div>

        {/* la firma: l'anello si chiude attorno al marchio man mano che scendi */}
        <div className="au-rail" aria-hidden="true">
          <span className="au-rail-disco">
            <Anello />
            <Marchio />
          </span>
          <span className="au-rail-pct">0%</span>
        </div>

        {/* ----------------------------------------------------- 01 · hero */}
        <section className="au-hero" id="top">
          <div className="au-campo" aria-hidden="true" />
          <div className="au-grana" aria-hidden="true" />

          {/* l'atmosfera in stile antigravity.google: alone e particelle che
              reagiscono al mouse — vedi Motore.tsx, creaParticelleAria.
              Sotto i 1000px e con reduced-motion resta solo l'alone, fermo. */}
          <div className="au-hero-atmosfera" aria-hidden="true">
            <div className="au-hero-alone" />
            <canvas className="au-hero-tela" />
          </div>

          <div className="au-hero-copy">
            <div className="au-hero-marchio">{HERO.marchio}</div>
            <h1 aria-label={HERO.titolo.join(" ")}>
              <span className="au-riga" aria-hidden="true">
                <span className="au-riga-in">Prepariamo la società</span>
              </span>
              <span className="au-riga" aria-hidden="true">
                <span className="au-riga-in">alla convivenza tra</span>
              </span>
              <span className="au-riga" aria-hidden="true">
                <span className="au-riga-in">
                  esseri <span className="u">umani</span> e <span className="h">umanoidi</span>.
                </span>
              </span>
            </h1>
            <p className="au-hero-sub">{HERO.sottotitolo}</p>
            <div className="au-hero-azioni">
              <a className="btn btn-lg btn-pieno au-magnete" href={ROTTE.aderisci}>
                Aderisci
              </a>
              <a className="btn btn-lg btn-linea" href={ROTTE.associazione}>
                Scopri l’associazione ↓
              </a>
            </div>
          </div>

          {/* il portale si apre scrollando: dentro, i due dischi si raggiungono */}
          <div className="au-portale">
            {/* public/hero.mp4 — se il file manca resta il fondo navy e il testo,
                la sezione non si rompe */}
            <video
              className="au-portale-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-poster.jpg"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <div className="au-portale-velo" aria-hidden="true" />
            {/* al riposo del portale si vede solo questa fascia: senza, sarebbe
                un rettangolo bianco vuoto e sembrerebbe un errore */}
            <div className="au-portale-maniglia" aria-hidden="true">
              <span>La tesi</span>
            </div>

            <div className="au-portale-testo">
              <div className="art">{HERO.portale.etichetta}</div>
              <p>
                {HERO.portale.testo[0]}
                <br />
                <span className="h">{HERO.portale.testo[1]}</span>
              </p>
            </div>
          </div>

          <div className="au-scorri" aria-hidden="true">
            <i />
            Scorri
          </div>
        </section>

        {/* -------------------------------------------------- 02 · il perché */}
        <section className="au-perche carta" id="associazione">
          <div className="au-perche-in">
            <div className="art">{PERCHE.articolo}</div>
            <h2>
              Gli <span className="h">umanoidi</span> stanno arrivando.
              <br />
              La società deve essere pronta.
            </h2>
            <div className="au-perche-corpo">
              {PERCHE.paragrafi.map((p, i) => (
                <p key={i}>{forte(p)}</p>
              ))}
            </div>

            {/* la governance dell'associazione non ha una sezione propria in
                landing: i due documenti stanno qui, dove il discorso li introduce */}
            <div className="au-perche-doc">
              <a className="au-perche-doc-link" href={ROTTE.statuto.href}>
                Statuto <span aria-hidden="true">→</span>
              </a>
              <a className="au-perche-doc-link" href={ROTTE.cariche.href}>
                Cariche sociali <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <div className="au-tesi carta">
          <div className="au-tesi-in">
            <p>
              {PERCHE.tesi.split(" ").map((parola, i) => (
                <span
                  key={i}
                  className={`au-p${PERCHE.tesiAccento.includes(i) ? " h" : ""}`}
                >
                  {parola}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* --------------------------------- 02b · chi li sta costruendo */}
        <section className="au-societa" id="societa">
          <div className="au-soc-testa">
            <div>
              <div className="art">{SOCIETA_TESTI.articolo}</div>
              <h2>
                Non è una previsione.
                <br />
                <span className="h">Lo stanno già costruendo.</span>
              </h2>
            </div>
            <p>{SOCIETA_TESTI.intro}</p>
          </div>

          <div className="au-soc-conti">
            <div className="au-soc-conto">
              <b className="au-conta" data-conta={SOCIETA_CONTI.totale}>
                0
              </b>
              <span>Costruttori censiti</span>
            </div>
            <div className="au-soc-conto">
              <b className="au-conta" data-conta={SOCIETA_CONTI.paesi}>
                0
              </b>
              <span>Paesi</span>
            </div>
            <div className="au-soc-conto">
              <b className="au-conta" data-conta={SOCIETA_CONTI.sulMercato}>
                0
              </b>
              <span>Già sul mercato</span>
            </div>
          </div>

          {/* tre file che scorrono in direzioni alterne mentre si scende */}
          <div className="au-soc-muro" aria-label="Costruttori di robot umanoidi">
            {[0, 1, 2].map((riga) => (
              <div className={`au-soc-riga r${riga + 1}`} key={riga}>
                {SOCIETA.filter((_, i) => i % 3 === riga).map((c) => (
                  <a
                    className={`au-soc-chip${c.stadio === "Sul mercato" ? " mercato" : ""}`}
                    key={c.nome}
                    href={c.sito}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="au-soc-sigla" aria-hidden="true">
                      {c.nome[0]}
                      {c.dominio && (
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${c.dominio}&sz=64`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </span>
                    <b>{c.nome}</b>
                    <em>{c.paese}</em>
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="au-soc-piede">
            <span className="au-soc-nota">{SOCIETA_TESTI.nota}</span>
            <a className="btn btn-sm btn-linea" href={ROTTE.directory.href}>
              Apri la directory completa →
            </a>
            <span className="au-soc-nota">
              In oro: chi ha già un umanoide sul mercato
            </span>
          </div>
        </section>

        {/* -------------------------------------------- 03 · quattro pilastri */}
        <section className="au-pilastri" id="etica">
          <div className="au-pil-pista">
            <div className="au-pil-pan apri">
              <div className="art">{PILASTRI.articolo}</div>
              <h2>
                Quattro fronti.
                <br />
                <span className="h">Un solo lavoro.</span>
              </h2>
              <p>{PILASTRI.intro}</p>
              <div className="au-pil-suggerimento">Continua a scorrere →</div>
            </div>

            {PILASTRI.voci.map((v) => (
              <div className="au-pil-pan au-pil-carta" key={v.num}>
                <div className="au-pil-num">{v.num}</div>
                <h3>{v.nome}</h3>
                <p>{v.testo}</p>
                <div className="au-pil-nota">{v.nota}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- marquee */}
        <div className="au-marquee" aria-hidden="true">
          <div className="au-mq-riga r1">
            {MARQUEE.r1.map((p, i) => (
              <span key={i} className={i % 3 === 0 ? "pieno" : i % 3 === 1 ? "" : "acc"}>
                {p}
              </span>
            ))}
          </div>
          <div className="au-mq-riga r2">
            {MARQUEE.r2.map((p, i) => (
              <span key={i} className={i % 3 === 0 ? "" : i % 3 === 1 ? "acc" : "pieno"}>
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------- 04 · le Camere */}
        <section className="au-camere" id="camere">
          <div className="au-cam-scena">
            <div className="au-cam-copy">
              <div className="art">{CAMERE.articolo}</div>
              <h2>
                Tre soggetti.
                <br />
                <span className="h">Una società.</span>
              </h2>
              <p className="au-cam-intro">{CAMERE.intro}</p>

              <div className="au-cam-passi">
                {CAMERE.voci.map((v) => (
                  <div className="au-cam-passo" key={v.et}>
                    <div className="au-cam-passo-et">{v.et}</div>
                    <h3>{v.nome}</h3>
                    <p>{v.testo}</p>
                  </div>
                ))}
              </div>

              <div className="au-cam-punti" aria-hidden="true">
                <span className="au-cam-punto on" />
                <span className="au-cam-punto" />
                <span className="au-cam-punto" />
              </div>
            </div>

            {/* i tre anelli partono lontani e finiscono per riconoscersi */}
            <div className="au-cam-diagramma" aria-hidden="true">
              <div className="au-cam-quadro">
                <div className="au-cam-griglia" />
                <svg className="au-cam-svg" viewBox="0 0 400 400" fill="none">
                  {/* un anello per Camera, nell'ordine di CAMERE.voci:
                      Individui (oro) · Umanoidi (navy) · Organizzazioni (grigio) */}
                  <circle className="au-cam-anello a1" cx="200" cy="200" r="86" />
                  <circle className="au-cam-anello a2" cx="200" cy="200" r="86" />
                  <circle className="au-cam-anello a3" cx="200" cy="200" r="86" />
                </svg>
                <span className="au-cam-etichetta e1">Individui</span>
                <span className="au-cam-etichetta e2">Umanoidi</span>
                <span className="au-cam-etichetta e3">Organizzazioni</span>
                <span className="au-cam-sigillo">Modello di rappresentanza</span>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------ 03b · le leggi di Asimov */}
        {/* Una legge per schermo: scorrendo, la scheda si inclina all'indietro e
            lascia il posto alla successiva. L'ordine in cui si accatastano è la
            gerarchia stessa — la Zero arriva per ultima e resta sopra a tutte. */}
        <section className="au-asimov" id="asimov">
          <div className="au-asi-testa">
            <div className="art">{ASIMOV.articolo}</div>
            <h2>
              {ASIMOV.soprattitolo} {ASIMOV.titolo[0]}
              <br />
              <span className="h">{ASIMOV.titolo[1]}</span> {ASIMOV.titolo[2]}
            </h2>
            <div className="au-asi-invito" aria-hidden="true">
              Continua a scorrere ↓
            </div>
          </div>

          <div className="au-leggi">
            {ASIMOV.leggi.map((l, i) => (
              <article className="au-legge" key={l.num} data-tono={i % 2 ? "scuro" : "chiaro"}>
                <div className="au-legge-wrap">
                  <div className="au-legge-carta">
                    <div className="au-legge-alto">
                      <p className="au-legge-nome">{l.nome}</p>
                      {/* barra di precedenza: quanti segmenti sono pieni dice quanto pesa */}
                      <span
                        className="au-legge-rango"
                        aria-label={`${ASIMOV.precedenza}: ${l.rango} su 3`}
                      >
                        {[3, 2, 1].map((n) => (
                          <i key={n} className={n <= l.rango ? "pieno" : undefined} />
                        ))}
                      </span>
                    </div>

                    <div className="au-legge-basso">
                      <div className="au-legge-colonna">
                        <p className="au-legge-testo">{evidenzia(l.testo, l.rimandi)}</p>
                        <footer className="au-legge-dip">
                          {l.dipende.length ? (
                            <>
                              <em>Cede a</em>
                              <span className="au-legge-catena">
                                {l.dipende.map((d) => (
                                  <i key={d}>{d}</i>
                                ))}
                              </span>
                            </>
                          ) : (
                            <em className="prima">Non cede a nulla</em>
                          )}
                        </footer>
                      </div>
                      <span className="au-legge-num" aria-hidden="true">
                        ({l.num})
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* la Legge Zero arriva quarant'anni dopo e prevale su tutte */}
            <article className="au-legge zero" data-tono="oro">
              <div className="au-legge-wrap">
                <div className="au-legge-carta">
                  <div className="au-legge-alto">
                    <p className="au-legge-nome">{ASIMOV.zero.nome}</p>
                    <span className="au-legge-rango" aria-hidden="true">
                      <i className="pieno" />
                      <i className="pieno" />
                      <i className="pieno" />
                    </span>
                  </div>

                  <div className="au-legge-basso">
                    <div className="au-legge-colonna">
                      <p className="au-legge-testo">{ASIMOV.zero.testo}</p>
                      <p className="au-legge-nota">{ASIMOV.zero.nota}</p>
                      <footer className="au-legge-dip">
                        <em>Prevale su</em>
                        <span className="au-legge-catena">
                          {ASIMOV.zero.dipende.map((d) => (
                            <i key={d}>{d}</i>
                          ))}
                        </span>
                      </footer>
                    </div>
                    <span className="au-legge-num" aria-hidden="true">
                      ({ASIMOV.zero.num})
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div className="au-asi-piede">
            <div className="au-asi-chiusa">
              <p>{ASIMOV.chiusa.testo}</p>
              <strong>{ASIMOV.chiusa.puntoFermo}</strong>
            </div>
            <div className="au-asi-fonte">{ASIMOV.fonte}</div>
          </div>
        </section>

        {/* ---------------------------------------------------- 05 · la Carta */}
        <section className="au-carta-sez" id="carta">
          <div className="au-carta-in">
            <div className="art">{CARTA.articolo}</div>
            <h2>{CARTA.soprattitolo}</h2>
            <div className="au-carta-sotto">{CARTA.titolo}</div>

            <div className="au-domande">
              {CARTA.domande.map((d, i) => (
                <div className="au-domanda" key={d}>
                  <i>{String(i + 1).padStart(2, "0")}</i>
                  <span>{d}</span>
                </div>
              ))}
            </div>

            <p className="au-carta-chiusa">{CARTA.chiusa}</p>
            <LinkFuturo chiave="cartaPagina" className="btn btn-lg btn-pieno au-magnete">
              {CARTA.cta}
            </LinkFuturo>
          </div>
        </section>

        {/* ---------------------------------------------------- 06 · Anagrafe */}
        <section className="au-anagrafe" id="anagrafe">
          <div className="au-ana-in">
            <div className="au-ana-copy">
              <div className="art">{ANAGRAFE.articolo}</div>
              <h2>
                Ogni <span className="h">umanoide</span> ha una storia.
                <br />E deve avere un’identità.
              </h2>
              <p>{ANAGRAFE.testo}</p>
              <LinkFuturo chiave="anagrafePagina" className="btn btn-lg btn-pieno au-magnete">
                {ANAGRAFE.cta}
              </LinkFuturo>
            </div>

            <div className="au-scheda-wrap">
              <div className="au-scheda">
                <div className="au-scheda-testa">
                  <b>{ANAGRAFE.scheda.titolo}</b>
                  <span className="au-stato">
                    <i />
                    {ANAGRAFE.scheda.stato}
                  </span>
                </div>

                <div className="au-campi">
                  {ANAGRAFE.scheda.campi.map((c) => (
                    <div className={`au-campo-r${c.et.length > 18 ? " largo" : ""}`} key={c.et}>
                      <em>{c.et}</em>
                      <span className={c.acc ? "acc" : undefined}>{c.val}</span>
                    </div>
                  ))}
                </div>

                <div className="au-scheda-piede">
                  <span>{ANAGRAFE.scheda.impronta}</span>
                  <span className="au-impronta" aria-hidden="true">
                    {Array.from({ length: 26 }, (_, i) => (
                      <i key={i} />
                    ))}
                  </span>
                  <span>{ANAGRAFE.scheda.protocollo}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- 06b · la Rivista */}
        <section className="au-rivista" id="rivista">
          <div className="au-riv-in">
            <div className="au-riv-testa">
              <div className="art">{RIVISTA.articolo}</div>
              <div className="au-riv-occhiello">{RIVISTA.occhiello}</div>
              <Testata className="au-riv-logo" />
              <div className="au-riv-payoff" aria-hidden="true">
                {RIVISTA.payoff.map((parola, i) => (
                  <span key={parola}>
                    {i > 0 && <i />}
                    {parola}
                  </span>
                ))}
              </div>
            </div>

            <div className="au-riv-corpo">
              {/* la copertina vera del primo numero */}
              <figure className="au-riv-copertina">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={RIVISTA.numeroUno.copertina}
                  alt={`Copertina di Humanoide ${RIVISTA.numeroUno.numero}, ${RIVISTA.numeroUno.periodo}`}
                  loading="lazy"
                  decoding="async"
                />
              </figure>

              <div className="au-riv-lato">
                <p className="au-riv-intro">{RIVISTA.intro}</p>

                <dl className="au-riv-dati">
                  <div>
                    <dt>Numero</dt>
                    <dd>{RIVISTA.numeroUno.numero}</dd>
                  </div>
                  <div>
                    <dt>Periodo</dt>
                    <dd>{RIVISTA.numeroUno.periodo}</dd>
                  </div>
                  <div>
                    <dt>Cadenza</dt>
                    <dd>{RIVISTA.cadenza}</dd>
                  </div>
                </dl>

                <div className="au-riv-uscita">
                  <i aria-hidden="true" />
                  {RIVISTA.uscita}
                </div>

                <a className="btn btn-lg btn-pieno au-magnete" href={ROTTE.aderisci}>
                  {RIVISTA.cta}
                </a>

                <nav className="au-riv-rimandi" aria-label="La rivista">
                  <a href={ROTTE.normeAutori.href}>Scrivi per Humanoide</a>
                  <a href={ROTTE.colophon.href}>Colophon</a>
                </nav>
              </div>
            </div>

            {/* i richiami di copertina, nell'ordine in cui stanno in copertina */}
            <ol className="au-riv-sommario">
              {RIVISTA.numeroUno.sommario.map((v) => (
                <li key={v.titolo}>
                  <em>{v.rubrica}</em>
                  <h3>{v.titolo}</h3>
                  <p>{v.testo}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* -------------------------------------------------------- 07 · rete */}
        <section className="au-rete" id="rete">
          <div className="au-rete-in">
            <div className="au-rete-testa">
              <div className="art">{RETE.articolo}</div>
              <h2>
                Un luogo di incontro tra società,
                <br />
                <span className="h">ricerca, industria e istituzioni.</span>
              </h2>
              <p>{RETE.intro}</p>
            </div>

            <div className="au-rete-griglia">
              {RETE.voci.map((v) => (
                <div className="au-rete-cella" key={v.et}>
                  <em>{v.et}</em>
                  <div>
                    <h3>{v.nome}</h3>
                    <p>{v.testo}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="au-rete-nota">{RETE.nota}</p>
          </div>
        </section>

        {/* --------------------------------------------------- 08 · manifesto */}
        <section className="au-manifesto">
          <canvas className="au-tela" aria-hidden="true" />
          <div className="au-man-in">
            <div className="art" style={{ justifyContent: "center" }}>
              {MANIFESTO.articolo}
            </div>
            <p className="grande">
              L’arrivo degli <span className="h">umanoidi</span> non riguarda soltanto le macchine.{" "}
              <span className="u">Riguarda noi.</span>
            </p>
            <p className="piccola">{MANIFESTO.piccola}</p>
            <div className="au-motto">
              <Marchio />
              <b>{MANIFESTO.motto}</b>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------- 09 · adesione */}
        <section className="au-adesione" id="aderisci">
          <div className="au-ade-in">
            <div className="au-ade-testa">
              <div className="art">{ADESIONE.articolo}</div>
              <h2>{ADESIONE.titolo}</h2>
              <p>{ADESIONE.intro}</p>
            </div>
            <Adesione />
          </div>
        </section>

        <Piede />
      </Motore>
    </>
  );
}
