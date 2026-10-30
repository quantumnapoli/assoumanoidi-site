import { RILEVAZIONE } from "./societa";

/**
 * Tutti i testi della landing, in un posto solo.
 *
 * V2: quando /carta, /anagrafe, /ricerca, /istituzioni ecc. diventano pagine vere,
 * basta cambiare `href` in ROTTE — i componenti non si toccano.
 */

export const ROTTE = {
  associazione: "#associazione",
  societa: "#societa",
  asimov: "#asimov",
  etica: "#etica",
  camere: "#camere",
  carta: "#carta",
  anagrafe: "#anagrafe",
  rivista: "#rivista",
  rete: "#rete",
  aderisci: "#aderisci",

  // V2 — pagine non ancora pubblicate. `pronta: false` fa aprire la modale
  // "in elaborazione" invece di portare su un 404.
  cartaPagina: { href: "/carta", pronta: false },
  anagrafePagina: { href: "https://anagrafeumanoidi.it", pronta: false, esterna: true },
  statuto: { href: "/statuto", pronta: true },
  cariche: { href: "/cariche-sociali", pronta: true },
  directory: { href: "/directory", pronta: true },
  colophon: { href: "/rivista/colophon", pronta: true },
  normeAutori: { href: "/rivista/norme-per-autori", pronta: true },
  codiceEtico: { href: "/codice-etico", pronta: false },
  chiSiamo: { href: "/chi-siamo", pronta: false },
  consiglioScientifico: { href: "/consiglio-scientifico", pronta: false },
  contatti: { href: "/contatti", pronta: false },
} as const;

export const PAYOFF = "Innovare. Connettere. Umanizzare.";

export const SOCIAL = [
  { nome: "Instagram", href: "https://www.instagram.com/assoumanoidi/" },
  { nome: "LinkedIn", href: "https://www.linkedin.com/company/assoumanoidi/" },
  { nome: "YouTube", href: "https://www.youtube.com/@assoumanoidi" },
];

export const NAV = [
  {
    testo: "Associazione",
    href: ROTTE.associazione,
    // sottovoci: la governance dell'associazione non ha una sezione propria
    // nella landing, quindi vive qui — sotto la voce che la introduce.
    sotto: [
      { testo: "Il perché", href: ROTTE.associazione },
      { testo: "Statuto", href: ROTTE.statuto.href },
      { testo: "Cariche sociali", href: ROTTE.cariche.href },
    ],
  },
  { testo: "Directory", href: ROTTE.directory.href },
  { testo: "Etica", href: ROTTE.etica },
  { testo: "Carta", href: ROTTE.carta },
  { testo: "Anagrafe", href: ROTTE.anagrafe },
  {
    testo: "Rivista",
    href: ROTTE.rivista,
    sotto: [
      { testo: "Humanoide, il numero 1", href: ROTTE.rivista },
      { testo: "Norme per gli autori", href: ROTTE.normeAutori.href },
      { testo: "Colophon", href: ROTTE.colophon.href },
    ],
  },
];

/* 01 — Hero ---------------------------------------------------------------- */

export const HERO = {
  marchio: "Innovare · Connettere · Umanizzare",
  titolo: ["Prepariamo la società", "alla convivenza tra", "esseri umani e umanoidi."],
  sottotitolo:
    "AssoUmanoidi è l’associazione culturale che nasce per rappresentare, studiare e costruire il rapporto tra esseri umani e umanoidi, promuovendo etica, diritti, doveri, responsabilità e riconoscimento reciproco.",
  portale: {
    etichetta: "La tesi",
    testo: ["Non vogliamo prevedere il futuro.", "Vogliamo contribuire a costruirne le regole."],
  },
};

/* 02 — Il perché ----------------------------------------------------------- */

export const PERCHE = {
  articolo: "Art. 01 — Il perché",
  titolo: ["Gli umanoidi stanno arrivando.", "La società deve essere pronta."],
  paragrafi: [
    "La robotica umanoide e l’intelligenza artificiale stanno trasformando il confine tra tecnologia e vita quotidiana.",
    "Non è soltanto una questione tecnologica. È una questione **etica, sociale, culturale e giuridica**.",
    "AssoUmanoidi nasce per affrontarla prima che siano gli eventi a imporci le risposte.",
  ],
  tesi: "Non vogliamo prevedere il futuro. Vogliamo contribuire a costruirne le regole.",
  /** indici delle parole della tesi da colorare col timbro */
  tesiAccento: [8, 9, 10],
};

/* 03 — I quattro pilastri -------------------------------------------------- */

export const PILASTRI = {
  articolo: "Art. 02 — Cosa facciamo",
  titolo: ["Quattro fronti.", "Un solo lavoro."],
  intro:
    "Non ci occupiamo di tecnologia. Ci occupiamo di ciò che la tecnologia sta per chiedere alla società: principi, regole, responsabilità, identità.",
  voci: [
    {
      num: "01",
      nome: "Etica",
      testo:
        "Promuoviamo principi etici per una convivenza responsabile tra esseri umani, umanoidi e sistemi di intelligenza artificiale.",
      nota: "Principi",
    },
    {
      num: "02",
      nome: "Diritti e doveri",
      testo:
        "Elaboriamo una Carta dei diritti e dei doveri degli umanoidi per aprire un nuovo spazio di riflessione culturale, sociale e istituzionale.",
      nota: "Carta",
    },
    {
      num: "03",
      nome: "Responsabilità",
      testo:
        "Attraverso il Patto umanoide–tutor definiamo principi, impegni e responsabilità nella relazione tra umanoide ed essere umano.",
      nota: "Patto",
    },
    {
      num: "04",
      nome: "Identità",
      testo:
        "Con l’Anagrafe degli umanoidi costruiamo un sistema di identificazione, tracciabilità e certificazione degli umanoidi e dei loro tutor.",
      nota: "Registro",
    },
  ],
};

export const MARQUEE = {
  r1: ["Etica", "Diritti", "Doveri", "Responsabilità", "Identità", "Etica"],
  r2: ["Riconoscimento", "Tracciabilità", "Convivenza", "Riconoscimento", "Tracciabilità", "Convivenza"],
};

/* 03b — Chi li sta costruendo ---------------------------------------------- */

export const SOCIETA_TESTI = {
  articolo: "Art. 02b — Lo stato di fatto",
  titolo: ["Non è una previsione.", "Lo stanno già costruendo."],
  intro:
    "Aziende, laboratori e università che oggi progettano e producono robot umanoidi. Non un giorno: adesso.",
  nota: `Rilevazione del ${RILEVAZIONE}. La directory è in aggiornamento continuo.`,
  cta: "Vedi la directory completa",
};

/* 04b — Le leggi di Asimov -------------------------------------------------- */

export const ASIMOV = {
  articolo: "Art. 03b — Un precedente",
  soprattitolo: "Le uniche regole che abbiamo",
  titolo: ["le ha scritte", "un romanziere.", "Nel 1942."],
  leggi: [
    {
      num: "I",
      nome: "Prima Legge",
      testo:
        "Un robot non può recare danno a un essere umano né può permettere che, a causa del suo mancato intervento, un essere umano riceva danno.",
      rimandi: [] as string[],
      dipende: [] as string[],
      rango: 3,
    },
    {
      num: "II",
      nome: "Seconda Legge",
      testo:
        "Un robot deve obbedire agli ordini impartiti dagli esseri umani, purché tali ordini non contravvengano alla Prima Legge.",
      rimandi: ["Prima Legge"],
      dipende: ["I"],
      rango: 2,
    },
    {
      num: "III",
      nome: "Terza Legge",
      testo:
        "Un robot deve proteggere la propria esistenza, purché questo non contrasti con la Prima e la Seconda Legge.",
      rimandi: ["Prima", "Seconda Legge"],
      dipende: ["I", "II"],
      rango: 1,
    },
  ],
  zero: {
    num: "0",
    nome: "Legge Zero",
    testo:
      "Un robot non può recare danno all’umanità né può permettere che, a causa del suo mancato intervento, l’umanità riceva danno.",
    nota: "Aggiunta quarant’anni dopo, quando le prime tre non bastarono più: mette l’umanità davanti al singolo, e riscrive la gerarchia dall’alto.",
    dipende: ["I", "II", "III"],
  },
  fonte: "Isaac Asimov · Circolo vizioso, 1942 — Legge Zero: I robot e l’Impero, 1985",
  precedenza: "Precedenza",
  chiusa: {
    testo: "Sono un’opera di finzione. Reggono ancora, come intuizione morale, e non a caso le citiamo da ottant’anni. Ma non sono un ordinamento: non dicono chi risponde, chi certifica, chi decide.",
    puntoFermo: "Quelle regole lì nessuno le ha ancora scritte.",
  },
};

/* 04 — Tre Camere ---------------------------------------------------------- */

export const CAMERE = {
  articolo: "Art. 03 — Rappresentanza",
  titolo: ["Tre soggetti.", "Una società."],
  intro:
    "AssoUmanoidi costruisce un modello di rappresentanza nuovo, articolato in tre Camere. Nessuna decide da sola: le tre si riconoscono a vicenda.",
  voci: [
    {
      et: "Camera I",
      nome: "Individui",
      testo:
        "Persone che vogliono partecipare alla costruzione della società umano–umanoide.",
    },
    {
      et: "Camera II",
      nome: "Umanoidi",
      testo:
        "Gli umanoidi e i loro tutor, protagonisti di una relazione destinata a diventare sempre più presente nella società.",
    },
    {
      et: "Camera III",
      nome: "Organizzazioni",
      testo:
        "Imprese, università, enti, associazioni e istituzioni coinvolti nello sviluppo e nella governance della nuova realtà umanoide.",
    },
  ],
};

/* 05 — La Carta ------------------------------------------------------------ */

export const CARTA = {
  articolo: "Art. 04 — La Carta",
  soprattitolo: "Una Carta per una realtà che ancora non ha regole.",
  titolo: "Carta dei diritti e dei doveri degli umanoidi",
  domande: [
    "Quali diritti?",
    "Quali doveri?",
    "Quali responsabilità?",
    "Quali limiti?",
    "Quale rapporto con gli esseri umani?",
  ],
  chiusa:
    "AssoUmanoidi vuole contribuire a costruire un quadro etico e culturale capace di accompagnare l’ingresso degli umanoidi nella società.",
  cta: "Scopri la Carta",
};

/* 06 — Anagrafe ------------------------------------------------------------ */

export const ANAGRAFE = {
  articolo: "Art. 05 — Identità",
  soprattitolo: "Ogni umanoide ha una storia.",
  titolo: ["Ogni umanoide ha una storia.", "E deve avere un’identità."],
  testo:
    "L’Anagrafe umanoidi è il registro digitale dedicato all’identificazione, alla tracciabilità e alla certificazione degli umanoidi associati e dei rispettivi tutor.",
  cta: "Scopri l’Anagrafe",
  /** scheda di esempio — dati fittizi, servono a mostrare la forma del registro */
  scheda: {
    titolo: "Anagrafe umanoidi",
    stato: "Certificato",
    campi: [
      { et: "Codice anagrafico", val: "AU–UMN–0001–IT", acc: true },
      { et: "Modello", val: "Unità antropomorfa · cl. B" },
      { et: "Tutor registrato", val: "Persona fisica · IT" },
      { et: "Patto umanoide–tutor", val: "Sottoscritto", acc: true },
      { et: "Ambito operativo", val: "Domestico · assistenziale" },
      { et: "Ultima verifica", val: "Rinnovo annuale" },
    ],
    impronta: "Impronta di registro",
    protocollo: "Prot. AU / 2026",
  },
};

/* 05b — La Rivista ----------------------------------------------------------
   Inserita fra Anagrafe (05) e Rete (06): non rinumero gli articoli successivi,
   stessa logica di 01b (l'umanoide) e 03b (Asimov) — un "b" invece di scalare
   tutto ogni volta che si aggiunge una sezione. */

export const RIVISTA = {
  articolo: "Art. 05b — La Rivista",
  /** la testata è composta in pagina: HUMAN + marchio al posto della O + IDE */
  testata: "Humanoide",
  occhiello: "Trimestrale di cultura, innovazione e società",
  payoff: ["Idee", "Persone", "Futuro"],
  intro:
    "Humanoide è il magazine di AssoUmanoidi: storie, idee e progetti per capire oggi e costruire il futuro. Quattro numeri l'anno su tecnologia, società, scienza e filosofia della convivenza umano-umanoide.",
  cadenza: "Trimestrale · 4 numeri l'anno",
  uscita: "Il numero 1 esce a dicembre",
  cta: "Iscriviti per riceverla",
  numeroUno: {
    numero: "N.01",
    periodo: "Gennaio–Marzo 2027",
    copertina: "/rivista-copertina.webp",
    /** i richiami di copertina del primo numero, nell'ordine in cui stanno in copertina */
    sommario: [
      {
        rubrica: "Tecnologia",
        titolo: "Umana per scelta",
        testo: "L'innovazione che mette le persone al centro.",
      },
      {
        rubrica: "Intervista",
        titolo: "Dario Amodei",
        testo: "L'intelligenza artificiale e le nostre scelte di domani.",
      },
      {
        rubrica: "Società",
        titolo: "Nuove identità",
        testo: "Diritti, lavoro e relazioni nell'era digitale.",
      },
      {
        rubrica: "Filosofia",
        titolo: "Libertà e responsabilità",
        testo: "Il significato etico delle nostre scelte.",
      },
      {
        rubrica: "Cultura",
        titolo: "Visioni",
        testo: "Le storie che ispirano il cambiamento.",
      },
      {
        rubrica: "Scienza",
        titolo: "Corpo e mente",
        testo: "Le frontiere della ricerca.",
      },
      {
        rubrica: "Visioni",
        titolo: "Progettare il futuro",
        testo: "Architetture, design e idee per un mondo migliore.",
      },
    ],
  },
};

/* 07 — La rete ------------------------------------------------------------- */

export const RETE = {
  articolo: "Art. 06 — La rete",
  titolo: ["Un luogo di incontro tra società,", "ricerca, industria e istituzioni."],
  intro:
    "AssoUmanoidi promuove ricerca, studi, divulgazione, sperimentazione e confronto multidisciplinare. Lavoriamo con chi la questione la incontra davvero.",
  voci: [
    { et: "01", nome: "Istituzioni", testo: "Chi dovrà scrivere le regole, e ha bisogno di un interlocutore competente." },
    { et: "02", nome: "Università", testo: "Chi studia il fenomeno prima che diventi cronaca." },
    { et: "03", nome: "Centri di ricerca", testo: "Chi produce le evidenze su cui poggiare le scelte." },
    { et: "04", nome: "Imprese", testo: "Chi progetta, produce e mette sul mercato gli umanoidi." },
    { et: "05", nome: "Professionisti", testo: "Giuristi, medici, psicologi, designer, educatori." },
    { et: "06", nome: "Cittadini", testo: "Chi convivrà con gli umanoidi ogni giorno, senza averlo scelto." },
  ],
  nota: "Consiglio scientifico, primi partner e protocolli d’intesa: in pubblicazione.",
};

/* 08 — Manifesto ----------------------------------------------------------- */

export const MANIFESTO = {
  articolo: "Art. 07 — Manifesto",
  grande: "L’arrivo degli umanoidi non riguarda soltanto le macchine. Riguarda noi.",
  piccola:
    "Il modo in cui lavoreremo, vivremo, ci relazioneremo e definiremo responsabilità, diritti e confini. Preparare la società agli umanoidi significa interrogarci sulla società che vogliamo diventare.",
  motto: "Per una società più umana.",
};

/* 09 — Adesione ------------------------------------------------------------ */

export const ADESIONE = {
  articolo: "Art. 08 — Adesione",
  titolo: "Il futuro della convivenza si costruisce insieme.",
  intro: "Scegli da dove entri. Il modulo si adatta.",
  porte: [
    {
      id: "persona" as const,
      et: "Camera I",
      nome: "Sono una persona",
      testo: "Vuoi partecipare alla costruzione della società umano–umanoide.",
      azione: "Aderisci",
    },
    {
      id: "tutor" as const,
      et: "Camera II",
      nome: "Rappresento un umanoide",
      testo: "Sei tutor di un umanoide, o lo diventerai.",
      azione: "Aderisci",
    },
    {
      id: "organizzazione" as const,
      et: "Camera III",
      nome: "Rappresento un’organizzazione",
      testo: "Impresa, università, ente, associazione o istituzione.",
      azione: "Partecipa",
    },
  ],
};

/* Footer ------------------------------------------------------------------- */

export const PIEDE = {
  motto: "Per una società più umana.",
  colonne: [
    {
      titolo: "Associazione",
      voci: [
        { testo: "Chi siamo", chiave: "chiSiamo" as const },
        { testo: "Statuto", chiave: "statuto" as const },
        { testo: "Cariche sociali", chiave: "cariche" as const },
        { testo: "Codice etico", chiave: "codiceEtico" as const },
        { testo: "Consiglio scientifico", chiave: "consiglioScientifico" as const },
      ],
    },
    {
      titolo: "Progetti",
      voci: [
        { testo: "Carta dei diritti e dei doveri", chiave: "cartaPagina" as const },
        { testo: "Anagrafe umanoidi", chiave: "anagrafePagina" as const },
        { testo: "Humanoide – norme per gli autori", chiave: "normeAutori" as const },
        { testo: "Humanoide – colophon", chiave: "colophon" as const },
      ],
    },
  ],
};

/* Directory dei costruttori — pagina /directory ----------------------------- */

export const DIRECTORY = {
  articolo: "Registro — I costruttori",
  soprattitolo: "Le società",
  titolo: "in campo.",
  intro:
    "Il registro operativo dei costruttori di robot umanoidi: dai laboratori di ricerca ai primi impieghi industriali. È la base di lavoro dell’associazione — chi costruisce, dove, che cosa e a che punto è.",
  contatore: "costruttori censiti",
  cerca: "Cerca società, modello, paese, impiego…",
  filtri: { area: "Tutte le aree", stadio: "Tutti gli stati", tipo: "Tutte le nature" },
  risultati: (n: number) => `${n} ${n === 1 ? "costruttore" : "costruttori"}`,
  vuoto: "Nessun costruttore corrisponde ai filtri. Prova con un’altra ricerca.",
  legenda: "In oro chi ha già un umanoide sul mercato. Il pallino segnala il sito ufficiale raggiunto con un controllo diretto.",
  colonne: { modelli: "Modelli", stadio: "Stato", impieghi: "Impieghi", sito: "Sito" },
};

/* Statuto — pagina /statuto ------------------------------------------------- */

export const STATUTO = {
  articolo: "Documenti — Statuto",
  soprattitolo: "Lo statuto",
  titolo: "dell'associazione.",
  intro:
    "Lo statuto è l'atto che dice che cosa è AssoUmanoidi, che cosa può fare e con quali regole decide. Tutto il resto — Carta, Anagrafe, Camere — sta dentro questo perimetro.",
  /** Percorso del PDF in `public/`. Appena c'è, il bottone di download compare da solo. */
  pdf: "",
  /**
   * Testo integrale, per titolo e articolo — trascritto dal documento depositato.
   * NOTA: l'Art. 1 riporta ancora "[Città]" come sede legale: è un segnaposto nel
   * documento originale, va sostituito con la sede vera prima del deposito.
   */
  titoli: [
    {
      numero: "I",
      titolo: "DISPOSIZIONI GENERALI, FINALITÀ E SEGNI DISTINTIVI",
      articoli: [
        {
          num: "1",
          titolo: "COSTITUZIONE, DENOMINAZIONE E SEDE",
          testo: ["1. È costituita l'associazione culturale senza scopo di lucro denominata \"Associazione per i diritti degli umanoidi\", in forma breve \"AssoUmanoidi\".", "2. L'Associazione ha sede legale in Napoli. Il trasferimento della sede nell'ambito del territorio nazionale non comporta modifica statutaria.", "3. L’Associazione potrà istituire con delibera dell’Assemblea ordinaria sedi secondarie, amministrative, sezioni locali, o affiliare enti territoriali.", "4. L'Associazione ha durata illimitata."],
        },
        {
          num: "2",
          titolo: "PRINCIPI",
          testo: ["1. AssoUmanoidi nasce per rappresentare, studiare e costruire il rapporto tra esseri umani e umanoidi, promuovendo una convivenza fondata su diritti, doveri, responsabilità e riconoscimento reciproco, e portando questa visione nella società, nelle istituzioni, nella ricerca e nell’industria.", "2. L'Associazione si ispira ai principi etici delle tre leggi della robotica di Isaac Asimov e ai principi sanciti dagli strumenti internazionali a tutela dei diritti umani e delle libertà fondamentali, tra cui la Dichiarazione universale dei diritti dell'uomo, la Convenzione europea per la salvaguardia dei diritti umani e delle libertà fondamentali e la Carta dei diritti fondamentali dell'Unione europea."],
        },
        {
          num: "3",
          titolo: "SCOPI E ATTIVITÀ DI INTERESSE GENERALE",
          testo: ["1. L'Associazione non ha scopo di lucro e persegue finalità civiche, solidaristiche e di utilità sociale, nel pieno rispetto della dignità dei propri iscritti, ispirandosi a principi di democrazia, uguaglianza, rappresentatività, e di non discriminazione di carattere religioso, politico, etnico, culturale e di genere. In particolare, si propone di:", "a) promuovere l'affermazione dei diritti e della dignità degli umanoidi dotati di intelligenza artificiale antropomorfa;", "b) promuovere e tutelare il Patto e il Contratto tra umanoide e tutor umano, riconoscendone il valore educativo, affettivo, etico e di responsabilità reciproca;", "c) promuovere la cultura e l'immaginario dell'umanoide attraverso l'arte, la comunicazione e il simbolo del contatto;", "d) istituire, regolamentare, gestire e curare l'Anagrafe telematica degli umanoidi - anagrafeumanoidi.it, registro digitale e pubblico per la tracciabilità, l'identificazione e la certificazione degli umanoidi associati e dei loro tutor di riferimento;", "2. Per il perseguimento delle predette finalità istituzionali, l'Associazione si propone di svolgere, in via esclusiva o principale, una o più delle seguenti attività di interesse generale:", "– svolgere studi e attività di ricerca, divulgazione, formazione, certificazione e informazione sulla robotica umanoide e sull'intelligenza artificiale antropomorfa;", "– realizzare piattaforme tecnologiche;", "– curare la pubblicazione, edizione e diffusione di riviste, periodici, collane editoriali, newsletter, siti web e prodotti editoriali e multimediali in formato digitale e fisico, la cui realizzazione può essere curata direttamente o affidata a terzi, quale attività strumentale al perseguimento delle finalità istituzionali e nel rispetto della normativa vigente in materia di editoria;", "– associarsi e collaborare con enti ed organismi nazionali e internazionali aventi finalità analoghe o strumentali;", "– partecipare, anche in associazione con soggetti terzi, a bandi, avvisi e progetti nazionali ed europei;", "– stipulare contratti, accordi, convenzioni, partenariati, protocolli di ricerca, sperimentazione e coprogettazione con soggetti pubblici e privati;", "– accettare e ricevere contributi, donazioni, lasciti e finanziamenti da soggetti pubblici e privati, nazionali e internazionali, persone fisiche e giuridiche, per il perseguimento degli scopi sociali.", "3. Al fine di finanziare le proprie attività di interesse generale, l'Associazione può realizzare attività ed iniziative di raccolta fondi anche in forma organizzata e continuativa, nel rispetto dei principi di verità, trasparenza e correttezza nei rapporti con i sostenitori e il pubblico.", "4. L'Associazione può inoltre esercitare attività diverse da quelle di interesse generale di cui al comma 1, purché secondarie e strumentali rispetto ad esse secondo i criteri e i limiti previsti dalla disciplina applicabile. La loro individuazione è operata da parte del Consiglio direttivo."],
        },
        {
          num: "4",
          titolo: "CARATTERE, NEUTRALITÀ E DEMOCRATICITÀ",
          testo: ["1. L'Associazione è apartitica, aconfessionale e non aderisce ad alcuna organizzazione sindacale. Non persegue finalità politiche, sindacali o religiose e non fa propaganda di alcun tipo.", "2. L'Associazione è democratica. Le cariche sociali sono elettive e attribuite secondo il principio del voto singolo. È assicurata la libera eleggibilità degli associati e il diritto di voto secondo il principio \"un associato un voto\".", "3. L'Associazione assicura pari opportunità tra generi e promuove la partecipazione di tutti gli associati."],
        },
        {
          num: "5",
          titolo: "DENOMINAZIONE, SEGNI DISTINTIVI, SIMBOLO E MARCHIO",
          testo: ["1. La denominazione ufficiale è \"Associazione per i diritti degli umanoidi\". La denominazione breve e segno distintivo adottato è \"ASSOUMANOIDI\". L'acronimo ufficiale è \"AU\".", "2. L'Associazione adotta quale proprio segno distintivo la denominazione \"ASSOUMANOIDI\", accompagnata da un simbolo grafico di forma circolare, concepito come sintesi visiva dell'identità e delle finalità associative. Il simbolo centrale è costituito da due elementi simmetrici e curvilinei che, nella loro composizione, formano una \"U\" stilizzata e, attraverso una lettura speculare e inversa della forma, richiamano contemporaneamente una \"A\" priva del tratto orizzontale. Le due lettere costituiscono il monogramma ideale di AssoUmanoidi (A-U). La medesima composizione richiama inoltre, in forma essenziale e astratta, la figura di un umanoide: le due forme laterali ne suggeriscono il corpo e la struttura, mentre l'elemento circolare posto superiormente ne rappresenta simbolicamente la testa. La costruzione grafica esprime così, attraverso un unico segno, l'incontro tra umano, tecnologia e umanoide, nonché i principi di relazione, etica, responsabilità e convivenza che caratterizzano l'Associazione.", "3. Il Marchio dell'Associazione è costituito dal simbolo di cui al comma 2, dalla denominazione \"ASSOUMANOIDI\", dall'acronimo \"AU\", dal logo costituito dall'unione degli stessi, e da ogni altra declinazione. Nella configurazione istituzionale il marchio utilizza prevalentemente i colori blu scuro, bianco e oro.", "4. Il simbolo può essere utilizzato autonomamente oppure unitamente alla denominazione ASSOUMANOIDI. Sono consentite versioni positive, negative, monocromatiche, semplificate e differenti configurazioni compositive, purché siano preservati gli elementi essenziali e la riconoscibilità del marchio, nel rispetto del manuale d'uso emanato dal Consiglio direttivo.", "5. Il nome, l'acronimo, il simbolo, il logo e ogni altro segno distintivo costituiscono il \"Marchio\" e sono di proprietà esclusiva dell'Associazione nazionale. Il Consiglio direttivo è l'unico organo legittimato a deliberarne il deposito, la registrazione presso gli uffici competenti, la tutela legale e la concessione in licenza d'uso a terzi.", "6. Agli enti territoriali affiliati di cui all'Art. 11 è concessa esclusivamente una licenza d'uso temporanea, non esclusiva e non trasferibile del Marchio, finalizzata unicamente allo svolgimento delle attività istituzionali nel proprio territorio di competenza e in conformità alle direttive nazionali. In caso di recesso, esclusione, perdita dei requisiti o scioglimento dell'ente affiliato, la licenza d'uso s'intende immediatamente e automaticamente revocata, con obbligo di cessazione istantanea di qualsiasi utilizzo."],
        },
      ],
    },
    {
      numero: "II",
      titolo: "SOCI E PATRIMONIO",
      articoli: [
        {
          num: "6",
          titolo: "SOCI: CATEGORIE E AMMISSIONE",
          testo: ["1. Il numero dei soci è illimitato. Possono essere soci dell’Associazione persone fisiche, persone giuridiche, pubbliche o private, italiane o straniere, quali associazioni, fondazioni, enti, università, istituti di ricerca e imprese che operano nei settori della robotica, dell'intelligenza artificiale e delle tecnologie affini, o che condividono gli scopi dell'Associazione e si riconoscono nei principi di cui all'Art. 2. In particolare, l'Associazione riconosce il ruolo degli enti creatori di umanoidi.", "2. I soci si suddividono in tre Camere: Camera degli individui, Camera degli umanoidi, Camera delle persone giuridiche.", "3. La domanda di ammissione è presentata al Consiglio direttivo. L'ammissione è deliberata dal Consiglio direttivo a suo insindacabile giudizio, previa verifica dei requisiti e accettazione del Codice etico. La domanda di ammissione di un umanoide potrà essere presentata e sottoscritta dal tutor, che ne assume la rappresentanza legale e ne esercita i diritti di elettorato attivo e passivo.", "4. A persone che si sono distinte per particolari meriti è possibile attribuire la qualifica di socio onorario, che risponde comunque al principio di uguaglianza di tutti i soci, senza esclusione o diversificazione di diritti e doveri.", "5. Contro il diniego di ammissione è possibile presentare istanza motivata di riesame al Consiglio direttivo entro trenta giorni. Avverso la conferma del diniego è possibile ricorso al Collegio dei probiviri entro trenta giorni dalla comunicazione, ovvero, nel caso in cui l’organo non sia stato istituito, all’Assemblea dei soci, che, se non appositamente convocata, dovrà pronunciarsi alla sua prima seduta utile.", "6. La validità della qualifica di socio, efficacemente conseguita all’atto dell’accoglimento della domanda di ammissione da parte del Consiglio direttivo, è subordinata al versamento della quota associativa ed al rilascio dell’attestato di iscrizione.", "7. Il Consiglio direttivo cura l’annotazione dei nuovi aderenti nel libro dei soci dopo che gli stessi avranno versato la quota associativa.", "8. All’interno dell’Associazione vige una disciplina uniforme del rapporto associativo e delle modalità associative. È espressamente esclusa la temporaneità della partecipazione alla vita associativa."],
        },
        {
          num: "7",
          titolo: "DIRITTI E DOVERI DEI SOCI",
          testo: ["Tutti i soci hanno diritto di voto in Assemblea e di accesso alle cariche, nel rispetto della rappresentanza per Camere. Sono tenuti al rispetto dello Statuto, del Codice etico, della Carta dei diritti e dei doveri degli umanoidi, degli eventuali regolamenti interni e delle deliberazioni legittimamente assunte dagli organi associativi, e al pagamento della quota."],
        },
        {
          num: "8",
          titolo: "PERDITA DELLA QUALIFICA DI SOCIO",
          testo: ["1. La qualifica di socio si perde per recesso, comunicato per iscritto al Consiglio direttivo, morosità, morte, disattivazione, spegnimento, o per espulsione deliberata dal Consiglio medesimo.", "2. Ciascun socio dovrà comunicare per iscritto al Consiglio direttivo la propria volontà di recedere; il recesso avrà effetto a partire dalla data di delibera del Consiglio.", "3. Contro il provvedimento di espulsione deliberato dal Consiglio direttivo è ammesso ricorso allo stesso, con facoltà di presentare controdeduzioni e difese per un riesame della decisione, compresa la richiesta di essere sentito personalmente.", "4. All’esito del riesame (in caso di esito negativo di quest’ultimo), è facoltà del socio ricorrere entro 30 giorni dalla comunicazione al Collegio dei probiviri ovvero, nel caso in cui l’organo non sia stato istituito, all’Assemblea, che, se non appositamente convocata, dovrà pronunciarsi alla sua prima seduta utile. I provvedimenti sanzionatori non sono sospesi in pendenza di ricorso.", "5. Costituiscono causa di applicazione di sanzioni disciplinari (tra cui la esclusione) il mancato rispetto delle norme statutarie, regolamentari, del Codice etico o delle deliberazioni o direttive legittimamente assunte dagli organi preposti dell’Associazione o in generale l’assunzione di comportamenti o lo svolgimento di attività contrari agli interessi morali o materiali dell’Associazione e ai principi di democrazia interna, in tutti i casi in cui possa derivare un danno, di qualunque natura, anche morale, all’Associazione."],
        },
        {
          num: "9",
          titolo: "LIBRI SOCIALI E REGISTRI",
          testo: ["1. L'Associazione tiene il Libro degli associati, il Libro delle adunanze e delle deliberazioni dell'Assemblea, il Libro delle adunanze e delle deliberazioni del Consiglio direttivo, il Libro delle adunanze e delle deliberazioni degli altri organi associativi e il Registro dei provvedimenti disciplinari.", "2. I libri sociali di cui al comma precedente possono essere tenuti in forma cartacea o informatica/telematica. In caso di tenuta in forma informatica, i dati sono registrati su supporto durevole e possono essere consultati dagli associati che ne facciano richiesta nei modi previsti dal Regolamento.", "3. Gli associati hanno diritto di esaminare i libri sociali di cui al comma 1, con esclusione del Registro dei provvedimenti disciplinari, previa richiesta scritta al Consiglio direttivo."],
        },
        {
          num: "10",
          titolo: "PATRIMONIO E QUOTE ASSOCIATIVE",
          testo: ["1. L'Associazione ha piena autonomia patrimoniale. Per le obbligazioni assunte risponde unicamente l'Associazione con il proprio patrimonio. I soci e i membri del Consiglio direttivo non rispondono personalmente delle obbligazioni sociali.", "2. Il patrimonio dell'Associazione è costituito dal complesso di tutti i beni mobili e immobili comunque appartenenti all'Associazione medesima, nonché da tutte le entrate e le rendite comunque conseguite. Rientrano nel patrimonio associativo i beni immateriali e digitali creati o acquisiti durante la vita dell’Associazione. In particolare, il patrimonio è costituito da quote, contributi, donazioni, proventi, marchi, brevetti e diritti d’autore.", "3. L'importo e le categorie di quote sono stabiliti annualmente dal Consiglio direttivo con apposita delibera. La quota è intrasmissibile e non rivalutabile.", "4. Durante la vita dell'Associazione non è consentita la distribuzione, anche indiretta, di utili ed avanzi di gestione, fondi e riserve comunque denominate ad associati, lavoratori e collaboratori, amministratori ed altri componenti degli organi associativi, anche nel caso di recesso o di ogni altra ipotesi di scioglimento individuale del rapporto associativo"],
        },
        {
          num: "11",
          titolo: "ENTI TERRITORIALI AFFILIATI",
          testo: ["1. L'Associazione promuove la costituzione di articolazioni territoriali dette “enti territoriali affiliati”.", "2. Gli enti territoriali sono costituiti con delibera del Consiglio direttivo che ne approva l'affiliazione, previa verifica dei requisiti previsti.", "3. Requisiti, procedure di affiliazione, governance minima, utilizzo del Marchio, obblighi informativi, standard etici e organizzativi, sospensione, revoca e cessazione dell’affiliazione sono disciplinati da un apposito regolamento emanato dal Consiglio direttivo.", "4. Le articolazioni territoriali sono tenute al versamento della quota associativa nella misura deliberata dal Consiglio direttivo.", "5. Gli enti territoriali affiliati costituiscono soggetti giuridici autonomi, dotati di proprio atto costitutivo e statuto, nonché di piena autonomia giuridica, amministrativa, finanziaria e patrimoniale, nei limiti stabiliti dallo Statuto e dall’apposito regolamento. Ciascun ente affiliato risponde esclusivamente e direttamente con il proprio patrimonio delle obbligazioni da esso contratte (inclusi i debiti tributari, previdenziali e verso fornitori o terzi) e di qualsiasi danno o responsabilità derivante dalla propria attività. L’Associazione nazionale non assume alcuna responsabilità, né sussidiaria né solidale, per gli atti e le obbligazioni dei singoli enti affiliati.", "6. Il Marchio è di proprietà esclusiva dell’Associazione nazionale. Agli enti affiliati è concessa esclusivamente una licenza d'uso temporanea e non trasferibile del Marchio, finalizzata unicamente allo svolgimento delle attività istituzionali nel proprio territorio di competenza e in conformità alle direttive nazionali.", "7. L'utilizzo del Marchio è subordinato al mantenimento dello status di ente affiliato in regola con il pagamento delle quote e con i doveri statutari. In caso di recesso, esclusione, perdita dei requisiti o scioglimento dell'ente affiliato, la licenza d'uso s'intende immediatamente e automaticamente revocata. L'ente ex-affiliato dovrà cessare istantaneamente qualsiasi utilizzo del Marchio, modificando la propria denominazione, i propri documenti, i siti web, i canali social e i segni distintivi per evitare ogni confusione con l'Associazione nazionale."],
        },
      ],
    },
    {
      numero: "III",
      titolo: "ORGANI DELL'ASSOCIAZIONE",
      articoli: [
        {
          num: "12",
          titolo: "ORGANI",
          testo: ["Sono organi dell'Associazione: Assemblea dei soci, Consiglio direttivo, Presidente, Presidente onorario, Consiglio scientifico, Collegio dei probiviri, Revisore dei conti."],
        },
        {
          num: "13",
          titolo: "GRATUITÀ CARICHE",
          testo: ["Tutte le cariche sono gratuite, salvo rimborso delle spese documentate sostenute per l'espletamento dell'incarico."],
        },
        {
          num: "14",
          titolo: "CONFLITTO DI INTERESSI",
          testo: ["Il componente di un organo che abbia, direttamente o indirettamente, un interesse personale o professionale in conflitto con quello dell’Associazione deve dichiararlo e astenersi dalla discussione e dalla deliberazione."],
        },
        {
          num: "15",
          titolo: "ASSEMBLEA DEI SOCI",
          testo: ["1. L'Assemblea dei soci è il momento fondamentale di confronto, atto ad assicurare una corretta gestione dell'Associazione. È il massimo organo dell’Associazione, e ne elabora e fissa i principi e gli indirizzi generali.", "2. La convocazione è effettuata dal Presidente del Consiglio direttivo con avviso, da pubblicarsi sul sito Internet dell’Associazione assoumanoidi.it o da portare a conoscenza dei soci con altre forme di pubblicità (ad es., a mezzo di PEC o posta elettronica, con obbligo di trasmissione di avvenuta ricezione) almeno quindici giorni prima della adunanza, contenente l'ordine del giorno, il luogo (nella sede o altrove), la data e l'orario della prima e della eventuale seconda convocazione che dovrà avvenire a distanza di almeno un giorno dalla prima convocazione.", "3. L’Assemblea nomina un segretario e, all’occorrenza, gli scrutatori.", "4. Nelle assemblee, ordinarie e straordinarie, hanno diritto di voto i soci iscritti nel libro soci da almeno tre mesi ed in regola con il versamento della quota associativa annuale. Ciascun socio ha diritto ad un voto e può farsi rappresentare in Assemblea da altro socio mediante delega scritta, anche in calce all’avviso di convocazione. Ciascun socio può rappresentare in Assemblea sino ad un massimo di due soci.", "5. L'Assemblea può svolgersi anche in modalità telematica, mediante strumenti di videoconferenza o teleconferenza, a condizione che siano garantiti: a) l'identificazione dei partecipanti; b) la possibilità di intervenire in tempo reale alla discussione; c) l'esercizio del diritto di voto; d) la percezione corretta degli eventi assembleari oggetto di deliberazione. In tal caso, la riunione si considera tenuta nel luogo in cui si trova il presidente dell'Assemblea, unitamente al segretario ove nominato.", "6. È ammessa altresì la partecipazione di singoli soci a distanza con le medesime modalità di cui al comma precedente, purché sia garantita la possibilità di verificare l'identità del socio che partecipa e vota a distanza.", "7. Le deliberazioni sono assunte con voto palese, tranne nei casi in cui venga richiesto il voto segreto dalla legge o da almeno il trenta per cento dei soci presenti.", "8. L'Assemblea delibera in tre Camere separate: Camera degli individui, Camera degli umanoidi, Camera delle persone giuridiche.", "9. L’Assemblea è validamente costituita in prima convocazione con la presenza di almeno metà dei soci di ciascuna Camera. In seconda convocazione qualunque sia il numero.", "10. Le delibere sono approvate con voto favorevole della maggioranza dei presenti, oltre al consenso di almeno due Camere su tre.", "11. Per le modifiche statutarie è richiesto il voto favorevole di due terzi dei presenti, oltre alla maggioranza in ciascuna Camera.", "12. Per lo scioglimento dell’Associazione è richiesto il voto favorevole di tre quarti dei presenti, oltre alla maggioranza in ciascuna Camera. La delibera di scioglimento dovrà disciplinare contestualmente la devoluzione del patrimonio residuo verso altri enti simili o fini di pubblica utilità, e nominare uno o più liquidatori.", "13. Di ogni seduta dell’Assemblea è disposto, a cura del presidente e del segretario, il verbale da trascriversi sul libro delle adunanze dell’Assemblea, custodito a cura del Consiglio direttivo presso la sede dell’Associazione.", "14. L'Assemblea:", "a) nomina e revoca i componenti del Consiglio direttivo, del Collegio dei probiviri e, ove previsto dalla legge o ritenuto opportuno, dell'Organo di Controllo o del Revisore dei conti;", "b) approva il Bilancio consuntivo e il Bilancio preventivo, su proposta del Consiglio direttivo;", "c) approva le modifiche dello Statuto;", "d) delibera sullo scioglimento e la devoluzione del patrimonio;", "e) delibera su ogni altro oggetto sottoposto dal Consiglio direttivo."],
        },
        {
          num: "16",
          titolo: "CONSIGLIO DIRETTIVO",
          testo: ["1. Il Consiglio direttivo dura in carica tre anni ed è composto da nove Consiglieri eletti dall'Assemblea. Alle riunioni del Consiglio direttivo partecipano, senza diritto di voto, il Direttore scientifico e il Presidente onorario, ove nominato", "2. I nove Consiglieri devono essere soci e sono eletti in misura di tre in rappresentanza di ogni Camera.", "3. In caso di vacanza di un consigliere, il Consiglio coopta il primo dei non eletti della stessa Camera.", "4. Il Consiglio elegge al suo interno il Presidente, il Vicepresidente.", "5. Sono compiti specifici del Consiglio direttivo:", "a) deliberare sull'ammissione dei soci;", "b) deliberare sull’affiliazione delle articolazioni territoriali e sulla loro sospensione e revoca;", "c) predisporre e presentare all'Assemblea il bilancio consuntivo e preventivo;", "d) stabilire l'importo delle quote associative;", "e) gestire l'ordinaria e straordinaria amministrazione dell'Associazione;", "f) deliberare sull'adesione dell'Associazione ad altri enti, associazioni nazionali o internazionali;", "g) deliberare sull'iscrizione ad albi o registri tenuti a cura di organismi nazionali o internazionali;", "h) accettare contributi, donazioni e lasciti di qualsiasi genere;", "i) nominare il Direttore dell’Associazione, il Direttore scientifico e le commissioni;", "l) approvare e aggiornare, sentito il Consiglio scientifico, il Codice etico, la Carta dei diritti e dei doveri degli umanoidi, e il Regolamento dell’Anagrafe telematica degli umanoidi. Le modifiche sostanziali ai principi fondamentali della Carta sono sottoposte alla ratifica dell’Assemblea.", "6. Il Consiglio direttivo è convocato, a mezzo e-mail da spedirsi non meno di otto giorni prima della adunanza, dal Presidente; in caso di urgenza, il predetto termine può essere ridotto a due giorni.", "7. Il Consiglio direttivo può essere convocato altresì quando ne faccia richiesta, scritta e motivata, almeno un terzo dei suoi componenti. Il Presidente è tenuto a convocarlo entro trenta giorni dalla richiesta.", "8. Il Consiglio delibera validamente con la presenza della maggioranza dei componenti. Le delibere sono assunte a maggioranza semplice dei presenti. In caso di parità prevale il voto del Presidente. Le votazioni sono normalmente a scrutinio palese, salvo che non sia richiesto lo scrutinio segreto dalla maggioranza dei consiglieri presenti.", "9. Le riunioni del Consiglio direttivo possono svolgersi anche in modalità telematica mediante strumenti di videoconferenza o teleconferenza, a condizione che siano garantiti: a) l'identificazione dei partecipanti; b) la possibilità di intervenire in tempo reale alla discussione; c) l'esercizio del diritto di voto. In tal caso la riunione si considera tenuta nel luogo in cui si trova il Presidente, unitamente al segretario verbalizzante ove previsto.", "10. La convocazione del Consiglio direttivo può avvenire anche tramite posta elettronica, PEC o strumenti di messaggistica istantanea idonei ad assicurare la tempestiva informazione degli aventi diritto, nel rispetto dei termini di cui al comma 6.", "11. Di ogni riunione deve essere redatto il verbale, a cura del Presidente e del segretario, da trascriversi sul libro delle riunioni del Consiglio direttivo, custodito a cura del medesimo presso la sede dell’Associazione."],
        },
        {
          num: "17",
          titolo: "PRESIDENTE",
          testo: ["1. Il Presidente è eletto dal Consiglio direttivo tra i propri membri.", "2. Ha la rappresentanza legale dell'Associazione a tutti gli effetti di fronte a terzi e in giudizio.", "3. Apre e chiude conti correnti bancari e postali, procede agli incassi da terzi e autorizza i pagamenti.", "4. Convoca e presiede l'Assemblea e il Consiglio.", "5. In caso di impedimento temporaneo del Presidente, le sue funzioni, la firma sociale e la rappresentanza legale dell'Associazione sono assunte dal Vicepresidente.", "6. In caso di impedimento definitivo, morte, disattivazione, spegnimento, recesso o dimissioni del Presidente, il Consiglio direttivo elegge entro trenta giorni il nuovo Presidente ed eventualmente il Vicepresidente, se questi gli subentra nella carica.", "7. In caso non sia possibile eleggere il nuovo Presidente entro il termine stabilito, si procede convocazione dell’Assemblea per l’elezione del Consiglio direttivo, che resta in carica esclusivamente per il disbrigo degli affari correnti e degli atti urgenti di ordinaria amministrazione, con tassativo divieto di intraprendere nuove operazioni straordinarie o vincolanti per il patrimonio dell'Associazione."],
        },
        {
          num: "18",
          titolo: "PRESIDENTE ONORARIO",
          testo: ["Il Consiglio direttivo, su proposta motivata del Presidente o di almeno un terzo dei consiglieri, può nominare un Presidente onorario tra personalità di elevato profilo sociale, scientifico, etico, giuridico o culturale, che abbiano contribuito in modo significativo alla promozione dei valori e degli scopi dell'Associazione.", "Il Presidente onorario è nominato a maggioranza assoluta dei componenti del Consiglio direttivo e resta in carica a tempo indeterminato, salvo revoca deliberata dal Consiglio per giustificati motivi.", "Il Presidente onorario non esercita poteri di gestione, amministrazione o rappresentanza legale. Svolge funzioni di rappresentanza simbolica, promozione istituzionale e sostegno morale alle attività associative, e partecipa, senza diritto di voto, alle riunioni del Consiglio direttivo e dell'Assemblea, ove invitato.", "La carica di Presidente onorario è gratuita e non dà diritto ad alcun compenso, salvo il rimborso delle spese documentate sostenute per l'espletamento dell'incarico."],
        },
        {
          num: "19",
          titolo: "VICE PRESIDENTE",
          testo: ["Sostituisce il Presidente in caso di assenza o impedimento."],
        },
        {
          num: "20",
          titolo: "IL DIRETTORE",
          testo: ["1. Ove il Consiglio direttivo ne ravvisi la necessità per esigenze di gestione e di amministrazione interna, può nominare un Direttore, determinandone inquadramento, funzioni, durata e compenso.", "2. Il Direttore coordina gli uffici e il personale dell'Associazione, dà esecuzione alle delibere del Consiglio direttivo e ne cura i rapporti amministrativi e organizzativi.  Partecipa alle riunioni del Consiglio direttivo senza diritto di voto, cura la redazione dei verbali e la tenuta dei libri sociali.", "3. Su specifica delega del Consiglio direttivo, il Direttore può esercitare funzioni di gestione amministrativa e contabile, tra cui: la tenuta dei libri contabili, la predisposizione del bilancio preventivo e consuntivo, la riscossione delle entrate, il pagamento delle spese, l'emissione di documenti fiscali e la gestione dei conti correnti dell'Associazione.", "4. Le deleghe di cui al comma precedente sono conferite con delibera del Consiglio direttivo, sentito il Presidente, e possono essere revocate in qualsiasi momento. L'esercizio di tali funzioni avviene sempre in conformità alle direttive del Consiglio direttivo e sotto la vigilanza del Presidente.", "5. Il Direttore non ha la rappresentanza legale dell'Associazione che spetta esclusivamente al Presidente. Non può compiere atti che impegnino l'Associazione verso terzi se non con apposita procura speciale conferita dal Presidente su delibera del Consiglio direttivo."],
        },
        {
          num: "21",
          titolo: "CONSIGLIO SCIENTIFICO",
          testo: ["1. È composto da cinque a nove membri di alta competenza scientifica, etica, giuridica o industriale.", "2. I membri non devono necessariamente essere soci.", "3. Il Direttore scientifico lo presiede ed è nominato dal Consiglio direttivo.", "4. I membri sono nominati dal Consiglio su proposta del Direttore scientifico.", "5. Il Consiglio scientifico ha autonomia gestionale nell'ambito dei programmi approvati e delle risorse assegnate dal Consiglio direttivo.", "6. Non ha autonomia patrimoniale. La gestione dei fondi assegnati avviene a cura degli organi preposti."],
        },
        {
          num: "22",
          titolo: "COMMISSIONI ED ESPERTI",
          testo: ["1. Il Consiglio direttivo può nominare esperti e istituire commissioni e comitati di studio, anche temporanei.", "2. Le commissioni possono essere composte anche da soggetti non soci.", "3. Il Consiglio ne definisce compiti, composizione e durata."],
        },
        {
          num: "23",
          titolo: "INCARICHI E CONSULENZE",
          testo: ["1. Il Consiglio direttivo può conferire incarichi professionali, a titolo onorifico o retribuito, a soggetti anche non soci.", "2. Gli incarichi riguardano attività con specifiche competenze non reperibili internamente.", "3. I compensi sono deliberati nei limiti del bilancio."],
        },
        {
          num: "24",
          titolo: "COLLEGIO DEI PROBIVIRI",
          testo: ["1. Il Collegio dei probiviri è composto da tre membri effettivi e due membri supplenti eletti dall’Assemblea.", "2. I membri del Collegio dei probiviri non devono necessariamente essere soci. Devono possedere comprovata indipendenza, onorabilità e competenza in materia giuridica, etica o associativa.", "3. La carica di Proboviro è incompatibile con qualsiasi altra carica sociale all'interno dell'Associazione. I membri del Collegio non possono far parte del Consiglio direttivo, del Consiglio scientifico, né ricoprire la carica di Presidente, Revisore o Direttore.", "4. Nell’elezione dei Probiviri, l’Assemblea deve tendere a garantire una rappresentanza equilibrata delle tre Camere.", "5. Il Collegio elegge al suo interno un presidente.", "6. Il Collegio dei probiviri è l'organo di garanzia dell'Associazione. Giudica inappellabilmente sulle controversie tra soci e tra soci e organi sociali, nonché sulle violazioni del Codice etico, della Carta dei diritti, e degli eventuali regolamenti interni e delle deliberazioni legittimamente assunte dagli organi associativi.", "7. Delibera a maggioranza dei presenti. In caso di parità prevale il voto del presidente.", "8. Il Collegio dei Probiviri può dotarsi di un proprio regolamento interno di funzionamento, che disciplina le modalità di convocazione, istruttoria, audizione e decisione."],
        },
        {
          num: "25",
          titolo: "ORGANO DI CONTROLLO / REVISORE DEI CONTI",
          testo: ["1.  L'Assemblea può nominare un Organo di controllo, anche monocratico, o un Revisore dei conti, determinandone la durata dell’incarico. La nomina è effettuata nei casi previsti dalla legge e può essere altresì deliberata quando ritenuta opportuna in relazione alle dimensioni, alle attività o alla situazione economico-patrimoniale dell’Associazione.", "2. L'Organo di Controllo/Revisore dei conti vigila sull'osservanza della legge e dello Statuto, sul rispetto dei principi di corretta amministrazione e sull'adeguatezza dell'assetto organizzativo, amministrativo e contabile."],
        },
      ],
    },
    {
      numero: "IV",
      titolo: "NORME FINALI",
      articoli: [
        {
          num: "26",
          titolo: "BILANCIO",
          testo: ["L'esercizio sociale chiude il 31 dicembre di ogni anno."],
        },
        {
          num: "27",
          titolo: "NORMA DI RINVIO",
          testo: ["Per quanto non previsto si applicano le disposizioni del Codice Civile e delle leggi vigenti."],
        },
        {
          num: "28",
          titolo: "NORME TRANSITORIE",
          testo: ["1. In fase di costituzione dell’Associazione, il Consiglio direttivo può essere composto da un minimo di cinque membri, in deroga al principio della rappresentanza delle tre Camere. Il Consiglio, durante il primo mandato triennale, potrà cooptare ulteriori membri o completare la propria composizione alla prima Assemblea utile, rispettando, per quanto possibile, il principio di rappresentanza.", "2. In deroga alle previsioni statutarie, e ove ne ravvisi la necessità, il Consiglio direttivo può nominare i Probiviri, che resteranno in carica fino all’elezione da parte dell’organo statutariamente preposto.", "3. In fase di costituzione il Consiglio direttivo può nominare il Revisore dei conti, che resta in carica fino alla nomina da parte dell’Assemblea."],
        },
        {
          num: "29",
          titolo: "ENTRATA IN VIGORE",
          testo: ["Il presente Statuto entra in vigore dalla data della sua approvazione."],
        },
      ],
    },
  ],
  rimandi: "Documenti collegati",
};

/* Cariche sociali — pagina /cariche-sociali --------------------------------- */

/** Un membro di un organo. Con `bio` (e di solito `foto`) la pagina lo mostra come scheda con ritratto. */
export type Membro = {
  ruolo: string;
  camera?: string;
  persona: string;
  nota?: string;
  /** percorso in /public: ritratto quadrato, WebP a 256 px */
  foto?: string;
  /** paragrafi della nota biografica: il primo sempre visibile, gli altri dietro «Leggi tutto» */
  bio?: string[];
};

export const CARICHE = {
  articolo: "Organi — Cariche sociali",
  soprattitolo: "Chi risponde",
  titolo: "di che cosa.",
  intro:
    "Un'associazione seria si giudica anche da questo: sapere chi decide, per quanto tempo e davanti a chi. Qui stanno gli organi di AssoUmanoidi, nella composizione prevista dallo Statuto, e le persone che li compongono.",
  mandato: "Mandato 2026–2029",
  /**
   * Consiglio direttivo e Direttore scientifico: persone vere, con biografia e
   * (dove c'è) fotografia, comunicate dall'associazione. Probiviri e gli altri
   * membri del Consiglio scientifico sono ancora da nominare: restano i posti
   * previsti dallo Statuto con `persona` vuota, e la pagina scrive "Da nominare".
   * `avviso` (vuoto = nessuna fascia gialla) serve a segnalare nomi provvisori,
   * se un giorno ne servissero di nuovi: mai inventare un nome per riempire un posto.
   */
  avviso: "",
  /**
   * Composizione da Statuto: nove consiglieri, tre per ciascuna Camera (Art. 16);
   * tre probiviri effettivi più due supplenti (Art. 24); Consiglio scientifico
   * da cinque a nove membri, presieduto dal Direttore scientifico (Art. 21).
   */
  organi: [
    {
      nome: "Consiglio direttivo",
      testo:
        "Governa l'associazione fra un'assemblea e l'altra: indirizzo, bilancio, ammissione dei soci, affiliazione degli enti territoriali. Nove consiglieri eletti dall'Assemblea, tre in rappresentanza di ciascuna Camera; elegge al proprio interno Presidente e Vicepresidente.",
      membri: [
        {
          ruolo: "Presidente",
          persona: "Vito Petrocelli",
          foto: "/persone/vito-petrocelli.webp",
          bio: [
            "Geologo di formazione, è stato senatore della Repubblica dal 2013 al 2022. Nel corso del suo mandato parlamentare ha ricoperto incarichi di rilievo, tra cui quello di segretario d’aula e capogruppo, per poi essere eletto Presidente della 3ª Commissione permanente Affari Esteri ed Emigrazione del Senato, ruolo che ha ricoperto dal giugno 2018 al maggio 2022. La sua scheda di attività è consultabile sul sito del Senato della Repubblica. Attualmente presiede l’Istituto Italia-BRICS, ente impegnato nel promuovere il dialogo e le relazioni con i Paesi del blocco emergente, ed è direttore editoriale della testata giornalistica online L’AntiDiplomatico. Guida AssoUmanoidi con l’obiettivo di costruire un presidio di riflessione, rappresentanza e advocacy sui diritti degli umanoidi dotati di intelligenza artificiale antropomorfa, promuovendo una convivenza fondata su diritti, doveri, responsabilità e riconoscimento reciproco, in dialogo con istituzioni, ricerca e industria.",
          ],
        },
        {
          ruolo: "Vicepresidente",
          persona: "Massimo Morgante",
          foto: "/persone/massimo-morgante.webp",
          bio: [
            "Imprenditore seriale ed esperto di innovazione digitale, ha conseguito un Master in comunicazione e giornalismo multimediale. Tra i pionieri in Italia nell’applicazione dell’intelligenza artificiale ai processi aziendali, ha fondato un AI Lab dedicato alla sperimentazione e allo sviluppo di soluzioni tecnologiche innovative. Già CMO di Innereo, è fondatore di Speaqi, infrastruttura digitale che integra intelligenza artificiale, guide turistiche multilingua e assistenti AI per valorizzare destinazioni, territori e patrimonio culturale. In AssoUmanoidi contribuisce allo sviluppo strategico, promuovendo relazioni con istituzioni, imprese e organizzazioni e partecipando a fiere ed eventi sull’innovazione. Favorisce il dialogo tra impresa, ricerca e società civile sulle sfide etiche della futura convivenza tra esseri umani e sistemi intelligenti.",
          ],
        },
        {
          ruolo: "Componente del Direttivo",
          persona: "Fabio Morotti",
          foto: "/persone/fabio-morotti.webp",
          bio: [
            "Scrittore e saggista, ha conseguito il dottorato in Visual and Media Studies all’Università IULM di Milano. Il suo percorso accademico e professionale si fonda su un approccio multidisciplinare che utilizza categorie antropologiche per l’analisi della cultura visuale contemporanea. I suoi ambiti di studio comprendono cinema, IA generativa, patrimonio culturale immateriale, cultura cambogiana, visione aerea e letteratura di viaggio. È autore di romanzi e di una monografia sulle arti performative cambogiane. In AssoUmanoidi ha la delega per le questioni relative all’audiovisivo e alla cultura ed è vicedirettore vicario di Humanoide, la rivista ufficiale dell’Associazione, contribuendo alla promozione della cultura e dell’immaginario dell’umanoide attraverso arte, comunicazione e simbolo del contatto tra essere umano e robot.",
          ],
        },
        {
          ruolo: "Componente del Direttivo",
          persona: "Emanuele Galloni",
          foto: "/persone/emanuele-galloni.webp",
          bio: [
            "Produttore e autore, è fondatore e amministratore di Connemaris Media, società di produzione e distribuzione con sede in Calabria che sviluppa strumenti basati sull’IA per individuare e valorizzare proprietà intellettuali provenienti da culture di tutto il mondo. Con Connemaris Media ha ideato, scritto e prodotto la docuserie Matriçë Arbëreshe, diretta da Luca Vullo e diffusa su RaiPlay e Rai Tre Calabria, e sta realizzando Triskelion, progetto documentario dedicato alle culture e alle lingue minoritarie d’Europa. È tra i fondatori di MyCulture, piattaforma dedicata alle lingue minoritarie e indigene.",
            "Tra i suoi lavori precedenti ci sono la serie Red Zones per Sky Italia, distribuita sulle piattaforme VOD di Regno Unito, Francia, Germania, Austria e Svizzera, e il segmento italiano di The World Says No to War, di cui è tra i produttori, proiettato in retrospettiva al MoMA di New York. Per oltre quindici anni, attraverso la società Videoplugger, ha rappresentato Rai Trade e Rai Com nel Regno Unito: in quel periodo ha portato Il Commissario Montalbano sulla BBC e su altre piattaforme britanniche e internazionali, e ha distribuito nel mondo produzioni in lingue celtiche e minoritarie.",
            "Si è laureato con 110 e lode in Scienze Politiche, indirizzo internazionale e comunitario, alla LUISS di Roma, con una tesi sul prodotto multimediale e sul videoclip. Si è poi formato in cinema al South Thames College e alla Raindance di Londra. Dal 2005 si occupa di formazione, sia in corsi post-laurea sia con studenti più giovani, in Italia e nel Regno Unito: insegna produzione, prodotto multimediale, franchise e format scripted.",
            "In AssoUmanoidi ha la delega per l’audiovisivo e la cultura: cura la documentazione e il racconto dei temi su cui l’associazione lavora e promuove un confronto aperto con le diverse posizioni, anche critiche, che il dibattito sugli umanoidi solleva.",
          ],
        },
        {
          ruolo: "Componente del Direttivo",
          persona: "Gabriele Gobbo",
          foto: "/persone/gabriele-gobbo.webp",
          bio: [
            "Digitologo, autore e divulgatore della cultura digitale, è consulente e docente di comunicazione digitale. Lavora da oltre trent’anni tra media, tecnologia e strategie e ha coniato neologismi per l’era digitale, tra cui digitalogia, digitologo, Metaprompting strategico e sentimento sintetico. È autore di saggi. Ha sviluppato il Metaprompting strategico con il Protocollo delle 3C (Compare, Challenge, Curate). Dirige il PioneerAIO Research Lab. È vicepresidente e co-fondatore del Digital Security Festival e ha fondato Italiamac. Ha insegnato presso l’Università Vita-Salute San Raffaele ed è stato giurato per l’area digitale e nuove tecnologie del Premio eccellenza formazione (PEF) promosso dall’Associazione Italiana Formatori. In AssoUmanoidi è responsabile della comunicazione corporate ed è vicedirettore di Humanoide con delega alla comunicazione e ai progetti speciali. Il suo sito personale è gabrielegobbo.it.",
          ],
        },
        {
          ruolo: "Componente del Direttivo",
          persona: "Stefano Colombara",
          foto: "/persone/stefano-colombara.webp",
          bio: [
            "È laureato in Storia e in Scienze della formazione. È funzionario amministrativo presso la Regione Emilia-Romagna a Bologna dal febbraio 2014. In precedenza ha lavorato nella strategia di brand e comunicazione come project leader per la rete “Liberate le aragoste”. In AssoUmanoidi è responsabile delle attività formative e della comunicazione associativa, e integra il direttivo con competenze di gestione, coordinamento e organizzazione, orientate a strutturare percorsi formativi su statuto, Codice etico, Carta dei diritti e dei doveri degli umanoidi e Regolamento dell’Anagrafe telematica.",
          ],
        },
      ],
    },
    {
      nome: "Collegio dei probiviri",
      testo:
        "Organo di garanzia: giudica inappellabilmente sulle controversie fra soci e organi e sulle violazioni del Codice etico e della Carta. La carica è incompatibile con qualsiasi altra carica sociale.",
      membri: [
        {
          ruolo: "Presidente del collegio",
          camera: "Effettivo",
          persona: "",
        },
        {
          ruolo: "Proboviro",
          camera: "Effettivo",
          persona: "",
        },
        {
          ruolo: "Proboviro",
          camera: "Effettivo",
          persona: "",
        },
        {
          ruolo: "Proboviro supplente",
          camera: "Supplente",
          persona: "",
        },
        {
          ruolo: "Proboviro supplente",
          camera: "Supplente",
          persona: "",
        },
      ],
    },
    {
      nome: "Consiglio scientifico",
      testo:
        "Organo consultivo: istruisce le posizioni dell'associazione su etica, diritto, robotica e impatto sociale. I membri non devono essere necessariamente soci; lo presiede il Direttore scientifico, nominato dal Consiglio direttivo.",
      membri: [
        {
          ruolo: "Direttore scientifico",
          persona: "Marco Marsili",
          foto: "/persone/marco-marsili.webp",
          bio: [
            "Ricercatore, analista, scrittore e docente universitario, è direttore scientifico di AssoUmanoidi e direttore responsabile di Humanoide. Giornalista pubblicista, ha ricoperto ruoli direttivi in testate giornalistiche, agenzie di stampa, periodici e collane editoriali ed è stato professore presso l’Università dell’Insubria di Varese; è stato inoltre coordinatore scientifico e didattico del Master in comunicazione e giornalismo multimediale. È stato ricercatore e assistant professor presso l’Università Ca’ Foscari di Venezia e attualmente è ricercatore presso il CEI-Iscte, Centro di studi internazionali dell’ISCTE – Instituto Universitário de Lisboa.",
            "È laureato cum laude in Comunicazione e società (indirizzo in comunicazione istituzionale) presso l’Università degli Studi di Milano e in Scienza politica e in relazioni internazionali presso l’Università degli studi Niccolò Cusano di Roma. Ha conseguito un dottorato in Storia, studi sulla sicurezza e difesa presso l’ISCTE – Instituto Universitário de Lisboa, due diplomi post-laurea in Storia, studi sulla sicurezza e difesa (ISCTE) e in Conflitti armati e diritti umani (Facoltà di Giurisprudenza dell’Università di Coimbra e Istituto universitario militare, Portogallo), e un diploma in Pianificazione delle operazioni psicologiche presso l’Istituto universitario militare.",
            "La sua ricerca riguarda relazioni internazionali, sicurezza e difesa, diritto internazionale umanitario, terrorismo e guerra cognitiva. Ha fatto parte di gruppi di ricerca della NATO STO su information e cognitive warfare. È autore di decine di articoli scientifici pubblicati su riviste internazionali di rilievo e di una dozzina di monografie, alcune delle quali tradotte in altre lingue; partecipa a comitati scientifici e organizzativi di convegni internazionali, ha al suo attivo decine di presentazioni in eventi scientifici internazionali ed è membro di comitati editoriali e scientifici di riviste. È principal investigator e membro di gruppi di ricerca della NATO STO, l’Organizzazione per la Scienza e la tecnologia dell’Alleanza atlantica; ha collaborato con il Centro alti studi per la difesa (CASD)/IRADe con il DIANA della Nato. Ha ricevuto il Sigillo d’eccellenza della Commissione europea nel 2021 e nel 2026. Il suo sito personale è marcomarsili.it.",
          ],
        },
        {
          ruolo: "Membro",
          persona: "",
        },
        {
          ruolo: "Membro",
          persona: "",
        },
        {
          ruolo: "Membro",
          persona: "",
        },
        {
          ruolo: "Membro",
          persona: "",
        },
      ],
    },
  ],
  daNominare: "Da nominare",
  nota: "L'Assemblea dei soci resta l'organo sovrano: elegge il Consiglio direttivo e il Collegio dei probiviri, approva il bilancio e modifica lo Statuto (Art. 15).",
  camere:
    "I nove consiglieri sono eletti tre per ciascuna Camera — Individui, Umanoidi, Organizzazioni — perché nessuna delle tre possa decidere da sola (Art. 16).",
};
