"use client";

import { useEffect, useRef } from "react";
import * as Motion from "motion";
import { creaVolto } from "./volto-core.js";

/**
 * Il volto metà umano e metà umanoide (vedi volto-core.js), mosso con Motion.
 * La testa ruota secondo la posizione del riquadro sullo schermo: nello
 * scorrimento orizzontale dei pilastri si gira mentre arriva.
 */
export function Volto({ scala = 0.34, centro = 0.46 }: { scala?: number; centro?: number }) {
  const tela = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = tela.current;
    if (!c) return;
    const box = (c.closest("[data-volto-box]") as HTMLElement | null) ?? c;
    const fermo = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ferma = creaVolto(c, Motion, {
      fermo,
      scala,
      centroY: centro,
      posizione: () => {
        const r = box.getBoundingClientRect();
        const w = window.innerWidth;
        const h = window.innerHeight;
        const dx = (r.left + r.width / 2 - w / 2) / (w / 2);
        const dy = (r.top + r.height / 2 - h / 2) / (h / 2);
        const v = Math.abs(dx) > 0.05 ? dx : dy * 0.5;
        return Math.max(-1, Math.min(1, v));
      },
    });
    return () => ferma();
  }, [scala, centro]);
  return <canvas ref={tela} className="au-volto-tela" aria-hidden="true" />;
}
