/**
 * Directory dei costruttori di umanoidi.
 *
 * Questo file è la fonte dei dati: il CSV da cui era nato (rilevazione del 21 agosto
 * 2026) non è nel repository. Si aggiorna qui, voce per voce, in ordine alfabetico.
 * I conteggi in fondo si calcolano da soli.
 */

/** Data dell'ultima rilevazione, mostrata sotto la directory e nella home. */
export const RILEVAZIONE = "21 agosto 2026";

export type Societa = {
  nome: string;
  sito: string;
  dominio: string;
  /** due paesi separati da " / " solo se l'azienda è davvero binazionale */
  paese: string;
  area: "Europa" | "Asia" | "Nord America" | "Oceania" | "Medio Oriente" | "Sud America";
  modelli: string[];
  stadio: "Sul mercato" | "In pilot" | "In sviluppo";
  corpoIntero: boolean;
  /** natura giuridica: azienda, istituto, laboratorio universitario… */
  tipo: string;
  /** ambiti d'impiego dichiarati */
  usi: string[];
  /** una riga di contesto dalla rilevazione */
  nota: string;
  /**
   * il sito ufficiale ha risposto a un controllo HTTP diretto (21/08/2026). Le voci
   * aggiunte o con dominio cambiato dopo quella data restano false finché non si
   * ripete il controllo.
   */
  sitoVerificato: boolean;
};

export const SOCIETA: Societa[] = [
  {
    "nome": "1X Technologies",
    "sito": "https://www.1x.tech/",
    "dominio": "1x.tech",
    "paese": "Norvegia",
    "area": "Europa",
    "modelli": [
      "NEO",
      "EVE"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "lavoro domestico",
      "teleoperazione",
      "logistica"
    ],
    "nota": "1X presenta NEO come umanoide per la casa e mantiene EVE per logistica/sicurezza.",
    "sitoVerificato": true
  },
  {
    "nome": "AGIBOT / Zhiyuan Robotics",
    "sito": "https://www.agibot.com/",
    "dominio": "agibot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "A2",
      "X1",
      "Genie Operator-1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "ricerca"
    ],
    "nota": "AGIBOT è uno dei produttori cinesi più attivi per varietà di piattaforme e volumi dichiarati.",
    "sitoVerificato": true
  },
  {
    "nome": "Agility Robotics",
    "sito": "https://www.agilityrobotics.com/",
    "dominio": "agilityrobotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Digit"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "magazzino",
      "manifattura"
    ],
    "nota": "Digit è il modello umanoide bipedale per ambienti industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "AIST",
    "sito": "https://www.aist.go.jp/",
    "dominio": "aist.go.jp",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "HRP-4",
      "HRP-5P"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "manifattura",
      "ricerca",
      "locomozione"
    ],
    "nota": "AIST è il principale ente giapponese dietro la serie HRP, con collaborazioni industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "Apptronik",
    "sito": "https://apptronik.com/",
    "dominio": "apptronik.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Apollo"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "Apollo è sviluppato per lavoro industriale e collaborazione con operatori.",
    "sitoVerificato": true
  },
  {
    "nome": "Astribot",
    "sito": "https://www.astribot.com/",
    "dominio": "astribot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "S1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa",
      "manipolazione",
      "lavoro generico"
    ],
    "nota": "Astribot ha mostrato S1 in dimostrazioni di manipolazione e lavoro domestico.",
    "sitoVerificato": true
  },
  {
    "nome": "Booster Robotics",
    "sito": "https://www.boosterobotics.com/",
    "dominio": "boosterobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "T1"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "competizioni"
    ],
    "nota": "Booster produce T1 e piattaforme per ricerca e sviluppo umanoide.",
    "sitoVerificato": true
  },
  {
    "nome": "Boston Dynamics",
    "sito": "https://bostondynamics.com/atlas/",
    "dominio": "bostondynamics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Atlas"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ricerca",
      "movimentazione"
    ],
    "nota": "Atlas è la piattaforma umanoide elettrica di Boston Dynamics.",
    "sitoVerificato": true
  },
  {
    "nome": "Clone Robotics",
    "sito": "https://clonerobotics.com/",
    "dominio": "clonerobotics.com",
    "paese": "Polonia",
    "area": "Europa",
    "modelli": [
      "Clone Alpha"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manipolazione",
      "sviluppo"
    ],
    "nota": "Clone Alpha punta su mani e muscoli artificiali per un umanoide biomimetico.",
    "sitoVerificato": true
  },
  {
    "nome": "CloudMinds",
    "sito": "https://www.cloudminds.com/",
    "dominio": "cloudminds.com",
    "paese": "Cina / Stati Uniti",
    "area": "Asia",
    "modelli": [
      "XR-1",
      "XR-2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "sanità",
      "teleoperazione"
    ],
    "nota": "CloudMinds ha sviluppato umanoidi di servizio e piattaforme cloud robotics.",
    "sitoVerificato": false
  },
  {
    "nome": "Codroid",
    "sito": "https://codroid.ai/",
    "dominio": "codroid.ai",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Codroid 02"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "servizi"
    ],
    "nota": "Codroid è una startup cinese con piattaforma umanoide full-size.",
    "sitoVerificato": true
  },
  {
    "nome": "Dexmate",
    "sito": "https://dexmate.ai/",
    "dominio": "dexmate.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Vega"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura",
      "ricerca"
    ],
    "nota": "Dexmate sviluppa Vega per attività industriali e lavoro fisico.",
    "sitoVerificato": true
  },
  {
    "nome": "DLR",
    "sito": "https://www.dlr.de/en/rm/research/robotics",
    "dominio": "dlr.de",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "TORO"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "locomozione",
      "manipolazione"
    ],
    "nota": "DLR ha sviluppato TORO e altre piattaforme umanoidi sperimentali.",
    "sitoVerificato": false
  },
  {
    "nome": "DOBOT",
    "sito": "https://www.dobot-robots.com/",
    "dominio": "dobot-robots.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Atom"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "Atom è il progetto umanoide di DOBOT, produttore storico di robot collaborativi.",
    "sitoVerificato": true
  },
  {
    "nome": "Enchanted Tools",
    "sito": "https://enchanted.tools/",
    "dominio": "enchanted.tools",
    "paese": "Francia",
    "area": "Europa",
    "modelli": [
      "Mirokaï"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "sanità",
      "hospitality",
      "logistica"
    ],
    "nota": "Mirokaï è un robot di servizio con forma umanoide e base mobile.",
    "sitoVerificato": true
  },
  {
    "nome": "EngineAI",
    "sito": "https://www.engineai.com/",
    "dominio": "engineai.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "PM01",
      "SE01",
      "SA01"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "intrattenimento",
      "sviluppo"
    ],
    "nota": "EngineAI propone più modelli umanoidi, dal compatto PM01 al full-size.",
    "sitoVerificato": true
  },
  {
    "nome": "Engineered Arts",
    "sito": "https://www.engineeredarts.co.uk/",
    "dominio": "engineeredarts.co.uk",
    "paese": "Regno Unito",
    "area": "Europa",
    "modelli": [
      "Ameca",
      "Mesmer",
      "RoboThespian"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "intrattenimento",
      "musei",
      "accoglienza",
      "ricerca"
    ],
    "nota": "Engineered Arts produce umanoidi sociali e androidi per interazione con il pubblico.",
    "sitoVerificato": true
  },
  {
    "nome": "Figure AI",
    "sito": "https://www.figure.ai/",
    "dominio": "figure.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Figure 01",
      "Figure 02"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "compiti generali"
    ],
    "nota": "Figure pubblica una piattaforma umanoide full-size e casi d'uso industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "Foundation Robotics",
    "sito": "https://foundation.bot/",
    "dominio": "foundation.bot",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Phantom MK1",
      "Phantom Pro"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "lavoro generico",
      "manifattura",
      "ricerca"
    ],
    "nota": "Foundation Robotics presenta Phantom come umanoide generalista.",
    "sitoVerificato": true
  },
  {
    "nome": "Fourier Intelligence",
    "sito": "https://www.fftai.com/",
    "dominio": "fftai.com",
    "paese": "Singapore",
    "area": "Asia",
    "modelli": [
      "GR-1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "riabilitazione",
      "manifattura",
      "ricerca"
    ],
    "nota": "GR-1 è il progetto umanoide full-size di Fourier Intelligence.",
    "sitoVerificato": true
  },
  {
    "nome": "Furhat Robotics",
    "sito": "https://www.furhatrobotics.com/",
    "dominio": "furhatrobotics.com",
    "paese": "Svezia",
    "area": "Europa",
    "modelli": [
      "Furhat"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "customer service",
      "educazione",
      "ricerca"
    ],
    "nota": "Furhat è una testa/torso robotico sociale con volto proiettato, incluso per completezza nel perimetro ampio.",
    "sitoVerificato": true
  },
  {
    "nome": "Galbot",
    "sito": "https://www.galbot.com/",
    "dominio": "galbot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "G1",
      "S1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manipolazione",
      "casa",
      "ricerca"
    ],
    "nota": "Galbot è focalizzata su manipolazione mobile e robot umanoidi generalisti.",
    "sitoVerificato": true
  },
  {
    "nome": "Halodi Robotics",
    "sito": "https://halodi.com/",
    "dominio": "halodi.com",
    "paese": "Norvegia",
    "area": "Europa",
    "modelli": [
      "EVE"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "retail",
      "sicurezza",
      "servizi"
    ],
    "nota": "Halodi ha sviluppato EVE, umanoide mobile per ambienti commerciali e sicurezza.",
    "sitoVerificato": true
  },
  {
    "nome": "Hanson Robotics",
    "sito": "https://www.hansonrobotics.com/",
    "dominio": "hansonrobotics.com",
    "paese": "Hong Kong",
    "area": "Asia",
    "modelli": [
      "Sophia",
      "Little Sophia"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "intrattenimento",
      "ricerca",
      "educazione"
    ],
    "nota": "Sophia è un androide sociale con volto umanoide, non un umanoide industriale full-body.",
    "sitoVerificato": true
  },
  {
    "nome": "Honda",
    "sito": "https://global.honda/en/robotics/",
    "dominio": "global.honda",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "ASIMO",
      "serie P"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "ricerca",
      "assistenza",
      "dimostrazione"
    ],
    "nota": "Honda è un produttore storico di umanoidi; ASIMO non è oggi un prodotto commerciale.",
    "sitoVerificato": true
  },
  {
    "nome": "Humanoid",
    "sito": "https://hmnd.ai/",
    "dominio": "hmnd.ai",
    "paese": "Regno Unito",
    "area": "Europa",
    "modelli": [
      "HMND 01"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "La startup britannica Humanoid sviluppa HMND 01 come piattaforma generalista.",
    "sitoVerificato": false
  },
  {
    "nome": "Istituto Italiano di Tecnologia",
    "sito": "https://icub.iit.it/",
    "dominio": "icub.iit.it",
    "paese": "Italia",
    "area": "Europa",
    "modelli": [
      "iCub",
      "ergoCub"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "educazione",
      "assistenza"
    ],
    "nota": "IIT è il produttore scientifico di iCub, una delle piattaforme umanoidi più note.",
    "sitoVerificato": true
  },
  {
    "nome": "K-Scale Labs",
    "sito": "https://www.kscale.dev/",
    "dominio": "kscale.dev",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Stompy"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "sviluppo open-source"
    ],
    "nota": "K-Scale sviluppa piattaforme umanoidi accessibili e orientate a ricerca/open source.",
    "sitoVerificato": false
  },
  {
    "nome": "KAIST",
    "sito": "https://biorobotics.kaist.ac.kr/",
    "dominio": "biorobotics.kaist.ac.kr",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "HUBO",
      "DRC-HUBO"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Università / laboratorio",
    "usi": [
      "ricerca",
      "competizioni",
      "assistenza"
    ],
    "nota": "KAIST ha sviluppato HUBO e DRC-HUBO per ricerca e competizioni DARPA.",
    "sitoVerificato": true
  },
  {
    "nome": "Kawasaki Heavy Industries",
    "sito": "https://global.kawasaki.com/",
    "dominio": "global.kawasaki.com",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Kaleido"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "ricerca",
      "ispezione"
    ],
    "nota": "Kawasaki ha sviluppato Kaleido per ricerca e applicazioni industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "Kepler Robotics",
    "sito": "https://www.kepler-robotics.com/",
    "dominio": "kepler-robotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Forerunner K2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "Kepler sviluppa un umanoide industriale full-size con mani destrezze.",
    "sitoVerificato": false
  },
  {
    "nome": "Kokoro Company",
    "sito": "https://www.kokoro.co.jp/",
    "dominio": "kokoro.co.jp",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Actroid",
      "DER"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "intrattenimento",
      "musei",
      "ricerca sociale"
    ],
    "nota": "Kokoro produce androidi realistici Actroid per installazioni e dimostrazioni.",
    "sitoVerificato": true
  },
  {
    "nome": "Leju Robot",
    "sito": "https://www.lejurobot.com/",
    "dominio": "lejurobot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Kuavo"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "manifattura"
    ],
    "nota": "Kuavo è una piattaforma umanoide cinese usata anche per ricerca e formazione.",
    "sitoVerificato": true
  },
  {
    "nome": "LimX Dynamics",
    "sito": "https://limxdynamics.com/",
    "dominio": "limxdynamics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "CL-1",
      "W1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "sviluppo"
    ],
    "nota": "LimX sviluppa robot bipedi e umanoidi orientati a locomozione e manipolazione.",
    "sitoVerificato": true
  },
  {
    "nome": "MagicLab",
    "sito": "https://magiclab.top/",
    "dominio": "magiclab.top",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "MagicBot"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "servizi",
      "intrattenimento"
    ],
    "nota": "Inclusa come startup umanoide emergente censita da directory di settore; disponibilità da verificare.",
    "sitoVerificato": true
  },
  {
    "nome": "Matrix Robotics",
    "sito": "https://matrixrobotics.ai/",
    "dominio": "matrixrobotics.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "MATR1X"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "sviluppo"
    ],
    "nota": "Startup statunitense censita nel segmento degli umanoidi generalisti.",
    "sitoVerificato": true
  },
  {
    "nome": "Mentee Robotics",
    "sito": "https://www.menteebot.com/",
    "dominio": "menteebot.com",
    "paese": "Israele",
    "area": "Asia",
    "modelli": [
      "MenteeBot"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa",
      "assistenza",
      "lavoro generico"
    ],
    "nota": "MenteeBot è un umanoide full-size con focus su interazione e compiti domestici.",
    "sitoVerificato": true
  },
  {
    "nome": "Mirsee Robotics",
    "sito": "https://mirsee.com/",
    "dominio": "mirsee.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Mirsee humanoid"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "servizi"
    ],
    "nota": "Produttore emergente con informazioni pubbliche ancora limitate.",
    "sitoVerificato": true
  },
  {
    "nome": "Muks Robotics",
    "sito": "https://muksrobotics.com/",
    "dominio": "muksrobotics.com",
    "paese": "India",
    "area": "Asia",
    "modelli": [
      "Spaceo"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "servizi"
    ],
    "nota": "Startup indiana censita nel settore umanoide; status commerciale da verificare.",
    "sitoVerificato": true
  },
  {
    "nome": "Naver Labs",
    "sito": "https://www.naverlabs.com/",
    "dominio": "naverlabs.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "AMBIDEX"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": false,
    "tipo": "Laboratorio aziendale",
    "usi": [
      "teleoperazione",
      "manifattura",
      "ricerca"
    ],
    "nota": "AMBIDEX è un robot manipolatore con torso/arti superiori umanoidi, non full-body.",
    "sitoVerificato": true
  },
  {
    "nome": "Neura Robotics",
    "sito": "https://neura-robotics.com/",
    "dominio": "neura-robotics.com",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "4NE-1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "assistenza",
      "casa"
    ],
    "nota": "4NE-1 è il progetto umanoide full-size della società tedesca.",
    "sitoVerificato": true
  },
  {
    "nome": "NimbRo",
    "sito": "https://www.nimbro.net/",
    "dominio": "nimbro.net",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "NimbRo-OP2X",
      "CODY"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Laboratorio di ricerca",
    "usi": [
      "robotica sportiva",
      "ricerca",
      "educazione"
    ],
    "nota": "NimbRo sviluppa piattaforme umanoidi per RoboCup e ricerca locomotiva.",
    "sitoVerificato": true
  },
  {
    "nome": "Noetix Robotics",
    "sito": "https://noetixrobotics.com/",
    "dominio": "noetixrobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "N2",
      "Bumi"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "casa"
    ],
    "nota": "Noetix sviluppa umanoidi compatti e full-size per ricerca e uso domestico.",
    "sitoVerificato": true
  },
  {
    "nome": "PAL Robotics",
    "sito": "https://pal-robotics.com/",
    "dominio": "pal-robotics.com",
    "paese": "Spagna",
    "area": "Europa",
    "modelli": [
      "TALOS",
      "REEM-C"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "educazione"
    ],
    "nota": "PAL Robotics produce TALOS e altre piattaforme umanoidi per ricerca avanzata.",
    "sitoVerificato": true
  },
  {
    "nome": "Perceptyne",
    "sito": "https://perceptyne.com/",
    "dominio": "perceptyne.com",
    "paese": "India",
    "area": "Asia",
    "modelli": [
      "PR-34D"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "manifattura"
    ],
    "nota": "Piattaforma umanoide indiana orientata a ricerca e sviluppo.",
    "sitoVerificato": true
  },
  {
    "nome": "PNDbotics",
    "sito": "https://pndbotics.com/",
    "dominio": "pndbotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Adam"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "assistenza",
      "educazione"
    ],
    "nota": "PNDbotics presenta Adam come umanoide bipede per ricerca e interazione.",
    "sitoVerificato": true
  },
  {
    "nome": "Pollen Robotics",
    "sito": "https://pollen-robotics.com/",
    "dominio": "pollen-robotics.com",
    "paese": "Francia",
    "area": "Europa",
    "modelli": [
      "Reachy",
      "Reachy 2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "teleoperazione"
    ],
    "nota": "Reachy è un umanoide open-source principalmente upper-body, non un full-size bipede.",
    "sitoVerificato": true
  },
  {
    "nome": "Promobot",
    "sito": "https://promobot.ai/",
    "dominio": "promobot.ai",
    "paese": "Estonia",
    "area": "Europa",
    "modelli": [
      "Robo-C"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "retail",
      "accoglienza",
      "customer service"
    ],
    "nota": "Robo-C è un robot di servizio con aspetto umanoide e base mobile.",
    "sitoVerificato": false
  },
  {
    "nome": "Rainbow Robotics",
    "sito": "https://www.rainbow-robotics.com/",
    "dominio": "rainbow-robotics.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "RB-Y1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "ricerca",
      "movimentazione"
    ],
    "nota": "RB-Y1 è la piattaforma umanoide full-size di Rainbow Robotics.",
    "sitoVerificato": true
  },
  {
    "nome": "Reflex Robotics",
    "sito": "https://www.reflexrobotics.com/",
    "dominio": "reflexrobotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Reflex"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "magazzino",
      "logistica",
      "teleoperazione"
    ],
    "nota": "Reflex sviluppa un umanoide/robot mobile per movimentazione in magazzino.",
    "sitoVerificato": true
  },
  {
    "nome": "RoboForce",
    "sito": "https://roboforce.ai/",
    "dominio": "roboforce.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Titan"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "RoboForce presenta Titan come umanoide industriale; dati pubblici ancora limitati.",
    "sitoVerificato": true
  },
  {
    "nome": "RobotEra",
    "sito": "https://www.robotera.com/",
    "dominio": "robotera.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "STAR1",
      "XBot-L"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "servizi"
    ],
    "nota": "RobotEra ha presentato modelli umanoidi full-size per compiti generalisti.",
    "sitoVerificato": true
  },
  {
    "nome": "ROBOTIS",
    "sito": "https://en.robotis.com/",
    "dominio": "en.robotis.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "OP3",
      "DARwIn-OP"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "educazione",
      "ricerca",
      "competizioni"
    ],
    "nota": "ROBOTIS produce piattaforme umanoidi educative e da ricerca.",
    "sitoVerificato": false
  },
  {
    "nome": "Sanctuary AI",
    "sito": "https://sanctuary.ai/",
    "dominio": "sanctuary.ai",
    "paese": "Canada",
    "area": "Nord America",
    "modelli": [
      "Phoenix"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "retail",
      "lavoro generalista"
    ],
    "nota": "Phoenix è una piattaforma umanoide con enfasi su controllo generalista e lavoro in ambienti reali.",
    "sitoVerificato": true
  },
  {
    "nome": "SoftBank Robotics / Aldebaran",
    "sito": "https://www.softbankrobotics.com/",
    "dominio": "softbankrobotics.com",
    "paese": "Francia / Giappone",
    "area": "Europa",
    "modelli": [
      "NAO",
      "Pepper"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "retail",
      "accoglienza",
      "ricerca"
    ],
    "nota": "NAO e Pepper sono umanoidi sociali compatti e non full-size, ma prodotti storici di riferimento.",
    "sitoVerificato": true
  },
  {
    "nome": "Tesla",
    "sito": "https://www.tesla.com/optimus",
    "dominio": "tesla.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Optimus"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "lavoro generico",
      "casa"
    ],
    "nota": "Optimus è un programma umanoide interno ancora in fase di sviluppo.",
    "sitoVerificato": false
  },
  {
    "nome": "Tokyo Robotics",
    "sito": "https://robotics.tokyo/",
    "dominio": "robotics.tokyo",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "ToraOne",
      "Torobo"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "manifattura"
    ],
    "nota": "Azienda giapponese orientata a robot umanoidi e manipolazione.",
    "sitoVerificato": true
  },
  {
    "nome": "Toyota",
    "sito": "https://global.toyota/en/mobility/toyota-brand/",
    "dominio": "global.toyota",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "T-HR3"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "teleoperazione",
      "assistenza",
      "ricerca"
    ],
    "nota": "T-HR3 è un umanoide sperimentale controllato da un sistema master-slave.",
    "sitoVerificato": true
  },
  {
    "nome": "UBTECH Robotics",
    "sito": "https://www.ubtrobot.com/",
    "dominio": "ubtrobot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Walker X",
      "Walker S",
      "Walker S2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "Walker S/S2 sono orientati soprattutto ad ambienti industriali e automotive.",
    "sitoVerificato": true
  },
  {
    "nome": "Unitree Robotics",
    "sito": "https://www.unitree.com/",
    "dominio": "unitree.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "H1",
      "G1",
      "H2"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "ispezione",
      "sviluppo software"
    ],
    "nota": "Unitree commercializza piattaforme umanoidi a costi relativamente accessibili.",
    "sitoVerificato": true
  },
  {
    "nome": "VinMotion",
    "sito": "https://vinmotion.net/",
    "dominio": "vinmotion.net",
    "paese": "Vietnam",
    "area": "Asia",
    "modelli": [
      "VinMotion humanoid"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "ricerca"
    ],
    "nota": "Produttore emergente vietnamita censito nel segmento umanoide.",
    "sitoVerificato": true
  },
  {
    "nome": "Westwood Robotics",
    "sito": "https://westwoodrobotics.io/",
    "dominio": "westwoodrobotics.io",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "THEMIS V2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "sviluppo"
    ],
    "nota": "Westwood sviluppa umanoidi programmabili per università e laboratori.",
    "sitoVerificato": true
  },
  {
    "nome": "Xiaomi",
    "sito": "https://www.mi.com/",
    "dominio": "mi.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "CyberOne"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "dimostrazione",
      "servizi",
      "ricerca"
    ],
    "nota": "CyberOne è il prototipo umanoide presentato da Xiaomi nel 2022.",
    "sitoVerificato": false
  },
  {
    "nome": "XPENG Robotics",
    "sito": "https://www.xpeng.com/",
    "dominio": "xpeng.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Iron"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "retail",
      "servizi"
    ],
    "nota": "XPENG ha presentato Iron come umanoide full-size per applicazioni reali.",
    "sitoVerificato": true
  }
];

export const SOCIETA_CONTI = {
  totale: SOCIETA.length,
  paesi: new Set(SOCIETA.flatMap((s) => s.paese.split(" / "))).size,
  sulMercato: SOCIETA.filter((s) => s.stadio === "Sul mercato").length,
} as const;
