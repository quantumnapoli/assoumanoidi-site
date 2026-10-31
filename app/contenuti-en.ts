import { RILEVAZIONE_EN } from "./societa";
import type { ChiaveFutura, Rotte } from "./rotte";
import type { Organo, VoceNav } from "./contenuti";
import { STATUTO as STATUTO_IT, type Porta, type CampoModulo } from "./contenuti";

/**
 * English edition of the site copy. Same exports, same shape as `contenuti.ts`:
 * `testi.ts` types the pair as one, so a missing or misspelled key is a compile error.
 *
 * Conventions: American spelling (as in the journal's colophon), «Chamber» for «Camera»,
 * «Executive Board» for «Consiglio direttivo», «Registry» for «Anagrafe».
 * The Statute is NOT translated: only the Italian text is legally binding.
 */

export const PAYOFF = "Innovate. Connect. Humanize.";

export { SOCIAL } from "./contenuti";

export const NAV = (r: Rotte): VoceNav[] => [
  {
    testo: "Association",
    href: r.associazione,
    sotto: [
      { testo: "Why", href: r.associazione },
      { testo: "Statute", href: r.statuto.href },
      { testo: "Governing bodies", href: r.cariche.href },
    ],
  },
  { testo: "Directory", href: r.directory.href },
  { testo: "Ethics", href: r.etica },
  { testo: "Charter", href: r.carta },
  { testo: "Registry", href: r.anagrafe },
  {
    testo: "Journal",
    href: r.rivista,
    sotto: [
      { testo: "Humanoide, issue 1", href: r.rivista },
      { testo: "Author guidelines", href: r.normeAutori.href },
      { testo: "Colophon", href: r.colophon.href },
    ],
  },
];

export const NAV_TESTI = {
  home: "AssoUmanoidi — home",
  inizio: "AssoUmanoidi — top of page",
  aderisci: "Join",
  apri: "Open menu",
  chiudi: "Close menu",
  menu: "Menu",
  lingua: "Italiano",
  linguaSigla: "IT",
  linguaAria: "Leggi questa pagina in italiano",
};

/* 01 — Hero ---------------------------------------------------------------- */

export const HERO = {
  marchio: "Innovate · Connect · Humanize",
  titolo: ["We prepare society", "for coexistence between", "humans and humanoids."],
  righe: ["We prepare society", "for coexistence between", "<u>humans</u> and <h>humanoids</h>."],
  intro: ["Humans.", "Humanoids.", "One society."],
  aderisci: "Join",
  scopri: "Discover the association ↓",
  scorri: "Scroll",
  sottotitolo:
    "AssoUmanoidi is the cultural association founded to represent, study and build the relationship between humans and humanoids, promoting ethics, rights, duties, responsibility and mutual recognition.",
  portale: {
    etichetta: "The thesis",
    testo: ["We don’t want to predict the future.", "We want to help build its rules."],
  },
};

/* 02 — Why ----------------------------------------------------------------- */

export const PERCHE = {
  articolo: "Art. 01 — Why",
  titolo: ["<h>Humanoids</h> are coming.", "Society must be ready."],
  doc: { statuto: "Statute", cariche: "Governing bodies" },
  paragrafi: [
    "Humanoid robotics and artificial intelligence are reshaping the boundary between technology and everyday life.",
    "It is not only a technological matter. It is an **ethical, social, cultural and legal** question.",
    "AssoUmanoidi was founded to address it before events dictate the answers for us.",
  ],
  tesi: "We don’t want to predict the future. We want to help build its rules.",
  /** indices of the thesis words shown in the accent color: “build its rules.” */
  tesiAccento: [11, 12, 13],
};

/* 03 — Four pillars -------------------------------------------------------- */

export const PILASTRI = {
  articolo: "Art. 02 — What we do",
  titolo: ["Four fronts.", "One job."],
  intro:
    "We don’t deal with technology. We deal with what technology is about to ask of society: principles, rules, responsibility, identity.",
  suggerimento: "Keep scrolling →",
  voci: [
    {
      num: "01",
      nome: "Ethics",
      testo:
        "We promote ethical principles for responsible coexistence between humans, humanoids and artificial intelligence systems.",
      nota: "Principles",
    },
    {
      num: "02",
      nome: "Rights and duties",
      testo:
        "We are drafting a Charter of Rights and Duties of Humanoids to open a new space for cultural, social and institutional reflection.",
      nota: "Charter",
    },
    {
      num: "03",
      nome: "Responsibility",
      testo:
        "Through the Humanoid–Tutor Pact we define principles, commitments and responsibilities in the relationship between a humanoid and a human being.",
      nota: "Pact",
    },
    {
      num: "04",
      nome: "Identity",
      testo:
        "With the Humanoid Registry we are building a system for the identification, traceability and certification of humanoids and their tutors.",
      nota: "Register",
    },
  ],
};

export const MARQUEE = {
  r1: ["Ethics", "Rights", "Duties", "Responsibility", "Identity", "Ethics"],
  r2: ["Recognition", "Traceability", "Coexistence", "Recognition", "Traceability", "Coexistence"],
};

/* 03b — Who is building them ----------------------------------------------- */

export const SOCIETA_TESTI = {
  articolo: "Art. 02b — The state of play",
  titolo: ["It’s not a forecast.", "They are already building them."],
  intro:
    "Companies, labs and universities that design and manufacture humanoid robots today. Not someday: now.",
  nota: `Survey of ${RILEVAZIONE_EN}. The directory is continuously updated.`,
  cta: "See the full directory",
  conti: { totale: "Builders listed", paesi: "Countries", sulMercato: "Already on the market" },
  muro: "Humanoid robot builders",
  apri: "Open the full directory →",
  oro: "In gold: those with a humanoid already on the market",
};

/* 04b — Asimov's laws ------------------------------------------------------ */

export const ASIMOV = {
  articolo: "Art. 03b — A precedent",
  soprattitolo: "The only rules we have",
  titolo: ["were written", "by a novelist.", "In 1942."],
  leggi: [
    {
      num: "I",
      nome: "First Law",
      testo:
        "A robot may not injure a human being or, through inaction, allow a human being to come to harm.",
      rimandi: [] as string[],
      dipende: [] as string[],
      rango: 3,
    },
    {
      num: "II",
      nome: "Second Law",
      testo:
        "A robot must obey the orders given it by human beings, except where such orders would conflict with the First Law.",
      rimandi: ["First Law"],
      dipende: ["I"],
      rango: 2,
    },
    {
      num: "III",
      nome: "Third Law",
      testo:
        "A robot must protect its own existence, as long as this does not conflict with the First or Second Laws.",
      rimandi: ["First", "Second Laws"],
      dipende: ["I", "II"],
      rango: 1,
    },
  ],
  zero: {
    num: "0",
    nome: "Zeroth Law",
    testo:
      "A robot may not harm humanity or, through inaction, allow humanity to come to harm.",
    nota: "Added forty years later, when the first three were no longer enough: it puts humanity before the individual, and rewrites the hierarchy from the top.",
    dipende: ["I", "II", "III"],
  },
  fonte: "Isaac Asimov · “Runaround”, 1942 — Zeroth Law: Robots and Empire, 1985",
  precedenza: "Precedence",
  su: "of",
  suggerimento: "Keep scrolling ↓",
  cedeA: "Yields to",
  nonCedeANulla: "Yields to nothing",
  prevaleSu: "Overrides",
  chiusa: {
    testo: "They are a work of fiction. They still hold up as a moral intuition, and it is no accident that we have been quoting them for eighty years. But they are not a legal order: they do not say who is answerable, who certifies, who decides.",
    puntoFermo: "Those rules — the real ones — nobody has written yet.",
  },
};

/* 04 — Three Chambers ------------------------------------------------------ */

export const CAMERE = {
  sigillo: "Model of representation",
  articolo: "Art. 03 — Representation",
  titolo: ["Three parties.", "One society."],
  intro:
    "AssoUmanoidi is building a new model of representation, organized in three Chambers. None decides alone: the three recognize one another.",
  voci: [
    {
      et: "Chamber I",
      nome: "Individuals",
      testo: "People who want to take part in building the human–humanoid society.",
    },
    {
      et: "Chamber II",
      nome: "Humanoids",
      testo:
        "Humanoids and their tutors, protagonists of a relationship destined to become ever more present in society.",
    },
    {
      et: "Chamber III",
      nome: "Organizations",
      testo:
        "Companies, universities, institutions, associations and public bodies involved in the development and governance of the new humanoid reality.",
    },
  ],
};

/* 05 — The Charter --------------------------------------------------------- */

export const CARTA = {
  articolo: "Art. 04 — The Charter",
  soprattitolo: "A Charter for a reality that has no rules yet.",
  titolo: "Charter of Rights and Duties of Humanoids",
  domande: [
    "Which rights?",
    "Which duties?",
    "Which responsibilities?",
    "Which limits?",
    "What relationship with human beings?",
  ],
  chiusa:
    "AssoUmanoidi wants to help build an ethical and cultural framework able to accompany the arrival of humanoids in society.",
  cta: "Discover the Charter",
};

/* 06 — Registry ------------------------------------------------------------ */

export const ANAGRAFE = {
  articolo: "Art. 05 — Identity",
  soprattitolo: "Every humanoid has a story.",
  titolo: ["Every <h>humanoid</h> has a story.", "And must have an identity."],
  testo:
    "The Humanoid Registry is the digital register for the identification, traceability and certification of member humanoids and their tutors.",
  cta: "Discover the Registry",
  /** sample record — fictitious data, only meant to show the shape of the register */
  scheda: {
    titolo: "Humanoid Registry",
    stato: "Certified",
    campi: [
      { et: "Registry code", val: "AU–UMN–0001–IT", acc: true },
      { et: "Model", val: "Anthropomorphic unit · cl. B" },
      { et: "Registered tutor", val: "Natural person · IT" },
      { et: "Humanoid–tutor pact", val: "Signed", acc: true },
      { et: "Operating scope", val: "Domestic · assistive" },
      { et: "Last check", val: "Annual renewal" },
    ],
    impronta: "Registry fingerprint",
    protocollo: "Prot. AU / 2026",
  },
};

/* 05b — The Journal -------------------------------------------------------- */

export const RIVISTA = {
  articolo: "Art. 05b — The Journal",
  testata: "Humanoide",
  occhiello: "Quarterly of culture, innovation and society",
  payoff: ["Ideas", "People", "Future"],
  intro:
    "Humanoide is AssoUmanoidi’s magazine: stories, ideas and projects to understand today and build the future. Four issues a year on technology, society, science and the philosophy of human–humanoid coexistence.",
  cadenza: "Quarterly · 4 issues a year",
  etichette: { numero: "Issue", periodo: "Period", cadenza: "Frequency" },
  scrivi: "Write for Humanoide",
  ariaNav: "The journal",
  altCopertina: (numero: string, periodo: string) => `Cover of Humanoide ${numero}, ${periodo}`,
  uscita: "Issue 1 comes out in December",
  cta: "Subscribe to receive it",
  numeroUno: {
    numero: "N.01",
    periodo: "January–March 2027",
    copertina: "/rivista-copertina.webp",
    sommario: [
      { rubrica: "Technology", titolo: "Human by choice", testo: "Innovation that puts people first." },
      { rubrica: "Interview", titolo: "Dario Amodei", testo: "Artificial intelligence and our choices of tomorrow." },
      { rubrica: "Society", titolo: "New identities", testo: "Rights, work and relationships in the digital age." },
      { rubrica: "Philosophy", titolo: "Freedom and responsibility", testo: "The ethical meaning of our choices." },
      { rubrica: "Culture", titolo: "Visions", testo: "The stories that inspire change." },
      { rubrica: "Science", titolo: "Body and mind", testo: "The frontiers of research." },
      { rubrica: "Visions", titolo: "Designing the future", testo: "Architecture, design and ideas for a better world." },
    ],
  },
};

/* 07 — The network --------------------------------------------------------- */

export const RETE = {
  articolo: "Art. 06 — The network",
  titolo: ["A meeting place for society,", "research, industry and institutions."],
  intro:
    "AssoUmanoidi promotes research, studies, outreach, experimentation and multidisciplinary dialogue. We work with those who actually meet the question.",
  voci: [
    { et: "01", nome: "Institutions", testo: "Those who will have to write the rules, and need a competent counterpart." },
    { et: "02", nome: "Universities", testo: "Those who study the phenomenon before it becomes news." },
    { et: "03", nome: "Research centers", testo: "Those who produce the evidence on which choices rest." },
    { et: "04", nome: "Companies", testo: "Those who design, build and bring humanoids to market." },
    { et: "05", nome: "Professionals", testo: "Lawyers, doctors, psychologists, designers, educators." },
    { et: "06", nome: "Citizens", testo: "Those who will live alongside humanoids every day, without having chosen it." },
  ],
  nota: "Scientific Council, first partners and memoranda of understanding: publication in progress.",
};

/* 08 — Manifesto ----------------------------------------------------------- */

export const MANIFESTO = {
  articolo: "Art. 07 — Manifesto",
  grande: "The arrival of <h>humanoids</h> is not only about machines. <u>It is about us.</u>",
  piccola:
    "The way we will work, live, relate to one another and define responsibilities, rights and boundaries. Preparing society for humanoids means asking ourselves what kind of society we want to become.",
  motto: "For a more human society.",
};

/* 09 — Membership ---------------------------------------------------------- */

export const ADESIONE = {
  articolo: "Art. 08 — Membership",
  titolo: "The future of coexistence is built together.",
  intro: "Choose where you come in. The form adapts.",
  porte: [
    {
      id: "persona" as Porta,
      et: "Chamber I",
      nome: "I am an individual",
      testo: "You want to take part in building the human–humanoid society.",
      azione: "Join",
    },
    {
      id: "tutor" as Porta,
      et: "Chamber II",
      nome: "I represent a humanoid",
      testo: "You are the tutor of a humanoid, or will be.",
      azione: "Join",
    },
    {
      id: "organizzazione" as Porta,
      et: "Chamber III",
      nome: "I represent an organization",
      testo: "Company, university, institution, association or public body.",
      azione: "Take part",
    },
  ],
  campi: {
    persona: [
      { nome: "nome", etichetta: "Full name", obbligatorio: true },
      { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
      { nome: "citta", etichetta: "City" },
      { nome: "professione", etichetta: "Profession" },
      {
        nome: "motivazione",
        etichetta: "Why do you want to take part",
        tipo: "testo-lungo",
        largo: true,
        aiuto: "Optional. Even two lines help us understand where you are starting from.",
      },
    ],
    tutor: [
      { nome: "nome", etichetta: "Tutor’s full name", obbligatorio: true },
      { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
      { nome: "modello", etichetta: "Humanoid model" },
      { nome: "produttore", etichetta: "Manufacturer" },
      {
        nome: "stato",
        etichetta: "Where do you stand",
        tipo: "scelta",
        opzioni: ["I already have a humanoid", "I will have one this year", "I’m considering it"],
      },
      { nome: "ambito", etichetta: "Area of use", aiuto: "Domestic, assistive, productive…" },
      {
        nome: "motivazione",
        etichetta: "What relationship do you envisage",
        tipo: "testo-lungo",
        largo: true,
        aiuto: "Optional.",
      },
    ],
    organizzazione: [
      { nome: "organizzazione", etichetta: "Organization name", obbligatorio: true },
      {
        nome: "tipo",
        etichetta: "Type",
        tipo: "scelta",
        opzioni: ["Company", "University", "Research center", "Public body", "Association", "Institution"],
        obbligatorio: true,
      },
      { nome: "nome", etichetta: "Contact person", obbligatorio: true },
      { nome: "ruolo", etichetta: "Role" },
      { nome: "email", etichetta: "Email", tipo: "email", obbligatorio: true },
      { nome: "sito", etichetta: "Website" },
      {
        nome: "motivazione",
        etichetta: "What would you like to collaborate on",
        tipo: "testo-lungo",
        largo: true,
        aiuto: "Research, memoranda of understanding, events, experimentation…",
      },
    ],
  } as Record<Porta, CampoModulo[]>,
  msg: {
    obbligatorio: "This field is required.",
    email: "Please check the address.",
    consenso: "Consent is needed so we can write to you.",
    scegli: "Choose…",
    invio: "Sending…",
    errore: "We couldn’t send it. Try again, or write to us directly.",
    nessunaQuota: "No fee is required at this stage. We will only write to you about membership.",
    consensoTesto: "I consent to the processing of my data so that AssoUmanoidi can contact me, as described in the",
    privacy: "privacy policy",
    fattoTitolo: "Request received.",
    fatto: "We will write to you as soon as Chamber {camera} opens memberships. In the meantime, everything is above.",
    altra: "Send another request",
  },
};

/* Footer ------------------------------------------------------------------- */

export const PIEDE = {
  motto: "For a more human society.",
  partecipa: { titolo: "Take part", aderisci: "Join", collabora: "Collaborate", contatti: "Contact" },
  copyright: "Cultural association",
  paese: "Italy",
  colonne: [
    {
      titolo: "Association",
      voci: [
        { testo: "About us", chiave: "chiSiamo" as ChiaveFutura },
        { testo: "Statute", chiave: "statuto" as ChiaveFutura },
        { testo: "Governing bodies", chiave: "cariche" as ChiaveFutura },
        { testo: "Code of Ethics", chiave: "codiceEtico" as ChiaveFutura },
        { testo: "Scientific Council", chiave: "consiglioScientifico" as ChiaveFutura },
      ],
    },
    {
      titolo: "Projects",
      voci: [
        { testo: "Charter of Rights and Duties", chiave: "cartaPagina" as ChiaveFutura },
        { testo: "Humanoid Registry", chiave: "anagrafePagina" as ChiaveFutura },
        { testo: "Humanoide – author guidelines", chiave: "normeAutori" as ChiaveFutura },
        { testo: "Humanoide – colophon", chiave: "colophon" as ChiaveFutura },
      ],
    },
  ],
};

/* Directory ---------------------------------------------------------------- */

export const DIRECTORY = {
  articolo: "Register — The builders",
  soprattitolo: "The companies",
  titolo: "in the field.",
  intro:
    "The working register of humanoid robot builders: from research labs to the first industrial deployments. It is the association’s working base — who builds, where, what, and how far along.",
  contatore: "builders listed",
  cerca: "Search company, model, country, use…",
  filtri: { area: "All regions", stadio: "All stages", tipo: "All types" },
  unita: ["builder", "builders"] as [string, string],
  aria: { area: "Filter by region", stadio: "Filter by stage", tipo: "Filter by type" },
  azzera: "Clear filters",
  vuoto: "No builder matches the filters. Try another search.",
  legenda:
    "Gold marks those with a humanoid already on the market. The dot shows that the official website was reached with a direct check.",
  colonne: { modelli: "Models", stadio: "Stage", impieghi: "Uses", sito: "Website" },
};

/* Statute ------------------------------------------------------------------ */

/** The full text stays in the original Italian: it is the only legally binding version. */
export const STATUTO = {
  ...STATUTO_IT,
  articolo: "Documents — Statute",
  soprattitolo: "The statute",
  titolo: "of the association.",
  intro:
    "The statute is the founding act: it says what AssoUmanoidi is, what it may do and by what rules it decides. Everything else — the Charter, the Registry, the Chambers — sits within this perimeter. The full text below is the original Italian, the only legally binding version; it has not been translated.",
  rimandi: "Related documents",
  linguaTesto: "it" as "it" | "en",
  ui: {
    scarica: "Download the statute (PDF)",
    indice: "Index of titles",
    titolo: "Title",
    art: "Art.",
    cariche: "Governing bodies →",
    codice: "Code of Ethics →",
    carta: "Charter of Rights and Duties →",
    camere: "The three Chambers →",
  },
};

/* Governing bodies --------------------------------------------------------- */

const BIO: Record<string, string[]> = {
  "Vito Petrocelli": [
    "A geologist by training, he served as a Senator of the Italian Republic from 2013 to 2022. During his parliamentary term he held senior positions, including those of Senate floor secretary and parliamentary group leader, and was then elected Chair of the Senate’s 3rd Standing Committee on Foreign Affairs and Emigration, a role he held from June 2018 to May 2022. A record of his parliamentary activity is available on the website of the Senate of the Republic. He currently chairs the Istituto Italia-BRICS, a body committed to promoting dialogue and relations with the countries of the emerging bloc, and is Editorial Director of the online news outlet L’AntiDiplomatico. He leads AssoUmanoidi with the aim of building a hub for reflection, representation and advocacy on the rights of humanoids endowed with anthropomorphic artificial intelligence, promoting a coexistence founded on rights, duties, responsibilities and mutual recognition, in dialogue with institutions, research and industry."
  ],
  "Massimo Morgante": [
    "A serial entrepreneur and expert in digital innovation, he holds a Master’s in Communication and Multimedia Journalism. One of the pioneers in Italy in applying artificial intelligence to business processes, he founded an AI Lab dedicated to experimenting with and developing innovative technological solutions. Formerly CMO of Innereo, he is the founder of Speaqi, a digital infrastructure that combines artificial intelligence, multilingual tourist guides and AI assistants to enhance destinations, local areas and cultural heritage. At AssoUmanoidi he contributes to strategic development, fostering relations with institutions, businesses and organizations and taking part in trade fairs and events on innovation. He encourages dialogue between business, research and civil society on the ethical challenges of the future coexistence of human beings and intelligent systems."
  ],
  "Fabio Morotti": [
    "A writer and essayist, he holds a PhD in Visual and Media Studies from IULM University in Milan. His academic and professional work rests on a multidisciplinary approach that draws on anthropological categories to analyse contemporary visual culture. His fields of study include cinema, generative AI, intangible cultural heritage, Cambodian culture, aerial vision and travel literature. He is the author of novels and of a monograph on the Cambodian performing arts. At AssoUmanoidi he has been delegated responsibility for audiovisual and cultural matters and is Senior Deputy Editor of Humanoide, the Association’s official magazine, contributing to the promotion of the culture and imagery of the humanoid through art, communication and the symbol of contact between human being and robot."
  ],
  "Emanuele Galloni": [
    "A producer and author, he is the founder and director of Connemaris Media, a Calabria-based production and distribution company that develops AI-based tools to identify and develop intellectual properties from cultures around the world. With Connemaris Media he created, wrote and produced the docuseries Matriçë Arbëreshe, directed by Luca Vullo and broadcast on RaiPlay and Rai Tre Calabria, and he is currently making Triskelion, a documentary project devoted to the minority cultures and languages of Europe. He is one of the founders of MyCulture, a platform dedicated to minority and indigenous languages.",
    "His earlier work includes the series Red Zones for Sky Italia, distributed on VOD platforms in the United Kingdom, France, Germany, Austria and Switzerland, and the Italian segment of The World Says No to War, of which he is one of the producers, screened in a retrospective at MoMA in New York. For more than fifteen years, through the company Videoplugger, he represented Rai Trade and Rai Com in the United Kingdom: during that period he brought Il Commissario Montalbano to the BBC and to other British and international platforms, and distributed productions in Celtic and minority languages worldwide.",
    "He graduated with a first-class degree (110/110 cum laude) in Political Science, specialising in international and European Community studies, from LUISS in Rome, with a thesis on multimedia products and the music video. He then trained in film at South Thames College and at Raindance in London. Since 2005 he has been involved in teaching, both on postgraduate courses and with younger students, in Italy and the United Kingdom: he teaches production, multimedia products, franchises and scripted formats.",
    "At AssoUmanoidi he has been delegated responsibility for audiovisual and cultural matters: he oversees the documentation and narration of the issues the association works on and promotes an open exchange with the different positions, including critical ones, raised by the debate on humanoids."
  ],
  "Gabriele Gobbo": [
    "A digitologist, author and popular communicator of digital culture, he is a consultant and lecturer in digital communication. He has worked for more than thirty years across media, technology and strategy, and has coined neologisms for the digital age, including digitalogia (digitalogy), digitologo (digitologist), Metaprompting strategico (Strategic Metaprompting) and sentimento sintetico (synthetic sentiment). He is the author of essays. He developed Strategic Metaprompting with the 3C Protocol (Compare, Challenge, Curate). He directs the PioneerAIO Research Lab. He is Vice-President and co-founder of the Digital Security Festival and founded Italiamac. He has taught at the Università Vita-Salute San Raffaele and served as a juror for the digital and new technologies category of the Premio eccellenza formazione (PEF), promoted by the Associazione Italiana Formatori. At AssoUmanoidi he is responsible for corporate communication and is Deputy Editor of Humanoide, holding the portfolio for communication and special projects. His personal website is gabrielegobbo.it."
  ],
  "Stefano Colombara": [
    "He holds degrees in History and in Education Sciences. He has been an administrative officer at the Emilia-Romagna Region in Bologna since February 2014. He previously worked in brand and communication strategy as project leader for the “Liberate le aragoste” network. At AssoUmanoidi he is responsible for training activities and for the association’s communication, and complements the Executive Board with management, coordination and organizational skills, focused on structuring training programmes on the Statute, the Code of Ethics, the Charter of Rights and Duties of Humanoids and the Regulations of the Online Humanoid Registry."
  ],
  "Marco Marsili": [
    "A researcher, analyst, writer and university lecturer, he is Scientific Director of AssoUmanoidi and Editor-in-Chief (legal editor) of Humanoide. A freelance journalist registered with the Italian Order of Journalists, he has held senior editorial roles at news outlets, press agencies, periodicals and book series, and was a professor at the University of Insubria in Varese; he was also scientific and academic coordinator of the Master’s in Communication and Multimedia Journalism. He was a researcher and assistant professor at Ca’ Foscari University of Venice and is currently a researcher at CEI-Iscte, the Centre for International Studies of ISCTE – Instituto Universitário de Lisboa.",
    "He graduated cum laude in Communication and Society (institutional communication track) from the Università degli Studi di Milano, and in Political Science and in International Relations from the Università degli studi Niccolò Cusano in Rome. He holds a PhD in History, Security and Defence Studies from ISCTE – Instituto Universitário de Lisboa, two postgraduate diplomas, in History, Security and Defence Studies (ISCTE) and in Armed Conflicts and Human Rights (Faculty of Law of the University of Coimbra and Military University Institute, Portugal), and a diploma in Psychological Operations Planning from the Military University Institute.",
    "His research covers international relations, security and defense, international humanitarian law, terrorism and cognitive warfare. He has been a member of NATO STO research groups on information and cognitive warfare. He is the author of dozens of scientific articles published in leading international journals and of a dozen monographs, some of which have been translated into other languages; he sits on the scientific and organizing committees of international conferences, has given dozens of presentations at international scientific events and is a member of the editorial and scientific boards of journals. He is a principal investigator and member of research groups of the NATO STO, the Science and Technology Organization of the Atlantic Alliance; he has collaborated with the Centre for High Defence Studies (CASD)/IRADe and with NATO’s DIANA. He received the European Commission’s Seal of Excellence in 2021 and in 2026. His personal website is marcomarsili.it."
  ]
};

export const CARICHE = {
  articolo: "Governing bodies — Officers",
  soprattitolo: "Who answers",
  titolo: "for what.",
  intro:
    "A serious association can also be judged by this: knowing who decides, for how long and before whom. Here are the governing bodies of AssoUmanoidi, as provided for by the Statute, and the people who sit on them.",
  mandato: "Term 2026–2029",
  avviso: "",
  organi: [
    {
      nome: "Executive Board",
      testo:
        "Governs the association between one assembly and the next: direction, budget, admission of members, affiliation of territorial bodies. Nine Board Members elected by the Assembly, three representing each Chamber; it elects a President and a Vice President from among its members.",
      membri: [
        { ruolo: "President", persona: "Vito Petrocelli", foto: "/persone/vito-petrocelli.webp", bio: BIO["Vito Petrocelli"] },
        { ruolo: "Vice President", persona: "Massimo Morgante", foto: "/persone/massimo-morgante.webp", bio: BIO["Massimo Morgante"] },
        { ruolo: "Board Member", persona: "Fabio Morotti", foto: "/persone/fabio-morotti.webp", bio: BIO["Fabio Morotti"] },
        { ruolo: "Board Member", persona: "Emanuele Galloni", foto: "/persone/emanuele-galloni.webp", bio: BIO["Emanuele Galloni"] },
        { ruolo: "Board Member", persona: "Gabriele Gobbo", foto: "/persone/gabriele-gobbo.webp", bio: BIO["Gabriele Gobbo"] },
        { ruolo: "Board Member", persona: "Stefano Colombara", foto: "/persone/stefano-colombara.webp", bio: BIO["Stefano Colombara"] },
      ],
    },
    {
      nome: "Board of Arbitrators",
      testo:
        "Guarantee body: rules without appeal on disputes between members and bodies, and on breaches of the Code of Ethics and the Charter. The office is incompatible with any other office in the association.",
      membri: [
        { ruolo: "Chair of the board", camera: "Full member", persona: "" },
        { ruolo: "Arbitrator", camera: "Full member", persona: "" },
        { ruolo: "Arbitrator", camera: "Full member", persona: "" },
        { ruolo: "Alternate arbitrator", camera: "Alternate", persona: "" },
        { ruolo: "Alternate arbitrator", camera: "Alternate", persona: "" },
      ],
    },
    {
      nome: "Scientific Council",
      testo:
        "Advisory body: prepares the association’s positions on ethics, law, robotics and social impact. Members need not be association members; it is chaired by the Scientific Director, appointed by the Executive Board.",
      membri: [
        { ruolo: "Scientific Director", persona: "Marco Marsili", foto: "/persone/marco-marsili.webp", bio: BIO["Marco Marsili"] },
        { ruolo: "Member", persona: "" },
        { ruolo: "Member", persona: "" },
        { ruolo: "Member", persona: "" },
        { ruolo: "Member", persona: "" },
      ],
    },
  ] as Organo[],
  daNominare: "To be appointed",
  ui: {
    provvisorio: "Provisional",
    ritratto: "Portrait of",
    bioCompleta: "Read the full biography",
    collegati: "Related documents",
    statuto: "Statute →",
    scientifico: "Scientific Council →",
    chiSiamo: "About us →",
    camere: "The three Chambers →",
  },
  nota: "The Members’ Assembly remains the sovereign body: it elects the Executive Board and the Board of Arbitrators, approves the budget and amends the Statute (Art. 15).",
  camere:
    "The nine Board Members are elected three for each Chamber — Individuals, Humanoids, Organizations — so that none of the three can decide alone (Art. 16).",
};
