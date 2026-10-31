# AssoUmanoidi — landing V1

Next.js 15 (App Router) · GSAP 3.15 + ScrollTrigger · Lenis · CSS globale, niente framework CSS.
La grammatica di scorrimento è quella di connessionipro.com (vedi `connessionipro-replica.md` nella
cartella accanto); palette, tipografia e marchio sono quelli del brand book AssoUmanoidi.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Sistema di design

Tutto passa dai token in `app/globals.css`. Cambiando lì si ri-veste il sito intero.

| | |
|---|---|
| Navy | `#0B1D3A` — fondo delle sezioni scure |
| Oro | `#D4A23A` — accento, bottoni pieni, marchio |
| Off-white | `#F4F4F4` — fondo delle sezioni chiare |
| Grigio / Nero | `#8D8D8D` / `#111111` |
| Tipografia | **Manrope** (via `next/font`), un'unica famiglia in tre ruoli |

Due note sul perché di alcune scelte:

- **`--oro-scuro: #8f6b19`.** L'oro del brand su `#F4F4F4` non arriva al contrasto minimo per il
  testo piccolo (≈2,3:1). Sulle superfici chiare l'accento usa quindi una taratura più scura
  (≈5:1); su navy resta l'oro del brand. Sono due variabili, `--acc-su-chiaro` e `--acc-su-scuro`.
- **Una parola in oro per titolo.** L'evidenza si mette con `<span className="h">`. È l'unico
  meccanismo di enfasi del sito: se serve enfatizzare, si usa quello.

## Marchio

Il logo ufficiale, in due varianti generate dagli originali in `public/assets/`:

| File | Da | Uso |
|---|---|---|
| `public/marchio.webp` | `logo_02.png` | fondi scuri (navy, nero) |
| `public/marchio-scuro.webp` | `logo_01.png` | fondi chiari (`#F4F4F4`) |

Lo sfondo è stato reso trasparente con un riempimento dai bordi (le forme bianche interne —
braccia e anello — restano intatte), poi ritagliato al vivo e portato a 512×512.
La variante giusta la sceglie il CSS in base al contesto: nei componenti non si passa nulla.

Se cambiate gli originali, rigenerate i due `.webp` con lo stesso procedimento e basta.
Se vi serve anche il lockup orizzontale (`assets/assoumanoidi.jpg`), è a 380px: serve una
versione vettoriale prima di usarlo a schermo.

## Struttura

```
app/
  contenuti.ts        tutti i testi in italiano  ← si modifica quasi solo questo
  contenuti-en.ts     gli stessi testi in inglese (stesse chiavi: se manca una traduzione non compila)
  rotte.ts, lingue.ts gli indirizzi per lingua e il legame fra le pagine gemelle
  views/              le pagine, una per vista, usate da (it) e da (en)
  societa.ts          la directory dei costruttori (fonte dei dati)
  globals.css         token, reset, nav, bottoni, footer
  landing.css         le sezioni della landing
  pagine.css          le pagine interne (/directory, /statuto, /cariche-sociali)
  directory/          la lista completa dei costruttori, filtrabile
  statuto/            lo statuto
  cariche-sociali/    gli organi e chi li compone
  components/
    Motore.tsx        Lenis + GSAP: tutto il movimento, in un posto solo
    Elenco.tsx        ricerca e filtri della directory (client)
    Marchio.tsx       il logo
    Nav.tsx  Piede.tsx  Adesione.tsx  Futuro.tsx
  api/adesione/route.ts
```

Le pagine interne montano `<Nav sottopagina />`: le ancore del menu diventano `/#etica`,
il marchio torna in home e la barra è piena da subito invece di aspettare il motore di scroll
(che su queste pagine non gira: sono documenti, si leggono scorrendo).

Le sezioni sono componenti server dentro `app/page.tsx`. `Motore` le anima cercandole nel DOM per
classe: i contenuti non sanno nulla di animazione, quindi si possono riordinare o spostare in altre
pagine senza toccare il motore.

## Le pagine interne

| Rotta | Che cos'è | Stato |
|---|---|---|
| `/directory` | I costruttori censiti, con ricerca e filtri per area, stato e natura | pronta |
| `/statuto` | Lo statuto integrale: 29 articoli in 4 titoli | pronta |
| `/cariche-sociali` | Consiglio Direttivo, Probiviri, Consiglio Scientifico | **nomi provvisori** |

Tutte e tre si riempiono da `contenuti.ts`, non dai componenti:

- **`STATUTO.titoli`** contiene il testo integrale trascritto dal documento depositato: 29
  articoli in 4 titoli, con indice cliccabile. La sede legale (Art. 1) è **Napoli**. Se avete
  anche il PDF, mettetelo in `public/` e scrivete il percorso in **`STATUTO.pdf`**: il bottone
  di download appare da sé.
- **`CARICHE`** è ora compilata con **nomi provvisori inventati**, allineata alla composizione
  dello Statuto (nove consiglieri, tre per Camera — Art. 16; tre probiviri più due supplenti —
  Art. 24; Consiglio scientifico presieduto dal Direttore scientifico — Art. 21). Finché
  `CARICHE.avviso` è valorizzato, in cima alla pagina compare una fascia che dichiara che i nomi
  non sono nomine vere: **toglietela solo quando mettete le persone reali**. Ogni voce ha
  `persona` e `nota` (tre righe di scheda); `persona` vuota fa scrivere *"Da nominare"*.

`app/societa.ts` contiene, oltre ai campi del CSV d'origine, `tipo`, `usi`, `nota` e
`sitoVerificato`, che servono alla directory. Oggi è il file da modificare: vedi «La directory dei costruttori».

## Da collegare prima di andare online

1. **Il video della hero va sostituito.** `public/hero.mp4` è oggi un ritaglio di
   `assets/funny.mp4` (14 s, senza audio, 1,8 MB, rigenerato con ffmpeg dal secondo 192).
   Due problemi da risolvere prima di pubblicare:
   - **non è materiale vostro**: è una ripresa giornalistica con il **watermark CNA** visibile in
     alto a destra in ogni fotogramma. Usarla come sfondo della home è un problema di diritti, e il
     watermark lo rende evidente. Ritagliarlo non risolve: lo peggiora.
   - **dice il contrario di quello che dice la pagina**: sono umanoidi che cadono. L'hero afferma
     che la convivenza è una questione seria e urgente; aprire su una gag la smonta.

   Sostituendo `public/hero.mp4` (e `public/hero-poster.jpg`) non serve toccare altro.
   Consigliato: MP4 H.264, 1920×1080, senza audio, 10–20 s in loop, sotto i 6 MB.
2. **Il modulo di adesione non salva niente.** `app/api/adesione/route.ts` valida e scrive nei log
   del server. Va collegato a un invio email (Resend, Postmark, SMTP) o a un CRM. Finché non lo
   fate le adesioni si perdono, ma la pagina risponde "richiesta ricevuta".
3. **L'informativa privacy** nel consenso punta a `#aderisci`: sostituire con l'URL vero.
4. **Gli account social** in `contenuti.ts` → `SOCIAL` sono ipotizzati: vanno verificati.
5. **`metadataBase`** in `app/layout.tsx` è `https://assoumanoidi.it`: cambiare se il dominio è altro.
6. **Immagine OG**: non c'è. Serve un `1200×630` in `public/` più il campo `openGraph.images`.
7. **Le cariche sociali sono nomi inventati.** Servono solo a vedere la pagina piena. Finché
   `CARICHE.avviso` è valorizzato la pagina lo dichiara in cima; **vanno sostituite con le
   persone vere appena l'Assemblea elegge gli organi**, e allora si toglie l'avviso.
8. **La Rivista**: copertina e sommario sono quelli veri del N.01. Due cose da confermare —
   il numero è datato *Gennaio–Marzo 2027* ma l'uscita dichiarata è *dicembre* (`RIVISTA.uscita`);
   e il richiamo **"Intervista: Dario Amodei"** è pubblicato come contenuto del numero: se non è
   confermato, va tolto da `RIVISTA.numeroUno.sommario`. Il bottone "Iscriviti per riceverla"
   punta a `#aderisci`: non c'è ancora un flusso dedicato alla rivista.

## La testata di Humanoide

`public/humanoide-testata.webp` è il logotipo originale, ritagliato dal file del brand e reso
trasparente sul fondo navy (l'alfa è ricavata da quanto ogni pixel è più chiaro del fondo, così
bianco e oro restano puliti sui bordi). **Non va ricostruito in CSS**: un primo tentativo metteva
il marchio del sito dentro un bordo tondo e veniva sbagliato — doppio cerchio e figura bianca
invece che oro. Se il logo cambia, si rigenera il ritaglio.

## La rivista Humanoide: colophon e norme per gli autori

`/rivista/colophon` e `/rivista/norme-per-autori`, entrambe pubbliche, in italiano e inglese con
selettore. I testi sono in `app/rivista-testi.ts`. `/autori` reindirizza alle norme: era l'area
riservata con password, tolta il 30 ottobre 2026 su richiesta dell'associazione.

**Hosting.** Il colophon dichiara Netlify, Inc. La frase «server
situati all'interno dell'Unione europea» è stata tolta: Netlify non è un fornitore europeo.

**Segnaposto dei documenti.** Sede legale, codice fiscale e le due email di invio erano
`[tra parentesi]`. Non sono stati inventati: stanno in `DATI_RIVISTA`, vuoti. Finché lo sono, il
colophon non mostra le due righe e l'area autori dice che gli indirizzi saranno pubblicati.

**`humanoideonline.com` non risponde** (verificato il 28 ottobre 2026): compare come testo, non
come link. Quando è online si trasforma in `<a>`.

Le intestazioni di queste pagine usano il trattino medio ( – ), come impongono le norme stesse. Il
resto del sito usa ancora il trattino lungo ( — ) in etichette e titoli.

## Cariche sociali: schede con ritratto

`/cariche-sociali`. Chi ha `bio` in `CARICHE` (`app/contenuti.ts`) viene mostrato come scheda: ritratto,
ruolo, nome, e la nota biografica, con il primo paragrafo sempre visibile e gli altri dietro «Leggi la
biografia completa». Chi non ha `foto` mostra le iniziali nella stessa cornice (oggi: Stefano Colombara).

I ritratti stanno in `public/persone/`, quadrati, WebP a 256 px (circa 4 KB l'uno, 25 KB in tutto).
Per aggiungerne uno: ritaglio quadrato, 256 px, `.webp` con qualità 78, e il percorso in `foto`.
L'abbinamento persona e foto è stato ricavato dai nomi dei file originali (`vito.png`, `gobbo.png`…),
confrontando le immagini: nessuno è stato riconosciuto dal volto.

Consiglio direttivo e Direttore scientifico sono persone vere. Probiviri (tre effettivi e due
supplenti, Art. 24) e gli altri quattro posti del Consiglio scientifico (da cinque a nove membri,
Art. 21) sono **«Da nominare»**: i posti previsti dallo Statuto ci sono, i nomi no. Per riempirne uno
basta scrivere `persona` (e, se serve, `bio` e `foto`). Mai inserire un nome inventato per riempire
un posto: è già successo una volta e andava tolto.

## La directory dei costruttori

`app/societa.ts` è la fonte dei dati. Il CSV d'origine (`site/public/companies.csv`, 64 aziende,
21 agosto 2026) non è nel repository, quindi gli aggiornamenti si fanno direttamente qui, una voce
per oggetto, in ordine alfabetico. I contatori di home e directory si calcolano dall'elenco; la data
sta in `DATA_RILEVAZIONE`, sempre in `societa.ts`.

**Rilevazione del 30 ottobre 2026: 116 voci in 23 paesi.** Rispetto ad agosto:

- **Aggiunte 55 voci**, tra cui Generative Bionics e Oversonic Robotics (Italia), Hexagon, Agile
  Robots, Wandercraft, Galaxea, X-Humanoid, Midea, LG, Kawada. Aree nuove: Medio Oriente, Oceania.
- **Tolte 3 voci**: Halodi Robotics (è il vecchio nome di 1X, EVE compariva due volte), CloudMinds
  (liquidazione a ottobre 2025) e K-Scale Labs (chiusa a novembre 2025).
- **Aggiornate quasi tutte le voci esistenti**: modelli nuovi (Figure 03, Atlas di produzione, Walker S2…),
  stato, quotazioni (Unitree, UBTECH, DOBOT), domini cambiati (Booster, Kepler, Aldebaran…).

Ogni voce è stata controllata con ricerche web. **I siti però non sono stati aperti**: la rete della
sessione bloccava i domini delle aziende. Per questo `sitoVerificato` (il pallino) resta `true` solo
dove il dominio è lo stesso del controllo HTTP di agosto; le voci nuove o con dominio cambiato sono
`false` finché qualcuno non ripete il controllo. Domini confermati da una sola scheda di settore, da
ricontrollare per primi: TARS Robotics, Zerith, DroidUp, AKINROBOTICS, VinMotion, Kinisi, Prosper.

Rimasti fuori in attesa di conferma: Boardwalk Robotics e QSS AI & Robotics (sito ufficiale non
trovato), Unlimited Robotics (risulta inattiva da novembre 2025).

Le icone delle aziende arrivano dal servizio favicon di Google a partire dal dominio. Se una non
carica resta l'iniziale nel cerchio, quindi nessun buco. In oro sono segnate le aziende che hanno
già un umanoide sul mercato.

## Versione inglese

Il sito esiste in italiano (alla radice) e in inglese (sotto `/en`). Non cambia l'indirizzo
dell'italiano: `/`, `/directory`, `/statuto`… restano dove sono.

| Italiano | Inglese |
| --- | --- |
| `/` | `/en` |
| `/directory` | `/en/directory` |
| `/cariche-sociali` | `/en/board` |
| `/statuto` | `/en/statute` |
| `/rivista/colophon` | `/en/journal/colophon` |
| `/rivista/norme-per-autori` | `/en/journal/author-guidelines` |

**Come è fatto.** Due gruppi di route, `app/(it)` e `app/(en)`, ciascuno con il proprio layout
radice, così `<html lang>` è giusto già nell'HTML statico. I file in `(it)` e `(en)/en` sono sottili:
impostano i metadati e chiamano la stessa vista in `app/views/` con `lingua="it"` o `"en"`.

- **`app/contenuti.ts`** (italiano) e **`app/contenuti-en.ts`** (inglese) hanno le stesse chiavi.
  `app/testi.ts` le tipizza come una coppia: aggiungere un testo in italiano senza tradurlo
  **non compila**.
- **`app/rotte.ts`** ha gli indirizzi per lingua; **`app/lingue.ts`** la tabella che lega ogni pagina
  al suo gemello (selettore di lingua e `hreflang`). Se si aggiunge una pagina, va aggiunta in entrambi.
- **`app/societa-en.ts`** traduce solo le etichette della directory (paesi, nature, stati, impieghi).
  I dati restano in italiano in `societa.ts`; un valore nuovo senza traduzione si vede in italiano e
  in sviluppo avvisa in console. Il campo `nota` di ogni società non è mostrato da nessuna parte,
  quindi non è tradotto.
- **Titoli con parole evidenziate** si scrivono nei dizionari con `<h>…</h>` (oro) e `<u>…</u>`
  (umano), `\n` per andare a capo: l'accento cade dove vuole la frase di ogni lingua.
- **Lo statuto non è tradotto**: `/en/statute` ha intestazione e indice in inglese, e il testo
  integrale resta nell'originale italiano (con `lang="it"`), l'unica versione vincolante.
- **Rivista**: colophon e norme per gli autori erano già bilingui; sotto `/en` si aprono in inglese.
- La data della rilevazione è una sola, `DATA_RILEVAZIONE` in `societa.ts`, e si formatta per lingua.
- Il selettore **IT/EN** sta nella barra di navigazione. Non c'è reindirizzamento automatico in base
  alla lingua del browser.

## V2 — come si aggiungono le pagine

`rotte.ts` tiene le destinazioni non ancora pubblicate (una tabella per lingua):

```ts
cartaPagina: { href: "/carta", pronta: false },
```

Con `pronta: false` il link apre una scheda "in elaborazione" che rimanda all'adesione, invece di
mandare la gente su un 404. Quando la pagina esiste si mette `pronta: true` e **lo stesso link
comincia a navigare davvero**: nessun componente da toccare.

Le voci di menu sono ancora ancore della landing (`#etica`, `#carta`…). Diventeranno rotte cambiando
solo `href` in `rotte.ts`.

## Le ancore del menu

Le voci di menu passano da Lenis, non dallo scroll nativo, e atterrano con **offset zero**.
Non è un dettaglio: le sezioni che seguono una scena bloccata cominciano esattamente dove finisce
il pin, quindi anticipare anche solo di qualche pixel fa atterrare *sotto* la sezione ancora fissa —
si clicca "Associazione" e si resta nella hero. Con offset zero tutte e nove le ancore atterrano
al pixel.

Se arrivate su un indirizzo che ha già l'ancora (`/#carta`), il salto nativo del browser
scollegherebbe Lenis dai pin: per questo lo rifacciamo passando da Lenis appena le misure sono
pronte.

## Accessibilità e movimento

- Sotto i **1000px** e con **`prefers-reduced-motion`** il motore non parte: la pagina prende la
  classe `.au-statica` e diventa un documento verticale normale, senza pin né scroll orizzontale.
- `?statica=1` in coda all'URL forza quella modalità: serve a controllare la resa senza animazioni
  senza dover cambiare le impostazioni di sistema.
- Se la pagina viene aperta in una **scheda di sfondo**, `requestAnimationFrame` è fermo e l'intro
  resterebbe congelata a metà: in quel caso l'intro viene saltata e la hero parte già finita. C'è
  anche un timeout di sicurezza a 8 secondi.

## Verificato / non verificato

- ✅ Build di produzione pulita, nessun errore TypeScript.
- ✅ Hero, directory e sezione Asimov controllate a schermo; nessun overflow orizzontale; tutte e 14
  le sezioni renderizzano con i fondi corretti; nessun elemento rimasto invisibile.
- ✅ Ancore: tutte e nove atterrano a `top: 0` sulla sezione giusta (misurato).
- ✅ **Le leggi di Asimov** sono ora una pila di schede a schermo intero (una legge per schermo:
  scorrendo la scheda si corica all'indietro e la successiva le passa sopra). Verificata in
  movimento a 1512×773 — pila, prospettiva, uscita sul piede e rientro nella sezione Carta — e
  in modalità statica a 375px, senza overflow orizzontale.
- ⚠️ Le altre **scene animate a scorrimento** (portale, scroll orizzontale dei pilastri, scena delle
  tre Camere, scheda Anagrafe) sono verificate strutturalmente ma **non guardate in movimento**:
  l'ambiente in cui è stato costruito il sito manda la scheda in background e blocca `rAF`.
  Prima di pubblicare, apritele con `npm run dev` e scorrete la pagina.
