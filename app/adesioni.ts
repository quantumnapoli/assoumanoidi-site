/**
 * Interruttore delle adesioni online.
 *
 * `false`: il modulo non si invia, la pagina dice che non è ancora possibile inviare
 * informazioni, e l'API risponde 503 senza leggere né registrare i dati.
 * Si mette `true` solo quando c'è un destinatario reale (casella o CRM) e l'informativa
 * privacy descrive il trattamento.
 */
export const ADESIONI_ATTIVE = false;
