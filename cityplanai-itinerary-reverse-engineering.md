# Reverse engineering del generatore di itinerari di CityPlanAI

> Analisi di [cityplanai.guide/itinerary-generator](https://www.cityplanai.guide/itinerary-generator?city=Lisbon&days=4&style=hidden&cityId=76528) effettuata il 30 ottobre 2026.
>
> Metodo: download dell'HTML e degli script pubblici, lettura del codice client, poi una sessione reale in Chromium headless (una sola generazione) registrata in HAR, nel formato che REA (`morluto/rea`) legge con `inspect_web_network_capture`.
> Tutto ciò che sta nel browser è **verificato**. Ciò che succede dentro il server (`/api/itinerary`) non è visibile: è indicato come **dedotto** e si basa sui commenti nel codice e sulle risposte osservate.

## 1. In una frase

L'itinerario non lo "inventa" un'AI da zero. Il sito prende dal **catalogo Tiqets** le 20 attrazioni prenotabili della città, con prezzi veri, e le passa a un **LLM** (Claude, secondo un commento nel codice). Il modello le ordina in giorni e orari e aggiunge passeggiate gratuite e pasti. Il risultato JSON viene **messo in cache**, e per le combinazioni più comuni è **già pre-generato**: per questo la risposta arriva in circa 250 ms ed è sempre uguale.

## 2. Architettura

| Livello | Tecnologia | Evidenza |
|---|---|---|
| Hosting | Vercel (edge `iad1`) | header `server: Vercel`, `x-vercel-id`, `x-vercel-cache` |
| Frontend | HTML statico + JavaScript vanilla (niente React/Next) | assenza di `_next/`, `__NEXT_DATA__`; 10 script inline, quello principale è di 83 KB |
| Backend | Funzioni serverless Vercel sotto `/api/*` | `/api/itinerary`, `/api/tiqets`, `/api/viator`, `/api/share`, `/api/send-itinerary`, `/api/csp-report` |
| Dati città | file statico `/data/tiqets-geo.json` (772 KB, 2.420 città, 6 continenti) | Lisbona = `{"id":"76528"}`, cioè il `cityId` dell'URL |
| Contenuti prenotabili | API Tiqets (affiliazione) via proxy `/api/tiqets` | risposta con `experiences[]`, link `tiqets.com/...-l<ID>` |
| AI | LLM lato server (Claude, dedotto) | commento in `renderItinerary`: *"Claude sometimes outputs 'No booking' etc."* |
| Monetizzazione | Tiqets, Viator, GetTransfer/Kiwitaxi, Radical Storage, Yesim, Ekta via Travelpayouts (`emrld.ltd`) | `affiliate.js`, CSP, funzioni `transferBlock`, `luggageBlock`, `essentialsBlock` |

## 3. Il flusso, passo per passo (verificato)

Sequenza registrata nella sessione reale (tempi relativi al caricamento):

```text
+0.00s  GET  /data/tiqets-geo.json                 → elenco città/ID per l'autocomplete
+3.08s  GET  /api/tiqets?city_id=76528&lang=en&currency=EUR&page_size=20
+3.35s       200, 80 KB, 20 esperienze Tiqets
+3.33s  POST /api/itinerary                         → parte appena arrivano le esperienze
+3.59s       200, 5 KB  {"success":true,"cached":true,"stale":false,...}
+3.59s  GET  /api/viator?city=lisbon&q=food tour    → card "food tour" opzionale
```

### 3.1 Parametri dell'URL → stato del form

`?city=Lisbon&days=4&style=hidden&cityId=76528` precompila il form:

- `city`: filtrato con `[^\p{L}\s\-'.]` e massimo 60 caratteri (anti-XSS);
- `days`: da 1 a 14 (`MAX_DAYS = 14`, che è anche il limite dell'API);
- `style`: `iconic` | `hidden` | `local`;
- `cityId`: ID della città Tiqets; se manca, la ricerca va per nome (`/api/tiqets?city=lisbon`);
- facoltativi: `party` (`solo|couple|family|friends`), `profile` (`Culture,Foodie,History,Nature,Shopping`), `arrival=YYYY-MM-DD`, `autorun=1`.

### 3.2 Step 1: recupero delle attrazioni reali (`/api/tiqets`)

Il proxy server-side chiama Tiqets con la chiave partner nascosta e restituisce 20 prodotti. Ogni elemento ha questi campi:

```json
{ "id": 145607, "type": "venue", "title": "Jerónimos Monastery",
  "experience_url": "https://www.tiqets.com/en/jeronimos-monastery-tickets-l145607/",
  "images": {...}, "address": {...}, "ratings": {"average": 4.2, ...},
  "currency": "EUR", "from_price": 19.5, "tagline": "...", "description": "...",
  "tag_ids": [...], "product_ids": [...] }
```

L'endpoint risponde `403 {"error":"Forbidden"}` alle chiamate fatte fuori dal sito (con curl risponde `access-control-allow-origin: https://cityplanai.guide`). C'è quindi un controllo sull'origine, che impedisce a terzi di usare il loro proxy.

### 3.3 Step 2: generazione (`POST /api/itinerary`)

Body inviato dal browser (catturato):

```json
{
  "city": "Lisbon", "country": "", "days": 4,
  "travel_style": "hidden", "lang": "en",
  "party": "", "profile": "",
  "currency_symbol": "€",
  "experiences": [ /* le 20 esperienze Tiqets, complete */ ]
}
```

Le date di arrivo **non vengono inviate di proposito**. Il commento nel codice lo spiega:

> *"buildCacheKey() is city+days+style+lang+profile only — varying the prompt without varying the key would serve itineraries stamped with someone else's dates and destroy the 100% hit rate the pre-generated itineraries depend on."*

Le date servono solo a mostrare il giorno della settimana lato client e a programmare le email pre-partenza.

Risposta (catturata, abbreviata):

```json
{
  "success": true, "cached": true, "stale": false,
  "days_capped": false, "days_generated": 4,
  "itinerary": {
    "title": "Lisbon's Hidden Corners: Alfama, Belém, Sintra and Beyond",
    "summary": "Four days of Lisbon's quieter side, ...",
    "total_price": 190.8,
    "days": [
      { "day": 1, "title": "Alfama's Hidden Lookouts",
        "subtitle": "Old streets, a cathedral and a night of fado",
        "activities": [
          { "time": "9:00", "period": "Morning",
            "name": "Miradouro de Santa Luzia and Alfama Lanes",
            "description": "Start at this tiled viewpoint, then wander ...",
            "price": 0, "price_label": "Free", "url": null, "bookable": false },
          { "time": "10:30", "period": "Morning", "name": "Lisbon Cathedral",
            "price": 7, "price_label": "€7", "bookable": true,
            "url": "https://www.tiqets.com/lisbon-cathedral-tickets-l193524" }
        ] }
    ]
  }
}
```

### 3.4 Step 3: rendering e monetizzazione (client)

`renderItinerary()` trasforma il JSON in HTML:

- tutto il testo del modello passa da `escHtml()` e gli URL da `safeUrl()`, che accetta solo `http(s)`;
- `bookable:true` → bottone "Book →" verso Tiqets, con tracking GA4/TikTok `affiliate_click`;
- per ogni attività c'è un link `google.com/maps/search/<nome>, <città>` (non salvano coordinate);
- l'immagine di un'attività viene ripresa dalla lista Tiqets confrontando l'ID prodotto nell'URL;
- dopo l'ultimo giorno compaiono le card transfer aeroporto e deposito bagagli, poi "Before you go" (eSIM, assicurazione);
- se un giorno contiene un pasto, `addFoodTour()` cerca su Viator un food tour e lo inserisce dopo quel giorno;
- condivisione tramite `/api/share?...`, che fornisce i tag OG ai bot e reindirizza le persone con `autorun=1`;
- esportazione in `.ics` (solo con data di arrivo), stampa/PDF, email.

## 4. Perché l'itinerario sembra "ben definito"

Verifica sui dati catturati: **tutte e 7 le attività prenotabili** dell'itinerario di Lisbona appartengono alle 20 esperienze Tiqets passate al modello, **con lo stesso prezzo esatto**:

| Attività nel piano | Prezzo nel piano | ID Tiqets | `from_price` Tiqets |
|---|---|---|---|
| Lisbon Cathedral | €7 | 193524 | 7 |
| Museum of Illusions Lisbon | €12 | 266151 | 12 |
| Jerónimos Monastery | €19.5 | 145607 | 19.5 |
| Belém Tower | €9.99 | 141937 | 9.99 |
| Castelo dos Mouros | €10.96 | 146205 | 10.96 |
| Monserrate Palace | €10.96 | 146212 | 10.96 |
| National Palace and Gardens of Queluz | €13 | 146210 | 13 |

Le altre 8 attività sono tutte `Free` (passeggiate, belvedere, quartieri) o `Pay on site` (pranzi). Sono le uniche parti in cui il modello attinge alle proprie conoscenze generali.

Da qui la struttura costante (schema osservato in tutti i giorni):

- **3–4 attività al giorno**, slot fissi `9:00–10:30` mattina, `13:00` pranzo, `15:00–15:30` pomeriggio;
- **un'area geografica per giorno** (Alfama → Belém → Sintra → Mouraria/Queluz);
- **alternanza** tra attrazione a pagamento e passeggiata gratuita, con pranzo nel quartiere;
- titolo e sottotitolo "editoriali" per ogni giorno;
- lo stile `hidden` cambia il tono e la scelta (Museum of Illusions, Queluz, Mouraria al posto di Oceanário e Pena).

**Dedotto:** questa regolarità si ottiene con un prompt molto rigido che impone lo schema JSON, il numero di attività e gli orari, l'uso delle sole esperienze fornite per le voci `bookable` e il raggruppamento per zona. Si aggiungono poi la cache e la pre-generazione: la stessa richiesta (`Lisbon/4/hidden/en/`) restituisce sempre lo stesso piano, servito in 250 ms senza chiamare il modello.

Dettaglio rivelatore: `total_price` vale **190.8**, mentre la somma dei prezzi delle attività è **83.41**. Il totale lo calcola il modello e il server non lo ricontrolla.

## 5. Cosa succede lato server (dedotto)

```text
POST /api/itinerary
 ├─ rate limit per IP           → 429 "wait 1 minute" (gestito dal client)
 ├─ sanitizeStr() sugli input   → citato nei commenti del client
 ├─ days > 14 → cap a 14        → days_capped / days_generated
 ├─ key = hash(city, days, style, lang, profile[, party])
 ├─ cache HIT  → {cached:true, stale:false}   (pre-generati: hit rate ~100%)
 │   cache STALE → serve e rigenera in background (stale-while-revalidate)
 └─ cache MISS → prompt(città, giorni, stile, party, profilo, esperienze Tiqets)
                 → LLM → JSON → validazione → salvataggio in cache
 └─ sovraccarico → 503 "MAINTENANCE"
```

## 6. Come replicarlo

Stack minimo, compatibile con la repo attuale (Next.js su Netlify):

1. **Catalogo**: un account partner Tiqets (o GetYourGuide/Viator). Endpoint `/api/experiences?city_id=` lato server, con la chiave in variabile d'ambiente e il controllo su Origin/Referer.
2. **Generatore**: `POST /api/itinerary` chiama Claude con output JSON vincolato (tool use / JSON schema) che ricalca lo schema del §3.3.
3. **Prompt**: le regole che producono la "forma" osservata:
   - usa **solo** gli elementi di `experiences` per le attività `bookable:true`, copiandone `url` e `from_price`;
   - 3–4 attività al giorno con orari 9:00 / 10:30 / 13:00 / 15:00, una zona per giorno, pranzo `Pay on site`;
   - riempi i buchi con attività gratuite reali (belvedere, quartieri, parchi);
   - `travel_style`: `iconic` = must-see, `hidden` = alternative meno affollate, `local` = vita di quartiere;
   - adatta ritmo e scelte a `party` e `profile`.
4. **Ricalcolo server-side** di `total_price` come somma dei prezzi (correggendo il difetto visto sopra).
5. **Cache**: chiave `city|days|style|lang|profile|party`, valore = JSON. Per esempio Redis/Upstash o una tabella PostgreSQL `itinerary_cache(key PK, json JSONB, created_at)`. Pre-generare le combinazioni più cercate (top città × 1–7 giorni × 3 stili × lingue).
6. **Client**: rendering con escaping obbligatorio dell'output del modello (`escHtml`/`safeUrl`), link Maps per nome e card affiliate contestuali.

## 7. Riprodurre l'analisi

Il file HAR della sessione si analizza offline con REA:

```bash
npx -y rea-agents@latest inspect-web-network-capture /percorso/session.har har --json
```

Script Playwright usato per la cattura: apre la pagina, aspetta la selezione della città, chiama `generateItinerary()` una volta e salva HAR, screenshot e `window.lastItinerary`. È stata eseguita **una sola generazione**, servita dalla cache del sito.
