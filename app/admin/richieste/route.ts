import { autorizzato, INTESTAZIONI_PRIVATE, pannelloConfigurato, RICHIESTA_CREDENZIALI } from "../../../lib/accessoAdmin";
import { CAMPI_AMMESSI, elencoRichieste, type Richiesta } from "../../../lib/richieste";

const ETICHETTE: Record<string, string> = {
  nome: "Nome", email: "Email", citta: "Città", professione: "Professione", motivazione: "Motivazione",
  modello: "Modello", produttore: "Produttore", stato: "Stato", ambito: "Ambito",
  organizzazione: "Organizzazione", tipo: "Tipo", ruolo: "Ruolo", sito: "Sito",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function pagina(righe: Richiesta[]): string {
  const blocchi = righe
    .map((r) => {
      const campi = CAMPI_AMMESSI.filter((k) => r.campi[k])
        .map((k) => `<dt>${esc(ETICHETTE[k])}</dt><dd>${esc(r.campi[k])}</dd>`)
        .join("");
      return `<article><header><strong>Camera ${esc(r.camera)}</strong> · ${esc(new Date(r.ricevuta).toLocaleString("it-IT", { timeZone: "Europe/Rome" }))} · <code>${esc(r.id)}</code></header><dl>${campi}</dl></article>`;
    })
    .join("");
  return `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Richieste — AssoUmanoidi</title>
<style>
body{font:15px/1.5 system-ui,sans-serif;margin:0;background:#f6f6f4;color:#14202f}
main{max-width:860px;margin:0 auto;padding:24px 16px}
header.top{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px}
h1{font-size:22px;margin:0}
a.btn{background:#14202f;color:#fff;padding:9px 16px;border-radius:999px;text-decoration:none;font-weight:600}
article{background:#fff;border:1px solid #dcdcd6;border-radius:10px;padding:16px 18px;margin-bottom:14px}
article header{font-size:13px;color:#555;margin-bottom:8px;word-break:break-all}
dl{display:grid;grid-template-columns:max-content 1fr;gap:4px 14px;margin:0}
dt{color:#666;font-size:13px}dd{margin:0;white-space:pre-wrap;overflow-wrap:anywhere}
.vuoto{color:#666}
</style></head><body><main>
<header class="top"><h1>Richieste ricevute (${righe.length})</h1><a class="btn" href="/admin/richieste/csv">Scarica CSV</a></header>
${righe.length ? blocchi : '<p class="vuoto">Nessuna richiesta ancora.</p>'}
</main></body></html>`;
}

export async function GET(request: Request) {
  if (!pannelloConfigurato()) {
    return new Response("Pannello non configurato: manca la variabile ADMIN_PASSWORD.", {
      status: 503,
      headers: { ...INTESTAZIONI_PRIVATE, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  if (!autorizzato(request)) {
    return new Response("Accesso richiesto.", {
      status: 401,
      headers: { ...INTESTAZIONI_PRIVATE, ...RICHIESTA_CREDENZIALI, "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  const righe = await elencoRichieste();
  return new Response(pagina(righe), {
    headers: { ...INTESTAZIONI_PRIVATE, "Content-Type": "text/html; charset=utf-8" },
  });
}
