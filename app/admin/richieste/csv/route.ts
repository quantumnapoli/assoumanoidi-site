import { autorizzato, INTESTAZIONI_PRIVATE, pannelloConfigurato, RICHIESTA_CREDENZIALI } from "../../../../lib/accessoAdmin";
import { CAMPI_AMMESSI, elencoRichieste } from "../../../../lib/richieste";

/** Valore di cella CSV: tra virgolette, con i doppi apici raddoppiati. */
const cella = (v: string) => `"${v.replace(/"/g, '""')}"`;

export async function GET(request: Request) {
  if (!pannelloConfigurato()) {
    return new Response("Pannello non configurato.", { status: 503, headers: INTESTAZIONI_PRIVATE });
  }
  if (!autorizzato(request)) {
    return new Response("Accesso richiesto.", {
      status: 401,
      headers: { ...INTESTAZIONI_PRIVATE, ...RICHIESTA_CREDENZIALI },
    });
  }
  const righe = await elencoRichieste();
  const intestazione = ["ricevuta", "camera", "id", ...CAMPI_AMMESSI].map(cella).join(",");
  const corpo = righe.map((r) =>
    [r.ricevuta, r.camera, r.id, ...CAMPI_AMMESSI.map((k) => r.campi[k] ?? "")].map(cella).join(","),
  );
  return new Response("﻿" + [intestazione, ...corpo].join("\r\n") + "\r\n", {
    headers: {
      ...INTESTAZIONI_PRIVATE,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="richieste-assoumanoidi.csv"',
    },
  });
}
