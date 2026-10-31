import type { Metadata } from "next";
import Image from "next/image";
import styles from "./benvenuto.module.css";

export const metadata: Metadata = {
  title: "Accesso demo — AssoUmanoidi",
  robots: { index: false, follow: false },
};

export default async function Benvenuto({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;
  const hasError = erro === "1";

  return (
    <main className={styles.page}>
      <Image
        className={styles.logo}
        src="/logo_assou.jpg"
        alt="AssoUmanoidi — Cultura, Etica, Futuro"
        width={1256}
        height={892}
        priority
      />

      <form className={styles.access} action="/api/accesso" method="post">
        <label className={styles.srOnly} htmlFor="demo-password">
          Password per accedere alla demo
        </label>
        <input
          className={`${styles.input}${hasError ? ` ${styles.inputError}` : ""}`}
          id="demo-password"
          name="password"
          type="password"
          placeholder={hasError ? "Password non corretta" : "Password"}
          autoComplete="current-password"
          autoFocus
          required
          aria-invalid={hasError}
        />
        <button className={styles.submit} type="submit" aria-label="Accedi alla demo">
          <span aria-hidden="true">→</span>
        </button>
      </form>
    </main>
  );
}

