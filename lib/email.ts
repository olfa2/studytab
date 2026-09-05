/**
 * Die Prüfung der eingegebenen Adresse.
 *
 * Stand vorher als private Funktion in app/actions.ts. Sie liegt jetzt
 * hier, weil app/actions.ts über lib/absender.ts an `next/headers` hängt
 * und damit außerhalb einer laufenden Anfrage nicht importierbar ist —
 * die Prüfung war dadurch die einzige sicherheitsrelevante Stelle der
 * Seite, die sich nicht testen ließ. Hier ist sie eine gewöhnliche
 * Funktion ohne Umgebung: siehe test/email.test.ts.
 *
 * Bewusst großzügig. Die Adresse muss zustellbar sein, nicht schön, und
 * die einzige Prüfung, die das sicher feststellt, ist eine Mail dorthin.
 * Ein strengerer Ausdruck würde gültige Adressen ablehnen — und jede
 * abgelehnte gültige Adresse ist ein Mensch, den wir zum Start nicht
 * erreichen.
 *
 * Die Obergrenze von 254 Zeichen ist die Länge, die RFC 5321 für einen
 * Umschlagpfad zulässt. Alles darüber kann kein Mailserver zustellen.
 */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) && value.length <= 254;
}
