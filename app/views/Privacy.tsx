import { PAGINE, altra, type Lingua } from "../lingue";
import { rotte } from "../rotte";
import { testi } from "../testi";
import { Nav } from "../components/Nav";
import { Piede } from "../components/Piede";
import { Testata } from "../components/Testata";

type Sezione = { titolo: string; testo: string };
type Testo = { articolo: string; titolo: string; intro: string; sezioni: Sezione[]; aggiornato: string; rimandi: [string, string] };

const PRIVACY: Record<Lingua, Testo> = {
  it: {
    articolo: "Il sito – Privacy",
    titolo: "Informativa privacy",
    intro:
      "Come trattiamo i dati quando usi questo sito. Oggi la risposta è semplice: non raccogliamo dati personali.",
    sezioni: [
      {
        titolo: "Titolare del trattamento",
        testo:
          "AssoUmanoidi – Associazione per i diritti degli umanoidi. Per domande sulla privacy: privacy@assoumanoidi.it.",
      },
      {
        titolo: "Dati raccolti",
        testo:
          "Al momento il sito non raccoglie dati personali. Il modulo di adesione è disattivato: non invia e non salva informazioni, quindi per ora non è possibile inviare dati.",
      },
      {
        titolo: "Cookie e strumenti di analisi",
        testo:
          "Il sito non usa cookie di profilazione né strumenti di analisi del traffico. Il browser conserva solo un’impostazione della sessione per la presentazione iniziale, che non viene inviata a nessuno.",
      },
      {
        titolo: "Hosting",
        testo:
          "Il sito è ospitato da Netlify, Inc. Il fornitore può trattare dati tecnici di connessione, come l’indirizzo IP, secondo la propria informativa.",
      },
      {
        titolo: "Modifiche future",
        testo:
          "Quando il modulo di adesione sarà attivo, questa informativa sarà aggiornata prima, con finalità, base giuridica e tempi di conservazione dei dati.",
      },
    ],
    aggiornato: "Ultimo aggiornamento: 2 novembre 2026.",
    rimandi: ["Colophon", "Norme per gli autori"],
  },
  en: {
    articolo: "The site – Privacy",
    titolo: "Privacy policy",
    intro:
      "How we handle data when you use this site. Today the answer is simple: we do not collect personal data.",
    sezioni: [
      {
        titolo: "Data controller",
        testo:
          "AssoUmanoidi – Association for Humanoid Rights. For privacy questions: privacy@assoumanoidi.it.",
      },
      {
        titolo: "Data collected",
        testo:
          "For now the site does not collect personal data. The membership form is disabled: it does not send or store information, so it is not yet possible to send data.",
      },
      {
        titolo: "Cookies and analytics",
        testo:
          "The site uses no profiling cookies and no traffic analytics tools. The browser only keeps a session setting for the opening presentation, which is not sent to anyone.",
      },
      {
        titolo: "Hosting",
        testo:
          "The site is hosted by Netlify, Inc. The provider may process technical connection data, such as the IP address, under its own privacy notice.",
      },
      {
        titolo: "Future changes",
        testo:
          "When the membership form is active, this notice will be updated first, with purposes, legal basis and retention periods.",
      },
    ],
    aggiornato: "Last updated: 2 November 2026.",
    rimandi: ["Colophon", "Author guidelines"],
  },
};

export function Privacy({ lingua }: { lingua: Lingua }) {
  const { NAV, NAV_TESTI } = testi(lingua);
  const ROTTE = rotte(lingua);
  const t = PRIVACY[lingua];
  return (
    <>
      <Nav
        sottopagina
        lingua={lingua}
        voci={NAV(ROTTE)}
        testi={NAV_TESTI}
        aderisci={ROTTE.aderisci}
        altraLingua={PAGINE.privacy[altra(lingua)]}
      />
      <main className="au-pagina au-doc">
        <header className="au-pag-testa">
          <div className="art">{t.articolo}</div>
          <Testata className="au-pag-testata" />
          <h1>{t.titolo}</h1>
          <p className="au-pag-intro" style={{ marginTop: 22 }}>
            {t.intro}
          </p>
        </header>

        <section className="au-pag-corpo">
          <div className="au-riv-blocchi">
            {t.sezioni.map((s) => (
              <section className="au-riv-blocco" key={s.titolo}>
                <h2>{s.titolo}</h2>
                <p>{s.testo}</p>
              </section>
            ))}
          </div>

          <p className="au-doc-rimandi-tit" style={{ marginTop: 32 }}>
            {t.aggiornato}
          </p>

          <nav className="au-doc-rimandi">
            <span className="au-doc-rimandi-tit">{lingua === "it" ? "Per proseguire" : "Continue"}</span>
            <a href={PAGINE.colophon[lingua]}>{t.rimandi[0]} →</a>
            <a href={PAGINE.normeAutori[lingua]}>{t.rimandi[1]} →</a>
          </nav>
        </section>
      </main>
      <Piede lingua={lingua} />
    </>
  );
}
