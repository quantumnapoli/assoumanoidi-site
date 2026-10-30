import { PAYOFF, PIEDE, ROTTE, SOCIAL } from "../contenuti";
import { LinkFuturo } from "./Futuro";
import { Marchio } from "./Marchio";

const ICONE: Record<string, React.ReactNode> = {
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  YouTube: (
    <>
      <path d="M22 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.5A2.5 2.5 0 0 0 2.4 7.3 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.7 2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.5a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12z" />
      <path d="M10 15V9l5 3-5 3z" />
    </>
  ),
};

export function Piede() {
  return (
    <footer className="piede">
      <div className="piede-in">
        <div className="piede-marchio">
          <Marchio />
          <div className="piede-nome">Assoumanoidi</div>
          <p className="piede-payoff">{PAYOFF}</p>
          <p className="piede-motto">{PIEDE.motto}</p>
          <div className="social" style={{ marginTop: 22 }}>
            {SOCIAL.map((s) => (
              <a
                key={s.nome}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.nome}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                  {ICONE[s.nome]}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="piede-cols">
          {PIEDE.colonne.map((col) => (
            <nav className="piede-col" key={col.titolo}>
              <span className="piede-col-titolo">{col.titolo}</span>
              {col.voci.map((v) => (
                <LinkFuturo key={v.testo} chiave={v.chiave}>
                  {v.testo}
                </LinkFuturo>
              ))}
            </nav>
          ))}
          <nav className="piede-col">
            <span className="piede-col-titolo">Partecipa</span>
            <a href={ROTTE.aderisci}>Aderisci</a>
            <a href={ROTTE.rete}>Collabora</a>
            <LinkFuturo chiave="contatti">Contatti</LinkFuturo>
          </nav>
        </div>
      </div>

      <div className="piede-basso">
        <span>© {new Date().getFullYear()} AssoUmanoidi — Associazione culturale</span>
        <span>Italia</span>
      </div>
    </footer>
  );
}
