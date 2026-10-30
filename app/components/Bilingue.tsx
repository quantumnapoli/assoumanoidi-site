"use client";

import { useState, type ReactNode } from "react";

/**
 * Italiano / inglese sulla stessa pagina.
 *
 * Le due versioni sono renderizzate sempre entrambe dal server: chi non ha
 * JavaScript legge l'italiano, i motori di ricerca vedono tutte e due. Il
 * selettore cambia solo quale è visibile (attributo `hidden`), senza ricaricare
 * e senza cambiare indirizzo — perciò il testo resta citabile alla stessa URL.
 *
 * `lang` sui due blocchi serve ai lettori di schermo: cambiano pronuncia.
 */
export function Bilingue({ it, en }: { it: ReactNode; en: ReactNode }) {
  const [lingua, setLingua] = useState<"it" | "en">("it");

  return (
    <>
      <div className="au-lingua" role="group" aria-label="Lingua / Language">
        <button
          type="button"
          lang="it"
          aria-pressed={lingua === "it"}
          onClick={() => setLingua("it")}
        >
          Italiano
        </button>
        <button
          type="button"
          lang="en"
          aria-pressed={lingua === "en"}
          onClick={() => setLingua("en")}
        >
          English
        </button>
      </div>

      <div lang="it" hidden={lingua !== "it"}>
        {it}
      </div>
      <div lang="en" hidden={lingua !== "en"}>
        {en}
      </div>
    </>
  );
}
