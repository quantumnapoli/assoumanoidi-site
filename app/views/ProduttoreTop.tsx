import { capoversi, inLingua, type Modello, type SchedaProduttore, type SchedaPremium } from "../dati";
import { PAGINE, type Lingua } from "../lingue";
import { vista } from "../societa-en";
import { testi } from "../testi";

/**
 * Scheda «top» dei produttori con un periodo premium pagato: copertina, cifre, modelli con le schede tecniche,
 * persone chiave, traguardi (dal registro eventi), notizie, galleria, sedi e contatti.
 * Ogni blocco compare solo se ha contenuto: una scheda premium con la sola descrizione resta pulita.
 */

const T = {
  it: {
    menu: { panoramica: "Panoramica", modelli: "Modelli", persone: "Persone", traguardi: "Traguardi", notizie: "Nelle notizie", contatti: "Contatti" },
    socio: "Socio AssoUmanoidi", verificata: "Scheda verificata dalla redazione",
    sito: "Visita il sito", contatta: "Contatta l'azienda", demo: "Richiedi una demo",
    modelliTit: "I robot", modelliSub: "Modelli in produzione e in sviluppo, con le schede tecniche: ogni dato ha la sua fonte.",
    scheda: "Scheda tecnica →", confronta: "Confronta con altri modelli →", confrontaTutti: "Confronta questi modelli",
    personeTit: "Le persone", personeSub: "Chi guida l'azienda.",
    traguardiTit: "Traguardi", traguardiSub: "Finanziamenti, accordi, lanci e consegne, dal registro di AssoUmanoidi.",
    notizieTit: "Nelle notizie", notizieSub: "Dal Digest di Humanoide.",
    galleriaTit: "Galleria", sediTit: "Dove si trova",
    contattiTit: "Parla con", contattiSub: "Per collaborazioni, forniture e richieste di dimostrazione.",
    curata: "Contenuti forniti dall'azienda e verificati dalla redazione di AssoUmanoidi.",
    esempio: "Anteprima con dati di esempio: misure, persone, cifre e traguardi sono inventati per mostrare l'impaginazione.",
    fonte: "Fonte", stato: { "in vendita": "In vendita", "pre-ordine": "Pre-ordine", pilota: "In pilota", prototipo: "Prototipo", annunciato: "Annunciato", ritirato: "Ritirato" } as Record<string, string>,
    tipo: { funding: "Finanziamento", partnership: "Accordo", deployment: "Impiego", product: "Lancio", order: "Ordine", acquisition: "Acquisizione", ipo: "Quotazione" } as Record<string, string>,
    spec: { height_cm: "Altezza", weight_kg: "Peso", dof: "Gradi di libertà", battery_h: "Autonomia", payload_kg: "Carico", speed_ms: "Velocità" } as Record<string, string>,
  },
  en: {
    menu: { panoramica: "Overview", modelli: "Models", persone: "People", traguardi: "Milestones", notizie: "In the news", contatti: "Contact" },
    socio: "AssoUmanoidi member", verificata: "Profile verified by our editors",
    sito: "Visit website", contatta: "Contact the company", demo: "Request a demo",
    modelliTit: "The robots", modelliSub: "Models in production and in development, with specs: every figure has a source.",
    scheda: "Specs →", confronta: "Compare with other models →", confrontaTutti: "Compare these models",
    personeTit: "The people", personeSub: "Who leads the company.",
    traguardiTit: "Milestones", traguardiSub: "Funding, partnerships, launches and deliveries, from the AssoUmanoidi register.",
    notizieTit: "In the news", notizieSub: "From the Humanoide Digest.",
    galleriaTit: "Gallery", sediTit: "Where to find them",
    contattiTit: "Talk to", contattiSub: "For partnerships, supply and demo requests.",
    curata: "Content provided by the company and verified by the AssoUmanoidi editors.",
    esempio: "Preview with sample data: specs, people, figures and milestones are made up to show the layout.",
    fonte: "Source", stato: { "in vendita": "On sale", "pre-ordine": "Pre-order", pilota: "Pilot", prototipo: "Prototype", annunciato: "Announced", ritirato: "Discontinued" } as Record<string, string>,
    tipo: { funding: "Funding", partnership: "Partnership", deployment: "Deployment", product: "Launch", order: "Order", acquisition: "Acquisition", ipo: "IPO" } as Record<string, string>,
    spec: { height_cm: "Height", weight_kg: "Weight", dof: "Degrees of freedom", battery_h: "Battery", payload_kg: "Payload", speed_ms: "Speed" } as Record<string, string>,
  },
} as const;

const UNITA: Record<string, string> = { height_cm: "cm", weight_kg: "kg", dof: "", battery_h: "h", payload_kg: "kg", speed_ms: "m/s" };
const num = (v: number, l: Lingua) => v.toLocaleString(l === "it" ? "it-IT" : "en-GB", { maximumFractionDigits: 2 });
const data = (d: string, l: Lingua) => new Date(d).toLocaleDateString(l === "it" ? "it-IT" : "en-GB", { month: "long", year: "numeric", timeZone: "Europe/Rome" });
const iniziali = (n: string) => n.split(/\s+/).map((p) => p[0]).join("").slice(0, 2).toUpperCase();

/** Sagoma di umanoide disegnata a linee: segnaposto elegante per i modelli senza fotografia. */
function Sagoma() {
  return (
    <svg className="au-top-sagoma" viewBox="0 0 120 200" aria-hidden="true">
      <circle cx="60" cy="24" r="15" />
      <path d="M44 46h32l8 52-10 4-6-34v50l6 66h-12l-6-58-6 58H38l6-66V68l-6 34-10-4z" />
      <line x1="10" y1="196" x2="110" y2="196" />
    </svg>
  );
}

function CartaModello({ m, lingua }: { m: Modello; lingua: Lingua }) {
  const t = T[lingua];
  const specs = (Object.keys(t.spec) as (keyof Modello["specs"])[]).filter((k) => m.specs[k] !== null).slice(0, 4);
  return (
    <article className="au-top-modello">
      <div className="au-top-modello-vis"><Sagoma />{m.status && <span className="au-top-pill">{t.stato[m.status] ?? m.status}</span>}</div>
      <div className="au-top-modello-txt">
        <h3>{m.name}{m.year && <span>{m.year}</span>}</h3>
        {inLingua(m.description, lingua) && <p>{inLingua(m.description, lingua)}</p>}
        {specs.length > 0 && (
          <dl className="au-top-spec">
            {specs.map((k) => <div key={k}><dt>{t.spec[k]}</dt><dd>{num(m.specs[k]!, lingua)}<small>{UNITA[k]}</small></dd></div>)}
          </dl>
        )}
        {m.price && <p className="au-top-prezzo">{m.price.text}</p>}
        <p className="au-top-azioni">
          <a href={`${PAGINE.modelli[lingua]}/${m.slug}`}>{t.scheda}</a>
        </p>
      </div>
    </article>
  );
}

export function ProduttoreTop({ p, pr, lingua }: { p: SchedaProduttore; pr: SchedaPremium; lingua: Lingua }) {
  const { DIRECTORY } = testi(lingua);
  const t = T[lingua];
  const r = vista(p, lingua);
  const frase = inLingua(pr.tagline, lingua);
  const descr = capoversi(inLingua(pr.description, lingua));
  const modelli = p.schedeModelli ?? [];
  const persone = pr.persone ?? [];
  const traguardi = [...(pr.traguardi ?? [])].sort((a, b) => b.data.localeCompare(a.data));
  const notizie = pr.notizie ?? [];
  const email = pr.contact.email;
  const menu = [
    ["panoramica", true], ["modelli", modelli.length > 0], ["persone", persone.length > 0],
    ["traguardi", traguardi.length > 0], ["notizie", notizie.length > 0], ["contatti", !!(email || pr.contact.phone || pr.contact.address)],
  ].filter(([, ok]) => ok).map(([k]) => k as keyof typeof t.menu);
  const conModelli = modelli.filter((m) => m.sources.length > 0);

  return (
    <main className="au-pagina au-top">
      {pr.esempio && <p className="au-top-esempio" role="note">{t.esempio}</p>}

      <header className="au-top-hero" style={pr.cover ? { backgroundImage: `linear-gradient(180deg, rgba(10,18,40,.35), rgba(10,18,40,.92)), url(${pr.cover.url})` } : undefined}>
        <div className="au-top-hero-in">
          <a className="au-prod-indietro" href={PAGINE.directory[lingua]}>{DIRECTORY.scheda.indietro}</a>
          <div className="au-top-marchio">
            {pr.logo
              // eslint-disable-next-line @next/next/no-img-element
              ? <img className="au-top-logo" src={pr.logo} alt={`Logo ${p.nome}`} />
              : <div className="au-top-logo monogramma" aria-hidden="true">{iniziali(p.nome)}</div>}
            <div>
              <div className="au-top-badge">
                <span className="oro">★ {DIRECTORY.premium}</span>
                {pr.socio && <span>{t.socio}</span>}
                <span>✓ {t.verificata}</span>
              </div>
              <h1>{p.nome}</h1>
              {frase && <p className="au-top-frase">{frase}</p>}
              <p className="au-top-luogo">{[r.paese, r.tipo].filter(Boolean).join(" · ")}</p>
            </div>
          </div>
          <div className="au-top-cta">
            {p.sito && <a className="pieno" href={p.sito} target="_blank" rel="noopener noreferrer">{t.sito} ↗</a>}
            {email && <a href={`mailto:${email}?subject=${encodeURIComponent(`AssoUmanoidi — ${p.nome}`)}`}>{t.contatta}</a>}
            {email && modelli.length > 0 && <a href={`mailto:${email}?subject=${encodeURIComponent(`${t.demo} — ${modelli[0]!.name}`)}`}>{t.demo}</a>}
          </div>
          {pr.numeri && pr.numeri.length > 0 && (
            <dl className="au-top-numeri">
              {pr.numeri.map((n) => <div key={n.valore + inLingua(n.etichetta, lingua)}><dd>{n.valore}</dd><dt>{inLingua(n.etichetta, lingua)}</dt></div>)}
            </dl>
          )}
        </div>
      </header>

      {menu.length > 2 && (
        <nav className="au-top-menu" aria-label={p.nome}>
          {menu.map((k) => <a key={k} href={`#${k}`}>{t.menu[k]}</a>)}
        </nav>
      )}

      <section id="panoramica" className="au-top-sez au-top-panoramica">
        <div className="au-top-testo">
          {descr.length ? descr.map((c, i) => <p key={i}>{c}</p>) : p.nota && <p>{p.nota}</p>}
          {pr.video && (
            <div className="au-prod-video">
              <iframe src={pr.video} title={`${DIRECTORY.scheda.video} — ${p.nome}`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
            </div>
          )}
        </div>
        <aside className="au-prod-dati">
          <dl>
            <div><dt>{DIRECTORY.colonne.stadio}</dt><dd>{r.stadio}</dd></div>
            <div><dt>{DIRECTORY.colonne.impieghi}</dt><dd>{r.usi.length ? r.usi.join(" · ") : "—"}</dd></div>
            <div><dt>{DIRECTORY.scheda.paese}</dt><dd>{r.paese || "—"}</dd></div>
            <div><dt>{DIRECTORY.scheda.tipo}</dt><dd>{r.tipo || "—"}</dd></div>
            {p.sito && <div><dt>{DIRECTORY.scheda.sito}</dt><dd><a href={p.sito} target="_blank" rel="noopener noreferrer">{p.dominio || p.sito} ↗</a></dd></div>}
          </dl>
          {pr.sedi && pr.sedi.length > 0 && (
            <div className="au-prod-blocco">
              <h2>{t.sediTit}</h2>
              {pr.sedi.map((s) => <p key={s.citta}><strong>{s.citta}</strong> — {inLingua(s.ruolo, lingua)}</p>)}
            </div>
          )}
        </aside>
      </section>

      {modelli.length > 0 && (
        <section id="modelli" className="au-top-sez">
          <header className="au-top-sez-testa"><h2>{t.modelliTit}</h2><p>{t.modelliSub}</p></header>
          <div className="au-top-modelli">{modelli.map((m) => <CartaModello key={m.slug} m={m} lingua={lingua} />)}</div>
          <p className="au-top-azioni">
            {conModelli.length > 1
              ? <a href={`${PAGINE.modelli[lingua]}/${lingua === "it" ? "confronto" : "compare"}?${conModelli.slice(0, 4).map((m) => `m=${encodeURIComponent(m.slug)}`).join("&")}`}>{t.confrontaTutti} →</a>
              : <a href={PAGINE.modelli[lingua]}>{t.confronta}</a>}
          </p>
        </section>
      )}

      {persone.length > 0 && (
        <section id="persone" className="au-top-sez">
          <header className="au-top-sez-testa"><h2>{t.personeTit}</h2><p>{t.personeSub}</p></header>
          <ul className="au-top-persone">
            {persone.map((x) => (
              <li key={x.nome}>
                {x.foto
                  // eslint-disable-next-line @next/next/no-img-element
                  ? <img src={x.foto} alt={x.nome} width={96} height={96} loading="lazy" />
                  : <span className="au-top-avatar" aria-hidden="true">{iniziali(x.nome)}</span>}
                <strong>{x.nome}</strong>
                <span>{inLingua(x.ruolo, lingua)}</span>
                {x.linkedin && <a href={x.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn — ${x.nome}`}>in</a>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {traguardi.length > 0 && (
        <section id="traguardi" className="au-top-sez">
          <header className="au-top-sez-testa"><h2>{t.traguardiTit}</h2><p>{t.traguardiSub}</p></header>
          <ol className="au-top-linea">
            {traguardi.map((e) => (
              <li key={e.data + inLingua(e.titolo, lingua)}>
                <time dateTime={e.data}>{data(e.data, lingua)}</time>
                <span className={`au-top-tipo ${e.tipo}`}>{t.tipo[e.tipo]}</span>
                <p>{inLingua(e.titolo, lingua)}</p>
                {e.fonte && <a href={e.fonte.url} target="_blank" rel="noopener noreferrer nofollow">{t.fonte}: {e.fonte.nome} ↗</a>}
              </li>
            ))}
          </ol>
        </section>
      )}

      {notizie.length > 0 && (
        <section id="notizie" className="au-top-sez">
          <header className="au-top-sez-testa"><h2>{t.notizieTit}</h2><p>{t.notizieSub}</p></header>
          <ul className="au-top-notizie">
            {notizie.map((n) => <li key={n.url}><a href={n.url}><time dateTime={n.data}>{data(n.data, lingua)}</time><span>{n.titolo}</span></a></li>)}
          </ul>
        </section>
      )}

      {pr.galleria && pr.galleria.length > 0 && (
        <section className="au-top-sez">
          <header className="au-top-sez-testa"><h2>{t.galleriaTit}</h2></header>
          <div className="au-top-galleria">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {pr.galleria.map((g) => <img key={g.url} src={g.url} alt={g.alt} loading="lazy" />)}
          </div>
        </section>
      )}

      {menu.includes("contatti") && (
        <section id="contatti" className="au-top-contatti">
          <div>
            <h2>{t.contattiTit} {p.nome}</h2>
            <p>{t.contattiSub}</p>
          </div>
          <div className="au-top-contatti-dati">
            {email && <a className="pieno" href={`mailto:${email}`}>{email}</a>}
            {pr.contact.phone && <a href={`tel:${pr.contact.phone.replace(/[^\d+]/g, "")}`}>{pr.contact.phone}</a>}
            {pr.contact.address && <p>{pr.contact.address}</p>}
            {pr.links.map((l) => <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a>)}
          </div>
        </section>
      )}

      <p className="au-top-curata">{t.curata}</p>
    </main>
  );
}
