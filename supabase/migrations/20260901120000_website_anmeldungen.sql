-- Anmeldungen für die Start-Benachrichtigung der Website
--
-- Die Landingpage sammelt E-Mail-Adressen für eine einzige Mail zum Start.
-- Vorher lagen sie in einer Datei auf dem Server — auf Vercel ist das
-- Dateisystem schreibgeschützt, dort wäre jede Anmeldung verlorengegangen.
--
-- Kein Bezug zu auth.users: Wer sich hier einträgt, hat noch kein Konto.
-- Das ist der ganze Punkt der Liste.
--
-- ⚠️ Diese Tabelle liegt im SELBEN Supabase-Projekt wie die App. Wenn die
-- Datenbank je aus den Migrationen neu aufgebaut wird, muss diese Datei
-- dabei sein — sie gehört deshalb ins App-Repo unter supabase/migrations/.

create table if not exists public.anmeldungen (
  id                 uuid primary key default gen_random_uuid(),

  -- Immer kleingeschrieben und ohne Leerzeichen gespeichert, sonst greift
  -- die Eindeutigkeit nicht: "Anna@x.at" und "anna@x.at" sind dieselbe
  -- Person, für Postgres aber zwei verschiedene Zeichenketten.
  email              text not null unique,

  -- Zeitpunkt der Anmeldung — zugleich der Zeitpunkt der Einwilligung:
  -- Das Absenden des Formulars IST die Zustimmung (einfaches Opt-in).
  angemeldet_am      timestamptz not null default now(),

  -- Für ein späteres doppeltes Opt-in: bleibt leer, bis jemand einen
  -- Bestätigungslink angeklickt hat. Solange NULL, gilt `angemeldet_am`.
  bestaetigt_am      timestamptz,

  -- Der Schlüssel hinter /abmelden/<schluessel>. Zufällig, nicht erratbar
  -- und nicht aus der Adresse ableitbar — sonst könnte man Fremde abmelden.
  abmelde_schluessel uuid not null default gen_random_uuid() unique,

  -- Wird gesetzt, wenn die Start-Mail raus ist. Ohne dieses Feld würde ein
  -- zweiter Durchlauf allen dieselbe Mail noch einmal schicken.
  benachrichtigt_am  timestamptz
);

comment on table public.anmeldungen is
  'E-Mail-Adressen von der Landingpage für die einmalige Start-Benachrichtigung.';

-- Die Liste für den Starttag: wer noch keine Mail bekommen hat.
create index if not exists anmeldungen_offen_idx
  on public.anmeldungen (angemeldet_am)
  where benachrichtigt_am is null;

-- RLS an, aber ABSICHTLICH keine einzige Policy.
--
-- Damit kommt weder `anon` noch `authenticated` an die Tabelle — auch nicht
-- lesend. Nur der `service_role`-Schlüssel umgeht RLS, und der steht
-- ausschließlich in den Umgebungsvariablen des Servers, nie im Browser.
--
-- Ohne das könnte jeder Besucher die Liste aller Anmeldungen auslesen.
alter table public.anmeldungen enable row level security;

revoke all on public.anmeldungen from anon, authenticated;

-- RLS zu umgehen genügt nicht — die Rolle braucht zusätzlich das normale
-- Tabellenrecht. In diesem Projekt greifen die Standardrechte für neue
-- Tabellen nicht, `service_role` lief sonst in
-- „42501 permission denied for table anmeldungen".
--
-- Genau diese vier und keines mehr: einfügen (Anmeldung), lesen (die Liste
-- am Starttag), ändern (`benachrichtigt_am` setzen), löschen (Abmeldung).
grant select, insert, update, delete on public.anmeldungen to service_role;
