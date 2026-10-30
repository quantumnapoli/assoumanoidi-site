# Effetto di sfondo dell’hero — Google Antigravity

Specifica per ricreare il background atmosferico e il visual sospeso dell’hero di [antigravity.google](https://antigravity.google/).

## Obiettivo visivo

Lo sfondo deve evocare:

- assenza di gravità;
- profondità spaziale e movimento lento;
- un’interfaccia tecnologica, ma non una dashboard;
- un visual principale sospeso, con particelle o bagliori molto discreti;
- contrasto sufficiente per mantenere leggibile il titolo in primo piano.

Il risultato deve sembrare una scena immersiva e leggera, non un semplice `background-image` statico.

## Layer della scena

```text
Layer 0 — colore base / gradiente scuro
Layer 1 — alone radiale diffuso
Layer 2 — grana o noise quasi invisibile
Layer 3 — particelle e piccoli bagliori
Layer 4 — visual principale antigravity-cursor.png
Layer 5 — testo e CTA
```

Asset principale osservato:

```text
https://antigravity.google/assets/image/antigravity-cursor.png
```

Il visual va posizionato in assoluto, senza occupare spazio nel layout:

```css
.hero-background {
  position: absolute;
  inset: 0;
  overflow: clip;
  isolation: isolate;
  pointer-events: none;
}

.hero-background__cursor {
  position: absolute;
  z-index: 3;
  top: 8%;
  right: 4%;
  width: min(64vw, 920px);
  max-height: 84svh;
  object-fit: contain;
  transform: translate3d(0, 0, 0);
  will-change: transform;
}
```

## Base cromatica

Usare un fondo scuro, profondo e leggermente freddo. Il gradiente deve evitare bordi riconoscibili e concentrare la luminosità intorno al visual.

```css
.hero-background {
  background:
    radial-gradient(
      ellipse at 68% 42%,
      rgba(82, 102, 150, 0.26) 0%,
      rgba(37, 48, 80, 0.16) 28%,
      transparent 62%
    ),
    radial-gradient(
      ellipse at 18% 78%,
      rgba(110, 71, 145, 0.12) 0%,
      transparent 46%
    ),
    #090b12;
}
```

Regole:

- il copy deve avere contrasto almeno WCAG AA;
- l’alone non deve trasformarsi in un punto luminoso dietro ogni riga di testo;
- evitare gradienti troppo saturi o colori neon ovunque;
- usare opacity bassa e più layer sovrapposti invece di un singolo effetto aggressivo.

## Atmosfera e profondità

### Alone morbido

```css
.hero-background::before {
  content: "";
  position: absolute;
  z-index: 1;
  inset: -20%;
  background: radial-gradient(
    circle at 68% 42%,
    rgba(160, 185, 255, 0.15),
    transparent 32%
  );
  filter: blur(42px);
  opacity: 0.75;
  transform: translateZ(0);
}
```

### Noise leggero

Il noise serve a evitare un gradiente digitale troppo perfetto. Deve essere quasi impercettibile.

```css
.hero-background::after {
  content: "";
  position: absolute;
  z-index: 6;
  inset: 0;
  opacity: 0.035;
  pointer-events: none;
  background-image: url("/textures/noise.png");
  background-repeat: repeat;
  mix-blend-mode: soft-light;
}
```

Se non esiste un asset noise locale, sostituirlo con un SVG inline molto piccolo o rimuoverlo: non usare un’immagine pesante solo per la grana.

## Particelle

Le particelle devono funzionare come profondità ambientale, non come decorazione dominante.

Parametri consigliati:

- quantità desktop: `24–48` elementi;
- quantità mobile: `8–16` elementi;
- diametro: `1–3px`;
- opacity: `0.08–0.35`;
- blur casuale: `0–4px`;
- movimento verticale: `8–28px`;
- durata: `6–18s`;
- delay casuale negativo per evitare un avvio sincronizzato.

Markup:

```html
<div class="hero-background" aria-hidden="true">
  <div class="hero-background__glow"></div>
  <div class="hero-background__particles">
    <i style="--x: 18%; --y: 24%; --size: 2px; --delay: -3s;"></i>
    <i style="--x: 42%; --y: 16%; --size: 1px; --delay: -8s;"></i>
    <i style="--x: 76%; --y: 62%; --size: 3px; --delay: -12s;"></i>
  </div>
  <img
    class="hero-background__cursor"
    src="/assets/image/antigravity-cursor.png"
    alt=""
  />
</div>
```

```css
.hero-background__particles {
  position: absolute;
  z-index: 2;
  inset: 0;
}

.hero-background__particles i {
  position: absolute;
  top: var(--y);
  left: var(--x);
  width: var(--size);
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(210, 222, 255, 0.7);
  box-shadow: 0 0 12px rgba(170, 195, 255, 0.35);
  animation: particle-float 11s var(--delay) ease-in-out infinite alternate;
}

@keyframes particle-float {
  from {
    opacity: 0.08;
    transform: translate3d(0, 12px, 0) scale(0.8);
  }
  to {
    opacity: 0.34;
    transform: translate3d(8px, -18px, 0) scale(1.15);
  }
}
```

## Movimento del visual principale

Il movimento deve essere lento, continuo e quasi impercettibile. L’immagine non deve “galleggiare” come un oggetto UI: deve sembrare parte dello spazio.

```js
const cursor = document.querySelector(".hero-background__cursor");

gsap.to(cursor, {
  y: -14,
  rotation: 1.2,
  duration: 4.2,
  ease: "sine.inOut",
  repeat: -1,
  yoyo: true
});
```

Entrata iniziale consigliata:

```js
gsap.fromTo(
  cursor,
  {
    autoAlpha: 0,
    scale: 0.86,
    y: 34,
    rotation: -4
  },
  {
    autoAlpha: 1,
    scale: 1,
    y: 0,
    rotation: 0,
    duration: 1.25,
    ease: "power3.out",
    delay: 0.15
  }
);
```

## Parallax del mouse

Il parallax deve essere sottile e limitato al visual e all’alone.

```js
const scene = document.querySelector(".hero-background");
const glow = document.querySelector(".hero-background__glow");

scene.addEventListener("pointermove", (event) => {
  const bounds = scene.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width - 0.5;
  const y = (event.clientY - bounds.top) / bounds.height - 0.5;

  gsap.to(cursor, {
    x: x * 18,
    y: y * 12,
    duration: 0.8,
    ease: "power2.out",
    overwrite: true
  });

  gsap.to(glow, {
    x: x * -24,
    y: y * -18,
    duration: 1.2,
    ease: "power2.out",
    overwrite: true
  });
});
```

Non usare `mousemove` per aggiornare direttamente `style.left` o `style.top`: crea layout thrashing e rende il movimento meno fluido. Preferire `transform`, GSAP o `requestAnimationFrame`.

## Scroll response

Durante il primo scroll lo sfondo può arretrare leggermente per creare profondità:

```js
gsap.to(cursor, {
  yPercent: -10,
  scale: 0.94,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});
```

Limitare l’effetto a una variazione leggera. Il visual non deve sparire prima che l’utente abbia percepito l’hero.

## Responsive

```css
@media (max-width: 767px) {
  .hero-background__cursor {
    top: 7%;
    right: -18%;
    width: 116vw;
    max-height: 48svh;
    opacity: 0.78;
  }

  .hero-background__particles i:nth-child(n + 9) {
    display: none;
  }
}
```

Su mobile il visual deve arretrare visivamente, lasciando una zona più pulita dietro al copy. Ridurre quantità e ampiezza delle particelle per contenere consumo GPU e rumore.

## Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  .hero-background__particles i {
    animation: none;
    opacity: 0.16;
  }

  .hero-background__cursor {
    transform: none !important;
  }
}
```

Nel codice JS, non inizializzare parallax, floating o ScrollTrigger quando:

```js
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

## Ordine z-index

```css
.hero-background       { z-index: 0; }
.hero-background::before { z-index: 1; }
.hero-background__particles { z-index: 2; }
.hero-background__cursor { z-index: 3; }
.hero-content           { z-index: 5; }
.hero-background::after  { z-index: 6; }
```

Il noise può stare sopra tutta la scena, ma non deve interferire con click, selezione del testo o leggibilità.

## Checklist finale

- [ ] Fondo scuro con almeno due gradienti radiali morbidi.
- [ ] Visual principale isolato e posizionato in assoluto.
- [ ] Glow diffuso dietro il visual.
- [ ] Particelle poche, lente e a bassa opacity.
- [ ] Floating del visual con ampiezza massima circa `12–16px`.
- [ ] Parallax mouse massimo circa `18–24px`.
- [ ] Scroll response leggero e seek-safe.
- [ ] Nessun layout shift causato dall’immagine.
- [ ] Effetti disattivati o ridotti con `prefers-reduced-motion`.
- [ ] Nessun horizontal overflow su mobile.
