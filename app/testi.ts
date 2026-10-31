import * as IT from "./contenuti";
import * as EN from "./contenuti-en";
import type { Lingua } from "./lingue";

/**
 * I testi del sito, per lingua. `typeof IT` è il contratto: l'inglese deve esportare le
 * stesse chiavi con le stesse forme, altrimenti non compila. Aggiungere un testo in
 * italiano senza la sua traduzione è un errore di build, non una pagina a metà.
 */
export type Testi = typeof IT;

const TESTI: Record<Lingua, Testi> = { it: IT, en: EN };

export const testi = (l: Lingua): Testi => TESTI[l];
