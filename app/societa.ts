/**
 * Directory dei costruttori di umanoidi.
 *
 * Questo file è la fonte dei dati: il CSV da cui era nato (rilevazione del 21 agosto
 * 2026) non è nel repository. Si aggiorna qui, voce per voce, in ordine alfabetico.
 * I conteggi in fondo si calcolano da soli.
 */

/** Data dell'ultima rilevazione (ISO): l'unico punto da aggiornare. */
const DATA_RILEVAZIONE = "2026-10-30";
const formatta = (locale: string) =>
  new Date(`${DATA_RILEVAZIONE}T00:00:00Z`).toLocaleDateString(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** Mostrata sotto la directory e nella home: «30 ottobre 2026» / «30 October 2026». */
export const RILEVAZIONE = formatta("it-IT");
export const RILEVAZIONE_EN = formatta("en-GB");

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
      "casa",
      "teleoperazione",
      "logistica"
    ],
    "nota": "1X vende NEO in preordine come umanoide per la casa, con consegne previste dal 2026, e mantiene EVE per usi industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "Addverb",
    "sito": "https://addverb.com/",
    "dominio": "addverb.com",
    "paese": "India",
    "area": "Asia",
    "modelli": [
      "Elixis-W",
      "Elixis"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura"
    ],
    "nota": "L'azienda indiana di automazione ha presentato il prototipo a ruote Elixis-W a LogiMAT India 2026; il bipede Elixis è annunciato.",
    "sitoVerificato": false
  },
  {
    "nome": "AeiROBOT",
    "sito": "https://www.arobot4all.com/",
    "dominio": "arobot4all.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "ALICE",
      "ALICE M1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ricerca"
    ],
    "nota": "Spin-off dell'Università Hanyang: sviluppa il bipede ALICE e la versione a ruote ALICE M1, in prova con Hanwha Ocean.",
    "sitoVerificato": false
  },
  {
    "nome": "AGIBOT / Zhiyuan Robotics",
    "sito": "https://www.agibot.com/",
    "dominio": "agibot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "A2",
      "X2",
      "G2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "ricerca"
    ],
    "nota": "AGIBOT produce le serie A2, X2 e G2 e a luglio 2026 ha avviato l'iter per la quotazione alla Borsa di Hong Kong.",
    "sitoVerificato": true
  },
  {
    "nome": "Agile Robots",
    "sito": "https://www.agile-robots.com/",
    "dominio": "agile-robots.com",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "Agile ONE",
      "Agile ONE SN"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "ricerca"
    ],
    "nota": "L'azienda di Monaco produce in Baviera l'umanoide industriale Agile ONE (presentato a novembre 2025) e a ottobre 2026 ha lanciato ONE SN per la ricerca.",
    "sitoVerificato": false
  },
  {
    "nome": "Agility Robotics",
    "sito": "https://www.agilityrobotics.com/",
    "dominio": "agilityrobotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Digit",
      "Digit v5"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura"
    ],
    "nota": "Digit opera in formula RaaS presso clienti come GXO e Schaeffler; quotazione al Nasdaq (AGLT) tramite SPAC attesa a novembre 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "AI² Robotics",
    "sito": "https://www.ai2robotics.com/",
    "dominio": "ai2robotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "AlphaBot 2"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "logistica"
    ],
    "nota": "Startup di Shenzhen che sviluppa AlphaBot 2, umanoide a ruote guidato dal modello VLA AlphaBrain.",
    "sitoVerificato": false
  },
  {
    "nome": "AiMOGA Robotics",
    "sito": "https://www.aimoga-robot.com/",
    "dominio": "aimoga-robot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Mornine M1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "retail",
      "accoglienza",
      "servizi"
    ],
    "nota": "Controllata di Chery: Mornine M1 è un umanoide per concessionarie, in vendita online in Cina da aprile 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "AIST",
    "sito": "https://www.aist.go.jp/",
    "dominio": "aist.go.jp",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "HRP-5P",
      "HRP-4"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "manifattura"
    ],
    "nota": "AIST è il principale ente giapponese dietro la serie HRP, con collaborazioni industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "AKINROBOTICS",
    "sito": "https://www.akinrobotics.com/",
    "dominio": "akinrobotics.com",
    "paese": "Turchia",
    "area": "Medio Oriente",
    "modelli": [
      "AKINCI-5",
      "ADA"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "accoglienza",
      "servizi",
      "manifattura"
    ],
    "nota": "Società di Konya (gruppo AKINSOFT) che dal 2015 produce gli umanoidi di servizio ADA e sviluppa l'umanoide industriale AKINCI-5.",
    "sitoVerificato": false
  },
  {
    "nome": "Aldebaran (Maxvision)",
    "sito": "https://aldebaran.com/",
    "dominio": "aldebaran.com",
    "paese": "Francia / Cina",
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
    "nota": "Aldebaran è stata liquidata nel 2025; Maxvision ne ha rilevato NAO e Pepper tramite la francese Maxtronics. Pepper non è più prodotto.",
    "sitoVerificato": false
  },
  {
    "nome": "Andromeda Robotics",
    "sito": "https://andromedarobotics.ai/",
    "dominio": "andromedarobotics.ai",
    "paese": "Australia",
    "area": "Oceania",
    "modelli": [
      "Abi"
    ],
    "stadio": "In pilot",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "assistenza",
      "sanità"
    ],
    "nota": "Startup di Melbourne che sviluppa Abi, robot umanoide da compagnia impiegato in strutture per anziani in Australia.",
    "sitoVerificato": false
  },
  {
    "nome": "Apptronik",
    "sito": "https://apptronik.com/",
    "dominio": "apptronik.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Apollo 2",
      "Apollo"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "Apptronik ha Apollo in pilot presso Mercedes-Benz, GXO e Jabil e punta a consegne in volume dal 2027.",
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
      "lavoro generico",
      "ricerca"
    ],
    "nota": "Astribot ha mostrato S1 in dimostrazioni di manipolazione e lavoro domestico.",
    "sitoVerificato": true
  },
  {
    "nome": "Booster Robotics",
    "sito": "https://www.booster.tech/",
    "dominio": "booster.tech",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "T2",
      "T1",
      "K1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "sviluppo"
    ],
    "nota": "Booster vende T1 e K1 a laboratori e scuole e ha presentato T2 nel 2026; squadre con suoi robot hanno vinto RoboCup 2026.",
    "sitoVerificato": false
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
      "logistica",
      "ricerca"
    ],
    "nota": "Boston Dynamics ha presentato al CES 2026 la versione di produzione di Atlas elettrico; le unità 2026 vanno a Hyundai e Google DeepMind.",
    "sitoVerificato": true
  },
  {
    "nome": "BXI Robotics",
    "sito": "https://www.bxirobotics.com/",
    "dominio": "bxirobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Elf 3",
      "Elf 2"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "sviluppo",
      "manifattura"
    ],
    "nota": "Azienda cinese che sviluppa i bipedi Elf, anche come ODM per terzi; ha corso le mezze maratone di Pechino 2025 e 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "CASBOT / Zhongke Huiling",
    "sito": "https://www.casbot.tech/",
    "dominio": "casbot.tech",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "CASBOT 02",
      "CASBOT 01"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "manifattura",
      "logistica"
    ],
    "nota": "Azienda di Pechino fondata nel 2023: dopo CASBOT 01 ha messo in vendita su JD.com il bipede CASBOT 02.",
    "sitoVerificato": false
  },
  {
    "nome": "Clone Robotics",
    "sito": "https://clonerobotics.com/",
    "dominio": "clonerobotics.com",
    "paese": "Polonia",
    "area": "Europa",
    "modelli": [
      "Protoclone V1",
      "Clone Alpha"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "sviluppo"
    ],
    "nota": "Clone Robotics sviluppa androidi muscoloscheletrici con muscoli artificiali; il prototipo Protoclone è stato mostrato nel 2025.",
    "sitoVerificato": true
  },
  {
    "nome": "Codroid",
    "sito": "https://www.codroid.ai/",
    "dominio": "codroid.ai",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Codroid 02",
      "C05-L"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "servizi"
    ],
    "nota": "Codroid, controllata del gruppo cinese Estun Automation, sviluppa umanoidi per la manifattura come Codroid 02.",
    "sitoVerificato": false
  },
  {
    "nome": "DEEP Robotics",
    "sito": "https://www.deeprobotics.cn/en/",
    "dominio": "deeprobotics.cn",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "DR02",
      "DR02 Pro"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ispezione",
      "manifattura",
      "sicurezza"
    ],
    "nota": "DEEP Robotics, nota per i quadrupedi, ha lanciato a ottobre 2025 DR02, umanoide industriale con protezione IP66.",
    "sitoVerificato": false
  },
  {
    "nome": "Devanthro",
    "sito": "https://www.devanthro.com/",
    "dominio": "devanthro.com",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "Robody"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "assistenza",
      "teleoperazione",
      "casa"
    ],
    "nota": "Startup di Monaco che sperimenta Robody, umanoide teleoperato su base mobile, nell'assistenza domiciliare ad anziani e persone con demenza.",
    "sitoVerificato": false
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
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura",
      "ricerca"
    ],
    "nota": "Dexmate vende in preordine Vega, umanoide su ruote per lavoro fisico; nel 2026 ha ricevuto investimenti da NEC e LG.",
    "sitoVerificato": true
  },
  {
    "nome": "DLR",
    "sito": "https://www.dlr.de/en/rm/research/robotics",
    "dominio": "dlr.de",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "Rollin' Justin",
      "TORO"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "teleoperazione",
      "assistenza"
    ],
    "nota": "Il DLR usa Rollin' Justin e il bipede TORO come piattaforme di ricerca, anche comandate a distanza dallo spazio.",
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
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "Atom è l'umanoide di DOBOT, produttore di cobot quotato a Hong Kong; consegne avviate da giugno 2025.",
    "sitoVerificato": true
  },
  {
    "nome": "Donut Robotics",
    "sito": "https://www.donutrobotics.com/",
    "dominio": "donutrobotics.com",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "cinnamon 1",
      "cinnamon mini"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "assistenza",
      "sicurezza",
      "servizi"
    ],
    "nota": "Startup di Tokyo con cinnamon 1, bipede comandabile a gesti, in prova in case di riposo Charm Care dal luglio 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "DroidUp",
    "sito": "https://www.droidup.com/",
    "dominio": "droidup.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Moya",
      "Walker II",
      "Xueba 01"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "assistenza",
      "sanità",
      "intrattenimento"
    ],
    "nota": "Azienda di Shanghai che ha presentato Moya, umanoide biomimetico con pelle riscaldata, e il bipede Walker II.",
    "sitoVerificato": false
  },
  {
    "nome": "Elephant Robotics",
    "sito": "https://www.elephantrobotics.com/",
    "dominio": "elephantrobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Mercury X1",
      "Mercury B1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "servizi"
    ],
    "nota": "Azienda di Shenzhen che vende Mercury X1, umanoide a ruote con due braccia per ricerca e didattica.",
    "sitoVerificato": false
  },
  {
    "nome": "Enchanted Tools",
    "sito": "https://enchanted.tools/",
    "dominio": "enchanted.tools",
    "paese": "Francia",
    "area": "Europa",
    "modelli": [
      "Mirokaï",
      "Miroki"
    ],
    "stadio": "In pilot",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "sanità",
      "logistica",
      "accoglienza"
    ],
    "nota": "Mirokaï è in sperimentazione in ospedali in Francia e nel Regno Unito; la versione definitiva è attesa nel 2027.",
    "sitoVerificato": true
  },
  {
    "nome": "EngineAI",
    "sito": "https://en.engineai.com.cn/",
    "dominio": "en.engineai.com.cn",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "T800",
      "SE01",
      "PM01",
      "SA01"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "manifattura",
      "sviluppo"
    ],
    "nota": "EngineAI vende umanoidi dal compatto PM01 al full-size SE01 e ha presentato T800 al CES 2026.",
    "sitoVerificato": false
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
      "accoglienza",
      "ricerca"
    ],
    "nota": "Engineered Arts produce umanoidi sociali e androidi per interazione con il pubblico.",
    "sitoVerificato": true
  },
  {
    "nome": "Fauna Robotics",
    "sito": "https://faunarobotics.com/",
    "dominio": "faunarobotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Sprout"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "sviluppo",
      "casa"
    ],
    "nota": "Startup di New York che vende Sprout, umanoide bipede di 107 cm per sviluppatori e ricerca; acquisita da Amazon a marzo 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "Figure AI",
    "sito": "https://www.figure.ai/",
    "dominio": "figure.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Figure 03",
      "Figure 02"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "casa"
    ],
    "nota": "Figure ha lanciato Figure 03 a ottobre 2025; da giugno 2026 lavora nella logistica dello stabilimento BMW di Spartanburg.",
    "sitoVerificato": true
  },
  {
    "nome": "Foundation Robotics",
    "sito": "https://foundation.bot/",
    "dominio": "foundation.bot",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Phantom MK2",
      "Phantom MK1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "sicurezza",
      "manifattura",
      "lavoro generico"
    ],
    "nota": "Foundation sviluppa Phantom per difesa e industria; nel 2026 alcune unità sono state inviate in Ucraina per test.",
    "sitoVerificato": true
  },
  {
    "nome": "Fourier",
    "sito": "https://www.fftai.com/",
    "dominio": "fftai.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "GR-3",
      "GR-2",
      "N1",
      "GR-1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "assistenza",
      "sanità",
      "ricerca"
    ],
    "nota": "Fourier, nata nella riabilitazione a Shanghai, sviluppa la serie GRx; GR-3 è pensato per l'assistenza in ospedali e residenze.",
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
      "servizi",
      "educazione",
      "ricerca"
    ],
    "nota": "Furhat è un robot sociale a forma di testa con volto proiettato, usato per conversazione e ricerca sull'interazione.",
    "sitoVerificato": true
  },
  {
    "nome": "GAC Group",
    "sito": "https://www.gac.com.cn/",
    "dominio": "gac.com.cn",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "GoMate",
      "GoMate Mini"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "servizi"
    ],
    "nota": "Il gruppo automobilistico GAC ha presentato GoMate nel 2024 e GoMate Mini nel 2026, puntando a piccole serie nel 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "Galaxea AI",
    "sito": "https://galaxea-ai.com/",
    "dominio": "galaxea-ai.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "R1 Pro",
      "R1",
      "R1 Lite"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "casa",
      "sviluppo"
    ],
    "nota": "Galaxea AI vende la serie R1 di umanoidi a ruote con due braccia, usata anche da laboratori di ricerca come Stanford.",
    "sitoVerificato": false
  },
  {
    "nome": "Galbot",
    "sito": "https://www.galbot.com/",
    "dominio": "galbot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "G1",
      "ET1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "retail",
      "sanità",
      "logistica"
    ],
    "nota": "Il G1 su ruote di Galbot opera in farmacie e negozi automatizzati in Cina e Hong Kong; nel 2026 ha presentato il bipede ET1.",
    "sitoVerificato": true
  },
  {
    "nome": "Generative Bionics",
    "sito": "https://www.gbionics.ai/",
    "dominio": "gbionics.ai",
    "paese": "Italia",
    "area": "Europa",
    "modelli": [
      "GENE.01"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ispezione",
      "teleoperazione",
      "assistenza"
    ],
    "nota": "Spin-off IIT di Genova (2024): GENE.01 con pelle tattile su tutto il corpo, mostrato al CES 2026; round da 70 mln € e test con Fincantieri ed Eni.",
    "sitoVerificato": false
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
    "nome": "Hexagon Robotics",
    "sito": "https://robotics.hexagon.com/",
    "dominio": "robotics.hexagon.com",
    "paese": "Svezia",
    "area": "Europa",
    "modelli": [
      "AEON"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "ispezione",
      "logistica"
    ],
    "nota": "Divisione del gruppo Hexagon: AEON, umanoide su ruote presentato nel 2025, in pilot con Schaeffler (accordo per 1.000 unità entro il 2032) e BMW.",
    "sitoVerificato": false
  },
  {
    "nome": "HighTorque Robotics",
    "sito": "https://www.hightorquerobotics.com/",
    "dominio": "hightorquerobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Hi",
      "Pi+",
      "Pi"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione"
    ],
    "nota": "Azienda di Guangzhou che produce piccoli umanoidi bipedi per ricerca, didattica e RoboCup.",
    "sitoVerificato": false
  },
  {
    "nome": "Holiday Robotics",
    "sito": "https://www.holiday-robotics.com/",
    "dominio": "holiday-robotics.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "FRIDAY"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "lavoro generico"
    ],
    "nota": "Startup di Seul fondata nel 2024: FRIDAY è un umanoide a ruote per la manifattura, commercializzazione prevista a fine 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "Honda",
    "sito": "https://global.honda/en/robotics/",
    "dominio": "global.honda",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Avatar Robot",
      "ASIMO"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "ricerca",
      "teleoperazione",
      "assistenza"
    ],
    "nota": "Honda ha ritirato ASIMO e lavora a un Avatar Robot teleoperato con mano multi-dita, mostrato nel 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "Humanoid",
    "sito": "https://thehumanoid.ai/",
    "dominio": "thehumanoid.ai",
    "paese": "Regno Unito",
    "area": "Europa",
    "modelli": [
      "HMND 01"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "La britannica Humanoid testa HMND 01 su ruote in pilot industriali con Schaeffler e Siemens; una versione bipede è in sviluppo.",
    "sitoVerificato": false
  },
  {
    "nome": "igus",
    "sito": "https://www.igus.eu/",
    "dominio": "igus.eu",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "Iggy Rob",
      "Iggy Rob Home"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "accoglienza",
      "servizi"
    ],
    "nota": "Il produttore di Colonia vende Iggy Rob, umanoide a basso costo su base mobile con due cobot ReBeL; nel 2026 è arrivata la versione Home per i servizi.",
    "sitoVerificato": false
  },
  {
    "nome": "IHMC",
    "sito": "https://www.ihmc.us/",
    "dominio": "ihmc.us",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Nadia"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "sicurezza"
    ],
    "nota": "L'Institute for Human and Machine Cognition (Florida) sviluppa Nadia, umanoide bipede di ricerca ad ampia mobilità pensato per soccorso in ambienti difficili.",
    "sitoVerificato": false
  },
  {
    "nome": "ISRO",
    "sito": "https://www.isro.gov.in/",
    "dominio": "isro.gov.in",
    "paese": "India",
    "area": "Asia",
    "modelli": [
      "Vyommitra"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": false,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "teleoperazione"
    ],
    "nota": "L'agenzia spaziale indiana ha sviluppato Vyommitra, mezzo umanoide destinato al volo senza equipaggio Gaganyaan G1.",
    "sitoVerificato": false
  },
  {
    "nome": "Istituto Italiano di Tecnologia",
    "sito": "https://icub.iit.it/",
    "dominio": "icub.iit.it",
    "paese": "Italia",
    "area": "Europa",
    "modelli": [
      "ergoCub",
      "iCub"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "logistica",
      "assistenza"
    ],
    "nota": "IIT sviluppa iCub, diffuso in decine di laboratori, ed ergoCub, realizzato con INAIL per ridurre i rischi ergonomici sul lavoro.",
    "sitoVerificato": true
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
      "sviluppo"
    ],
    "nota": "KAIST ha sviluppato HUBO e DRC-HUBO e lavora a un nuovo umanoide, di cui ha già presentato la parte inferiore.",
    "sitoVerificato": true
  },
  {
    "nome": "Kawada Robotics",
    "sito": "https://www.kawadarobot.co.jp/",
    "dominio": "kawadarobot.co.jp",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "NEXTAGE Fillie",
      "NEXTAGE"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ricerca"
    ],
    "nota": "Kawada, che ha costruito gli HRP con AIST, vende i robot umanoidi a due braccia NEXTAGE per la fabbrica.",
    "sitoVerificato": false
  },
  {
    "nome": "Kawasaki Heavy Industries",
    "sito": "https://global.kawasaki.com/",
    "dominio": "global.kawasaki.com",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Kaleido 9",
      "Friends"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "assistenza",
      "ricerca"
    ],
    "nota": "Kawasaki sviluppa la serie Kaleido, giunta a Kaleido 9, e il più leggero Friends; prevede lavoro assistito a distanza verso il 2030.",
    "sitoVerificato": true
  },
  {
    "nome": "KEENON Robotics",
    "sito": "https://www.keenon.com/",
    "dominio": "keenon.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "XMAN-R1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "accoglienza",
      "servizi",
      "retail"
    ],
    "nota": "KEENON ha presentato XMAN-R1 nel 2025 e lo impiega come addetto all'accoglienza in un hotel di Shanghai.",
    "sitoVerificato": false
  },
  {
    "nome": "Kepler Robotics",
    "sito": "https://www.gotokepler.com/",
    "dominio": "gotokepler.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Forerunner K2 Bumblebee"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "Kepler vende l'umanoide industriale Forerunner K2 \"Bumblebee\" e ne ha avviato la produzione in serie.",
    "sitoVerificato": false
  },
  {
    "nome": "Kinisi Robotics",
    "sito": "https://www.kinisi.com/",
    "dominio": "kinisi.com",
    "paese": "Regno Unito",
    "area": "Europa",
    "modelli": [
      "KR1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura"
    ],
    "nota": "Startup di Bristol: KR1 è un umanoide su ruote con due braccia per magazzini; a giugno 2026 Bear Robotics ha annunciato di volerla acquisire.",
    "sitoVerificato": false
  },
  {
    "nome": "Kokoro Company",
    "sito": "https://www.kokoro-dreams.co.jp/english/",
    "dominio": "kokoro-dreams.co.jp",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Actroid",
      "Actroid-DER"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "intrattenimento",
      "accoglienza",
      "ricerca"
    ],
    "nota": "Kokoro, società del gruppo Sanrio, produce gli androidi realistici Actroid oltre a robot per intrattenimento.",
    "sitoVerificato": false
  },
  {
    "nome": "Leju Robot",
    "sito": "https://www.lejurobot.com/",
    "dominio": "lejurobot.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Kuavo 5",
      "Kuavo 5-W",
      "Kuavo-MY"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ricerca",
      "educazione",
      "accoglienza"
    ],
    "nota": "Leju vende la serie Kuavo (Kuavo 5 bipede, 5-W su ruote); domanda di IPO al ChiNext di Shenzhen accettata a maggio 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "Lenovo",
    "sito": "https://www.lenovo.com/",
    "dominio": "lenovo.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "LeXiang No.1"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "assistenza",
      "sanità",
      "servizi"
    ],
    "nota": "Lenovo ha presentato nel 2025 il suo primo umanoide LeXiang No.1, pensato per assistenza agli anziani e sanità.",
    "sitoVerificato": false
  },
  {
    "nome": "LG Electronics",
    "sito": "https://www.lg.com/",
    "dominio": "lg.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "LG CLOiD"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "casa",
      "lavoro generico"
    ],
    "nota": "LG ha presentato al CES 2026 il prototipo CLOiD, umanoide domestico a ruote con due braccia e mani a cinque dita.",
    "sitoVerificato": false
  },
  {
    "nome": "LimX Dynamics",
    "sito": "https://limxdynamics.com/",
    "dominio": "limxdynamics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Oli",
      "TRON 2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "sviluppo"
    ],
    "nota": "LimX vende l'umanoide full-size Oli (da luglio 2025) e la piattaforma modulare TRON 2; Series B da 200 milioni di dollari nel 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "Lumos Robotics",
    "sito": "https://www.lumosbot.tech/",
    "dominio": "lumosbot.tech",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "LUS2",
      "LUS2 Pro",
      "LUS"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa",
      "logistica",
      "ricerca"
    ],
    "nota": "Fondata nel 2024 da un ex responsabile umanoidi di Dreame, Lumos sviluppa la serie di bipedi LUS.",
    "sitoVerificato": false
  },
  {
    "nome": "MagicLab",
    "sito": "https://magiclab.top/",
    "dominio": "magiclab.top",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "MagicBot Gen1",
      "MagicBot Z1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "retail",
      "ricerca"
    ],
    "nota": "MagicLab ha presentato al CES 2026 l'umanoide full-size Gen1 e il bipede Z1; Gen1 è stato testato in una fabbrica di elettrodomestici.",
    "sitoVerificato": true
  },
  {
    "nome": "Matrix Robotics",
    "sito": "https://matrixrobotics.ai/",
    "dominio": "matrixrobotics.ai",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "MATRIX-3",
      "MATRIX-1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "manifattura",
      "ricerca"
    ],
    "nota": "Startup di Shanghai: MATRIX-3, lanciato a gennaio 2026, è in programma early access con pilot presso partner industriali da metà 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "Mentee Robotics",
    "sito": "https://www.menteebot.com/",
    "dominio": "menteebot.com",
    "paese": "Israele",
    "area": "Medio Oriente",
    "modelli": [
      "MenteeBot V3.0"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa",
      "assistenza",
      "lavoro generico"
    ],
    "nota": "Mobileye ha annunciato a gennaio 2026 l'acquisizione di Mentee; MenteeBot V3.0 è un prototipo, produzione in serie prevista dal 2028.",
    "sitoVerificato": true
  },
  {
    "nome": "Midea",
    "sito": "https://www.midea.com/",
    "dominio": "midea.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "MIRO U",
      "Mei Luo X"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "casa"
    ],
    "nota": "Il gruppo di elettrodomestici Midea ha presentato MIRO U, umanoide a ruote con sei braccia, impiegato nel suo stabilimento di Wuxi.",
    "sitoVerificato": false
  },
  {
    "nome": "Mirsee Robotics",
    "sito": "https://mirsee.com/",
    "dominio": "mirsee.com",
    "paese": "Canada",
    "area": "Nord America",
    "modelli": [
      "MH3"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "sicurezza"
    ],
    "nota": "Azienda di Cambridge (Ontario): MH3 è un umanoide su ruote per lavori pericolosi; 8 prototipi, produzione in serie prevista dal 2027.",
    "sitoVerificato": true
  },
  {
    "nome": "Muks Robotics",
    "sito": "https://muksrobotics.com/",
    "dominio": "muksrobotics.com",
    "paese": "India",
    "area": "Asia",
    "modelli": [
      "Spaceo Pro",
      "Spaceo M1",
      "Spaceo Prime"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "accoglienza",
      "ricerca"
    ],
    "nota": "Startup di Pune con la linea Spaceo (Pro industriale, M1 sociale); secondo la stampa indiana l'ISRO le ha affidato Spaceo Prime.",
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
      "4NE1",
      "4NE1 Mini"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "assistenza",
      "educazione",
      "casa"
    ],
    "nota": "Neura sviluppa l'umanoide full-size 4NE1 e il compatto 4NE1 Mini (CES 2026, prenotabile); prime consegne annunciate per fine 2026.",
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
    "tipo": "Università / laboratorio",
    "usi": [
      "ricerca",
      "educazione",
      "intrattenimento"
    ],
    "nota": "Gruppo AIS dell'Università di Bonn: umanoidi NimbRo-OP2X per RoboCup, campioni AdultSize nel 2022 e 2023.",
    "sitoVerificato": true
  },
  {
    "nome": "Noble Machines / Under Control Robotics",
    "sito": "https://www.noblemachines.ai/",
    "dominio": "noblemachines.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Moby 3",
      "Moby"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "Ex Under Control Robotics, uscita dallo stealth a marzo 2026 con Moby, umanoide bipede per industria pesante, edilizia ed energia.",
    "sitoVerificato": false
  },
  {
    "nome": "Noetix Robotics",
    "sito": "https://noetixrobotics.com/",
    "dominio": "noetixrobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Bumi",
      "N2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "intrattenimento",
      "casa"
    ],
    "nota": "Noetix vende l'umanoide consumer Bumi (da 9.998 yuan) e il bipede N2; a ottobre 2026 ha depositato in via riservata una domanda di IPO a Hong Kong.",
    "sitoVerificato": true
  },
  {
    "nome": "OpenLoong",
    "sito": "https://www.openloong.org.cn/",
    "dominio": "openloong.org.cn",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Qinglong V3.0",
      "Qinglong"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "sviluppo"
    ],
    "nota": "Piattaforma open source del centro nazionale per gli umanoidi di Shanghai; il bipede Qinglong è stato presentato alla WAIC 2024.",
    "sitoVerificato": false
  },
  {
    "nome": "Oversonic Robotics",
    "sito": "https://www.oversonicrobotics.com/",
    "dominio": "oversonicrobotics.com",
    "paese": "Italia",
    "area": "Europa",
    "modelli": [
      "RoBee"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "sanità",
      "logistica"
    ],
    "nota": "Azienda brianzola che vende RoBee, umanoide su base mobile certificato CE, per industria e sanità; impiegato anche in stabilimenti STMicroelectronics.",
    "sitoVerificato": false
  },
  {
    "nome": "PAL Robotics",
    "sito": "https://pal-robotics.com/",
    "dominio": "pal-robotics.com",
    "paese": "Spagna",
    "area": "Europa",
    "modelli": [
      "TALOS",
      "KANGAROO"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "educazione"
    ],
    "nota": "PAL vende l'umanoide da ricerca TALOS e sviluppa KANGAROO, piattaforma bipede per studi su locomozione e salto.",
    "sitoVerificato": true
  },
  {
    "nome": "PaXini",
    "sito": "https://www.paxini.com/",
    "dominio": "paxini.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "TORA-ONE"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi"
    ],
    "nota": "PaXini, specializzata in sensori tattili, sviluppa l'umanoide TORA-ONE, testato nell'assemblaggio di cablaggi presso Geely.",
    "sitoVerificato": false
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
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "ricerca"
    ],
    "nota": "Startup di Hyderabad: PR-34D è un robot semi-umanoide a due braccia per assemblaggio in fabbrica, addestrabile in teleoperazione.",
    "sitoVerificato": true
  },
  {
    "nome": "Persona AI",
    "sito": "https://www.personainc.ai/",
    "dominio": "personainc.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "lavoro generico"
    ],
    "nota": "Startup di Houston che sviluppa con HD Hyundai un umanoide bipede per la saldatura nei cantieri navali; primi prototipi attesi a fine 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "Pink Robotics",
    "sito": "https://www.pink-robotics.com/",
    "dominio": "pink-robotics.com",
    "paese": "Germania",
    "area": "Europa",
    "modelli": [
      "P0"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica"
    ],
    "nota": "Startup di Darmstadt che ad agosto 2026 ha mostrato il prototipo bipede P0 per lo smistamento pacchi; prepara un pilot con una catena di supermercati.",
    "sitoVerificato": false
  },
  {
    "nome": "PNDbotics",
    "sito": "https://pndbotics.com/",
    "dominio": "pndbotics.com",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Adam",
      "Adam-U"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "educazione"
    ],
    "nota": "PNDbotics produce l'umanoide full-size Adam e l'Adam-U a busto; centri produttivi a Ningbo e Tianjin e accordo con Tianyong per l'automotive.",
    "sitoVerificato": true
  },
  {
    "nome": "Pollen Robotics (Hugging Face)",
    "sito": "https://pollen-robotics.com/",
    "dominio": "pollen-robotics.com",
    "paese": "Francia",
    "area": "Europa",
    "modelli": [
      "Reachy 2",
      "Reachy"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "teleoperazione"
    ],
    "nota": "Acquisita da Hugging Face ad aprile 2025: Reachy 2 è un umanoide open-source a busto su base mobile, venduto a circa 70.000 dollari.",
    "sitoVerificato": true
  },
  {
    "nome": "Promobot",
    "sito": "https://promo-bot.ai/",
    "dominio": "promo-bot.ai",
    "paese": "Russia",
    "area": "Europa",
    "modelli": [
      "Robo-C",
      "Robo-C-2"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "retail",
      "accoglienza",
      "servizi"
    ],
    "nota": "Azienda di Perm con attività negli Emirati: Robo-C è un androide sociale con volto personalizzabile, in produzione di serie dal 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "Prosper Robotics",
    "sito": "https://prosper.org/",
    "dominio": "prosper.org",
    "paese": "Regno Unito",
    "area": "Europa",
    "modelli": [
      "Alfie"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa",
      "teleoperazione"
    ],
    "nota": "Startup londinese che sviluppa Alfie, robot domestico su ruote con due braccia, teleoperato in VR; non ancora in commercio.",
    "sitoVerificato": false
  },
  {
    "nome": "Pudu Robotics",
    "sito": "https://www.pudurobotics.com/",
    "dominio": "pudurobotics.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "PUDU D9",
      "PUDU D7"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "retail",
      "accoglienza"
    ],
    "nota": "Pudu, produttore di robot di servizio, ha presentato nel 2024 il bipede D9 con preordini e il semi-umanoide D7.",
    "sitoVerificato": false
  },
  {
    "nome": "Rainbow Robotics",
    "sito": "https://www.rainbow-robotics.com/",
    "dominio": "rainbow-robotics.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "RB-Y1",
      "RB-Y2"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "ricerca",
      "logistica"
    ],
    "nota": "Controllata da Samsung Electronics dal 2024: RB-Y1 è un umanoide su ruote; commercializzazione su larga scala prevista verso il 2028.",
    "sitoVerificato": true
  },
  {
    "nome": "Realbotix",
    "sito": "https://www.realbotix.com/",
    "dominio": "realbotix.com",
    "paese": "Canada",
    "area": "Nord America",
    "modelli": [
      "Aria",
      "Melody",
      "David"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "accoglienza",
      "intrattenimento",
      "assistenza"
    ],
    "nota": "Produce androidi sociali dall'aspetto realistico (Aria, Melody, David); nel 2026 ha pianificato la consegna di 19 robot a clienti.",
    "sitoVerificato": false
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
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "logistica",
      "manifattura",
      "teleoperazione"
    ],
    "nota": "Reflex sviluppa un umanoide su ruote per magazzini, in test operativi presso GXO con formula robotics-as-a-service.",
    "sitoVerificato": true
  },
  {
    "nome": "RoboForce",
    "sito": "https://roboforce.ai/",
    "dominio": "roboforce.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "TITAN"
    ],
    "stadio": "In pilot",
    "corpoIntero": false,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "lavoro generico"
    ],
    "nota": "TITAN è un manipolatore mobile a due braccia per lavori industriali pesanti, in pilot nel settore energia; ordini annunciati non vincolanti.",
    "sitoVerificato": true
  },
  {
    "nome": "RobotEra",
    "sito": "https://www.robotera.com/",
    "dominio": "robotera.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "L7",
      "Q5",
      "STAR1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "manifattura",
      "servizi"
    ],
    "nota": "RobotEra ha presentato al CES 2026 il bipede full-size L7, successore di STAR1, e l'umanoide su ruote Q5 per i servizi.",
    "sitoVerificato": true
  },
  {
    "nome": "ROBOTIS",
    "sito": "https://en.robotis.com/",
    "dominio": "en.robotis.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "AI Sapiens",
      "AI Worker",
      "OP3"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "educazione",
      "ricerca",
      "manifattura"
    ],
    "nota": "ROBOTIS vende OP3 e il semi-umanoide AI Worker; ad aprile 2026 ha presentato l'umanoide open-source AI Sapiens.",
    "sitoVerificato": false
  },
  {
    "nome": "Robros",
    "sito": "https://www.robros.co.kr/",
    "dominio": "robros.co.kr",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "IGRIS-C",
      "IGRIS-A"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica"
    ],
    "nota": "Azienda di Seul che produce il bipede IGRIS-C, venduto e testato in fabbriche coreane.",
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
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "retail",
      "lavoro generico"
    ],
    "nota": "A giugno 2026 Sanctuary ha spostato la strategia sul software Physical AI per robot industriali esistenti; l'umanoide Phoenix passa in secondo piano.",
    "sitoVerificato": true
  },
  {
    "nome": "Sber",
    "sito": "https://sber.ru/robocenter/en/green",
    "dominio": "sber.ru",
    "paese": "Russia",
    "area": "Europa",
    "modelli": [
      "Green"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "logistica",
      "sviluppo"
    ],
    "nota": "Il Robotics Center di Sber ha presentato a novembre 2025 Green, umanoide bipede con IA GigaChat, ancora piattaforma di test in vista di pilot.",
    "sitoVerificato": false
  },
  {
    "nome": "Sharpa",
    "sito": "https://www.sharpa.com/",
    "dominio": "sharpa.com",
    "paese": "Singapore",
    "area": "Asia",
    "modelli": [
      "North"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "ricerca"
    ],
    "nota": "Azienda di Singapore nota per la mano Wave; al CES 2026 ha presentato North, il suo primo umanoide a figura intera.",
    "sitoVerificato": false
  },
  {
    "nome": "Spirit AI / Qianxun",
    "sito": "https://www.spirit-ai.com/",
    "dominio": "spirit-ai.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Moz1",
      "Moz"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "Spirit AI (Qianxun) ha presentato Moz1 nel 2025 e ha impiegato il robot su una linea di batterie CATL a Luoyang.",
    "sitoVerificato": false
  },
  {
    "nome": "Sunday Robotics",
    "sito": "https://www.sunday.ai/",
    "dominio": "sunday.ai",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "Memo"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "casa"
    ],
    "nota": "Startup di Mountain View che sviluppa Memo, robot domestico su ruote con torso e due braccia; beta nelle case prevista tra fine 2026 e 2027.",
    "sitoVerificato": false
  },
  {
    "nome": "TARS Robotics",
    "sito": "https://www.tars-ai.com/",
    "dominio": "tars-ai.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "A1",
      "T-Series"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "lavoro generico"
    ],
    "nota": "Startup di Shanghai fondata nel 2025; ha mostrato umanoidi per assemblaggio di cablaggi e ricamo.",
    "sitoVerificato": false
  },
  {
    "nome": "Techman Robot",
    "sito": "https://www.tm-robot.com/",
    "dominio": "tm-robot.com",
    "paese": "Taiwan",
    "area": "Asia",
    "modelli": [
      "TM Xplore I"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ispezione",
      "logistica",
      "manifattura"
    ],
    "nota": "Il produttore di cobot di Taiwan (gruppo Quanta) ha presentato nel 2025 TM Xplore I, umanoide industriale a ruote.",
    "sitoVerificato": false
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
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "lavoro generico",
      "casa"
    ],
    "nota": "Tesla ha avviato a ottobre 2026 la produzione iniziale di Optimus a Fremont; vendite a clienti esterni previste verso fine 2027.",
    "sitoVerificato": false
  },
  {
    "nome": "Tokyo Robotics",
    "sito": "https://robotics.tokyo/",
    "dominio": "robotics.tokyo",
    "paese": "Giappone",
    "area": "Asia",
    "modelli": [
      "Torobo",
      "ToraOne"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "educazione",
      "manifattura"
    ],
    "nota": "Controllata da Yaskawa dal 2025: Torobo è un umanoide su ruote per ricerca; ad aprile 2026 ha mostrato un prototipo bipede.",
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
      "Walker S2",
      "Walker S",
      "Walker X"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "manifattura",
      "logistica",
      "servizi"
    ],
    "nota": "Quotata a Hong Kong: Walker S2 è in produzione di serie da novembre 2025 per fabbriche e logistica, con ordini anche da Airbus.",
    "sitoVerificato": true
  },
  {
    "nome": "Unitree Robotics",
    "sito": "https://www.unitree.com/",
    "dominio": "unitree.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "H2",
      "G1",
      "R1",
      "H1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "ricerca",
      "educazione",
      "intrattenimento",
      "sviluppo"
    ],
    "nota": "Unitree vende gli umanoidi G1, H1, H2 e il low-cost R1; è quotata allo STAR Market di Shanghai dal 19 agosto 2026.",
    "sitoVerificato": true
  },
  {
    "nome": "Università di Teheran",
    "sito": "https://ut.ac.ir/",
    "dominio": "ut.ac.ir",
    "paese": "Iran",
    "area": "Medio Oriente",
    "modelli": [
      "Surena IV",
      "Surena III"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Università / laboratorio",
    "usi": [
      "ricerca"
    ],
    "nota": "Il centro CAST dell'Università di Teheran sviluppa la serie di umanoidi bipedi Surena; la quarta generazione è stata presentata nel 2019.",
    "sitoVerificato": false
  },
  {
    "nome": "UniX AI",
    "sito": "https://www.unix-group.ai/",
    "dominio": "unix-group.ai",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Wanda 3.0",
      "Wanda 2.0",
      "Panther"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "casa",
      "accoglienza"
    ],
    "nota": "UniX AI consegna in Cina l'umanoide di servizio Wanda 2.0 e ha mostrato Wanda 3.0 al CES 2026.",
    "sitoVerificato": false
  },
  {
    "nome": "VinMotion",
    "sito": "https://vinmotion.net/",
    "dominio": "vinmotion.net",
    "paese": "Vietnam",
    "area": "Asia",
    "modelli": [
      "Motion 2",
      "Motion 1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura",
      "servizi",
      "ricerca"
    ],
    "nota": "Controllata di Vingroup: dopo Motion 1 (2025) ha presentato Motion 2 al CES 2026, destinato a ricerca e pilot industriali.",
    "sitoVerificato": true
  },
  {
    "nome": "Wandercraft",
    "sito": "https://www.wandercraft.eu/",
    "dominio": "wandercraft.eu",
    "paese": "Francia",
    "area": "Europa",
    "modelli": [
      "Calvin-40"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "manifattura"
    ],
    "nota": "Produttore parigino di esoscheletri che dal 2025 sviluppa con Renault l'umanoide industriale Calvin; Renault prevede 350 unità nei suoi stabilimenti.",
    "sitoVerificato": false
  },
  {
    "nome": "Westwood Robotics",
    "sito": "https://westwoodrobotics.io/",
    "dominio": "westwoodrobotics.io",
    "paese": "Stati Uniti",
    "area": "Nord America",
    "modelli": [
      "THEMIS Gen 2.5",
      "THEMIS V2",
      "BRUCE"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "educazione",
      "ricerca",
      "sviluppo"
    ],
    "nota": "Westwood fa umanoidi per laboratori (THEMIS, BRUCE); a gennaio 2026 ha presentato THEMIS Gen 2.5, che manipola oggetti camminando.",
    "sitoVerificato": true
  },
  {
    "nome": "WIRobotics",
    "sito": "https://www.wirobotics.com/",
    "dominio": "wirobotics.com",
    "paese": "Corea del Sud",
    "area": "Asia",
    "modelli": [
      "ALLEX",
      "Mobile ALLEX"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "ricerca",
      "assistenza",
      "manifattura"
    ],
    "nota": "Azienda coreana nata nel 2021 da ex ingegneri Samsung; ha presentato nel 2025 l'umanoide ALLEX.",
    "sitoVerificato": false
  },
  {
    "nome": "X Square Robot",
    "sito": "https://www.x2robot.com/en/",
    "dominio": "x2robot.com/en",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Quanta X2",
      "Quanta X1"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "servizi",
      "casa",
      "manifattura"
    ],
    "nota": "X Square Robot sviluppa Quanta X2, umanoide a ruote con due braccia guidato dal proprio modello WALL-A.",
    "sitoVerificato": false
  },
  {
    "nome": "X-Humanoid / Beijing Humanoid Robot Innovation Center",
    "sito": "https://www.x-humanoid.com/",
    "dominio": "x-humanoid.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Tiangong Ultra",
      "Tiangong 2.0",
      "Tianyi 2.0"
    ],
    "stadio": "In pilot",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "ricerca",
      "manifattura",
      "sviluppo"
    ],
    "nota": "Centro d'innovazione di Pechino nato nel 2023: sviluppa la piattaforma Tiangong e nel 2026 ha raccolto circa 700 milioni di yuan.",
    "sitoVerificato": false
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
      "manifattura",
      "ricerca"
    ],
    "nota": "Ad agosto 2026 Xiaomi ha presentato un nuovo umanoide, addestrato 4 mesi nella sua fabbrica auto; resta un prototipo non in vendita.",
    "sitoVerificato": false
  },
  {
    "nome": "XPENG",
    "sito": "https://www.xpeng.com/",
    "dominio": "xpeng.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "IRON"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Azienda quotata",
    "usi": [
      "retail",
      "servizi",
      "manifattura"
    ],
    "nota": "XPENG ha presentato il nuovo IRON e avviato una linea dedicata: produzione di massa prevista a fine 2026, consegne nel 2027.",
    "sitoVerificato": true
  },
  {
    "nome": "Zerith Robotics",
    "sito": "https://zerith.ai/",
    "dominio": "zerith.ai",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Zerith H1"
    ],
    "stadio": "Sul mercato",
    "corpoIntero": true,
    "tipo": "Azienda privata",
    "usi": [
      "accoglienza",
      "servizi",
      "casa"
    ],
    "nota": "Startup nata nel 2025 dall'ecosistema Tsinghua: H1 è un umanoide a ruote per le pulizie alberghiere.",
    "sitoVerificato": false
  },
  {
    "nome": "Zhejiang Humanoid Robot Innovation Center",
    "sito": "https://www.zj-humanoid.com/",
    "dominio": "zj-humanoid.com",
    "paese": "Cina",
    "area": "Asia",
    "modelli": [
      "Navigator 2 (NAVIAI)",
      "Navigator α"
    ],
    "stadio": "In sviluppo",
    "corpoIntero": true,
    "tipo": "Istituto di ricerca",
    "usi": [
      "manifattura",
      "ricerca"
    ],
    "nota": "Centro di Ningbo sostenuto da SUPCON e Università di Zhejiang; ha presentato Navigator α nel 2024 e poi Navigator 2.",
    "sitoVerificato": false
  }
];

export const SOCIETA_CONTI = {
  totale: SOCIETA.length,
  paesi: new Set(SOCIETA.flatMap((s) => s.paese.split(" / "))).size,
  sulMercato: SOCIETA.filter((s) => s.stadio === "Sul mercato").length,
} as const;
