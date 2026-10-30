"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Motore di scorrimento e animazione.
 *
 * Un solo posto per tutto il movimento della pagina: Lenis guida lo scroll,
 * GSAP/ScrollTrigger guidano le scene. I componenti restano statici e non sanno
 * nulla di animazione — il motore li trova nel DOM per classe.
 *
 * Sotto i 1000px, o con prefers-reduced-motion, non parte niente: la pagina prende
 * la classe .au-statica e diventa un documento verticale normale.
 */
export function Motore({ children }: { children: ReactNode }) {
  const radice = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = radice.current;
    if (!root) return;

    const q = <T extends HTMLElement | SVGElement>(sel: string) =>
      gsap.utils.toArray<T>(sel, root);
    // GSAP tollera un target assente (logga e prosegue), quindi il cast tiene
    // il codice leggibile senza punteggiare ogni riga di guardie.
    const uno = <T extends HTMLElement | SVGElement>(sel: string) => q<T>(sel)[0] as T;
    const molti = (...sels: string[]) => sels.flatMap((s) => q(s));

    /** la nav è renderizzata fuori da <Motore>, quindi non è nello scope di q() */
    const nav = () => document.querySelector<HTMLElement>(".nav");

    /** listener su window da staccare a fine vita del componente */
    const daPulire: Array<() => void> = [];

    /* ---------------------------------------------------------------- rete */
    /** Nodi che si cercano: oro e bianchi. Un legame si disegna solo fra due diversi. */
    const creaRete = (tela: HTMLCanvasElement) => {
      const ctx = tela.getContext("2d");
      if (!ctx) return null;
      let W = 0;
      let H = 0;
      type Nodo = { x: number; y: number; vx: number; vy: number; r: number; caldo: boolean };
      let nodi: Nodo[] = [];
      const mouse = { x: -1e4, y: -1e4 };

      const misura = () => {
        const r = tela.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        W = r.width;
        H = r.height;
        tela.width = W * dpr;
        tela.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        if (!nodi.length) {
          const n = Math.min(76, Math.floor((W * H) / 15000));
          nodi = Array.from({ length: n }, (_, i) => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.42,
            vy: (Math.random() - 0.5) * 0.42,
            r: 1.3 + Math.random() * 1.4,
            caldo: i % 2 === 0,
          }));
        }
      };

      const disegna = () => {
        ctx.clearRect(0, 0, W, H);
        for (const p of nodi) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
        // un legame si disegna solo fra un nodo caldo e uno freddo
        for (let i = 0; i < nodi.length; i++) {
          for (let j = i + 1; j < nodi.length; j++) {
            const a = nodi[i];
            const b = nodi[j];
            if (a.caldo === b.caldo) continue;
            const d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d > 145) continue;
            const o = (1 - d / 145) * 0.4;
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            const caldoPrima = a.caldo;
            g.addColorStop(0, `rgba(${caldoPrima ? "212,162,58" : "244,244,244"},${o})`);
            g.addColorStop(1, `rgba(${caldoPrima ? "244,244,244" : "212,162,58"},${o})`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        for (const p of nodi) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < 200) {
            ctx.strokeStyle = `rgba(212,162,58,${(1 - d / 200) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
          ctx.fillStyle = p.caldo ? "rgba(212,162,58,.78)" : "rgba(244,244,244,.55)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      let vivo = false;
      const giro = () => {
        if (!vivo) return;
        disegna();
        requestAnimationFrame(giro);
      };
      const suMouse = (e: MouseEvent) => {
        if (!vivo) return;
        const r = tela.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      window.addEventListener("mousemove", suMouse);
      window.addEventListener("resize", misura);
      misura();

      return {
        unaVolta: disegna,
        avvia: () => {
          if (!vivo) {
            vivo = true;
            giro();
          }
        },
        ferma: () => {
          vivo = false;
        },
        pulisci: () => {
          vivo = false;
          window.removeEventListener("mousemove", suMouse);
          window.removeEventListener("resize", misura);
        },
      };
    };

    /* ------------------------------------------------------------ hero */
    /** Le particelle dell'atmosfera dell'hero, in stile antigravity.google:
     * ognuna riposa nella sua origine, il mouse le spinge via, una molla le
     * riporta indietro. Il tratto si allunga con la velocità (un trattino,
     * non un punto) solo mentre si muovono: è quello che dà l'aria di scia,
     * non di pioggerella. */
    const creaParticelleAria = (tela: HTMLCanvasElement) => {
      const ctx = tela.getContext("2d");
      if (!ctx) return null;
      let W = 0;
      let H = 0;
      type Particella = { ox: number; oy: number; x: number; y: number; vx: number; vy: number; r: number };
      let particelle: Particella[] = [];
      const mouse = { x: -1e4, y: -1e4 };
      const RAGGIO = 260;

      const misura = () => {
        const r = tela.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        W = r.width;
        H = r.height;
        tela.width = W * dpr;
        tela.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.min(3200, Math.floor((W * H) / 350));
        particelle = Array.from({ length: n }, () => {
          const x = Math.random() * W;
          const y = Math.random() * H;
          return { ox: x, oy: y, x, y, vx: 0, vy: 0, r: 1 + Math.random() * 1.5 };
        });
      };

      // a migliaia, un stroke() per particella è troppo lento (ogni chiamata ha
      // un costo fisso, oltre a quello del tratto in sé). Le si raggruppa invece
      // in poche fasce di luminosità — ognuna un solo Path2D, un solo stroke() —
      // così il costo per frame resta quasi piatto anche a 3000 particelle.
      const FASCE = [
        { sotto: 0.15, colore: "rgba(212,162,58,0.16)", larghezza: 1.1 },
        { sotto: 0.4, colore: "rgba(212,162,58,0.38)", larghezza: 1.4 },
        { sotto: 0.7, colore: "rgba(255,241,209,0.55)", larghezza: 1.7 },
        { sotto: 1.01, colore: "rgba(255,241,209,0.82)", larghezza: 2 },
      ];
      const disegna = () => {
        ctx.clearRect(0, 0, W, H);
        // Path2D non si svuota: se ne crea uno nuovo per fascia a ogni frame
        const percorsi = FASCE.map(() => new Path2D());

        for (const p of particelle) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d = Math.hypot(dx, dy);
          const vicino = Math.max(0, 1 - d / RAGGIO);
          if (vicino > 0) {
            const ang = Math.atan2(dy, dx);
            p.vx += Math.cos(ang) * vicino * 2.4;
            p.vy += Math.sin(ang) * vicino * 2.4;
          }
          // la molla che riporta ogni particella alla propria origine
          p.vx += (p.ox - p.x) * 0.012;
          p.vy += (p.oy - p.y) * 0.012;
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.x += p.vx;
          p.y += p.vy;

          const vel = Math.hypot(p.vx, p.vy);
          const lunghezza = p.r + Math.min(9, vel * 1.6);
          const ang2 = Math.atan2(p.vy, p.vx);
          const x2 = p.x + Math.cos(ang2) * lunghezza;
          const y2 = p.y + Math.sin(ang2) * lunghezza;

          const fascia = FASCE.findIndex((f) => vicino < f.sotto);
          const percorso = percorsi[fascia === -1 ? FASCE.length - 1 : fascia];
          percorso.moveTo(p.x, p.y);
          percorso.lineTo(x2, y2);
        }

        ctx.lineCap = "round";
        FASCE.forEach((f, i) => {
          ctx.strokeStyle = f.colore;
          ctx.lineWidth = f.larghezza;
          ctx.stroke(percorsi[i]);
        });
      };

      let vivo = true;
      const giro = () => {
        if (!vivo) return;
        disegna();
        requestAnimationFrame(giro);
      };
      const suMouse = (e: MouseEvent) => {
        const r = tela.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
      };
      window.addEventListener("mousemove", suMouse);
      window.addEventListener("resize", misura);
      misura();
      giro();

      return {
        pulisci: () => {
          vivo = false;
          window.removeEventListener("mousemove", suMouse);
          window.removeEventListener("resize", misura);
        },
      };
    };

    const tela = uno<HTMLCanvasElement>(".au-tela");

    /* ------------------------------------------------- modalità statica */
    const pocoMoto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // matchMedia e non innerWidth: in una scheda in background innerWidth può valere 0
    // e manderebbe in modalità statica anche un desktop.
    const schermoPiccolo = window.matchMedia("(max-width: 999px)").matches;
    // ?statica in coda all'URL forza la versione senza animazioni:
    // serve a controllare com'è la pagina per chi ha prefers-reduced-motion.
    const forzata = new URLSearchParams(window.location.search).has("statica");

    if (pocoMoto || schermoPiccolo || forzata) {
      root.classList.add("au-statica");
      // i contatori sono animati: senza motore resterebbero a zero
      q<HTMLElement>(".au-conta").forEach((el) => {
        el.textContent = el.dataset.conta ?? el.textContent;
      });
      const r = tela ? creaRete(tela) : null;
      r?.unaVolta();
      const suScroll = () => {
        nav()?.classList.toggle("fissa", window.scrollY > 60);
      };
      suScroll();
      window.addEventListener("scroll", suScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", suScroll);
        r?.pulisci();
      };
    }

    /* ------------------------------------------------------ Lenis + GSAP */
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.15 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      /* nav ------------------------------------------------------------- */
      ScrollTrigger.create({
        start: 60,
        onToggle: (self) => nav()?.classList.toggle("fissa", self.isActive),
      });

      /* intro → hero ---------------------------------------------------- */
      const heroTl = gsap
        .timeline({ paused: true })
        .fromTo(
          q(".au-riga-in"),
          { yPercent: 118 },
          { yPercent: 0, duration: 1.1, ease: "power4.out", stagger: 0.13 },
          0,
        )
        .from(
          molti(".au-hero-marchio", ".au-hero-sub", ".au-hero-azioni"),
          { y: 32, autoAlpha: 0, duration: 0.95, ease: "power3.out", stagger: 0.09 },
          0.35,
        );

      const parole = q(".au-intro-parola");
      const introMarchio = uno(".au-intro .marchio-svg");

      // Se la pagina viene aperta in una scheda di sfondo, requestAnimationFrame è
      // fermo: l'intro resterebbe congelata a metà e la hero mezza invisibile.
      // In quel caso si salta l'intro e la hero parte già finita.
      const inPrimoPiano = !document.hidden;

      // L'intro si vede una volta sola per sessione: al ritorno sulla home
      // (o a un doppio mount di sviluppo) non deve ripartire — oltre a essere
      // fastidiosa, due timeline sugli stessi elementi si accavallano e le
      // parole restano sovrapposte a schermo.
      let giaVista = true;
      try {
        giaVista = sessionStorage.getItem("au-intro-vista") === "1";
        if (!giaVista) sessionStorage.setItem("au-intro-vista", "1");
      } catch {
        giaVista = false;
      }

      if (parole.length && inPrimoPiano && !giaVista) {
        gsap.set(parole, { yPercent: 130 });
        const intro = gsap.timeline();
        // il marchio entra, poi scorrono le parole
        gsap.set(introMarchio, { autoAlpha: 0, scale: 0.82 });
        intro
          .to(
            introMarchio,
            { autoAlpha: 1, scale: 1, duration: 1.1, ease: "back.out(1.6)" },
            0.1,
          )
          .to(parole[0], { yPercent: 0, duration: 0.28, ease: "power3.out" }, 0.3)
          .to(parole[0], { yPercent: -130, duration: 0.24, ease: "power3.in" }, "+=0.14")
          .to(parole[1], { yPercent: 0, duration: 0.3, ease: "power3.out" }, "-=0.05")
          .to(parole[1], { yPercent: -130, duration: 0.24, ease: "power3.in" }, "+=0.14")
          .to(parole[2], { yPercent: 0, duration: 0.3, ease: "power3.out" }, "-=0.05")
          .to(parole[2], { yPercent: -130, duration: 0.24, ease: "power3.in" }, "+=0.14")
          .to(parole[3], { yPercent: 0, duration: 0.34, ease: "power3.out" }, "-=0.05")
          .to(uno(".au-intro"), { yPercent: -100, duration: 0.65, ease: "power3.inOut" }, "+=0.3")
          .call(() => heroTl.play(), [], "-=0.45")
          .set(uno(".au-intro"), { display: "none" });
      } else {
        gsap.set(uno(".au-intro"), { display: "none" });
        heroTl.progress(1);
      }

      // rete di sicurezza: se per qualsiasi motivo la sequenza si blocca,
      // dopo 8 secondi la hero viene comunque portata allo stato finale.
      const salvagente = window.setTimeout(() => {
        if (heroTl.progress() < 1) {
          gsap.set(uno(".au-intro"), { display: "none" });
          heroTl.progress(1);
        }
      }, 8000);
      daPulire.push(() => window.clearTimeout(salvagente));

      /* hero: il portale si apre ---------------------------------------- */
      if (uno(".au-hero")) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: uno(".au-hero"),
              start: "top top",
              end: "+=190%",
              scrub: 0.5,
              pin: true,
              anticipatePin: 1,
            },
          })
          .to(uno(".au-hero-copy"), { y: -130, autoAlpha: 0, duration: 1 }, 0)
          .to(uno(".au-scorri"), { autoAlpha: 0, duration: 0.3 }, 0)
          .fromTo(
            uno(".au-portale"),
            { clipPath: "inset(80% 33% 6% 33% round 300px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 2, ease: "power1.inOut" },
            0.15,
          )
          // il video si distende mentre la finestra si apre
          .fromTo(
            uno(".au-portale-video"),
            { scale: 1.25 },
            { scale: 1, duration: 2, ease: "power1.inOut" },
            0.15,
          )
          .to(uno(".au-portale-maniglia"), { autoAlpha: 0, duration: 0.4 }, 0.15)
          .fromTo(
            uno(".au-portale-testo"),
            { autoAlpha: 0, y: 54 },
            { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" },
            1.72,
          )
          // l'atmosfera si ritira insieme al resto della copy, non resta
          // sospesa sopra al portale che si apre
          .to(uno(".au-hero-alone"), { autoAlpha: 0, scale: 0.92, duration: 0.9 }, 0)
          .to(uno(".au-hero-tela"), { autoAlpha: 0, duration: 0.6 }, 0);
      }

      /* atmosfera dell'hero: l'alone segue il mouse in parallasse, appena. */
      const alone = uno<HTMLElement>(".au-hero-alone");
      if (alone) {
        const gx = gsap.quickTo(alone, "x", { duration: 1.2, ease: "power2.out" });
        const gy = gsap.quickTo(alone, "y", { duration: 1.2, ease: "power2.out" });
        const scenaHero = uno<HTMLElement>(".au-hero");
        const suMouseAtmosfera = (e: MouseEvent) => {
          if (!scenaHero) return;
          // relativo alla sezione hero, non a .au-root: quello è l'intera
          // pagina, e ci calcolava una parallasse su ~25.000px di altezza
          const r = scenaHero.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          gx(x * -24);
          gy(y * -18);
        };
        window.addEventListener("mousemove", suMouseAtmosfera);
        daPulire.push(() => window.removeEventListener("mousemove", suMouseAtmosfera));
      }

      const heroTela = uno<HTMLCanvasElement>(".au-hero-tela");
      const particelleAria = heroTela ? creaParticelleAria(heroTela) : null;
      if (particelleAria) daPulire.push(particelleAria.pulisci);

      /* rail: la firma. Si chiude lungo tutta la pagina. ----------------- */
      const railAnello = uno(".au-rail .an-corsa");
      const railPct = uno<HTMLElement>(".au-rail-pct");
      if (railAnello) {
        gsap.set(railAnello, { strokeDashoffset: 100 });
        gsap.to(railAnello, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            start: 0,
            end: "max",
            scrub: 0.4,
            onUpdate: (self) => {
              if (railPct) railPct.textContent = `${Math.round(self.progress * 100)}%`;
            },
          },
        });
      }

      /* reazione alla velocità di scorrimento --------------------------- */
      const righe = q(".au-mq-riga").map((el) =>
        gsap.quickTo(el, "skewX", { duration: 0.4, ease: "power2.out" }),
      );
      const celle = q(".au-rete-cella").map((el) =>
        gsap.quickTo(el, "skewY", { duration: 0.4, ease: "power2.out" }),
      );
      const riposo = gsap
        .delayedCall(0.18, () => {
          righe.forEach((f) => f(0));
          celle.forEach((f) => f(0));
        })
        .pause();
      if (righe.length || celle.length) {
        ScrollTrigger.create({
          onUpdate: (self) => {
            const v = gsap.utils.clamp(-1, 1, self.getVelocity() / 2600);
            righe.forEach((f) => f(-6 * v));
            celle.forEach((f) => f(-1.6 * v));
            riposo.restart(true);
          },
        });
      }

      /* il perché: parole che si accendono ------------------------------ */
      if (uno(".au-perche")) {
        gsap.fromTo(
          q(".au-perche-corpo p"),
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: uno(".au-perche"), start: "top 68%" },
          },
        );
      }
      if (uno(".au-tesi")) {
        gsap.fromTo(
          q(".au-tesi .au-p"),
          { opacity: 0.1 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.05,
            scrollTrigger: {
              trigger: uno(".au-tesi"),
              start: "top 74%",
              end: "center 46%",
              scrub: true,
            },
          },
        );
      }

      /* pilastri: scorrimento orizzontale ------------------------------- */
      const larghezza = () => document.documentElement.clientWidth || window.innerWidth;
    const pista = uno<HTMLElement>(".au-pil-pista");
      if (pista) {
        const orizz = gsap.to(pista, {
          x: () => -(pista.scrollWidth - larghezza()),
          ease: "none",
          scrollTrigger: {
            trigger: uno(".au-pilastri"),
            start: "top top",
            end: () => "+=" + (pista.scrollWidth - larghezza()),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        q(".au-pil-num").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: 22 },
            {
              xPercent: -22,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                containerAnimation: orizz,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });
      }

      /* marquee --------------------------------------------------------- */
      if (uno(".au-marquee")) {
        gsap.fromTo(
          uno(".au-mq-riga.r1"),
          { xPercent: 0 },
          {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: uno(".au-marquee"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
        gsap.fromTo(
          uno(".au-mq-riga.r2"),
          { xPercent: -20 },
          {
            xPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: uno(".au-marquee"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }

      /* tre Camere: i tre anelli si riconoscono ------------------------- */
      const passi = q(".au-cam-passo");
      const punti = q(".au-cam-punto");
      if (passi.length === 3 && uno(".au-camere")) {
        gsap.set(passi.slice(1), { autoAlpha: 0, y: 24 });
        const anelli = q(".au-cam-anello");
        const etich = q(".au-cam-etichetta");
        // posizioni finali del diagramma di Venn; si parte al doppio della distanza
        const meta: [number, number][] = [
          [-58, -34],
          [58, -34],
          [0, 68],
        ];

        const cam = gsap.timeline({
          scrollTrigger: {
            trigger: uno(".au-camere"),
            start: "top top",
            end: "+=260%",
            scrub: 0.6,
            pin: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              const i = self.progress < 0.38 ? 0 : self.progress < 0.72 ? 1 : 2;
              punti.forEach((p, k) => p.classList.toggle("on", k === i));
            },
          },
        });

        cam.fromTo(
          uno(".au-cam-quadro"),
          { rotationY: 9, rotationX: 4 },
          { rotationY: -9, rotationX: 4, ease: "none", duration: 3 },
          0,
        );
        anelli.forEach((a, i) => {
          const [x, y] = meta[i] ?? [0, 0];
          cam.fromTo(
            a,
            { x: x * 2.1, y: y * 2.1, autoAlpha: i === 0 ? 1 : 0.25 },
            { x, y, autoAlpha: 1, ease: "none", duration: 3 },
            0,
          );
        });
        etich.forEach((e, i) => {
          cam.fromTo(
            e,
            { autoAlpha: 0, y: 14 },
            { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
            0.25 + i * 0.95,
          );
        });
        cam
          .to(passi[0], { autoAlpha: 0, y: -24, duration: 0.28 }, 0.88)
          .to(passi[1], { autoAlpha: 1, y: 0, duration: 0.28 }, 1.08)
          .to(passi[1], { autoAlpha: 0, y: -24, duration: 0.28 }, 1.88)
          .to(passi[2], { autoAlpha: 1, y: 0, duration: 0.28 }, 2.08)
          .to({}, { duration: 0.55 });
      }

      /* la Carta: le domande arrivano una alla volta -------------------- */
      if (uno(".au-carta-sez")) {
        gsap.fromTo(
          q(".au-domanda"),
          { autoAlpha: 0.16, x: -18 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: uno(".au-domande"), start: "top 78%" },
          },
        );
      }

      /* Anagrafe: la scheda si inclina ---------------------------------- */
      const scheda = uno<HTMLElement>(".au-scheda");
      if (scheda) {
        gsap.fromTo(
          scheda,
          { rotationY: 8, rotationX: 4, y: 40, autoAlpha: 0 },
          {
            rotationY: -6,
            rotationX: 2,
            y: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: uno(".au-anagrafe"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
        // le barre dell'impronta di registro
        q(".au-impronta i").forEach((b, i) => {
          gsap.fromTo(
            b,
            { height: 3 },
            {
              height: 4 + ((i * 7) % 15),
              duration: 0.9 + (i % 5) * 0.2,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
              delay: i * 0.06,
            },
          );
        });
      }

      /* Rivista: la copertina si inclina, il sommario arriva in fila ------ */
      const copertina = uno<HTMLElement>(".au-riv-copertina");
      if (copertina) {
        gsap.fromTo(
          copertina,
          { rotationY: -12, rotationX: 5, y: 46, autoAlpha: 0 },
          {
            rotationY: 7,
            rotationX: -2,
            y: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: uno(".au-rivista"),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }
      if (uno(".au-riv-sommario")) {
        gsap.fromTo(
          q(".au-riv-sommario li"),
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            scrollTrigger: { trigger: uno(".au-riv-sommario"), start: "top 85%" },
          },
        );
      }

      /* rete ------------------------------------------------------------ */
      if (uno(".au-rete")) {
        gsap.fromTo(
          q(".au-rete-cella"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: uno(".au-rete-griglia"), start: "top 82%" },
          },
        );
      }

      /* directory: le tre file scorrono in direzioni alterne ------------ */
      if (uno(".au-societa")) {
        const file = q(".au-soc-riga");
        const versi = [-16, 14, -22];
        file.forEach((f, i) => {
          gsap.fromTo(
            f,
            { xPercent: versi[i] < 0 ? 0 : versi[i] },
            {
              xPercent: versi[i] < 0 ? versi[i] : 0,
              ease: "none",
              scrollTrigger: {
                trigger: uno(".au-societa"),
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
        gsap.fromTo(
          q(".au-soc-conto"),
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: uno(".au-soc-conti"), start: "top 85%" },
          },
        );
        q<HTMLElement>(".au-conta").forEach((el) => {
          const meta = parseInt(el.dataset.conta || "0", 10);
          const v = { n: 0 };
          gsap.to(v, {
            n: meta,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
            onUpdate: () => {
              el.textContent = String(Math.round(v.n));
            },
          });
        });
      }

      /* Asimov: le leggi si accatastano, una per schermo ---------------- */
      if (uno(".au-asimov")) {
        gsap.fromTo(
          q(".au-asi-testa > *"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: uno(".au-asi-testa"), start: "top 70%" },
          },
        );

        q<HTMLElement>(".au-legge").forEach((legge, i) => {
          const wrap = legge.querySelector<HTMLElement>(".au-legge-wrap");
          const carta = legge.querySelector<HTMLElement>(".au-legge-carta");
          if (!wrap || !carta) return;

          // la scheda resta ferma per uno schermo, poi si corica all'indietro
          // e la successiva le passa sopra. L'inclinazione laterale è fissa per
          // scheda (alternata) e non casuale: così la pila è sempre la stessa.
          gsap.to(carta, {
            rotationZ: [-3.2, 2.6, -1.8, 3.4][i % 4],
            rotationX: 40,
            scale: 0.7,
            ease: "power1.in",
            scrollTrigger: {
              pin: wrap,
              trigger: legge,
              start: "top top",
              end: "+=" + window.innerHeight,
              scrub: true,
            },
          });

          // sparisce solo dopo essere stata coperta: prima resta sotto la pila
          gsap.to(carta, {
            autoAlpha: 0,
            ease: "power1.in",
            scrollTrigger: {
              trigger: carta,
              start: "top -80%",
              end: "+=" + 0.2 * window.innerHeight,
              scrub: true,
            },
          });
        });

        gsap.fromTo(
          uno(".au-asi-chiusa"),
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: uno(".au-asi-piede"), start: "top 88%" },
          },
        );
      }

      /* manifesto ------------------------------------------------------- */
      if (uno(".au-manifesto")) {
        gsap.fromTo(
          q(".au-man-in > *"),
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: { trigger: uno(".au-manifesto"), start: "top 62%" },
          },
        );
        const mottoMarchio = uno(".au-motto .marchio-svg");
        if (mottoMarchio) {
          gsap.fromTo(
            mottoMarchio,
            { scale: 0.7, autoAlpha: 0 },
            {
              scale: 1,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: uno(".au-motto"),
                start: "top 92%",
                end: "top 52%",
                scrub: true,
              },
            },
          );
        }
      }

      /* adesione -------------------------------------------------------- */
      if (uno(".au-adesione")) {
        gsap.fromTo(
          q(".au-porta"),
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: { trigger: uno(".au-porte"), start: "top 84%" },
          },
        );
      }

      /* bottoni magnetici ----------------------------------------------- */
      q<HTMLElement>(".au-magnete").forEach((el) => {
        const mx = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
        const my = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
        const muovi = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          if (Math.hypot(dx, dy) < 170) {
            mx(dx * 0.28);
            my(dy * 0.28);
          } else {
            mx(0);
            my(0);
          }
        };
        window.addEventListener("mousemove", muovi);
        daPulire.push(() => window.removeEventListener("mousemove", muovi));
      });
    }, radice);

    /* la rete del manifesto vive solo quando è a schermo ---------------- */
    const rete = tela ? creaRete(tela) : null;
    let stRete: ScrollTrigger | undefined;
    if (rete) {
      stRete = ScrollTrigger.create({
        trigger: uno(".au-manifesto"),
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => (self.isActive ? rete.avvia() : rete.ferma()),
      });
    }

    /* Le ancore passano da Lenis, altrimenti lo scroll nativo lo scavalca.
       Offset zero e non -navH: le sezioni che seguono una scena bloccata
       partono esattamente dove finisce il pin, quindi anticipare di qualche
       pixel farebbe atterrare *sotto* la sezione ancora fissa. Tutte le sezioni
       hanno abbastanza spazio in cima da non finire sotto la nav. */
    const vaiA = (bersaglio: Element, immediato = false) => {
      lenis.scrollTo(bersaglio as HTMLElement, {
        offset: 0,
        duration: immediato ? 0 : 1.1,
        immediate: immediato,
        lock: true,
      });
    };

    const suAncora = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const bersaglio = document.querySelector(id);
      if (!bersaglio) return;
      e.preventDefault();
      history.replaceState(null, "", id);
      vaiA(bersaglio);
    };
    document.addEventListener("click", suAncora);
    daPulire.push(() => document.removeEventListener("click", suAncora));

    /* Arrivo con l'ancora già nell'URL: il salto nativo del browser scollegherebbe
       Lenis dai pin, quindi lo rifacciamo passando da Lenis a misure aggiornate. */
    const ancoraIniziale = window.location.hash;

    const suRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", suRefresh);
    ScrollTrigger.refresh();

    if (ancoraIniziale && ancoraIniziale.length > 1) {
      const bersaglio = document.querySelector(ancoraIniziale);
      if (bersaglio) requestAnimationFrame(() => vaiA(bersaglio, true));
    }

    return () => {
      ScrollTrigger.removeEventListener("refresh", suRefresh);
      daPulire.forEach((f) => f());
      stRete?.kill();
      rete?.pulisci();
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="au-root" ref={radice}>
      {children}
    </div>
  );
}
