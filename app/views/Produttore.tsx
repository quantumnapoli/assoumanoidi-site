import { capoversi, inLingua, type SchedaProduttore } from "../dati";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { vista } from "../societa-en";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";

/**
 * Scheda di un produttore della directory. Base per tutti (dati della rilevazione);
 * con un periodo premium pagato in corso si aggiungono logo, copertina, descrizione, contatti, link e video.
 */
export function Produttore({ p, lingua }: { p: SchedaProduttore; lingua: Lingua }) {
  const { DIRECTORY, NAV, NAV_TESTI } = testi(lingua);
  const t = DIRECTORY.scheda;
  const ROTTE = rotte(lingua);
  const r = vista(p, lingua);
  const pr = p.profilo;
  const base = PAGINE.directory[lingua];
  const frase = pr ? inLingua(pr.tagline, lingua) : "";
  const descr = pr ? capoversi(inLingua(pr.description, lingua)) : [];
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: p.nome,
    url: p.sito || undefined,
    logo: pr?.logo ?? undefined,
    description: frase || p.nota || undefined,
    address: p.paese ? { "@type": "PostalAddress", addressCountry: p.paese } : undefined,
  };

  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={`${PAGINE.directory[altra(lingua)]}/${p.slug}`}
      />

      <main className={`au-pagina au-prod${pr ? " premium" : ""}`}>
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={base}>{t.indietro}</a>
          {pr?.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="au-prod-copertina" src={pr.cover.url} alt={pr.cover.alt ?? ""} />
          )}
          <div className="au-prod-titolo">
            {pr?.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="au-prod-logo" src={pr.logo} alt={`Logo ${p.nome}`} />
            )}
            <div>
              <div className="art">{pr ? DIRECTORY.premium : DIRECTORY.articolo}</div>
              <h1>{p.nome}</h1>
              {(frase || r.paese) && <p className="au-pag-intro">{frase || `${r.paese} · ${r.tipo}`}</p>}
            </div>
          </div>
        </header>

        <section className="au-pag-corpo au-prod-corpo">
          <div className="au-prod-testo">
            {descr.length ? descr.map((c, i) => <p key={i}>{c}</p>) : p.nota && <p>{p.nota}</p>}
            {pr?.video && (
              <div className="au-prod-video">
                <iframe src={pr.video} title={`${t.video} — ${p.nome}`} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
              </div>
            )}
          </div>

          <aside className="au-prod-dati">
            <dl>
              <div><dt>{DIRECTORY.colonne.stadio}</dt><dd>{r.stadio}</dd></div>
              <div><dt>{DIRECTORY.colonne.modelli}</dt><dd>{r.modelli.length ? r.modelli.join(", ") : "—"}</dd></div>
              <div><dt>{DIRECTORY.colonne.impieghi}</dt><dd>{r.usi.length ? r.usi.join(" · ") : "—"}</dd></div>
              <div><dt>{t.paese}</dt><dd>{r.paese || "—"}</dd></div>
              <div><dt>{t.area}</dt><dd>{r.area}</dd></div>
              <div><dt>{t.tipo}</dt><dd>{r.tipo || "—"}</dd></div>
              <div><dt>{t.corpo}</dt><dd>{p.corpoIntero ? t.si : t.no}</dd></div>
              {p.sito && <div><dt>{t.sito}</dt><dd><a href={p.sito} target="_blank" rel="noopener noreferrer">{p.dominio || p.sito} ↗</a></dd></div>}
            </dl>
            {pr && (pr.contact.email || pr.contact.phone || pr.contact.address) && (
              <div className="au-prod-blocco">
                <h2>{t.contatti}</h2>
                {pr.contact.email && <p><a href={`mailto:${pr.contact.email}`}>{pr.contact.email}</a></p>}
                {pr.contact.phone && <p><a href={`tel:${pr.contact.phone.replace(/[^\d+]/g, "")}`}>{pr.contact.phone}</a></p>}
                {pr.contact.address && <p>{pr.contact.address}</p>}
              </div>
            )}
            {pr && pr.links.length > 0 && (
              <div className="au-prod-blocco">
                <h2>{t.link}</h2>
                {pr.links.map((l) => <p key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer">{l.label} ↗</a></p>)}
              </div>
            )}
            <p className="au-prod-nota">{pr ? t.curata : null}</p>
          </aside>
        </section>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
      </main>

      <Piede lingua={lingua} />
    </>
  );
}
