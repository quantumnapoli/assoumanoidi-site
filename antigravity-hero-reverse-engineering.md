# Reverse engineering dell’hero di Google Antigravity

> Specifica tecnica e creativa per replicare l’hero della homepage di [antigravity.google](https://antigravity.google/).
>
> Analisi effettuata il 28 agosto 2026. Il dominio non era ispezionabile tramite browser interattivo in questa sessione; copy, struttura semantica e riferimenti agli asset sono verificati dalla versione pubblica indicizzata. Dimensioni esatte, valori CSS e timeline sono quindi indicati come stime operative quando non esposti direttamente.

## 1. Obiettivo dell’hero

L’hero deve comunicare immediatamente:

- prodotto: Google Antigravity;
- categoria: piattaforma di sviluppo agentica;
- promessa: costruire nel nuovo paradigma “agent-first”;
- azione primaria: scaricare il prodotto;
- azione secondaria: esplorare i casi d’uso;
- atmosfera: lancio, propulsione, leggerezza e tecnologia, senza sembrare una dashboard SaaS tradizionale.

Copy osservato:

```text
Experience liftoff with the next-gen agent platform
```

CTA osservati:

```text
Download
Explore use cases
```

Elemento interattivo osservato:

```text
Play intro
```

## 2. Anatomia visiva

### Header sovrapposto

L’hero parte sotto un header trasparente o semi-trasparente, integrato nel canvas.

- logo Google Antigravity a sinistra;
- navigazione desktop centrata o distribuita: prodotto, use cases, blog/resources;
- CTA di download e controllo menu a destra;
- su mobile la navigazione collassa in menu hamburger;
- altezza consigliata: `72–88px` desktop, `64px` mobile;
- contenitore massimo consigliato: `1280–1440px`, con padding orizzontale `32–64px`.

La pagina usa icone in stile Material Symbols: frecce, menu, close, play e icone funzionali. Per una replica coerente usare SVG inline o Material Symbols Rounded, evitando emoji o icone miste.

### Canvas hero

La scena è un’area quasi full viewport, con molta aria e un elemento visuale centrale/di sfondo che suggerisce un cursore o un oggetto in sospensione. L’asset esposto dalla pagina è:

```text
/assets/image/antigravity-cursor.png
```

Trattare l’immagine come elemento decorativo principale, non come semplice immagine dentro una card:

- posizionamento assoluto;
- `object-fit: contain`;
- scala fluida con `clamp()`;
- parziale uscita dai bordi ammessa;
- z-index dietro al copy e davanti al background;
- `pointer-events: none` se non è interattiva.

### Gerarchia del copy

Il contenuto testuale deve essere il punto di ancoraggio principale, con larghezza controllata e contrasto alto.

```text
[eyebrow opzionale / brand marker]

Experience liftoff
with the next-gen
agent platform

[Download] [Explore use cases]
```

Indicazioni consigliate:

- headline molto grande, con 3 righe su desktop;
- font sans-serif di carattere editoriale/Google, peso medio o semibold;
- larghezza headline: `8–11ch` per riga, da regolare in base al font;
- dimensione desktop: `clamp(3.75rem, 7.5vw, 8.5rem)`;
- line-height: `0.9–1.02`;
- letter-spacing leggermente negativa: `-0.04em` circa;
- allineamento preferibilmente a sinistra o leggermente decentrato, evitando il blocco perfettamente centrato da landing SaaS standard.

### CTA

La CTA primaria “Download” deve avere peso visivo maggiore. La CTA secondaria è più leggera e conduce ai casi d’uso.

Implementazione suggerita:

- primary: pill o rettangolo molto arrotondato, colore pieno ad alto contrasto;
- secondary: link/button trasparente con freccia o underline animato;
- gap: `12–20px`;
- target touch minimo: `44px` di altezza;
- hover: traslazione di `2–4px`, variazione colore e freccia che avanza;
- focus: outline visibile e non sostituito dal solo cambio colore.

### Play intro

“Play intro” è un affordance separato, con icona play e testo breve. Può essere collocato vicino al bordo inferiore o laterale dell’hero, come invito a vedere la storia del prodotto.

Comportamento consigliato:

1. al click apre un overlay video full-screen o una lightbox;
2. l’overlay mostra un pulsante close sempre accessibile;
3. il video parte solo dopo l’interazione dell’utente;
4. `Escape` chiude la lightbox;
5. il focus torna al trigger alla chiusura;
6. rispettare `prefers-reduced-motion` e non usare autoplay con audio.

## 3. Composizione spaziale consigliata

```text
┌─────────────────────────────────────────────────────────────┐
│ logo              nav / product / resources       Download  │
│                                                             │
│            visual asset: antigravity-cursor.png             │
│                                                             │
│    Experience liftoff                                      │
│    with the next-gen              [visual / cursor]         │
│    agent platform                                           │
│                                                             │
│    [ Download ]  Explore use cases            Play intro     │
└─────────────────────────────────────────────────────────────┘
```

Non vincolare il visual a una griglia rigida: l’effetto deve sembrare una composizione editoriale con sovrapposizioni controllate.

## 4. Motion design

### Entrata iniziale

Timeline suggerita, durata totale `900–1400ms`, easing morbido:

1. background/atmosfera: fade-in `0 → 1`;
2. visual principale: `opacity 0 → 1`, `scale 0.86 → 1`, `y 32px → 0`, con leggera rotazione;
3. headline: reveal per righe con `clip-path` o maschere, `y 110% → 0`;
4. CTA: fade + `y 16px → 0` dopo il titolo;
5. play intro/header: entrata più discreta, con ritardo di `100–200ms`.

Evitare di animare ogni carattere: il reveal per righe mantiene il tono premium e riduce il rumore visivo.

### Movimento continuo

Il visual può avere un floating lento:

```js
gsap.to(cursor, {
  y: -12,
  rotation: 1.5,
  duration: 3.8,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
```

Per l’effetto “antigravity” aggiungere un parallax molto leggero su `pointermove`, limitato a `translate3d` e con `will-change: transform`. Non legare il movimento alla posizione assoluta del mouse in modo aggressivo: il visual deve restare leggibile e stabile.

### Scroll

- il primo scroll può ridurre leggermente il visual e spostare il copy verso l’alto;
- l’header può diventare solido dopo `24–48px` di scroll;
- usare `transform` e `opacity`, non animare continuamente `top`, `left`, `width` o proprietà che forzano layout;
- mantenere il passaggio all’overview visibile, senza bloccare lo scroll dell’utente.

## 5. Responsive behavior

### Desktop, `≥ 1024px`

- hero minimo: `min-height: 100svh`;
- header orizzontale;
- headline da `64px` in su;
- visual grande e parcialmente oltre la griglia;
- CTA sulla stessa riga;
- play intro ancorato al bordo inferiore o alla colonna opposta al copy.

### Tablet, `768–1023px`

- ridurre headline a `clamp(3rem, 8vw, 5.5rem)`;
- visual più centrato e meno overscan;
- navigazione ridotta a poche voci;
- CTA ancora orizzontali se c’è spazio.

### Mobile, `< 768px`

- hero `min-height: 100svh`, tenendo conto della safe area;
- copy in una colonna, allineato a sinistra;
- headline `clamp(3rem, 15vw, 5rem)`;
- visual dietro o sopra il copy, ma con contrasto sufficiente;
- CTA impilate o con primary full-width;
- nav sostituita da menu;
- play intro vicino al fondo ma sopra la safe area;
- ridurre o disattivare parallax e floating quando `prefers-reduced-motion: reduce`.

## 6. Struttura HTML suggerita

```html
<header class="site-header">
  <a class="brand" href="/" aria-label="Google Antigravity home">
    <!-- logo SVG -->
  </a>
  <nav aria-label="Primary navigation">
    <!-- links -->
  </nav>
  <a class="header-download" href="/download">Download</a>
  <button class="menu-toggle" aria-label="Open menu">...</button>
</header>

<main>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__visual" aria-hidden="true">
      <img src="/assets/image/antigravity-cursor.png" alt="" />
    </div>

    <div class="hero__content">
      <h1 id="hero-title">
        Experience liftoff with the next-gen agent platform
      </h1>
      <div class="hero__actions">
        <a class="button button--primary" href="/download">Download</a>
        <a class="button button--secondary" href="/use-cases">
          Explore use cases <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    <button class="intro-trigger" type="button" aria-haspopup="dialog">
      <span aria-hidden="true">▶</span> Play intro
    </button>
  </section>
</main>
```

## 7. CSS di base

```css
.hero {
  position: relative;
  min-height: 100svh;
  overflow: clip;
  isolation: isolate;
  display: grid;
  align-items: center;
  padding: 8rem clamp(1.25rem, 5vw, 5rem) 4rem;
}

.hero__content {
  position: relative;
  z-index: 2;
  width: min(52rem, 70vw);
}

.hero h1 {
  max-width: 10ch;
  margin: 0;
  font-size: clamp(3.75rem, 7.5vw, 8.5rem);
  line-height: .94;
  letter-spacing: -.05em;
  text-wrap: balance;
}

.hero__visual {
  position: absolute;
  z-index: 1;
  inset: 7% 2% 4% 35%;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.hero__visual img {
  width: min(62vw, 920px);
  max-height: 82svh;
  object-fit: contain;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 767px) {
  .hero {
    align-items: end;
    padding-bottom: 7rem;
  }

  .hero__content {
    width: 100%;
  }

  .hero__visual {
    inset: 8% -18% 40% -8%;
    opacity: .8;
  }

  .hero__visual img {
    width: 112vw;
    max-height: 48svh;
  }

  .hero__actions {
    align-items: stretch;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
```

## 8. Asset e dipendenze

Asset pubblico verificato:

```text
https://antigravity.google/assets/image/antigravity-cursor.png
```

Per la replica locale:

1. scaricare l’asset nel repository solo se si dispone del diritto di riutilizzo;
2. preferire una copia ottimizzata WebP/AVIF se la qualità visiva lo consente;
3. mantenere PNG come fallback;
4. usare `width`, `height` o `aspect-ratio` per evitare layout shift;
5. non copiare logo o video proprietari senza verificare licenza e brand guidelines.

## 9. Checklist di accettazione

- [ ] Il messaggio principale è leggibile entro 2 secondi.
- [ ] Il visual è presente senza rubare gerarchia al titolo.
- [ ] Download è la CTA più evidente.
- [ ] Explore use cases resta chiaramente secondaria ma visibile.
- [ ] Play intro è accessibile da tastiera.
- [ ] L’hero non causa horizontal overflow su mobile.
- [ ] Nessun CLS evidente durante il caricamento dell’immagine.
- [ ] `prefers-reduced-motion` disattiva floating, parallax e reveal aggressivi.
- [ ] Contrasto testo/background verificato con WCAG AA.
- [ ] Il layout funziona con viewport alti e bassi, inclusi iPhone con safe area.

## 10. Nota di fedeltà

La parte più riconoscibile dell’hero non è il singolo effetto, ma la combinazione di:

1. headline molto grande e compatta;
2. visual sospeso e sovrapposto;
3. CTA ridotte a due azioni;
4. movimento iniziale elegante, non frenetico;
5. linguaggio visivo “liftoff” coerente con il nome Antigravity.

Per una replica fedele conviene prima bloccare proporzioni, gerarchia e crop del visual, poi rifinire easing e micro-interazioni.
