# Connessioni Pro — Specifica completa di replica

Reverse engineering di **https://connessionipro.com/** (homepage), estratto il 26 agosto 2026.
Questo documento contiene tutto il necessario per ricostruire la pagina 1:1: stack, token di design,
markup sezione per sezione, CSS reale e la logica GSAP/ScrollTrigger esatta.

---

## 1. Stack tecnologico rilevato

| Elemento | Valore |
|---|---|
| Framework | **Next.js App Router** (RSC, `/_next/static/chunks/app/page-*.js`), output SSR statico |
| Animazioni | **GSAP 3.15.0** + plugin **ScrollTrigger** |
| Smooth scroll | **Lenis 1.3.25** (`new Lenis({ duration: 1.15 })`, agganciato al ticker GSAP) |
| Immagini | `next/image` (`/_next/image?url=…&w=…&q=75`) |
| Styling | CSS puro globale (niente Tailwind, niente CSS Modules) — 3 file: reset+layout, pagine interne, pagina wow |
| Cookie/consent | Iubenda (`cookie_solution/iubenda_cs/1.104.3/core-it.js`) |
| Analytics | GA4 `G-6YSFMT255Z` + Meta Pixel `1495941268571780` |
| Lingua | `it` |

Dipendenze minime da installare:

```bash
npm i next react react-dom gsap lenis
```

> `ScrollTrigger` fa parte del pacchetto gsap pubblico. Nessun plugin premium (niente ScrollSmoother, niente SplitText: lo split delle parole è fatto a mano in JSX).

---

## 2. Design tokens

Da `:root` (file globale):

```css
:root{
  --navy:    #0E1A3A;
  --navy-2:  #111e44;
  --gold:    #E3AE64;
  --gold-h:  #efc07a;   /* gold hover */
  --white:   #FFFFFF;
  --alice:   #f2f8fa;
  --off:     #F7F5F0;
  --border:   rgba(255,255,255,0.09);
  --border-d: rgba(14,26,58,0.10);
  --muted:    rgba(255,255,255,0.52);
  --muted-d:  rgba(14,26,58,0.50);
  --green:   #2ec464;
  --red:     #ff5a5a;
}
```

Colori extra hardcoded (avatar demo nel mockup telefono): `#6C63FF`, `#2DD4BF`, `#F472B6`, blu badge `#7aa7ff`.

### Reset / base

```css
*,:after,:before{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:Satoshi,system-ui,sans-serif;background:var(--navy);color:var(--white);
     overflow-x:hidden;-webkit-font-smoothing:antialiased}
a{color:inherit}
img{display:block;max-width:100%}
button{font-family:inherit}
```

---

## 3. Tipografia

Due famiglie, entrambe caricate in `.woff` dal CDN Webflow (font commerciali Indian Type Foundry: **Satoshi** e **Gambetta**). Se non hai licenza, sostituisci con alternative: Satoshi → *General Sans* / *Inter Tight*; Gambetta → *Fraunces italic* / *EB Garamond italic*.

```css
/* Gambetta: 400, 400i, 600i, 700, 700i */
@font-face{font-family:Gambetta;src:url(.../6272d087747160b005edd4d7_Gambetta-Bold.woff) format("woff");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:Gambetta;src:url(.../6272d08871728d8165bdaace_Gambetta-BoldItalic.woff) format("woff");font-weight:700;font-style:italic;font-display:swap}
@font-face{font-family:Gambetta;src:url(.../6272d08d815058cf5bf64892_Gambetta-SemiboldItalic.woff) format("woff");font-weight:600;font-style:italic;font-display:swap}
@font-face{font-family:Gambetta;src:url(.../6272d08b747160b605edd4e2_Gambetta-Regular.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:Gambetta;src:url(.../6272d0884a92a915e690d358_Gambetta-Italic.woff) format("woff");font-weight:400;font-style:italic;font-display:swap}
/* Satoshi: 400, 500, 700, 900 */
@font-face{font-family:Satoshi;src:url(.../6283b7f1f5f5017b8aeeb8d2_Satoshi-Black.woff) format("woff");font-weight:900;font-style:normal;font-display:swap}
@font-face{font-family:Satoshi;src:url(.../6283b7f1b4a9509af265aedc_Satoshi-Bold.woff) format("woff");font-weight:700;font-style:normal;font-display:swap}
@font-face{font-family:Satoshi;src:url(.../6283b7f23c343f52d8653260_Satoshi-Medium.woff) format("woff");font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:Satoshi;src:url(.../6283b7f29fd8cecb1542cbea_Satoshi-Regular.woff) format("woff");font-weight:400;font-style:normal;font-display:swap}
```

Base CDN completa: `https://cdn.prod.website-files.com/626c541d5a3abf086162695e/`

**Regola tipografica del sito** (ricorre ovunque): titolo in `Satoshi 900`, letter-spacing negativo (−.03/−.04em), con **una riga in `Gambetta italic 700` oro** tramite `<span class="serif">`. Questo è il tratto identitario del design.

```css
.serif{font-family:Gambetta,serif;font-style:italic;font-weight:700;color:var(--gold)}
```

---

## 4. Il motivo grafico "stadium"

L'unico elemento decorativo del brand è un rettangolo stondato (pillola/"ovale") in SVG, riutilizzato ovunque a dimensioni diverse: eyebrow, scroll hint, marquee, cursore custom, anello CTA, rail di scroll, intro loader.

```html
<svg viewBox="0 0 220 100" class="wow-stadium" aria-hidden="true" fill="none">
  <rect x="9" y="9" width="202" height="82" rx="41" stroke="currentColor" stroke-width="18"/>
</svg>
```

Varianti di stroke usate: `stroke-width:18` (default), `10` (intro loader e anello CTA, con `x=5 y=5 w=210 h=90 rx=45`), `8` (ring sezione "next", `x=4 y=4 w=212 h=92 rx=46`).
Nell'intro loader il `rect` ha `pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"` per il disegno progressivo.

---

## 5. Struttura pagina (ordine DOM)

```
body
├── .ann-bar                     ← announcement bar oro (sticky in cima al flusso)
├── nav.nav.at-top               ← nav sticky, trasparente in cima
├── .nav-mobile-backdrop
├── .nav-mobile                  ← drawer laterale mobile
└── .wow-root                    ← wrapper pagina (dark)
    ├── .wow-intro               ← loader fullscreen (si auto-rimuove)
    ├── .wow-rail                ← barra progresso verticale destra
    ├── .wow-cursor              ← cursore custom a pillola
    ├── section.wow-hero         ← video portal + canvas network
    ├── section.wow-statement#metodo
    ├── section.wow-problems     ← scroll orizzontale pinnato (4 card)
    ├── .wow-marquee             ← 2 righe che scorrono in direzioni opposte
    ├── section.wow-app          ← telefono 3D + step sincronizzati
    ├── section.wow-stack        ← card sticky impilate
    ├── section.wow-live         ← griglia foto parallax + contatori
    ├── section.wow-rec          ← track record, schermo 3D + lightbox YouTube
    ├── section.wow-next         ← prossimo evento + countdown live
    ├── section.wow-philosophy   ← canvas network + quote word-by-word
    ├── section.wow-cta          ← CTA oro con stadium 3D tilt
    └── footer.footer
```

---

## 6. Head / SEO

```html
<title>Connessioni Pro · Le opportunità esistono già</title>
<meta name="description" content="Costruiamo l'infrastruttura che riduce lo spreco di opportunità e trasforma le relazioni in valore. Eventi di networking selezionati a Milano.">
<link rel="canonical" href="https://connessionipro.com">
<meta property="og:title" content="Connessioni Pro — Networking professionale di precisione">
<meta property="og:description" content="Costruiamo l'infrastruttura che riduce lo spreco di opportunità e trasforma le relazioni in valore. Eventi di networking selezionati a Milano.">
<meta property="og:url" content="https://connessionipro.com">
<meta property="og:image" content="https://connessionipro.com/connessionipro-preview.jpg">
<meta property="og:image:width" content="1280"><meta property="og:image:height" content="720">
<meta name="twitter:card" content="summary_large_image">
```

---

## 7. Chrome globale (barra, nav, footer)

### 7.1 Announcement bar

```html
<div class="ann-bar">
  <span class="ann-pre">Prossimo evento</span>
  <div class="ann-sep"></div>
  <strong>Milano · 10 Settembre · ore 18:00 · Randstad Box</strong>
  <div class="ann-sep"></div>
  <a href="/10-settembre">Partecipa →</a>
</div>
```

```css
.ann-bar{background:var(--gold);color:var(--navy);padding:10px 24px;text-align:center;font-size:13px;font-weight:600;letter-spacing:.02em;display:flex;align-items:center;justify-content:center;gap:16px;position:relative;z-index:201}
.ann-sep{width:4px;height:4px;border-radius:50%;background:var(--navy);opacity:.3;flex-shrink:0}
.ann-bar a{color:var(--navy);font-weight:700;text-decoration:underline;text-underline-offset:2px}
.ann-close{position:absolute;right:16px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--navy);opacity:.4;font-size:18px;line-height:1;padding:4px}
.ann-close:hover{opacity:.7}
```

### 7.2 Nav

Voci: dropdown **Eventi** (10 Settembre 2026 + "Eventi passati": 8 Luglio, 11 Giugno, 20 Maggio) · **Ambassador** (`/ambassador`) · **Testimonianze** (`/feedback`) · dropdown outline **Per le aziende** (Partnership, Touchpoint as a Service) · social Instagram/LinkedIn · bottone oro **Partecipa** → `/10-settembre#biglietti`.

```css
.nav{position:sticky;top:0;z-index:200;height:66px;padding:0 48px;display:flex;align-items:center;justify-content:space-between;background:var(--navy);border-bottom:1px solid var(--border);transition:background .3s,border-color .3s}
.nav.at-top{background:transparent;border-bottom-color:transparent}
.nav-logo{text-decoration:none;display:flex;align-items:center;gap:14px}      /* logo.png, h=38px */
.nav-links{display:flex;gap:32px;list-style:none;align-items:center}
.nav-links a{font-size:13.5px;font-weight:500;color:var(--muted);text-decoration:none;transition:color .2s;cursor:pointer;background:none;border:none}
.nav-links a:hover{color:var(--white)}
.nav-links a.nav-cta-outline,.nav-links button.nav-cta-outline{display:inline-flex;align-items:center;gap:6px;color:var(--white);font-weight:700;padding:8px 18px;border:1px solid rgba(227,174,100,.5);border-radius:10px;transition:border-color .2s,background .2s,color .2s}
.nav-links button.nav-cta-outline:hover{border-color:var(--gold);background:rgba(227,174,100,.1);color:var(--gold-h)}

.nav-dd{position:relative}
.nav-dd-toggle{display:inline-flex;align-items:center;gap:5px;font-family:inherit;font-size:13.5px;font-weight:500;color:var(--muted);background:none;border:none;cursor:pointer;transition:color .2s}
.nav-dd:hover .nav-dd-toggle{color:var(--white)}
.nav-dd-toggle svg{width:10px;height:10px;transition:transform .2s}
.nav-dd:hover .nav-dd-toggle svg{transform:rotate(180deg)}
.nav-dd-menu{position:absolute;top:calc(100% + 14px);left:50%;transform:translateX(-50%) translateY(6px);background:var(--navy-2);border:1px solid var(--border);border-radius:14px;padding:8px;min-width:220px;display:flex;flex-direction:column;gap:2px;opacity:0;visibility:hidden;transition:opacity .2s,transform .2s;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.nav-dd:hover .nav-dd-menu{opacity:1;visibility:visible;transform:translateX(-50%) translateY(0)}
.nav-dd-menu:before{content:"";position:absolute;bottom:100%;left:0;right:0;height:20px} /* ponte hover */
.nav-dd-menu-wide{min-width:320px;left:auto;right:0;transform:translateX(0) translateY(6px)}
.nav-dd-item{display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:9px;text-decoration:none;transition:background .2s}
.nav-dd-item:hover{background:rgba(255,255,255,.05)}
.nav-dd-item strong{font-size:13.5px;font-weight:700;color:var(--white)}
.nav-dd-item span{font-size:11.5px;color:var(--muted);line-height:1.4}
.nav-dd-divider{height:1px;background:var(--border);margin:6px 4px}
.nav-dd-label{font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 14px 2px;color:var(--muted)}
.nav-dd-item-past strong{color:var(--muted)}

.nav-right{display:flex;align-items:center;gap:14px}
.nav-burger{display:none;background:none;border:none;cursor:pointer;padding:8px;color:var(--white)}
.nav-burger svg{width:22px;height:22px}
.social-links{display:flex;align-items:center;gap:14px}
.social-links a{color:var(--muted);display:inline-flex;align-items:center;justify-content:center;transition:color .2s}
.social-links a:hover{color:var(--white)}
.social-links svg{width:18px;height:18px}
```

Drawer mobile:

```css
.nav-mobile-backdrop{position:fixed;inset:0;z-index:299;background:rgba(6,11,26,.55);opacity:0;visibility:hidden;transition:opacity .3s ease}
.nav-mobile-backdrop.open{opacity:1;visibility:visible}
.nav-mobile{position:fixed;inset:0;z-index:300;background:var(--navy);display:flex;flex-direction:column;max-width:400px;margin-left:auto;box-shadow:-24px 0 60px rgba(0,0,0,.35);transform:translateX(100%);transition:transform .32s cubic-bezier(.4,0,.2,1)}
.nav-mobile.open{transform:translateX(0)}
.nav-mobile-head{display:flex;align-items:center;justify-content:space-between;padding:20px 20px 18px;border-bottom:1px solid var(--border);flex-shrink:0}
.nav-mobile-close{display:flex;align-items:center;justify-content:center;width:38px;height:38px;margin:-8px;background:rgba(255,255,255,.06);border:none;border-radius:50%;color:var(--white);font-size:24px;cursor:pointer;line-height:1;transition:background .15s}
.nav-mobile-body{flex:1;min-height:0;overflow-y:auto;padding:20px 20px 8px;display:flex;flex-direction:column;gap:22px}
.nav-mobile-event{position:relative;display:flex;flex-direction:column;gap:3px;padding:18px 44px 18px 18px;border-radius:16px;background:linear-gradient(135deg,rgba(227,174,100,.16),rgba(227,174,100,.05));border:1px solid rgba(227,174,100,.35);text-decoration:none}
.nav-mobile-event-label{display:flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:4px}
.nav-mobile-event-label:before{content:"";width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0}
.nav-mobile-past-list{display:flex;flex-direction:column;max-height:0;overflow:hidden;transition:max-height .3s ease}
```

### 7.3 Bottoni

```css
.btn-gold{background:var(--gold);color:var(--navy);padding:9px 22px;border-radius:100px;font-size:13.5px;font-weight:700;letter-spacing:.03em;text-decoration:none;display:inline-flex;align-items:center;gap:6px;border:none;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s}
.btn-gold:hover{background:var(--gold-h);transform:translateY(-1px);box-shadow:0 4px 16px rgba(227,174,100,.35)}
.btn-gold-lg{background:var(--gold);color:var(--navy);padding:16px 36px;border-radius:100px;font-size:16px;font-weight:700;letter-spacing:.02em;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;border:none;cursor:pointer;transition:background .2s,transform .2s,box-shadow .2s}
.btn-gold-lg:hover{background:var(--gold-h);transform:translateY(-2px);box-shadow:0 8px 28px rgba(227,174,100,.38)}
.btn-ghost{background:transparent;color:var(--white);padding:16px 36px;border-radius:100px;font-size:16px;font-weight:500;text-decoration:none;border:1px solid rgba(255,255,255,.18);cursor:pointer;transition:border-color .2s,background .2s;display:inline-flex;align-items:center;justify-content:center;gap:8px}
.btn-ghost:hover{border-color:rgba(255,255,255,.35);background:rgba(255,255,255,.05)}
.wow-btn-navy{display:inline-flex;align-items:center;gap:10px;background:var(--navy);color:var(--white);padding:20px 44px;border-radius:100px;font-size:17px;font-weight:700;text-decoration:none;transition:box-shadow .25s;will-change:transform;box-shadow:0 20px 50px -18px rgba(14,26,58,.55)}
.wow-btn-navy:hover{box-shadow:0 26px 60px -16px rgba(14,26,58,.7)}
```

La classe `.wow-magnet` sui bottoni attiva l'effetto magnetico (§10.15).

### 7.4 Footer

```html
<footer class="footer"><div class="foot-in">
  <div class="foot-brand">
    <a class="nav-logo" href="/"><img src="/logo.png" alt="Connessioni Pro" style="height:42px;width:auto"></a>
    <div class="foot-info">Il nuovo standard del networking professionale.</div>
    <div class="social-links">…IG…LinkedIn…</div>
  </div>
  <div class="foot-cols">
    <nav class="foot-col"><span class="foot-col-title">Esplora</span>
      <a href="/risorse">Risorse</a><a href="/manifesto">Manifesto</a><a href="/speaker">Diventa speaker</a></nav>
    <nav class="foot-col"><span class="foot-col-title">Legal</span>
      <a href="https://www.iubenda.com/privacy-policy/52848287">Privacy Policy</a>
      <a href="https://www.iubenda.com/privacy-policy/52848287/cookie-policy">Cookie Policy</a></nav>
  </div>
</div></footer>
```

```css
.footer{background:var(--navy-2);border-top:1px solid var(--border);padding:60px 48px 54px}
.foot-in{max-width:1200px;margin:0 auto;display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:48px}
.foot-brand{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:320px}
.foot-info{font-size:12.5px;color:var(--muted);line-height:1.7}
.foot-cols{display:flex;gap:72px;flex-wrap:wrap}
.foot-col{display:flex;flex-direction:column;gap:12px}
.foot-col-title{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:2px}
.foot-col a{font-size:13.5px;color:var(--muted);text-decoration:none;transition:color .2s}
.foot-col a:hover{color:var(--white)}
```

---

## 8. Sezioni — markup + CSS + copy

Wrapper della pagina:

```css
.wow-root{background:var(--navy);color:var(--white);overflow-x:clip;--nav-h:0px}
.wow-root ::selection{background:var(--gold);color:var(--navy)}
```

`--nav-h` viene impostata da JS all'altezza reale della `.nav` e usata da tutte le sezioni fullscreen (`height:calc(100vh - var(--nav-h))`) e come `start:"top {navH}"` dei pin.

### 8.1 Intro loader · `.wow-intro`

```html
<div class="wow-intro" aria-hidden="true"><div class="wow-intro-center">
  <svg class="wow-intro-oval" viewBox="0 0 220 100" fill="none">
    <rect x="9" y="9" width="202" height="82" rx="41" stroke="currentColor" stroke-width="10"
          pathLength="100" stroke-dasharray="100" stroke-dashoffset="100"/></svg>
  <div class="wow-intro-words">
    <span class="wow-intro-word">Relazioni.</span>
    <span class="wow-intro-word">Opportunità.</span>
    <span class="wow-intro-word">Valore.</span>
    <span class="wow-intro-word final">Connessioni <em>Pro</em></span>
  </div>
</div></div>
```

```css
.wow-intro{position:fixed;inset:0;z-index:950;background:#0a1430;display:flex;align-items:center;justify-content:center;will-change:transform;animation:wow-intro-safety 0s linear 5s forwards}
@keyframes wow-intro-safety{to{visibility:hidden}}   /* failsafe se il JS non parte */
.wow-intro-center{display:flex;flex-direction:column;align-items:center;gap:34px}
.wow-intro-oval{width:150px;color:var(--gold);will-change:transform}
.wow-intro-words{position:relative;height:46px;width:min(560px,86vw);overflow:hidden;text-align:center}
.wow-intro-word{position:absolute;inset:0;line-height:46px;font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(22px,3.2vw,34px);letter-spacing:-.02em;color:var(--white);will-change:transform}
.wow-intro-word em{font-style:normal;color:var(--gold)}
```

### 8.2 Hero · `.wow-hero`

```html
<section class="wow-hero">
  <canvas class="wow-net wow-net-hero" aria-hidden="true"></canvas>
  <div class="wow-hero-copy">
    <div class="wow-hero-eyebrow">{stadium svg} Il nuovo standard del networking</div>
    <h1 aria-label="Le opportunità esistono già. Noi le facciamo incontrare.">
      <span class="wow-line" aria-hidden="true"><span class="wow-line-inner">Le opportunità esistono già.</span></span>
      <span class="wow-line" aria-hidden="true"><span class="wow-line-inner serif">Noi le facciamo incontrare.</span></span>
    </h1>
    <p class="wow-hero-sub">Siamo l'infrastruttura che riduce lo spreco di opportunità e trasforma le relazioni in valore.</p>
    <div class="wow-hero-actions">
      <a class="btn-gold-lg" href="/10-settembre">Partecipa al prossimo evento</a>
      <a class="btn-ghost" href="#metodo">Scopri come funziona ↓</a>
    </div>
  </div>
  <div class="wow-portal">
    <video autoplay muted loop playsinline preload="metadata"><source src="/video-11-giugno-hero.mp4" type="video/mp4"></video>
    <div class="wow-portal-caption">
      <span>Connessioni Pro</span>
      <strong>Dove le persone giuste ti trovano. <span class="serif">E tu trovi loro.</span></strong>
    </div>
  </div>
  <div class="wow-scroll-hint">{stadium svg}Scorri</div>
</section>
```

```css
.wow-hero{position:relative;height:calc(100vh - var(--nav-h));min-height:640px;overflow:hidden}
.wow-hero-copy{position:absolute;left:0;right:0;top:12vh;z-index:3;display:flex;flex-direction:column;align-items:center;text-align:center;padding:0 24px;will-change:transform,opacity}
.wow-hero-eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:26px}
.wow-hero-eyebrow .wow-stadium{width:34px;height:auto}
.wow-hero-copy h1{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(38px,5.6vw,76px);line-height:1.02;letter-spacing:-.035em;margin-bottom:26px}
.wow-line{display:block;overflow:hidden;padding-bottom:.06em;margin-bottom:-.06em}   /* maschera per il reveal */
.wow-line-inner{display:inline-block;will-change:transform}
.wow-hero-copy h1 .serif{font-family:Gambetta,serif;font-style:italic;font-weight:700;color:var(--gold)}
.wow-hero-sub{font-size:clamp(16px,1.8vw,21px);font-weight:500;color:rgba(255,255,255,.72);max-width:560px;line-height:1.55;margin-bottom:34px}
.wow-hero-actions{display:flex;gap:14px;flex-wrap:wrap;justify-content:center}

/* il "portale": finestra a pillola che si apre a tutto schermo scrollando */
.wow-portal{position:absolute;inset:0;z-index:2;clip-path:inset(77% 32% 5% 32% round 400px);will-change:clip-path;background:#060d20}
.wow-portal video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:brightness(.55) saturate(.85);transform:scale(1.28);will-change:transform}
.wow-portal-caption{position:absolute;inset:0;z-index:3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:0 24px;opacity:0;visibility:hidden}
.wow-portal-caption strong{display:block;max-width:1100px;font-family:Satoshi,sans-serif;font-weight:800;font-size:clamp(26px,4vw,50px);letter-spacing:-.025em;line-height:1.2}
.wow-portal-caption>span{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.65)}

.wow-scroll-hint{position:absolute;bottom:8.5%;left:50%;transform:translateX(-50%);z-index:4;display:flex;flex-direction:column;align-items:center;gap:16px;color:rgba(255,255,255,.6);font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase}
.wow-scroll-hint .wow-stadium{width:26px;transform:rotate(90deg);animation:wow-hint 2.2s ease-in-out infinite;color:var(--gold)}
@keyframes wow-hint{0%,100%{transform:rotate(90deg) scaleX(1)}50%{transform:rotate(90deg) scaleX(1.2)}}
```

### 8.3 Statement · `.wow-statement#metodo`

Copy (ogni parola in un `<span class="w">`, incluso lo split per il reveal a scrub):

> **Partiamo da una verità** — Ogni giorno milioni di opportunità muoiono prima di nascere. Non perché manchino le persone giuste, ma perché non sanno di esistere.

```css
.wow-statement{background:var(--white);color:var(--navy);padding:20vh 24px}
.wow-statement-in{max-width:980px;margin:0 auto}
.wow-statement p{font-family:Satoshi,sans-serif;font-weight:800;font-size:clamp(28px,4.4vw,58px);line-height:1.18;letter-spacing:-.03em}
.wow-statement .w{display:inline-block;margin-right:.24em}
.wow-statement .w.serif{font-family:Gambetta,serif;font-style:italic;font-weight:700;color:var(--gold)}
.wow-statement-kicker{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:34px}
.wow-statement-kicker:before{content:"";width:26px;height:1px;background:var(--gold)}
```

### 8.4 Problemi · `.wow-problems` (scroll orizzontale)

Pannello intro + 4 card. Copy:

| # | Titolo | Testo |
|---|---|---|
| intro | **Il nemico ha un nome: *l'eventismo.*** | Entri in una sala piena di persone, parli con tutti e con nessuno, torni a casa con una manciata di contatti e zero opportunità concrete. |
| 01 | Arrivi senza una direzione | Nessuno sa cosa stai cercando, quali problemi puoi risolvere o con chi vorresti entrare in contatto. |
| 02 | Parli con chi capita | La persona più utile per te potrebbe trovarsi a pochi metri, ma potreste non incontrarvi mai. |
| 03 | Scambi contatti senza contesto | Numeri di telefono e collegamenti LinkedIn si accumulano. Le opportunità concrete molto meno. |
| 04 | Dopo l'evento si spegne tutto | Passano alcuni giorni e non ricordi più perché avreste dovuto risentirvi. |

Hint intro: `Continua a scorrere →`

```css
.wow-problems{position:relative;background:var(--navy);overflow:hidden}
.wow-h-track{display:flex;align-items:stretch;height:calc(100vh - var(--nav-h));width:max-content;will-change:transform}
.wow-h-panel{width:44vw;min-width:420px;height:100%;display:flex;flex-direction:column;justify-content:center;padding:0 4vw;flex-shrink:0;position:relative}
.wow-h-panel.intro{width:58vw;min-width:460px}
.wow-h-panel.intro h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(38px,4.6vw,72px);letter-spacing:-.035em;line-height:1;margin-bottom:22px}
.wow-h-panel.intro p{font-size:17px;line-height:1.7;color:var(--muted);max-width:420px}
.wow-h-hint{margin-top:34px;display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.wow-hcard{border-left:1px solid rgba(255,255,255,.1)}
.wow-hcard .big-num{font-family:Gambetta,serif;font-style:italic;font-weight:700;font-size:clamp(110px,14vw,220px);line-height:1;color:transparent;-webkit-text-stroke:1.5px rgba(227,174,100,.55);margin-bottom:18px;will-change:transform}
.wow-hcard h3{font-family:Satoshi,sans-serif;font-weight:800;font-size:clamp(24px,2.4vw,36px);letter-spacing:-.02em;margin-bottom:14px}
.wow-hcard p{font-size:16px;line-height:1.7;color:var(--muted);max-width:380px}
.wow-hcard .wow-stadium{position:absolute;right:3vw;bottom:8vh;width:90px;color:rgba(255,255,255,.08)}
```

### 8.5 Marquee · `.wow-marquee`

Riga 1 (`.r1`): `Profilazione`(fill) · `Matching` · `Introduzione`(gold) · `Conversazione` · `Profilazione`(fill) · `Matching`
Riga 2 (`.r2.alt`): `Contesto` · `Rilevanza`(gold) · `Fiducia`(fill) · `Contesto` · `Rilevanza`(gold) · `Fiducia`
Tra ogni parola uno stadium SVG con classe `wow-squash`.

```css
.wow-marquee{background:var(--navy);padding:10vh 0 12vh;overflow:hidden;border-top:1px solid rgba(255,255,255,.06)}
.wow-marquee-row{display:flex;align-items:center;gap:3.2vw;width:max-content;will-change:transform;padding:2.4vh 0}
.wow-marquee-row span{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(30px,4.6vw,68px);letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap;color:transparent;-webkit-text-stroke:1.2px rgba(255,255,255,.35)}
.wow-marquee-row span.fill{color:var(--white);-webkit-text-stroke:0}
.wow-marquee-row span.gold{color:var(--gold);-webkit-text-stroke:0}
.wow-marquee-row .wow-stadium{width:clamp(60px,7vw,110px);flex-shrink:0;color:var(--gold)}
.wow-marquee-row.alt .wow-stadium{color:rgba(255,255,255,.4)}
```

### 8.6 App / Come funziona · `.wow-app`

Eyebrow `Come funziona`, H2 `Abbiamo tolto il caso<br><span class="serif">dalla stanza.</span>`

| Step | Titolo | Testo |
|---|---|---|
| 01 · Profilazione | Ci racconti cosa stai cercando | Cosa fai, cosa stai cercando, cosa puoi offrire. Bastano pochi minuti. |
| 02 · Matching | Individuiamo i partecipanti più rilevanti | Incrociamo obiettivi, bisogni e competenze: saprai chi incontrare e perché dovreste parlarvi. |
| 03 · Introduzione | Facilitiamo l'incontro dal vivo | Niente più «da chi comincio?»: ti aiutiamo a riconoscere e raggiungere i tuoi match. |

Chip flottanti: `.c1` → `<b>94%</b> match` · `.c2` → `Intro richiesta ✓` · `.c3` → `Giulia ↔ Luca`

Mockup telefono, 3 schermate affiancate (`.wow-phone-screens` largo 300%):

1. **Connessioni Pro** → label `Il tuo match score` → anello SVG 120×120 (`r=51`, stroke `#E3AE64`, `stroke-width=9`, `stroke-dasharray=320`, `stroke-dashoffset=96`) con `72%` al centro → label `Match consigliati` → Giulia R. *Founder · SaaS B2B* 94% (avatar `#6C63FF`), Luca B. *CEO · Manifattura* 87% (avatar `#E3AE64`, badge `.blue`)
2. **I tuoi match** → `Questa sera · 4 match` → Giulia 94%, Luca 87%, Sara M. *CMO · Retail* 81% (`#2DD4BF`), Francesco T. *Investor · Fintech* 76% (`#F472B6`, `.blue`)
3. **Profilo match** → detail card Giulia R. 94% match → label `Perché vi matchate` → tag `Scalabilità` `B2B Sales` `Team building` → CTA `Richiedi intro`

```css
.wow-app{background:var(--white);color:var(--navy);overflow:hidden}
.wow-app-stage{height:calc(100vh - var(--nav-h));min-height:640px;max-width:1240px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.wow-app-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:20px}
.wow-app-eyebrow:before{content:"";width:26px;height:1px;background:var(--gold)}
.wow-app-copy h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(32px,3.6vw,54px);letter-spacing:-.03em;line-height:1.04;margin-bottom:46px}
.wow-app-steps{position:relative;min-height:190px}
.wow-app-step{position:absolute;top:0;left:0;right:0}
.wow-app-step-num{font-family:Gambetta,serif;font-style:italic;font-weight:700;font-size:15px;color:var(--gold);margin-bottom:10px}
.wow-app-step h3{font-family:Satoshi,sans-serif;font-weight:800;font-size:clamp(22px,2.2vw,30px);letter-spacing:-.02em;margin-bottom:12px}
.wow-app-step p{font-size:16px;line-height:1.7;color:var(--muted-d);max-width:400px}
.wow-app-progress{display:flex;gap:8px;margin-top:150px}
.wow-app-dot{width:26px;height:10px;border-radius:100px;border:1.5px solid rgba(14,26,58,.25);transition:all .3s}
.wow-app-dot.on{background:var(--gold);border-color:var(--gold);width:44px}

.wow-phone-wrap{position:relative;perspective:1400px;display:flex;justify-content:center;align-items:center}
.wow-phone{width:292px;height:596px;border-radius:48px;background:linear-gradient(160deg,#1a2950,#0a1430);border:1.5px solid rgba(255,255,255,.18);box-shadow:0 60px 120px -30px rgba(14,26,58,.5),0 30px 60px -30px rgba(14,26,58,.4);padding:12px;position:relative;transform-style:preserve-3d;will-change:transform}
.wow-phone:after{content:"";position:absolute;inset:0;border-radius:48px;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.07) 45%,transparent 60%);pointer-events:none}
.wow-phone-notch{position:absolute;top:22px;left:50%;transform:translateX(-50%);width:90px;height:24px;border-radius:100px;background:#060d20;z-index:5}
.wow-phone-screen{width:100%;height:100%;border-radius:38px;overflow:hidden;background:#0b1531;position:relative}
.wow-phone-screens{display:flex;width:300%;height:100%;will-change:transform}
.wow-screen{width:33.3333%;height:100%;flex-shrink:0;padding:58px 18px 18px;display:flex;flex-direction:column;gap:12px;color:var(--white)}
.wow-screen-title{font-size:16px;font-weight:800;letter-spacing:-.01em}
.wow-screen-label{font-size:9.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.wow-score-wrap{display:flex;justify-content:center;padding:10px 0 4px}
.wow-score{position:relative;width:120px;height:120px}
.wow-score svg{width:100%;height:100%;transform:rotate(-90deg)}
.wow-score-num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:26px;font-weight:900;color:var(--gold)}
.wow-match{display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:10px 12px}
.wow-match-avatar{width:34px;height:34px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:800}
.wow-match-info{flex:1;min-width:0}
.wow-match-name{font-size:12.5px;font-weight:700}
.wow-match-role{font-size:10.5px;color:rgba(255,255,255,.5)}
.wow-match-pct{font-size:11px;font-weight:800;color:#2ec464;background:rgba(46,196,100,.12);border-radius:100px;padding:3px 9px}
.wow-match-pct.blue{color:#7aa7ff;background:rgba(122,167,255,.12)}
.wow-detail-card{background:rgba(227,174,100,.1);border:1px solid rgba(227,174,100,.3);border-radius:18px;padding:18px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.wow-detail-avatar{width:52px;height:52px;border-radius:50%;background:#6C63FF;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;margin-bottom:4px}
.wow-detail-name{font-size:15px;font-weight:800}
.wow-detail-role{font-size:11px;color:rgba(255,255,255,.55)}
.wow-tags{display:flex;flex-wrap:wrap;gap:6px}
.wow-tag{font-size:10px;font-weight:700;color:var(--gold);border:1px solid rgba(227,174,100,.35);border-radius:100px;padding:4px 10px}
.wow-screen-cta{margin-top:auto;background:var(--gold);color:var(--navy);font-size:12.5px;font-weight:800;text-align:center;border-radius:100px;padding:12px}

.wow-chip{position:absolute;z-index:5;background:var(--white);color:var(--navy);font-size:12.5px;font-weight:700;padding:11px 18px;border-radius:100px;border:1px solid rgba(14,26,58,.08);box-shadow:0 20px 44px -14px rgba(14,26,58,.4);will-change:transform}
.wow-chip b{color:#1f9d55;margin-right:2px}
.wow-chip.c1{top:18%;left:2%}
.wow-chip.c2{bottom:20%;right:3%}
.wow-chip.c3{top:7%;right:9%}
@media (max-width:640px){.wow-chip{display:none}}
```

### 8.7 Stack card sticky · `.wow-stack`

H2: `Un evento progettato per ottenere contenuto, confronto e <span class="serif">networking di precisione.</span>` · sub `Ogni momento ha una funzione precisa.`

| # | Titolo | Testo | Sfondo |
|---|---|---|---|
| 01 | Apprendi qualcosa di applicabile | Speaker, imprenditori e professionisti condividono metodi, esperienze e strumenti utilizzabili nel lavoro e nell'impresa. | `/foto-sponsor-&plus/101.jpg` |
| 02 | Incontri i match suggeriti | Il networking viene attivato e guidato per aiutarti a iniziare le conversazioni più rilevanti. | `/preview-evento.jpg` |
| 03 | Approfondisci liberamente | Durante l'aperitivo puoi continuare le conversazioni, conoscere altri partecipanti e sviluppare le connessioni nate durante il matching. | *card oro, nessuna immagine* |

Foot: `Meno tempo speso a capire con chi parlare. <span class="serif">Più tempo dedicato alle conversazioni che contano.</span>`

```css
.wow-stack{background:var(--navy);padding:14vh 24px 16vh}
.wow-stack-head{max-width:780px;margin:0 auto 9vh;text-align:center}
.wow-stack-head h2{font-family:Satoshi,sans-serif;font-weight:800;font-size:clamp(26px,3.6vw,46px);letter-spacing:-.02em;line-height:1.2}
.wow-stack-head p{margin-top:18px;font-size:17px;color:var(--muted)}
.wow-stack-cards{max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:6vh}
.wow-stack-card{display:flex;flex-direction:column;position:sticky;top:12vh;height:76vh;min-height:480px;border-radius:30px;overflow:hidden;justify-content:flex-end;padding:48px;isolation:isolate;will-change:transform,filter;border:1px solid rgba(255,255,255,.1)}
.wow-stack-card .bg{position:absolute;inset:0;z-index:-2;background-size:cover;background-position:50%}
.wow-stack-card .shade{position:absolute;inset:0;z-index:-1;background:linear-gradient(0deg,rgba(8,15,34,.92) 0,rgba(8,15,34,.35) 55%,rgba(8,15,34,.25))}
.wow-stack-card.gold-card{background:var(--gold);color:var(--navy)}
.wow-stack-card.gold-card .shade{display:none}
.wow-stack-card h3{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(30px,4vw,56px);letter-spacing:-.03em;line-height:1;margin-bottom:16px;max-width:640px}
.wow-stack-card p{font-size:16.5px;line-height:1.65;max-width:520px;color:rgba(255,255,255,.8)}
.wow-stack-card.gold-card p{color:rgba(14,26,58,.75)}
.wow-stack-num{position:absolute;top:36px;right:44px;font-family:Gambetta,serif;font-style:italic;font-weight:700;font-size:clamp(60px,8vw,120px);line-height:1;color:transparent;-webkit-text-stroke:1.5px rgba(255,255,255,.4)}
.wow-stack-card.gold-card .wow-stack-num{-webkit-text-stroke-color:rgba(14,26,58,.4)}
.wow-stack-foot{max-width:640px;margin:10vh auto 0;text-align:center;font-size:clamp(18px,2vw,24px);font-weight:600;line-height:1.5;color:rgba(255,255,255,.75)}
```

### 8.8 Live / Track · `.wow-live`

H2: `Un progetto ambizioso. <span class="serif">Già in movimento.</span>`
Griglia di 8 foto con `data-speed` (parallax): `0.6, 1.4, 0.9, 1.8, 1.2, 0.5, 1.6, 0.8`.
File: `/foto-sponsor-experientia/E24.jpg`, `/foto carosello/13.jpg`, `/foto-sponsor-ymetria/S1.jpg`, `/foto-sponsor-experientia/E28.jpg`, `/foto carosello/75.jpg`, `/foto carosello/79.jpg`, `/foto carosello/111.jpg`, `/foto carosello/C1.jpg`.
CTA: `Diventa partner →` → `/partnership`.
Contatori: **3** *Eventi realizzati a Milano* · **100** *Imprenditori a serata* · ***zero*** (in Gambetta italic oro, non animato) *Opportunità lasciate al caso*.

```css
.wow-live{background:var(--white);color:var(--navy);padding:18vh 40px;position:relative;overflow:hidden}
.wow-live-head{text-align:center;max-width:800px;margin:0 auto 8vh;position:relative;z-index:2}
.wow-live-head h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(36px,5vw,72px);letter-spacing:-.035em;line-height:1}
.wow-live-grid{max-width:1240px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);gap:22px;align-items:start}
.wow-live-img{border-radius:20px;overflow:hidden;will-change:transform;box-shadow:0 30px 60px -25px rgba(14,26,58,.35)}
.wow-live-img img{width:100%;height:100%;object-fit:cover;aspect-ratio:3/4}
.wow-live-img:nth-child(2n) img{aspect-ratio:4/5}
.wow-live-cta{text-align:center;margin:7vh 0 0}
.wow-live-counters{max-width:1100px;margin:12vh auto 0;display:grid;grid-template-columns:repeat(3,1fr);gap:30px;text-align:center}
.wow-counter-num{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(56px,7vw,110px);letter-spacing:-.04em;line-height:1;color:var(--navy)}
.wow-counter-num em{font-family:Gambetta,serif;font-style:italic;font-weight:700;color:var(--gold)}
.wow-counter-label{margin-top:8px;font-size:13px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-d)}
```

### 8.9 Track record · `.wow-rec`

Eyebrow `Track record` · H2 `I fatti prima delle parole.<br><span class="serif">Documentiamo.</span>` · sub `Ogni evento è filmato. Guarda com'è andata davvero.`

Dati (array `RECAPS` hardcoded nel componente):

```js
const RECAPS = [
  { num:'01', title:'20 Maggio', meta:'Milano',
    line:'Il primo evento. La prova che il sistema funziona.',
    poster:'/copertine-yt/thumb-20maggio.jpg', video:'kvbNrOIfuKs' },
  { num:'02', title:'11 Giugno', meta:'Milano · Randstad Box',
    line:'Il formato si consolida nella nuova casa di Connessioni Pro.',
    poster:'/copertine-yt/thumb-11giugno.jpg', video:'l6UUY0PUku0' },
  { num:'03', title:'8 Luglio', meta:'Milano · Randstad Box',
    line:"L'ultima edizione prima della pausa estiva.",
    poster:'/copertine-yt/thumb-8luglio.jpg', video:'wCPKpUjS1QE' },
];
```

Il click sul poster apre la lightbox:

```js
<iframe src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
  title={title}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
```

All'apertura il canvas network viene messo in pausa (`net.stop()`) e i domini `youtube.com` / `youtube-nocookie.com` vengono aggiunti a `window.cmp_block_ignoredomains` (whitelist Iubenda); alla chiusura il canvas riparte.

```css
.wow-rec{background:var(--navy);overflow:hidden}
.wow-rec-stage{height:calc(100vh - var(--nav-h));min-height:640px;max-width:1280px;margin:0 auto;padding:0 40px;display:grid;grid-template-columns:.85fr 1.15fr;gap:56px;align-items:center}
.wow-rec-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:20px}
.wow-rec-eyebrow:before{content:"";width:26px;height:1px;background:var(--gold)}
.wow-rec-copy h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(32px,3.8vw,56px);letter-spacing:-.03em;line-height:1.02}
.wow-rec-sub{margin-top:16px;font-size:16px;color:var(--muted)}
.wow-rec-list{margin-top:40px;display:flex;flex-direction:column;gap:10px}
.wow-rec-item{display:flex;align-items:flex-start;gap:16px;width:100%;padding:14px 18px;border-radius:16px;background:none;border:1px solid transparent;opacity:.4;font:inherit;text-align:left;color:inherit;cursor:pointer;transition:opacity .35s,background .35s,border-color .35s,transform .35s}
.wow-rec-item:hover{opacity:.7}
.wow-rec-item:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.wow-rec-item.on{opacity:1;background:rgba(255,255,255,.04);border-color:rgba(227,174,100,.35);transform:translateX(6px)}
.wow-rec-item-num{font-family:Gambetta,serif;font-style:italic;font-weight:700;font-size:20px;color:var(--gold);line-height:1.3}
.wow-rec-item strong{display:block;font-size:16.5px;font-weight:800;letter-spacing:-.01em}
.wow-rec-item em{display:block;font-style:normal;font-size:13px;color:var(--muted);margin-top:3px;line-height:1.5}
.wow-rec-screenwrap{perspective:1300px}
.wow-rec-screen{position:relative;aspect-ratio:16/10;border-radius:26px;overflow:hidden;background:#0a1430;border:1px solid rgba(255,255,255,.12);box-shadow:0 60px 120px -40px rgba(0,0,0,.6);transform-style:preserve-3d;will-change:transform}
.wow-rec-poster{position:absolute;inset:0;margin:0;will-change:transform,opacity}
.wow-rec-poster img{width:100%;height:100%;object-fit:cover}
.wow-rec-poster-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,15,34,.8) 0,rgba(8,15,34,.1) 45%,rgba(8,15,34,.15))}
.wow-rec-poster figcaption{position:absolute;left:22px;bottom:18px;font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--white)}
.wow-rec-poster figcaption span{font-family:Gambetta,serif;font-style:italic;color:var(--gold);margin-right:6px}
.wow-rec-play{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:none;border:none;cursor:pointer}
.wow-rec-play-btn{display:inline-flex;align-items:center;gap:13px;font-size:13.5px;font-weight:800;letter-spacing:.03em;color:var(--navy);background:var(--gold);border-radius:100px;padding:12px 26px 12px 12px;box-shadow:0 18px 44px -12px rgba(0,0,0,.55);transition:transform .3s cubic-bezier(.2,.8,.3,1),background .25s,box-shadow .3s}
.wow-rec-play:hover .wow-rec-play-btn{transform:scale(1.06);background:var(--gold-h);box-shadow:0 24px 54px -12px rgba(0,0,0,.6)}
.wow-rec-play-ico{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:50%;flex-shrink:0;background:var(--navy);color:var(--gold);font-size:12px;padding-left:2px}
.wow-rec-soon{position:absolute;top:18px;right:18px;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);border:1px solid rgba(227,174,100,.5);background:rgba(14,26,58,.55);border-radius:100px;padding:7px 14px}

.wow-lightbox{position:fixed;inset:0;z-index:1000;background:rgba(6,11,26,.88);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:24px;animation:wow-lb-in .25s ease both}
@keyframes wow-lb-in{from{opacity:0}to{opacity:1}}
.wow-lightbox-frame{position:relative;width:min(1100px,96vw);aspect-ratio:16/9;background:#000;border-radius:18px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.65);animation:wow-lb-pop .32s cubic-bezier(.2,.8,.3,1) both}
@keyframes wow-lb-pop{from{opacity:0;transform:translateY(24px) scale(.95)}to{opacity:1;transform:none}}
.wow-lightbox-frame iframe{width:100%;height:100%;border:0;display:block}
.wow-lightbox-close{position:absolute;top:12px;right:12px;z-index:2;width:42px;height:42px;border-radius:50%;background:rgba(14,26,58,.75);color:var(--white);border:1px solid rgba(255,255,255,.25);font-size:24px;line-height:1;cursor:pointer;transition:background .2s}
.wow-lightbox-close:hover{background:rgba(14,26,58,.95)}
```

### 8.10 Prossimo evento · `.wow-next`

Big date decorativa `10·09` · eyebrow `Prossimo evento` · H2 `Milano, <span class="serif">10 settembre.</span>`
Meta pills: `Randstad Box` · `Via S. Vigilio 5, Milano` · `ore 18:00` · `150 posti`
Countdown live a 4 celle (`data-cd="d|h|m|s"`, separatori `:` in Gambetta oro), label `giorni / ore / minuti / secondi`.
Speaker: **Danilo Zanni** — *Consulente finanziario indipendente* — «Meno costi, più controllo: la consulenza finanziaria senza conflitti d'interesse» · **Giordano Guerrini** — *Co-Founder Finera* — «Bandi, export e finanza agevolata: i soldi che non sai di poter recuperare».
CTA `Prendi il tuo posto →` → `/10-settembre`, nota `Giovedì 10 Settembre 2026 · Randstad Box`.

```css
.wow-next{background:var(--white);color:var(--navy);position:relative;overflow:hidden;padding:20vh 40px}
.wow-next-bigdate{position:absolute;pointer-events:none;top:2vh;left:-4%;font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(160px,26vw,420px);line-height:1;white-space:nowrap;color:transparent;-webkit-text-stroke:1.5px rgba(14,26,58,.1);will-change:transform}
.wow-next-ring{position:absolute;pointer-events:none;top:55%;right:-14%;width:min(56vw,860px);transform:translateY(-50%);color:rgba(227,174,100,.3);will-change:transform,opacity}
.wow-next-in{position:relative;z-index:2;max-width:1100px;margin:0 auto}
.wow-next-eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:20px}
.wow-next-eyebrow:before{content:"";width:26px;height:1px;background:var(--gold)}
.wow-next-in h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(40px,6.4vw,92px);letter-spacing:-.04em;line-height:.98}
.wow-next-meta{display:flex;flex-wrap:wrap;gap:10px;margin:28px 0 46px}
.wow-next-meta span{font-size:12.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(14,26,58,.18);border-radius:100px;padding:9px 18px}
.wow-next-countdown{display:flex;align-items:flex-start;gap:clamp(10px,2vw,26px);margin-bottom:54px}
.wow-cd-cell{text-align:center}
.wow-cd-cell b{display:block;font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(46px,7vw,100px);line-height:1;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.wow-cd-cell span{display:block;margin-top:8px;font-size:10.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--muted-d)}
.wow-cd-sep{font-family:Gambetta,serif;font-style:italic;font-weight:700;font-size:clamp(30px,4.6vw,64px);line-height:1.15;color:var(--gold)}
.wow-next-speakers{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:50px}
.wow-next-speaker{display:flex;gap:18px;align-items:center;border:1px solid var(--border-d);border-radius:20px;background:var(--off);padding:20px 22px}
.wow-next-speaker img{width:74px;height:74px;border-radius:50%;object-fit:cover;border:2px solid var(--gold);flex-shrink:0}
.wow-next-speaker strong{display:block;font-size:17px;font-weight:800;letter-spacing:-.01em}
.wow-next-speaker span{display:block;font-size:12.5px;color:var(--muted-d);margin-top:2px}
.wow-next-speaker em{display:block;font-family:Gambetta,serif;font-style:italic;font-size:13.5px;color:rgba(14,26,58,.8);margin-top:6px;line-height:1.45}
.wow-next-actions{display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.wow-next-note{font-size:13px;color:var(--muted-d)}
```

### 8.11 Filosofia · `.wow-philosophy`

Kicker `La nostra filosofia`. Quote (split per parola in `<span class="w">`, le 5 parole «Che cosa potremmo costruire insieme?» in `.w.serif`):

> Quando smetti di chiederti «Cosa posso ottenere da questa persona?» e inizi a domandarti «Che cosa potremmo costruire insieme?», il networking cambia completamente.

Story: *In un famoso esperimento, ogni persona deve ritrovare il palloncino col proprio nome in una stanza caotica: **quasi nessuno ci riesce**. Poi le regole cambiano: ognuno raccoglie un palloncino a caso e lo porta al proprietario. In pochi minuti, tutti hanno il proprio. La maggior parte degli eventi parte da "come trovo clienti?". Noi partiamo da **"chi posso aiutare?"***

```css
.wow-philosophy{background:var(--navy);position:relative;overflow:hidden;padding:20vh 24px}
.wow-net{position:absolute;inset:0;width:100%;height:100%;z-index:0;pointer-events:none}
.wow-net-hero{z-index:1;will-change:opacity}
.wow-philosophy-in{max-width:900px;margin:0 auto;position:relative;z-index:2;text-align:center}
.wow-philosophy-kicker{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:30px}
.wow-philosophy-quote{font-family:Gambetta,serif;font-style:italic;font-weight:600;font-size:clamp(28px,4.2vw,54px);line-height:1.25;letter-spacing:-.015em;margin-bottom:40px}
.wow-philosophy-quote .w{display:inline-block;margin-right:.22em}
.wow-philosophy-story{font-size:16.5px;line-height:1.8;color:var(--muted);max-width:640px;margin:0 auto}
.wow-philosophy-story strong{color:var(--white)}
```

### 8.12 CTA finale · `.wow-cta`

H2 `Le persone giuste ci sono.<br><span class="serif">Noi creiamo le condizioni per incontrarle.</span>`
P `Il prossimo evento Connessioni Pro ti aspetta a Milano.`
CTA navy `Partecipa al prossimo evento →` → `/10-settembre`; sub-link `Oppure diventa Ambassador` → `/ambassador`.

```css
.wow-cta{background:var(--gold);color:var(--navy);position:relative;overflow:hidden;min-height:92vh;display:flex;align-items:center;justify-content:center;padding:16vh 24px;perspective:1100px}
.wow-cta-stadium{position:absolute;top:50%;left:50%;width:min(120vw,1500px);transform:translate(-50%,-50%);color:rgba(14,26,58,.14);will-change:transform;pointer-events:none}
.wow-cta-in{position:relative;z-index:2;text-align:center;max-width:1300px}
.wow-cta-in h2{font-family:Satoshi,sans-serif;font-weight:900;font-size:clamp(30px,4.6vw,62px);letter-spacing:-.03em;line-height:1.08;margin-bottom:24px}
.wow-cta-in h2 .serif{font-family:Gambetta,serif;font-style:italic;font-weight:700}  /* niente colore: resta navy */
.wow-cta-in p{font-size:18px;color:rgba(14,26,58,.65);margin-bottom:44px}
.wow-cta-sub{margin-top:22px;font-size:13px}
.wow-cta-sub a{color:rgba(14,26,58,.6);font-weight:600}
```

### 8.13 Rail + cursore custom

```css
.wow-rail{position:fixed;right:26px;top:50%;transform:translateY(-50%);height:130px;width:2px;border-radius:2px;background:rgba(130,140,165,.3);z-index:400}
.wow-rail-thumb{position:absolute;left:50%;top:0;width:20px;margin-left:-10px;margin-top:-5px;transform:rotate(90deg);color:var(--gold)}
@media (max-width:980px){.wow-rail{display:none}}

.wow-cursor{position:fixed;top:0;left:0;z-index:900;width:44px;margin-left:-22px;margin-top:-10px;pointer-events:none;color:var(--gold);opacity:0;transition:opacity .35s ease;will-change:transform}
.wow-cursor.live{opacity:.85}
.wow-cursor .wow-stadium{transition:transform .3s ease}
.wow-cursor.hover .wow-stadium{transform:scale(1.8)}
@media (pointer:coarse){.wow-cursor{display:none}}
```

---

## 9. Canvas "network" (hero + filosofia)

Particelle collegate con reazione al mouse, disegnato a mano su `<canvas>`.

```js
function createNet(canvas){
  const ctx = canvas.getContext('2d'); if(!ctx) return null;
  let W=0,H=0, parts=[], mouse={x:-1e4,y:-1e4};

  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    canvas.width = W*dpr; canvas.height = H*dpr;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    if (parts.length === 0) {
      parts = Array.from({length: Math.min(90, Math.floor(W*H/13000))}, () => ({
        x: Math.random()*W, y: Math.random()*H,
        vx:(Math.random()-.5)*.5, vy:(Math.random()-.5)*.5,
        r: 1.4 + Math.random()*1.6,
        gold: Math.random() < .18,
      }));
    }
  };

  const draw = () => {
    ctx.clearRect(0,0,W,H);
    for (const p of parts){
      p.x += p.vx; p.y += p.vy;
      if (p.x<0 || p.x>W) p.vx *= -1;
      if (p.y<0 || p.y>H) p.vy *= -1;
    }
    // linee particella-particella entro 130px
    for (let i=0;i<parts.length;i++) for (let j=i+1;j<parts.length;j++){
      const a=parts[i], b=parts[j], d=Math.hypot(a.x-b.x, a.y-b.y);
      if (d < 130){
        ctx.strokeStyle = `rgba(255,255,255,${(1-d/130)*0.14})`;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
      }
    }
    // linee verso il mouse entro 190px + nodi
    for (const p of parts){
      const d = Math.hypot(p.x-mouse.x, p.y-mouse.y);
      if (d < 190){
        ctx.strokeStyle = `rgba(227,174,100,${(1-d/190)*0.55})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(mouse.x,mouse.y); ctx.stroke();
      }
      if (p.gold){                       // nodo "stadium" oro
        ctx.strokeStyle='rgba(227,174,100,.75)'; ctx.lineWidth=1.6; ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(p.x-6,p.y-3,12,6,3) : ctx.arc(p.x,p.y,3.4,0,Math.PI*2);
        ctx.stroke();
      } else {                            // nodo tondo bianco
        ctx.fillStyle='rgba(255,255,255,.55)'; ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill();
      }
    }
  };

  let running=false;
  const loop = () => { if(running){ draw(); requestAnimationFrame(loop); } };
  const onMove = e => { if(!running) return; const r=canvas.getBoundingClientRect();
                        mouse.x=e.clientX-r.left; mouse.y=e.clientY-r.top; };
  window.addEventListener('mousemove', onMove);
  window.addEventListener('resize', resize);
  resize();
  return { drawOnce: draw,
           start(){ if(!running){ running=true; loop(); } },
           stop(){ running=false; },
           cleanup(){ running=false;
             window.removeEventListener('mousemove', onMove);
             window.removeEventListener('resize', resize); } };
}
```

Ogni canvas parte/si ferma tramite un `ScrollTrigger` sulla propria sezione:

```js
ScrollTrigger.create({ trigger: heroEl, start:'top bottom', end:'bottom top',
  onToggle: self => self.isActive ? net.start() : net.stop() });
```

---

## 10. Motore di animazione (GSAP + ScrollTrigger + Lenis)

Tutta la logica vive in un unico `useEffect` client-side dentro un `gsap.context()`.

### 10.0 Bootstrap

```js
const navH  = () => document.querySelector('.nav')?.getBoundingClientRect().height ?? 0;
const START = () => `top ${navH()}`;                       // start comune dei pin
root.style.setProperty('--nav-h', `${navH()}px`);

// Fallback statico: mobile/tablet oppure prefers-reduced-motion
if (isReducedMotion || isSmallScreen) {
  root.classList.add('wow-static');
  root.querySelectorAll('.wow-count').forEach(el => el.textContent = el.dataset.count);
  [heroCanvas, philoCanvas].map(createNet).forEach(n => n?.drawOnce());
  return;                                                  // niente ScrollTrigger
}

gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.15 });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
ScrollTrigger.addEventListener('refresh', () => lenis.resize());
ScrollTrigger.refresh();
```

### 10.1 Nav "scrolled"

```js
ScrollTrigger.create({ start: 60,
  onToggle: self => document.querySelector('.wow-nav')?.classList.toggle('scrolled', self.isActive) });
```

### 10.2 Cursore custom

Attivo solo con `(pointer: fine)`. Segue il mouse con `gsap.quickTo` (x/y `.35s power3.out`), ruota nella direzione del movimento (`atan2`) e si allunga in base alla velocità:

```js
const qx = gsap.quickTo(cur,'x',{duration:.35,ease:'power3.out'});
const qy = gsap.quickTo(cur,'y',{duration:.35,ease:'power3.out'});
const qr = gsap.quickTo(cur,'rotation',{duration:.4,ease:'power2.out'});
const qs = gsap.quickTo(cur,'scaleX',{duration:.3,ease:'power2.out'});
let prev = {x:0,y:0,t:0};
window.addEventListener('mousemove', e => {
  cur.classList.add('live');
  const now = performance.now(), dt = Math.max(16, now-prev.t);
  const dx = e.clientX-prev.x, dy = e.clientY-prev.y;
  const v = Math.min(1, Math.hypot(dx,dy)/dt/1.4);
  qx(e.clientX); qy(e.clientY);
  if (Math.abs(dx)+Math.abs(dy) > 2) qr(Math.atan2(dy,dx)*180/Math.PI);
  qs(1 + v*0.9);
  prev = {x:e.clientX, y:e.clientY, t:now};
});
window.addEventListener('mouseover', e =>
  cur.classList.toggle('hover', !!e.target.closest('a, button')));
```

### 10.3 Intro loader → hero (timeline concatenate)

```js
// timeline hero, in pausa: parte quando l'intro esce
const heroTl = gsap.timeline({paused:true})
  .fromTo('.wow-line-inner', {yPercent:115},
          {yPercent:0, duration:1.1, ease:'power4.out', stagger:.14}, 0)
  .from(['.wow-hero-eyebrow','.wow-hero-sub','.wow-hero-actions'],
        {y:34, autoAlpha:0, duration:1, ease:'power3.out', stagger:.1}, 0.35);

const words = gsap.utils.toArray('.wow-intro-word');
gsap.set(words, {yPercent:130});
gsap.timeline()
  .to('.wow-intro-oval rect', {strokeDashoffset:0, duration:.75, ease:'power2.inOut'}, .1)
  .to(words[0], {yPercent:0,    duration:.30, ease:'power3.out'}, .45)
  .to(words[0], {yPercent:-130, duration:.24, ease:'power3.in'},  '+=0.22')
  .to(words[1], {yPercent:0,    duration:.30, ease:'power3.out'}, '-=0.05')
  .to(words[1], {yPercent:-130, duration:.24, ease:'power3.in'},  '+=0.22')
  .to(words[2], {yPercent:0,    duration:.30, ease:'power3.out'}, '-=0.05')
  .to(words[2], {yPercent:-130, duration:.24, ease:'power3.in'},  '+=0.22')
  .to(words[3], {yPercent:0,    duration:.34, ease:'power3.out'}, '-=0.05')
  .to('.wow-intro-oval', {scaleX:1.5, duration:.55, ease:'power2.inOut'}, '<')
  .to('.wow-intro', {yPercent:-100, duration:.65, ease:'power3.inOut'}, '+=0.4')
  .call(() => heroTl.play(), [], '-=0.45')
  .set('.wow-intro', {display:'none'});
```

### 10.4 Hero → portale video (pin, `+=190%`)

```js
gsap.timeline({ scrollTrigger:{ trigger:'.wow-hero', start:START(), end:'+=190%', scrub:.5, pin:true }})
  .to('.wow-hero-copy',   {y:-140, autoAlpha:0, duration:1}, 0)
  .to('.wow-scroll-hint', {autoAlpha:0, duration:.3}, 0)
  .to('.wow-net-hero',    {autoAlpha:0, duration:1.2}, 0)
  .fromTo('.wow-portal',
    { clipPath: window.innerWidth < 980
        ? 'inset(74% 18% 5% 18% round 300px)'
        : 'inset(70% 32% 6% 32% round 400px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration:2, ease:'power1.inOut' }, 0.15)
  .fromTo('.wow-portal video', {scale:1.28}, {scale:1, duration:2, ease:'power1.inOut'}, 0.15)
  .fromTo('.wow-portal-caption', {autoAlpha:0, y:60},
          {autoAlpha:1, y:0, duration:.7, ease:'power2.out'}, 1.75);
```

### 10.5 Reazione alla velocità di scroll (squash / skew)

```js
const squash = gsap.utils.toArray('.wow-squash').map(el => ({
  sx: gsap.quickTo(el,'scaleX',{duration:.35,ease:'power2.out'}),
  sy: gsap.quickTo(el,'scaleY',{duration:.35,ease:'power2.out'}),
}));
const imgs = gsap.utils.toArray('.wow-live-img').map(el => gsap.quickTo(el,'skewY',{duration:.4,ease:'power2.out'}));
const rows = gsap.utils.toArray('.wow-marquee-row').map(el => gsap.quickTo(el,'skewX',{duration:.4,ease:'power2.out'}));
const reset = gsap.delayedCall(.18, () => {
  squash.forEach(({sx,sy}) => { sx(1); sy(1); });
  imgs.forEach(f => f(0)); rows.forEach(f => f(0));
}).pause();

ScrollTrigger.create({ onUpdate: self => {
  const v = gsap.utils.clamp(-1, 1, self.getVelocity()/2600), a = Math.abs(v);
  squash.forEach(({sx,sy}) => { sx(1 + 0.45*a); sy(1 - 0.30*a); });
  imgs.forEach(f => f(-5*v));
  rows.forEach(f => f(-7*v));
  reset.restart(true);
}});
```

### 10.6 Statement — reveal parola per parola

```js
gsap.fromTo('.wow-statement .w', {opacity:.08},
  {opacity:1, ease:'none', stagger:.05,
   scrollTrigger:{trigger:'.wow-statement', start:'top 72%', end:'center 45%', scrub:true}});
```

### 10.7 Problemi — scroll orizzontale pinnato + parallax dei numeri

```js
const track = document.querySelector('.wow-h-track');
const hTween = gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth), ease:'none',
  scrollTrigger:{ trigger:'.wow-problems', start:START(),
    end: () => '+=' + (track.scrollWidth - window.innerWidth),
    scrub:1, pin:true, anticipatePin:1, invalidateOnRefresh:true }});

// numeri giganti in controparallasse dentro lo scroll orizzontale
gsap.utils.toArray('.wow-hcard .big-num').forEach(el =>
  gsap.fromTo(el, {xPercent:24}, {xPercent:-24, ease:'none',
    scrollTrigger:{ trigger:el, containerAnimation:hTween,
                    start:'left right', end:'right left', scrub:true }}));
```

### 10.8 Marquee (direzioni opposte)

```js
gsap.fromTo('.wow-marquee-row.r1', {xPercent:0},  {xPercent:-22, ease:'none',
  scrollTrigger:{trigger:'.wow-marquee', start:'top bottom', end:'bottom top', scrub:1}});
gsap.fromTo('.wow-marquee-row.r2', {xPercent:-22},{xPercent:0,   ease:'none',
  scrollTrigger:{trigger:'.wow-marquee', start:'top bottom', end:'bottom top', scrub:1}});
```

### 10.9 App — telefono 3D pinnato (`+=260%`)

```js
const steps = gsap.utils.toArray('.wow-app-step');
const dots  = gsap.utils.toArray('.wow-app-dot');
gsap.set(steps.slice(1), {autoAlpha:0, y:26});

gsap.timeline({ scrollTrigger:{ trigger:'.wow-app', start:START(), end:'+=260%', scrub:.6, pin:true,
  onUpdate: self => { const i = self.progress < .38 ? 0 : self.progress < .72 ? 1 : 2;
                      dots.forEach((d,k) => d.classList.toggle('on', k===i)); }}})
  .fromTo('.wow-phone', {rotationY:26, rotationX:8, y:40},
          {rotationY:-26, rotationX:8, y:-20, ease:'none', duration:3}, 0)
  .fromTo('.wow-score-arc', {strokeDashoffset:320},
          {strokeDashoffset:96, duration:.5, ease:'power2.out'}, 0.05)
  .to(steps[0], {autoAlpha:0, y:-26, duration:.28}, 0.86)
  .to('.wow-phone-screens', {xPercent:-33.3333, duration:.42, ease:'power2.inOut'}, 0.90)
  .to(steps[1], {autoAlpha:1, y:0,  duration:.28}, 1.06)
  .to(steps[1], {autoAlpha:0, y:-26,duration:.28}, 1.86)
  .to('.wow-phone-screens', {xPercent:-66.6666, duration:.42, ease:'power2.inOut'}, 1.90)
  .to(steps[2], {autoAlpha:1, y:0,  duration:.28}, 2.06)
  .to({}, {duration:.6});                 // coda per non tagliare l'uscita dal pin
```

### 10.10 Chip flottanti

```js
const chips = gsap.utils.toArray('.wow-chip');
chips.forEach((el,i) => gsap.to(el, {
  y: i%2===0 ? -10 : 10, rotation: i%2===0 ? 2.5 : -2.5,
  duration: 2.4 + i*0.5, yoyo:true, repeat:-1, ease:'sine.inOut' }));
gsap.from(chips, {autoAlpha:0, scale:.6, y:40, duration:.8, ease:'back.out(2)', stagger:.12,
  scrollTrigger:{trigger:'.wow-app', start:'top 45%'}});
```

### 10.11 Rail di progresso globale

```js
gsap.to('.wow-rail-thumb', {top:'100%', ease:'none',
  scrollTrigger:{start:0, end:'max', scrub:.4}});
```

### 10.12 Stack card impilate

Ogni card (tranne l'ultima) si rimpicciolisce e si scurisce quando arriva la successiva:

```js
const cards = gsap.utils.toArray('.wow-stack-card');
cards.forEach((card,i) => {
  if (i === cards.length-1) return;
  gsap.fromTo(card, {filter:'brightness(1)'},
    {scale:.93, filter:'brightness(.62)', transformOrigin:'center top', ease:'none',
     scrollTrigger:{trigger:cards[i+1], start:'top bottom', end:'top 18%', scrub:true}});
});
```

### 10.13 Live — parallax foto + contatori

```js
gsap.utils.toArray('.wow-live-img').forEach(el => {
  const s = parseFloat(el.dataset.speed || '1');
  gsap.fromTo(el, {y:70*s}, {y:-70*s, ease:'none',
    scrollTrigger:{trigger:'.wow-live', start:'top bottom', end:'bottom top', scrub:true}});
});

gsap.utils.toArray('.wow-count').forEach(el => {
  const target = parseInt(el.dataset.count || '0', 10);
  const obj = {v:0};
  gsap.to(obj, {v:target, duration:1.6, ease:'power2.out',
    scrollTrigger:{trigger:el, start:'top 88%'},
    onUpdate: () => el.textContent = String(Math.round(obj.v))});
});
```

### 10.14 Track record — schermo 3D pinnato (`+=240%`) + click-to-scroll

```js
const posters = gsap.utils.toArray('.wow-rec-poster');
const items   = gsap.utils.toArray('.wow-rec-item');
gsap.set(posters.slice(1), {autoAlpha:0, scale:1.08});

const recTl = gsap.timeline({ scrollTrigger:{ trigger:'.wow-rec', start:START(), end:'+=240%', scrub:.5, pin:true,
  onUpdate: self => { const i = self.progress < .38 ? 0 : self.progress < .72 ? 1 : 2;
                      items.forEach((el,k) => el.classList.toggle('on', k===i)); }}});
recTl.fromTo('.wow-rec-screen', {rotationY:7, rotationX:3},
             {rotationY:-7, rotationX:3, ease:'none', duration:3}, 0)
  .to(posters[0], {autoAlpha:0, scale:.95, duration:.35}, 0.95)
  .to(posters[1], {autoAlpha:1, scale:1,   duration:.35}, 1.10)
  .to(posters[1], {autoAlpha:0, scale:.95, duration:.35}, 1.95)
  .to(posters[2], {autoAlpha:1, scale:1,   duration:.35}, 2.10)
  .to({}, {duration:.5});

// cliccando una voce, Lenis scrolla al punto corrispondente della timeline
const MARKS = [0.15, 0.55, 0.88];
items.forEach((btn,i) => btn.addEventListener('click', () => {
  const st = recTl.scrollTrigger; if (!st) return;
  lenis.scrollTo(st.start + MARKS[i]*(st.end - st.start),
    { duration:1.1, easing: t => 1 - Math.pow(1-t, 3) });
}));
```

### 10.15 Next / Filosofia / CTA finale

```js
// big date in parallasse
gsap.fromTo('.wow-next-bigdate', {xPercent:12}, {xPercent:-12, ease:'none',
  scrollTrigger:{trigger:'.wow-next', start:'top bottom', end:'bottom top', scrub:1}});

// reveal a cascata dei blocchi
gsap.fromTo('.wow-next-reveal', {y:56, autoAlpha:0},
  {y:0, autoAlpha:1, duration:.9, ease:'power3.out', stagger:.12,
   scrollTrigger:{trigger:'.wow-next', start:'top 62%'}});

// anello che si allarga
gsap.fromTo('.wow-next-ring', {scaleX:.7, autoAlpha:0}, {scaleX:1, autoAlpha:1, ease:'none',
  scrollTrigger:{trigger:'.wow-next', start:'top 85%', end:'center center', scrub:true}});

// quote filosofia parola per parola
gsap.fromTo('.wow-philosophy-quote .w', {opacity:.1, yPercent:30},
  {opacity:1, yPercent:0, ease:'none', stagger:.06,
   scrollTrigger:{trigger:'.wow-philosophy', start:'top 65%', end:'center 45%', scrub:true}});

// stadium della CTA che si apre
gsap.fromTo('.wow-cta-stadium', {scaleX:.6, scaleY:1.1, autoAlpha:0},
  {scaleX:1, scaleY:1, autoAlpha:1, ease:'none',
   scrollTrigger:{trigger:'.wow-cta', start:'top 90%', end:'center center', scrub:true}});

// tilt 3D dello stadium al movimento del mouse dentro la CTA
const rx = gsap.quickTo(stadium,'rotationX',{duration:.6,ease:'power2.out'});
const ry = gsap.quickTo(stadium,'rotationY',{duration:.6,ease:'power2.out'});
ctaSection.addEventListener('mousemove', e => {
  const r = ctaSection.getBoundingClientRect();
  const px = (e.clientX-r.left)/r.width  - .5;
  const py = (e.clientY-r.top )/r.height - .5;
  ry(px*16); rx(-py*12);
});
ctaSection.addEventListener('mouseleave', () => { rx(0); ry(0); });

// bottoni magnetici (.wow-magnet): entro 180px seguono il cursore al 30%
gsap.utils.toArray('.wow-magnet').forEach(el => {
  const mx = gsap.quickTo(el,'x',{duration:.4,ease:'power3.out'});
  const my = gsap.quickTo(el,'y',{duration:.4,ease:'power3.out'});
  window.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const dx = e.clientX-(r.left+r.width/2), dy = e.clientY-(r.top+r.height/2);
    if (Math.hypot(dx,dy) < 180) { mx(dx*.3); my(dy*.3); } else { mx(0); my(0); }
  });
});
```

### 10.16 Countdown

Il componente riceve dal server l'oggetto evento; il target è `startISO`. Timer `setInterval(1000)` che scrive nelle 4 celle, zero-paddate a 2 cifre:

```js
const target = new Date(next.startISO).getTime();   // "2026-09-10T18:00:00+02:00"
const cell = k => root.querySelector(`[data-cd="${k}"]`);
const pad  = n => String(n).padStart(2,'0');
const tick = () => {
  const left = Math.max(0, target - Date.now());
  cell('d').textContent = pad(Math.floor(left / 86400000));
  cell('h').textContent = pad(Math.floor(left / 3600000) % 24);
  cell('m').textContent = pad(Math.floor(left / 60000) % 60);
  cell('s').textContent = pad(Math.floor(left / 1000) % 60);
};
tick(); const id = setInterval(tick, 1000);
```

Props evento complete (dal payload RSC):

```json
{ "startISO":"2026-09-10T18:00:00+02:00", "time":"ore 18:00", "city":"Milano",
  "venue":"Randstad Box", "address":"Via S. Vigilio 5, Milano",
  "speakers":[
    {"name":"Danilo Zanni","role":"Consulente finanziario indipendente",
     "talk":"Meno costi, più controllo: la consulenza finanziaria senza conflitti d'interesse",
     "photo":"/speaker-10-settembre/danilo-zanni.png"},
    {"name":"Giordano Guerrini","role":"Co-Founder Finera",
     "talk":"Bandi, export e finanza agevolata: i soldi che non sai di poter recuperare",
     "photo":"/speaker-10-settembre/giordano-guerrini.png"}]}
```

---

## 11. Responsive

### `@media (max-width:980px)` (pagina wow)

```css
.wow-app-copy h2{margin-bottom:28px}
.wow-phone{width:218px;height:446px;border-radius:38px;padding:9px}
.wow-phone-screen{border-radius:30px}
.wow-phone-notch{top:16px;width:68px;height:18px}
.wow-screen{padding:42px 12px 12px;gap:9px}
.wow-score{width:90px;height:90px}
.wow-live-grid{grid-template-columns:repeat(2,1fr);gap:14px}
.wow-live-counters{grid-template-columns:1fr;gap:40px;margin-top:10vh}
.wow-stack-card{padding:28px;height:70vh}
.wow-stack-num{top:20px;right:24px}
.wow-h-panel{width:86vw;min-width:0;padding:0 7vw}
.wow-h-panel.intro{width:92vw;min-width:0}
.wow-nav{padding:0 18px;height:62px}
.wow-portal{clip-path:inset(80% 18% 4% 18% round 300px)}
.wow-rec-stage{grid-template-columns:1fr;gap:26px;padding:0 24px;align-content:center}
.wow-rec-item{padding:10px 12px}
.wow-rec-item em{display:none}
.wow-next{padding:14vh 24px}
.wow-next-speakers{grid-template-columns:1fr}
.wow-next-countdown{gap:12px}
.wow-next-bigdate{top:1vh;font-size:clamp(70px,26vw,180px)}
.wow-cta{min-height:auto}
.wow-app-stage{grid-template-columns:1fr;gap:0;align-content:center;height:auto;min-height:0;padding:10vh 24px}
.wow-app-steps{min-height:0;display:flex;flex-direction:column;gap:30px}
.wow-app-step,.wow-app-steps{position:static}
.wow-app-progress{display:none}
```

### `@media (max-width:900px)` (chrome)

```css
.nav{padding:0 16px;height:58px}
.nav-links,.nav-loc,.nav-social{display:none}
.nav-burger{display:inline-flex}
.ann-bar{font-size:11.5px;padding:8px 16px;gap:8px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-wrap:nowrap}
.ann-bar .ann-pre,.ann-sep:first-of-type{display:none}
.btn-ghost,.btn-gold-lg{padding:14px 28px;font-size:15px}
.footer{padding:44px 20px calc(36px + env(safe-area-inset-bottom))}
.foot-in{flex-direction:column;align-items:center;text-align:center;gap:34px}
.foot-cols{width:100%;display:grid;grid-template-columns:1fr 1fr;gap:28px 20px;padding-top:30px;border-top:1px solid var(--border);text-align:left}
```

### Modalità statica `.wow-static`

Classe aggiunta dal JS su mobile / reduced-motion. Smonta tutte le sezioni pinnate in un layout verticale normale:

```css
.wow-static .wow-h-track{flex-wrap:wrap;height:auto;width:auto;padding:10vh 0}
.wow-static .wow-h-panel{height:auto;padding-top:5vh;padding-bottom:5vh}
.wow-static .wow-h-hint{display:none}
.wow-static .wow-app-stage{height:auto;min-height:0;padding-top:14vh;padding-bottom:10vh}
.wow-static .wow-app-steps{min-height:0;display:flex;flex-direction:column;gap:34px}
.wow-static .wow-app-step{position:static}
.wow-static .wow-app-progress,.wow-static .wow-cursor,.wow-static .wow-scroll-hint{display:none}
.wow-static .wow-intro{display:none;animation:none}
.wow-static .wow-chip,.wow-static .wow-rail{display:none}
.wow-static .wow-rec-stage{height:auto;min-height:0;grid-template-columns:1fr;padding:12vh 24px;gap:40px}
.wow-static .wow-rec-screen{aspect-ratio:auto;background:none;border:none;box-shadow:none;display:flex;flex-direction:column;gap:22px;overflow:visible}
.wow-static .wow-rec-poster{position:relative;aspect-ratio:16/10;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.12)}
.wow-static .wow-rec-list .wow-rec-item{opacity:1}
```

### `@media (prefers-reduced-motion:reduce)`

```css
.wow-intro,.wow-scroll-hint .wow-stadium{animation:none}
.wow-intro{display:none}
.wow-portal{clip-path:inset(58% 20% 12% 20% round 300px)}
html{scroll-behavior:auto}
```

---

## 12. Asset necessari

```
/logo.png
/favicon.png
/connessionipro-preview.jpg          (OG 1280×720)
/video-11-giugno-hero.mp4            (hero portal)
/preview-evento.jpg                  (stack card 02)
/foto-sponsor-&plus/101.jpg          (stack card 01)
/foto-sponsor-experientia/E24.jpg, E28.jpg
/foto-sponsor-ymetria/S1.jpg
/foto carosello/13.jpg, 75.jpg, 79.jpg, 111.jpg, C1.jpg     (nel codice: "/foto%20carosello/…")
/copertine-yt/thumb-20maggio.jpg, thumb-11giugno.jpg, thumb-8luglio.jpg
/speaker-10-settembre/danilo-zanni.png, giordano-guerrini.png
```

Rotte linkate: `/10-settembre`, `/10-settembre#biglietti`, `/8-luglio`, `/11-giugno`, `/20-maggio`, `/ambassador`, `/feedback`, `/partnership`, `/touchpoint-as-a-service`, `/risorse`, `/manifesto`, `/speaker`.
Social: `instagram.com/connessionipro/`, `linkedin.com/company/connessionipro/`.

---

## 13. Ordine di implementazione consigliato

1. Scaffold Next.js + CSS globale (token, reset, font, `.btn-*`, `.wow-stadium`).
2. Chrome statico: `.ann-bar`, `.nav` + dropdown + drawer mobile, `footer`.
3. Tutte le sezioni **senza animazioni**, in flusso verticale normale (equivale allo stato `.wow-static`). A questo punto la pagina deve già essere corretta su mobile.
4. Aggiungere Lenis + `gsap.context` + il gate `.wow-static`.
5. Animazioni nell'ordine: hero portal → statement → scroll orizzontale → marquee → app/telefono → stack → live → rec → next → philosophy → cta.
6. Canvas network, cursore custom, rail, magnetismo, countdown.
7. Verifica: `ScrollTrigger.refresh()` dopo il caricamento immagini, `will-change` già presente su tutti gli elementi animati, e controllo che i `+=190% / +=260% / +=240%` non si sovrappongano.

### Trappole note

- **Ordine dei pin**: hero (`+=190%`), problems (dinamico su `scrollWidth`), app (`+=260%`), rec (`+=240%`) sono tutti `pin:true` sullo stesso scroller. Servono `anticipatePin:1` e `invalidateOnRefresh:true` sullo scroll orizzontale, altrimenti al resize la lunghezza si disallinea.
- **`--nav-h`** va scritta prima di creare i trigger: tutti gli `start` sono `top {navH}`.
- **Lenis + ScrollTrigger**: agganciare `lenis.raf` al ticker GSAP e `gsap.ticker.lagSmoothing(0)`, altrimenti lo scrub sbanda.
- **`-webkit-text-stroke`** sui numeri giganti non ha fallback standard: su browser che non lo supportano il testo resta invisibile (`color:transparent`).
- **clip-path animata**: mantenere sempre la stessa forma (`inset(... round ...)`) nei due keyframe, altrimenti GSAP non interpola.
