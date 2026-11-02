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
      "Come trattiamo i dati quando usi questo sito e compili il modulo di adesione.",
    sezioni: [
      {
        titolo: "Titolare del trattamento",
        testo:
          "AssoUmanoidi – Associazione per i diritti degli umanoidi. Per domande sulla privacy o per esercitare i tuoi diritti: privacy@assoumanoidi.it.",
      },
      {
        titolo: "Dati raccolti",
        testo:
          "Il modulo di adesione raccoglie i dati che inserisci: nome, email e, a seconda della Camera scelta, altri campi come città, professione, organizzazione, modello di umanoide e la motivazione. Registriamo anche data e ora della richiesta.",
      },
      {
        titolo: "Finalità e base giuridica",
        testo:
          "I dati servono solo a rispondere alla tua richiesta di adesione. Il trattamento si basa sul consenso che dai spuntando la casella del modulo. Non vendiamo né cediamo i dati a terzi per finalità commerciali.",
      },
      {
        titolo: "Chi vede i dati",
        testo:
          "Le richieste sono consultabili solo dalla direzione dell’associazione, con accesso protetto da password. Non c’è invio automatico di email.",
      },
      {
        titolo: "Conservazione",
        testo:
          "Le richieste sono conservate per il tempo necessario a gestire l’adesione e cancellate quando non servono più. Puoi chiederne la cancellazione o la modifica scrivendo a privacy@assoumanoidi.it.",
      },
      {
        titolo: "Cookie e strumenti di analisi",
        testo:
          "Il sito non usa cookie di profilazione né strumenti di analisi del traffico. Il browser conserva solo un’impostazione della sessione per la presentazione iniziale, che non viene inviata a nessuno.",
      },
      {
        titolo: "Hosting",
        testo:
          "Il sito e il database delle richieste sono ospitati da Netlify, Inc., che può trattare anche dati tecnici di connessione, come l’indirizzo IP, secondo la propria informativa.",
      },
    ],
    aggiornato: "Ultimo aggiornamento: 2 novembre 2026.",
    rimandi: ["Colophon", "Norme per gli autori"],
  },
  en: {
    articolo: "The site – Privacy",
    titolo: "Privacy policy",
    intro:
      "How we handle data when you use this site and fill in the membership form.",
    sezioni: [
      {
        titolo: "Data controller",
        testo:
          "AssoUmanoidi – Association for Humanoid Rights. For privacy questions or to exercise your rights: privacy@assoumanoidi.it.",
      },
      {
        titolo: "Data collected",
        testo:
          "The membership form collects the data you enter: name, email and, depending on the Chamber you choose, other fields such as city, profession, organization, humanoid model and your motivation. We also record the date and time of the request.",
      },
      {
        titolo: "Purpose and legal basis",
        testo:
          "The data is used only to answer your membership request. The processing is based on the consent you give by ticking the box on the form. We do not sell or pass the data to third parties for commercial purposes.",
      },
      {
        titolo: "Who can see the data",
        testo:
          "Requests can only be viewed by the association’s management, through a password-protected area. No email is sent automatically.",
      },
      {
        titolo: "Retention",
        testo:
          "Requests are kept for as long as needed to manage the membership and are deleted when no longer needed. You can ask for deletion or correction by writing to privacy@assoumanoidi.it.",
      },
      {
        titolo: "Cookies and analytics",
        testo:
          "The site uses no profiling cookies and no traffic analytics tools. The browser only keeps a session setting for the opening presentation, which is not sent to anyone.",
      },
      {
        titolo: "Hosting",
        testo:
          "The site and the request storage are hosted by Netlify, Inc., which may process technical connection data, such as the IP address, under its own privacy notice.",
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
