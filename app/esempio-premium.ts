import type { SchedaProduttore } from "./dati";

/**
 * Scheda premium di ESEMPIO per mostrare l'impaginazione della scheda top (pagina /anteprima/scheda-premium, noindex).
 * Veri: nome, sito, paese, il modello GENE.01 con la sua descrizione e le fonti della ricerca.
 * Inventati: misure, cifre, persone, traguardi, notizie, sedi e contatti. La pagina lo dichiara in cima.
 */
export const ESEMPIO_PREMIUM: SchedaProduttore = {
  nome: "Generative Bionics",
  sito: "https://gbionics.ai",
  dominio: "gbionics.ai",
  paese: "Italia",
  area: "Europa",
  modelli: ["GENE.01"],
  stadio: "In sviluppo",
  corpoIntero: true,
  tipo: "Startup",
  usi: ["Manifattura", "Logistica", "Ricerca"],
  nota: "",
  sitoVerificato: true,
  slug: "generative-bionics",
  premium: true,
  logo: null,
  frase: null,
  profilo: {
    esempio: true,
    socio: true,
    tagline: { it: "Umanoidi italiani con il senso del tatto, pensati per lavorare accanto alle persone.", en: "Italian humanoids with a sense of touch, built to work alongside people." },
    description: {
      it: "Generative Bionics progetta robot umanoidi che percepiscono il contatto su tutto il corpo grazie a una pelle tattile distribuita: possono lavorare accanto alle persone in fabbrica, nei magazzini e nei laboratori in modo sicuro.\n\nL'azienda nasce a Genova dall'esperienza della robotica umanoide italiana e unisce progettazione meccanica, sensori e intelligenza artificiale. Il primo modello, GENE.01, è stato presentato nel 2026 e oggi è in prova con i primi partner industriali.",
      en: "Generative Bionics designs humanoid robots that sense touch across their whole body through a distributed tactile skin, so they can work safely alongside people in factories, warehouses and labs.\n\nBased in Genoa, the company builds on Italy's humanoid robotics expertise, combining mechanical design, sensors and AI. Its first model, GENE.01, was unveiled in 2026 and is now being tested with early industrial partners.",
    },
    contact: { email: "info@esempio.it", phone: "+39 010 000 0000", address: "Via dell'Esempio 1, 16100 Genova" },
    video: null,
    links: [{ label: "LinkedIn", url: "https://www.linkedin.com/" }, { label: "Media kit (PDF)", url: "https://gbionics.ai" }],
    logo: null,
    cover: null,
    numeri: [
      { valore: "2024", etichetta: { it: "fondazione", en: "founded" } },
      { valore: "120+", etichetta: { it: "persone", en: "people" } },
      { valore: "€70 mln", etichetta: { it: "raccolti", en: "raised" } },
      { valore: "3", etichetta: { it: "modelli", en: "models" } },
      { valore: "4", etichetta: { it: "partner industriali", en: "industrial partners" } },
    ],
    persone: [
      { nome: "Giulia Ferraris", ruolo: { it: "Amministratrice delegata", en: "Chief Executive Officer" }, foto: null, linkedin: "https://www.linkedin.com/" },
      { nome: "Marco Bellini", ruolo: { it: "Direttore tecnico", en: "Chief Technology Officer" }, foto: null, linkedin: "https://www.linkedin.com/" },
      { nome: "Sara Conti", ruolo: { it: "Responsabile della ricerca", en: "Head of Research" }, foto: null, linkedin: null },
      { nome: "Luca Moretti", ruolo: { it: "Direttore commerciale", en: "Chief Commercial Officer" }, foto: null, linkedin: "https://www.linkedin.com/" },
    ],
    traguardi: [
      { data: "2026-10-14", tipo: "deployment", titolo: { it: "Primi GENE.01 in prova in uno stabilimento automobilistico del Nord Italia", en: "First GENE.01 units on trial at an automotive plant in northern Italy" }, fonte: { nome: "Humanoide", url: "https://humanoideonline.com" } },
      { data: "2026-06-03", tipo: "partnership", titolo: { it: "Accordo con un gruppo della logistica per i magazzini automatizzati", en: "Partnership with a logistics group for automated warehouses" }, fonte: null },
      { data: "2026-01-07", tipo: "product", titolo: { it: "Presentato GENE.01 al CES di Las Vegas", en: "GENE.01 unveiled at CES Las Vegas" }, fonte: { nome: "eWeek", url: "https://www.eweek.com/news/generative-bionics-gene-01-humanoid/" } },
      { data: "2025-11-20", tipo: "funding", titolo: { it: "Round da 70 milioni di euro per lo sviluppo e la produzione", en: "€70 million round to fund development and production" }, fonte: null },
    ],
    notizie: [
      { titolo: "Generative Bionics porta GENE.01 in fabbrica: al via la prima prova sul campo", data: "2026-10-15", url: "#" },
      { titolo: "Umanoidi europei: chi sta costruendo l'alternativa a Cina e Stati Uniti", data: "2026-09-02", url: "#" },
      { titolo: "Pelle tattile su tutto il corpo: come funziona il robot di Genova", data: "2026-01-09", url: "#" },
    ],
    sedi: [
      { citta: "Genova", ruolo: { it: "sede e progettazione", en: "headquarters and design" } },
      { citta: "Milano", ruolo: { it: "ufficio commerciale", en: "sales office" } },
    ],
  },
  schedeModelli: [
    {
      slug: "generative-bionics-gene-01", name: "GENE.01",
      company: { name: "Generative Bionics", slug: "generative-bionics", country: "Italia", website: "https://gbionics.ai" },
      kind: "umanoide", status: "pilota", year: 2026,
      specs: { height_cm: 172, weight_kg: 62, dof: 44, payload_kg: 15, battery_h: 4, speed_ms: 1.5 },
      price: null,
      description: { it: "Umanoide con pelle tattile distribuita su tutto il corpo, pensato per collaborare in sicurezza con le persone.", en: "Humanoid with tactile skin over its whole body, designed to work safely alongside people." },
      sources: [{ url: "https://www.eweek.com/news/generative-bionics-gene-01-humanoid/", for: "anno, descrizione", nature: "dichiarato" }],
      verification: "parziale", updated: null,
    },
    {
      slug: "generative-bionics-gene-01-lab", name: "GENE.01 Lab",
      company: { name: "Generative Bionics", slug: "generative-bionics", country: "Italia", website: "https://gbionics.ai" },
      kind: "umanoide", status: "pre-ordine", year: 2026,
      specs: { height_cm: 150, weight_kg: 45, dof: 38, payload_kg: null, battery_h: 3, speed_ms: null },
      price: { text: "€ 89.000", value: 89000, currency: "EUR" },
      description: { it: "Versione per università e centri di ricerca, con software aperto e accesso completo ai sensori.", en: "Version for universities and research centres, with open software and full sensor access." },
      sources: [{ url: "https://gbionics.ai", for: "esempio", nature: "dichiarato" }],
      verification: "parziale", updated: null,
    },
    {
      slug: "generative-bionics-gene-hand", name: "GENE Hand",
      company: { name: "Generative Bionics", slug: "generative-bionics", country: "Italia", website: "https://gbionics.ai" },
      kind: "mano", status: "prototipo", year: 2026,
      specs: { height_cm: null, weight_kg: 0.9, dof: 16, payload_kg: 3, battery_h: null, speed_ms: null },
      price: null,
      description: { it: "Mano robotica a cinque dita con sensori tattili su polpastrelli e palmo.", en: "Five-finger robotic hand with tactile sensors on fingertips and palm." },
      sources: [{ url: "https://gbionics.ai", for: "esempio", nature: "dichiarato" }],
      verification: "parziale", updated: null,
    },
  ],
};
