"use client";

import { useEffect, useRef } from "react";

/**
 * La testa wireframe che si gira verso il cursore.
 *
 * Il disegno è quello del brand (`public/umanoide-wireframe.svg`): 1.294
 * triangoli, ma con sole coordinate X/Y — è una proiezione piatta. Qui ogni
 * vertice riceve una profondità coerente con dov'è sulla faccia (vedi
 * `profondita`) e il tutto viene ridisegnato in WebGL: così la testa ruota
 * davvero nello spazio, invece di inclinarsi come un'immagine.
 *
 * Niente librerie: prima c'era three.js (~140kB) per una testa costruita a mano
 * molto peggiore di questo disegno. Qui bastano due shader di dieci righe.
 *
 * Sotto i 1000px, con `prefers-reduced-motion`, con `?statica=1` o senza WebGL
 * il canvas non parte e resta l'SVG originale, fermo: lo stesso disegno.
 */

const VS = `
  attribute vec3 aPos;
  uniform float uRotX;
  uniform float uRotY;
  varying float vZ;

  void main() {
    float cy = cos(uRotY), sy = sin(uRotY);
    float cx = cos(uRotX), sx = sin(uRotX);

    vec3 p = aPos;
    p.xz = mat2(cy, sy, -sy, cy) * p.xz;
    p.yz = mat2(cx, -sx, sx, cx) * p.yz;

    // prospettiva debole: dà volume senza deformare i lineamenti
    float k = 1.0 / (1.0 - p.z * 0.2);
    gl_Position = vec4(p.x * 0.9 * k, p.y * 0.95 * k, 0.0, 1.0);
    vZ = p.z;
  }
`;

const FS = `
  precision mediump float;
  uniform float uAlpha;
  varying float vZ;

  void main() {
    // il retro sbiadisce: è questo che fa leggere la testa come solida
    float fronte = clamp(0.5 + vZ * 1.5, 0.0, 1.0);
    vec3 oro = vec3(0.831, 0.635, 0.227);
    vec3 chiaro = vec3(0.965, 0.906, 0.776);
    gl_FragColor = vec4(mix(oro, chiaro, fronte * 0.45), uAlpha * (0.22 + fronte * 0.78));
  }
`;

/**
 * Profondità ricavata dalla sola proiezione frontale: una cupola ellittica dà
 * volume al cranio, un rilievo centrale porta avanti fronte, naso e bocca, il
 * collo rientra. Non inventa una seconda sagoma — sposta lungo Z tutti e 1.294
 * i triangoli dell'originale.
 */
function profondita(x: number, y: number) {
  const ovale = Math.max(0, 1 - (x / 0.98) ** 2 - ((y - 0.06) / 1.18) ** 2);
  // 0.95 e non 0.5: un cranio è profondo quanto è largo. Con una cupola bassa
  // la testa ruotando si schiacciava invece di girare — sembrava una decalcomania.
  const cupola = Math.sqrt(ovale) * 0.95;
  const rilievo = Math.exp(-((x / 0.2) ** 2) - ((y + 0.04) / 0.42) ** 2) * 0.2;
  const collo = y < -0.58 ? Math.max(0, (y + 1) / 0.42) * 0.14 : 0;
  return cupola + rilievo + collo - 0.46;
}

function compila(gl: WebGLRenderingContext, tipo: number, sorgente: string) {
  const s = gl.createShader(tipo);
  if (!s) return null;
  gl.shaderSource(s, sorgente);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    gl.deleteShader(s);
    return null;
  }
  return s;
}

export function Umanoide() {
  const scena = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = scena.current;
    const canvas = tela.current;
    if (!el || !canvas) return;

    const pocoMoto = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const schermoPiccolo = window.matchMedia("(max-width: 999px)").matches;
    // stesso interruttore del resto del sito
    const forzata = new URLSearchParams(window.location.search).has("statica");
    if (pocoMoto || schermoPiccolo || forzata) return;

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true });
    if (!gl) return; // resta l'SVG statico

    const vs = compila(gl, gl.VERTEX_SHADER, VS);
    const fs = compila(gl, gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return;
    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    const stop = new AbortController();
    let annullato = false;
    let anim = 0;
    const mira = { x: 0, y: 0 };
    const ora = { x: 0, y: 0 };
    let inVista = false;

    const avvia = async () => {
      let testo: string;
      try {
        const r = await fetch("/umanoide-wireframe.svg", { signal: stop.signal });
        if (!r.ok) return;
        testo = await r.text();
      } catch {
        return; // resta l'SVG statico
      }
      if (annullato) return;

      /* dal disegno piatto ai segmenti nello spazio ---------------------- */
      const doc = new DOMParser().parseFromString(testo, "image/svg+xml");
      const cx = 861.3 / 2;
      const cy = 1616 / 2;
      const segmenti: number[] = [];

      doc.querySelectorAll("polygon").forEach((poly) => {
        const n = (poly.getAttribute("points")?.match(/-?\d*\.?\d+/g) ?? []).map(Number);
        if (n.length < 6) return;
        const v: number[][] = [];
        for (let i = 0; i < 6; i += 2) {
          const x = (n[i] - cx) / cx;
          const y = (cy - n[i + 1]) / cy;
          v.push([x, y, profondita(x, y)]);
        }
        for (const [a, b] of [
          [0, 1],
          [1, 2],
          [2, 0],
        ]) {
          segmenti.push(...v[a], ...v[b]);
        }
      });
      if (!segmenti.length) return;

      const buf = gl.createBuffer();
      if (!buf) return;
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(segmenti), gl.STATIC_DRAW);

      gl.useProgram(prog);
      const aPos = gl.getAttribLocation(prog, "aPos");
      const uRotX = gl.getUniformLocation(prog, "uRotX");
      const uRotY = gl.getUniformLocation(prog, "uRotY");
      const uAlpha = gl.getUniformLocation(prog, "uAlpha");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 3, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.uniform1f(uAlpha, 0.9);

      const misura = () => {
        const r = el.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = Math.max(1, Math.round(r.width * dpr));
        canvas.height = Math.max(1, Math.round(r.height * dpr));
        gl.viewport(0, 0, canvas.width, canvas.height);
      };
      const ro = new ResizeObserver(misura);
      ro.observe(el);
      misura();

      const disegna = () => {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uRotY, ora.x);
        gl.uniform1f(uRotX, ora.y);
        gl.drawArrays(gl.LINES, 0, segmenti.length / 3);
      };

      const suMouse = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        // normalizzato sulla finestra: nota il cursore anche da lontano
        const nx = (e.clientX - r.left - r.width / 2) / window.innerWidth;
        const ny = (e.clientY - r.top - r.height / 2) / window.innerHeight;
        // ~22°, non di più: il disegno non ha la nuca, aprendo troppo si vede
        // che è un guscio e non una testa piena
        mira.x = Math.max(-1, Math.min(1, nx * 2)) * 0.38;
        mira.y = Math.max(-1, Math.min(1, ny * 2)) * -0.16;
      };
      window.addEventListener("pointermove", suMouse, { passive: true });

      const io = new IntersectionObserver(([v]) => {
        inVista = v.isIntersecting;
      });
      io.observe(el);

      let quadro = 0;
      const gira = () => {
        if (annullato) return;
        anim = requestAnimationFrame(gira);
        if (!inVista || document.hidden) return;
        quadro += 1;
        // avvicinamento morbido + un respiro lentissimo: mai del tutto ferma
        const dondolo = Math.sin(quadro / 130) * 0.035;
        ora.x += (mira.x + dondolo - ora.x) * 0.05;
        ora.y += (mira.y - ora.y) * 0.05;
        disegna();
      };

      el.classList.add("pronto");
      disegna();
      gira();

      stop.signal.addEventListener(
        "abort",
        () => {
          ro.disconnect();
          io.disconnect();
          window.removeEventListener("pointermove", suMouse);
          cancelAnimationFrame(anim);
          gl.deleteBuffer(buf);
        },
        { once: true },
      );
    };

    void avvia();

    return () => {
      annullato = true;
      el.classList.remove("pronto");
      stop.abort();
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <div className="au-uman-scena" ref={scena}>
      <canvas className="au-uman-tela" ref={tela} aria-hidden="true" />
      {/* il disegno originale: si vede finché il canvas non è pronto, e resta
          su mobile, con reduced-motion, con ?statica=1 e senza WebGL */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="au-uman-segno"
        src="/umanoide-wireframe.svg"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </div>
  );
}
