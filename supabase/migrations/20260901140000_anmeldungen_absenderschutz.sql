-- Schutz gegen massenhaftes Eintragen
--
-- Ohne Begrenzung kann jemand das Formular tausendmal mit erfundenen
-- Adressen absenden. Der Honigtopf hält einfache Bots auf, keinen, der es
-- ernst meint. Folge: Müll in der Liste, verbrauchtes Kontingent — und
-- sobald die Start-Mail rausgeht, würden Fremde angeschrieben, die sich nie
-- angemeldet haben.
--
-- ────────────────────────────────────────────────────────────────────
--  WARUM EIN HASH UND NICHT DIE IP-ADRESSE
--
--  Gespeichert wird nicht die IP, sondern ein SHA-256 über ein Geheimnis
--  des Servers UND die IP. Zwei Gründe:
--
--  1. Eine IP ist ein personenbezogenes Datum. Auf einer Seite, die mit
--     „kein Tracking" wirbt, hat sie nichts verloren.
--  2. Ein Hash OHNE Geheimnis wäre wertlos: Es gibt nur rund vier
--     Milliarden IPv4-Adressen, die kann man in Minuten alle durchhashen
--     und die Zuordnung wiederherstellen. Erst das Geheimnis macht das
--     unmöglich.
--
--  Der Hash lässt sich nicht zurückrechnen, taugt zu nichts außer dem
--  Zählen, und verschwindet mit der Zeile bei einer Abmeldung.
-- ────────────────────────────────────────────────────────────────────

alter table public.anmeldungen
  add column if not exists absender_hash text;

comment on column public.anmeldungen.absender_hash is
  'SHA-256 aus Server-Geheimnis und IP. Nur zum Zählen von Anmeldungen je Absender, nicht zurückrechenbar.';

-- Die Abfrage vor jeder Anmeldung lautet: „wie viele von diesem Absender in
-- der letzten Stunde?" — dieser Index macht sie billig.
create index if not exists anmeldungen_absender_idx
  on public.anmeldungen (absender_hash, angemeldet_am)
  where absender_hash is not null;
