/**
 * Testi della rivista Humanoide: colophon e norme per gli autori.
 *
 * Fonte: HUMANOIDE.docx e «Norme redazionali per autori».docx.
 *
 * Hosting: il documento indicava Ileven s.r.l.s. (server nell'Unione europea).
 * Su indicazione dell'associazione (28 ottobre 2026) il colophon dichiara
 * Netlify, Inc., e la frase sui server nell'Unione europea è stata tolta:
 * Netlify non è un fornitore europeo e non si può affermare quello che non è. I testi sono
 * trascritti senza riscritture, in italiano e in inglese. Gli unici interventi
 * sono sulla struttura (nel documento inglese i titoli erano attaccati al testo,
 * «FrequencyQuarterly», «AccessPreviews») e su un refuso nell'italiano
 * («Edizione provvisoria in pubblicata online»).
 *
 * Le virgolette e i trattini rispettano le stesse norme che il testo descrive:
 * caporali «…» per le citazioni, trattino medio spaziato ( – ) per gli incisi.
 */

/**
 * Dati che i documenti lasciavano come segnaposto. Finché sono vuoti la pagina
 * non mostra la riga (o mostra una frase neutra): non si pubblicano mai
 * «[sede legale]» o «[email redazione]» alla lettera.
 */
export const DATI_RIVISTA = {
  sedeLegale: "",
  codiceFiscale: "",
  emailRedazione: "",
  emailDirezione: "",
};

/*
 * humanoideonline.com è citato nel colophon ma, al 28 ottobre 2026, non
 * risponde. Per questo compare come semplice testo e mai come link: un
 * collegamento a un sito spento in una pagina di informazioni legali è peggio
 * di nessun collegamento. Quando va online, basta trasformarlo in <a>.
 */

type Riga = { et: string; val: string };
type Sezione = { titolo: string; testo: string };

export type TestiColophon = {
  lingua: "it" | "en";
  articolo: string;
  soprattitolo: string;
  intro: string;
  editoriale: Riga[];
  pubblicazione: Sezione[];
  legale: Sezione[];
  onlineFirst: Sezione;
  etichetteOpzionali: { sedeLegale: string; codiceFiscale: string };
};

export const COLOPHON: { it: TestiColophon; en: TestiColophon } = {
  it: {
    lingua: "it",
    articolo: "La rivista – Colophon",
    soprattitolo: "Humanoide",
    intro:
      "Rivista ufficiale dell’Associazione per i diritti degli umanoidi (AssoUmanoidi). Chi la dirige, come si pubblica, in che lingua, con quali diritti.",
    editoriale: [
      { et: "Editore", val: "AssoUmanoidi – Associazione per i diritti degli umanoidi" },
      { et: "Siti internet ufficiali", val: "assoumanoidi.it | humanoideonline.com" },
      {
        et: "Fornitore hosting dei siti web",
        val: "Netlify, Inc. – netlify.com",
      },
      { et: "Direttore responsabile", val: "Marco Marsili" },
      { et: "Direttore scientifico", val: "Marco Marsili" },
      { et: "Vicedirettore vicario", val: "Fabio Morotti" },
      { et: "Vicedirettore responsabile comunicazione e progetti speciali", val: "Gabriele Gobbo" },
      { et: "Direzione, redazione, amministrazione, abbonamenti e pubblicità", val: "AssoUmanoidi" },
      { et: "Consiglio scientifico", val: "Di AssoUmanoidi e Humanoide" },
      { et: "Registrazione presso il Tribunale", val: "In corso" },
      { et: "Registrazione presso il Registro degli operatori di comunicazione (ROC)", val: "In corso" },
      { et: "ISSN", val: "In corso di attribuzione" },
    ],
    pubblicazione: [
      { titolo: "Periodicità", testo: "Trimestrale – Edizione esclusivamente digitale in formato PDF." },
      {
        titolo: "Modello di pubblicazione",
        testo:
          "La rivista adotta il modello Online First (Ahead of Print): i singoli articoli vengono pubblicati in anteprima sul sito humanoideonline.com, completi di data di pubblicazione. Il fascicolo trimestrale in formato PDF costituisce la Version of Record, ovvero l’edizione ufficiale, definitiva e facente fede a fini legali, scientifici e autorali ai sensi della L. n. 47 dell’8 febbraio 1948, e della L. n. 62 del 7 marzo 2001.",
      },
      {
        titolo: "Lingua",
        testo:
          "Rivista multilingue con traduzione automatica mediante intelligenza artificiale tramite piattaforma digitale Speaqi. La lingua originale di ciascun contributo è conservata, archiviata e resa disponibile nel PDF e fa fede in caso di divergenze traduttive.",
      },
      {
        titolo: "Accesso",
        testo:
          "L’anteprima dei contenuti pubblicati online (Online First) può essere ad accesso libero o riservato agli abbonati (Paywall). L’edizione ufficiale trimestrale (Version of Record) è invece pubblicata in modalità ad accesso gratuito (Free Access) per il lettore.",
      },
    ],
    legale: [
      {
        titolo: "Proprietà intellettuale e note legali",
        testo:
          "I contributi firmati esprimono esclusivamente le opinioni degli Autori. I materiali inviati alla redazione, anche se non pubblicati, non saranno restituiti. La riproduzione anche parziale, la diffusione, la ripubblicazione o il riutilizzo commerciale dei testi e dei file PDF sono tassativamente vietati senza autorizzazione scritta dell’editore, salvi gli usi citazionali consentiti dalla legge sul diritto d’autore (L. 633/1941).",
      },
      {
        titolo: "Trattamento dati personali (GDPR)",
        testo:
          "Il Titolare del trattamento dei dati è AssoUmanoidi – Associazione per i diritti degli umanoidi. I dati personali di autori, lettori e abbonati sono trattati esclusivamente per le finalità legate alla pubblicazione, gestione e spedizione della rivista Humanoide, nel rispetto del Regolamento UE 2016/679 (GDPR). I servizi di hosting dei siti web sono forniti da Netlify, Inc. Per l’esercizio dei diritti di accesso, rettifica o cancellazione, è possibile contattare l’indirizzo email privacy@assoumanoidi.it.",
      },
    ],
    onlineFirst: {
      titolo: "Humanoide – Online First",
      testo:
        "Edizione provvisoria pubblicata online su humanoideonline.com in lingua originale, in attesa di paginazione definitiva nel fascicolo trimestrale (Version of Record), con traduzione automatica mediante intelligenza artificiale tramite piattaforma digitale Speaqi.",
    },
    etichetteOpzionali: { sedeLegale: "Sede legale", codiceFiscale: "Codice fiscale" },
  },

  en: {
    lingua: "en",
    articolo: "The journal – Colophon",
    soprattitolo: "Humanoide",
    intro:
      "Official journal of the Association for Humanoid Rights (AssoUmanoidi). Who runs it, how it is published, in which languages, under which rights.",
    editoriale: [
      { et: "Publisher", val: "AssoUmanoidi – Association for Humanoid Rights" },
      { et: "Official websites", val: "assoumanoidi.it | humanoideonline.com" },
      {
        et: "Hosting provider",
        val: "Netlify, Inc. – netlify.com",
      },
      { et: "Editor-in-Chief", val: "Marco Marsili" },
      { et: "Scientific Director", val: "Marco Marsili" },
      { et: "Deputy Editor-in-Chief", val: "Fabio Morotti" },
      { et: "Deputy Editor for Communications and Special Projects", val: "Gabriele Gobbo" },
      { et: "Management, Editorial Staff, Administration, Subscriptions, and Advertising", val: "AssoUmanoidi" },
      { et: "Scientific Council", val: "Of AssoUmanoidi and Humanoide" },
      { et: "Registration with the Law Courts", val: "Pending" },
      { et: "Registration with the Communication Operators Register (ROC)", val: "Pending" },
      { et: "ISSN", val: "Pending assignment" },
    ],
    pubblicazione: [
      { titolo: "Frequency", testo: "Quarterly – Exclusively digital edition in PDF format." },
      {
        titolo: "Publication Model",
        testo:
          "The journal adopts the Online First (Ahead of Print) model: individual articles are published as previews on the website humanoideonline.com, complete with their publication date. The quarterly issue in PDF format constitutes the Version of Record, which is the official, definitive, and legally, scientifically, and authorially binding edition pursuant to Law No. 47 of February 8, 1948, and Law No. 62 of March 7, 2001.",
      },
      {
        titolo: "Language",
        testo:
          "Multilingual journal featuring automatic artificial intelligence translation via the Speaqi digital platform. The original language of each contribution is preserved, archived, and made available in the PDF, and shall prevail in the event of translation discrepancies.",
      },
      {
        titolo: "Access",
        testo:
          "Previews of online content (Online First) may be open access or restricted to subscribers (Paywall). The official quarterly edition (Version of Record) is instead published under a Free Access model for the reader.",
      },
    ],
    legale: [
      {
        titolo: "Intellectual Property and Legal Notices",
        testo:
          "Signed contributions exclusively express the opinions of the Authors. Materials submitted to the editorial staff, even if unpublished, will not be returned. Any reproduction, even partial, dissemination, republication, or commercial reuse of the texts and PDF files is strictly prohibited without the written authorization of the publisher, without prejudice to fair use for citation purposes permitted by copyright law (Law 633/1941).",
      },
      {
        titolo: "Personal Data Processing (GDPR)",
        testo:
          "The Data Controller is AssoUmanoidi – Association for Humanoid Rights. Personal data of authors, readers, and subscribers are processed exclusively for purposes related to the publication, management, and distribution of the journal Humanoide, in compliance with EU Regulation 2016/679 (GDPR). The hosting services for the websites are provided by Netlify, Inc. To exercise the rights of access, rectification, or erasure, you may contact the email address privacy@assoumanoidi.it.",
      },
    ],
    onlineFirst: {
      titolo: "Humanoide – Online First",
      testo:
        "Provisional edition ahead of the quarterly issue (Version of Record) published online on humanoideonline.com in the original language with AI translation available via the Speaqi digital platform.",
    },
    etichetteOpzionali: { sedeLegale: "Registered office", codiceFiscale: "Fiscal code" },
  },
};

/* Norme per gli autori ----------------------------------------------------- */

/** `et` è l'etichetta a sinistra («Grassetto», «Articolo magazine»); senza `et` è un elenco semplice. */
type Voce = { et?: string; testo: string };
type Blocco = { numero?: string; titolo: string; paragrafi?: string[]; voci?: Voce[]; dopo?: string[] };

export type TestiNorme = {
  lingua: "it" | "en";
  articolo: string;
  soprattitolo: string;
  titolo: string;
  intro: string;
  blocchi: Blocco[];
  invio: {
    titolo: string;
    oggetto: { et: string; val: string };
    senzaIndirizzi: string;
    inviaA: (a: string, b: string) => string;
  };
};

export const NORME: { it: TestiNorme; en: TestiNorme } = {
  it: {
    lingua: "it",
    articolo: "La rivista – Per gli autori",
    soprattitolo: "Norme redazionali",
    titolo: "per gli autori",
    intro:
      "Come scrivere per Humanoide: lunghezze, formato del file, convenzioni di stile e punteggiatura, materiali da allegare.",
    blocchi: [
      {
        titolo: "Premessa",
        paragrafi: [
          "Humanoide è la rivista ufficiale dell’Associazione per i diritti degli umanoidi (AssoUmanoidi). È trimestrale, in edizione esclusivamente digitale PDF, e adotta il modello Online First (Ahead of Print). Il fascicolo trimestrale in PDF costituisce la Version of Record, edizione ufficiale, definitiva e facente fede ai fini legali, scientifici e autoriali.",
        ],
      },
      {
        titolo: "Lingua dei contributi",
        paragrafi: [
          "Il contributo originale può essere scritto in qualsiasi lingua l’autore preferisca; sono raccomandate l’inglese e l’italiano. La rivista è multilingue: la traduzione è realizzata automaticamente mediante intelligenza artificiale tramite piattaforma digitale Speaqi. La lingua originale di ciascun contributo è conservata, archiviata e resa disponibile nel PDF e fa fede in caso di divergenze traduttive.",
          "I contenuti in Online First possono essere ad accesso riservato su abbonamento. La Version of Record trimestrale è pubblicata in modalità ad accesso gratuito (Free Access).",
        ],
      },
      {
        numero: "1",
        titolo: "Tipi di contributo e lunghezza",
        voci: [
          { et: "Articolo magazine", testo: "8.000–12.000 caratteri, spazi inclusi." },
          { et: "Saggio scientifico", testo: "15.000–25.000 caratteri, spazi inclusi, previo accordo con la redazione." },
          { et: "Recensione", testo: "3.000–5.000 caratteri, spazi inclusi." },
          { et: "Intervista o reportage", testo: "5.000–8.000 caratteri, spazi inclusi." },
          { et: "Nota biografica", testo: "300–400 caratteri, spazi inclusi, in calce all’articolo." },
        ],
        dopo: [
          "Per gli articoli di taglio magazine non sono previste note né bibliografia finale. Per i saggi scientifici concordati sono ammesse note essenziali, massimo 15, e una bibliografia finale in stile autore-data.",
        ],
      },
      {
        numero: "2",
        titolo: "Struttura del testo e formato",
        voci: [
          { testo: "Formato Times New Roman, corpo 12, interlinea 1, senza spaziatura prima o dopo i paragrafi." },
          { testo: "Inserire sempre titolo e sottotitolo, entrambi il più brevi possibile." },
          { testo: "Firma finale dell’autore." },
          { testo: "Inviare file Word (.doc/.docx). Non inviare PDF come formato principale." },
          {
            testo:
              "Il testo deve essere privo di formattazioni automatiche complesse, caselle di testo, commenti o revisioni attive.",
          },
        ],
      },
      {
        numero: "3",
        titolo: "Convenzioni stilistiche",
        voci: [
          { et: "Grassetto", testo: "non consentito nel corpo del testo." },
          {
            et: "Corsivo",
            testo: "solo per parole straniere non comuni (es. governance, soft power, rule of law).",
          },
          { et: "Sottolineato", testo: "non consentito." },
          { et: "Unione europea", testo: "scrivere sempre per esteso, mai UE o Ue." },
          { et: "Friuli Venezia Giulia", testo: "senza trattino." },
          {
            et: "Maiuscole",
            testo:
              "da limitare al minimo. Maiuscola solo al primo elemento per enti e organi (Unione europea, Consiglio regionale, Corte costituzionale) e per la specificazione di ministeri (ministero degli Affari esteri). Minuscola per cariche e ruoli (il ministro, il capo di Stato, il sindaco). Maiuscola per Stati e Regioni (Friuli Venezia Giulia, Repubblica Italiana).",
          },
          {
            et: "Acronimi",
            testo:
              "esplicitare alla prima occorrenza solo le sigle meno note (es. Autorità Garante della Concorrenza e del Mercato – AGCM). Non serve per quelle universalmente note (es. ONU, NATO).",
          },
          {
            et: "Leggi e atti normativi",
            testo:
              "in tondo con iniziali maiuscole, mai in corsivo (es. Legge 22 aprile 1941, n. 633; Decreto-Legge 19 maggio 2020, n. 34).",
          },
        ],
      },
      {
        numero: "4",
        titolo: "Punteggiatura e citazioni",
        voci: [
          {
            et: "Virgolette",
            testo:
              "usare le caporali « » per le citazioni dirette. Usare le virgolette alte “ ” solo all’interno di una citazione già tra caporali o per definizioni e usi figurati (es. il concetto di “potere”). Non utilizzare l’apice singolo ‘ ’ per citazioni o definizioni.",
          },
          {
            et: "Trattini",
            testo:
              "per gli incisi usare solo il trattino medio spaziato ( – ), mai il trattino breve (-) né quello lungo ( — ).",
          },
          { et: "Citazioni brevi", testo: "inserite nel corpo del testo." },
          {
            et: "Riferimenti scientifici",
            testo:
              "per i saggi, usare il sistema autore-data nel testo (es. Rossi 2026, 12) e la bibliografia finale concordata.",
          },
        ],
      },
      {
        numero: "5",
        titolo: "Materiali a corredo e invio",
        paragrafi: ["Includere:"],
        voci: [
          {
            testo:
              "Testo dell’articolo, con titolo, sottotitolo e firma finale, formattato secondo le presenti norme.",
          },
          { testo: "Nota biografica in calce all’articolo, di 300–400 caratteri, spazi inclusi." },
          {
            testo:
              "Immagini di corredo, se possibile: 2/3 foto, immagini, tabelle o grafici senza copyright o realizzati dall’autore, con breve didascalia e crediti/fonte.",
          },
        ],
        dopo: [
          "L’autore dichiara che il contributo è originale, non pubblicato e non in valutazione presso altre sedi; che possiede i diritti per eventuali immagini; e che acconsente al trattamento dei dati ex Regolamento UE 2016/679 (GDPR).",
          "La lingua originale specificata dall’autore fa fede in caso di divergenze traduttive.",
        ],
      },
    ],
    invio: {
      titolo: "Come inviare il contributo",
      oggetto: { et: "Oggetto della mail", val: "Humanoide – Proposta contributo – Titolo" },
      senzaIndirizzi:
        "Gli indirizzi a cui inviare le proposte saranno pubblicati qui prima dell’apertura delle candidature.",
      inviaA: (a, b) => `Inviare il file Word sia a ${a} sia a ${b}.`,
    },
  },

  en: {
    lingua: "en",
    articolo: "The journal – For authors",
    soprattitolo: "Author",
    titolo: "guidelines",
    intro:
      "How to write for Humanoide: lengths, file format, style and punctuation conventions, supporting materials.",
    blocchi: [
      {
        titolo: "Preamble",
        paragrafi: [
          "Humanoide is the official journal of the Association for the Rights of Humanoids (AssoUmanoidi). It is a quarterly, digital-only PDF journal and adopts the Online First (Ahead of Print) model. The quarterly PDF issue is the Version of Record: the official, definitive edition valid for legal, scientific and authorship purposes.",
        ],
      },
      {
        titolo: "Language of contributions",
        paragrafi: [
          "The original contribution may be written in any language preferred by the author; English and Italian are recommended. The journal is multilingual: translation is provided automatically through artificial intelligence via the Speaqi digital platform. The original language of each contribution is preserved, archived and made available in the PDF and shall prevail in case of translation discrepancies.",
          "Online First contents may be available under subscription. The quarterly Version of Record is published under a Free Access model.",
        ],
      },
      {
        numero: "1",
        titolo: "Contribution types and length",
        voci: [
          { et: "Magazine article", testo: "8,000–12,000 characters, including spaces." },
          { et: "Scientific essay", testo: "15,000–25,000 characters, including spaces, by prior agreement with the editorial board." },
          { et: "Review", testo: "3,000–5,000 characters, including spaces." },
          { et: "Interview or reportage", testo: "5,000–8,000 characters, including spaces." },
          { et: "Biographical note", testo: "300–400 characters, including spaces, at the end of the article." },
        ],
        dopo: [
          "For magazine-style articles, no notes or final bibliography are required. For agreed scientific essays, essential notes are allowed, up to 15, plus a final author-date bibliography.",
        ],
      },
      {
        numero: "2",
        titolo: "Text structure and format",
        voci: [
          { testo: "Times New Roman, 12 pt, line spacing 1, no spacing before or after paragraphs." },
          { testo: "Always include a title and subtitle, both as short as possible." },
          { testo: "Include the author’s final signature." },
          { testo: "Submit a Word file (.doc/.docx). Do not send PDF as the main format." },
          {
            testo:
              "The text must not contain complex automatic formatting, text boxes, comments or active tracked changes.",
          },
        ],
      },
      {
        numero: "3",
        titolo: "Style conventions",
        voci: [
          { et: "Bold", testo: "not allowed in the body text." },
          { et: "Italics", testo: "only for uncommon foreign words (e.g. governance, soft power, rule of law)." },
          { et: "Underlining", testo: "not allowed." },
          { et: "European Union", testo: "always write in full, never EU or Ue." },
          { et: "Friuli Venezia Giulia", testo: "no hyphen." },
          {
            et: "Capitals",
            testo:
              "keep to a minimum. Use a capital only for the first element of institutions and bodies (European Union, Regional Council, Constitutional Court) and for the specification of ministries (ministry of Foreign Affairs). Use lowercase for offices and roles (the minister, the head of state, the mayor). Use capitals for states and regions (Friuli Venezia Giulia, Italian Republic).",
          },
          {
            et: "Acronyms",
            testo:
              "spell out less-known acronyms at first mention (e.g. Italian Competition Authority – AGCM). Do not spell out universally known ones (e.g. UN, NATO).",
          },
          {
            et: "Laws and normative acts",
            testo:
              "in roman type with initial capitals, never in italics (e.g. Law 22 April 1941, no. 633; Decree-Law 19 May 2020, no. 34).",
          },
        ],
      },
      {
        numero: "4",
        titolo: "Punctuation and quotations",
        voci: [
          {
            et: "Quotation marks",
            testo:
              "in Italian, use guillemets « » for direct quotations. Use double quotation marks “ ” only inside a quotation already in guillemets or for definitions and figurative uses (e.g. the concept of “power”). Do not use single quotation marks ‘ ’ for quotations or definitions. In English, use double quotation marks “ ” for direct quotations and single quotation marks ‘ ’ only inside a quotation.",
          },
          {
            et: "Dashes",
            testo:
              "for parenthetical dashes use only the spaced en dash ( – ), never the short hyphen (-) or the long em dash ( — ).",
          },
          { et: "Short quotations", testo: "placed in the body text." },
          {
            et: "Scientific references",
            testo:
              "for essays, use the author-date system in the text (e.g. Rossi 2026, 12) and the agreed final bibliography.",
          },
        ],
      },
      {
        numero: "5",
        titolo: "Supporting materials and submission",
        paragrafi: ["Include:"],
        voci: [
          {
            testo:
              "The article text, with title, subtitle and final signature, formatted according to these guidelines.",
          },
          { testo: "A biographical note at the end of the article, 300–400 characters, including spaces." },
          {
            testo:
              "Supporting images, if possible: 2/3 photos, images, tables or graphs without copyright or taken by the author, with a short caption and credits/source.",
          },
        ],
        dopo: [
          "The author declares that the contribution is original, unpublished and not under consideration elsewhere; that they hold the rights to any images; and that they consent to data processing under EU Regulation 2016/679 (GDPR).",
          "The original language specified by the author shall prevail in case of translation discrepancies.",
        ],
      },
    ],
    invio: {
      titolo: "How to submit",
      oggetto: { et: "Email subject line", val: "Humanoide – Contribution proposal – Title" },
      senzaIndirizzi: "The addresses for submitting proposals will be published here before submissions open.",
      inviaA: (a, b) => `Send the Word file to both ${a} and ${b}.`,
    },
  },
};
