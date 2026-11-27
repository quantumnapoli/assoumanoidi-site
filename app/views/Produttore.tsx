import { inLingua, type SchedaProduttore } from "../dati";
import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { vista } from "../societa-en";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { ProduttoreTop } from "./ProduttoreTop";

/**
 * Scheda di un produttore della directory. Base per tutti (dati della rilevazione);
 * con un periodo premium pagato in corso diventa la scheda «top» (ProduttoreTop): modelli, persone, traguardi, notizie, contatti.
 */
export function Produttore({ p, lingua }: { p: SchedaProduttore; lingua: Lingua }) {
  const { DIRECTORY, NAV, NAV_TESTI } = testi(lingua);
  const t = DIRECTORY.scheda;
  const ROTTE = rotte(lingua);
  const r = vista(p, lingua);
  const pr = p.profilo;
  const base = PAGINE.directory[lingua];
  const frase = pr ? inLingua(pr.tagline, lingua) : "";
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: p.nome,
    url: p.sito || undefined,
    logo: pr?.logo ?? undefined,
    description: frase || p.nota || undefined,
    address: p.paese ? { "@type": "PostalAddress", addressCountry: p.paese } : undefined,
    employee: pr?.persone?.length ? pr.persone.map((x) => ({ "@type": "Person", name: x.nome, jobTitle: inLingua(x.ruolo, lingua), sameAs: x.linkedin ?? undefined })) : undefined,
    makesOffer: p.schedeModelli?.length
      ? p.schedeModelli.map((m) => ({ "@type": "Offer", itemOffered: { "@type": "Product", name: m.name, url: `https://assoumanoidi.it${PAGINE.modelli[lingua]}/${m.slug}` } }))
      : undefined,
  };
  const jsonLd = <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />;

  if (pr) {
    return (
      <>
        <Nav sottopagina lingua={lingua} voci={NAV(ROTTE)} testi={NAV_TESTI} aderisci={ROTTE.aderisci}
          altraLingua={pr.esempio ? `/anteprima/scheda-premium?lang=${altra(lingua)}` : `${PAGINE.directory[altra(lingua)]}/${p.slug}`} />
        <ProduttoreTop p={p} pr={pr} lingua={lingua} />
        {!pr.esempio && jsonLd}
        <Piede lingua={lingua} />
      </>
    );
  }

  // senza premium: scheda essenziale (oggi la directory porta queste aziende al loro sito; resta per i link vecchi)
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

      <main className="au-pagina au-prod">
        <header className="au-pag-testa">
          <a className="au-prod-indietro" href={base}>{t.indietro}</a>
          <div className="au-prod-titolo">
            <div>
              <div className="art">{DIRECTORY.articolo}</div>
              <h1>{p.nome}</h1>
              {r.paese && <p className="au-pag-intro">{`${r.paese} · ${r.tipo}`}</p>}
            </div>
          </div>
        </header>

        <section className="au-pag-corpo au-prod-corpo">
          <div className="au-prod-testo">{p.nota && <p>{p.nota}</p>}</div>
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
          </aside>
        </section>
        {jsonLd}
      </main>

      <Piede lingua={lingua} />
    </>
  );
}
