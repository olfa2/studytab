import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { legal, type LegalDoc } from "@/lib/site";

/**
 * Impressum und Datenschutz sind dieselbe Seite mit anderem Inhalt —
 * deshalb eine Komponente, die einen `LegalDoc` aus lib/site.ts rendert.
 * Im JSX steht kein Text, so wie überall sonst auf der Seite auch.
 *
 * Kein eigenes Größensystem: Das ist ein Band wie jedes andere, Kicker,
 * Titel und Lead kommen aus der Skala.
 *
 * Solange irgendein Abschnitt ein `todo` hat, steht oben der Warnkasten
 * und jede Lücke ist sichtbar markiert. Das ist Absicht — ein halbfertiges
 * Impressum, das fertig aussieht, ist gefährlicher als eines, das seine
 * Löcher zeigt. Sind alle `todo` leer, verschwindet der Kasten von selbst.
 */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const unfinished = doc.sections.some((section) => section.todo.length > 0);

  return (
    <main className="page">
      <Header />

      <article className="band legal">
        <p className="band__kicker">{doc.kicker}</p>
        <h1 className="band__title band__title--page display">{doc.title}</h1>
        <p className="band__lead">{doc.lead}</p>

        {unfinished ? (
          <aside className="legal__notice">
            <p className="legal__notice-title display">{doc.notice.title}</p>
            <p className="legal__notice-text">{doc.notice.text}</p>
          </aside>
        ) : null}

        {doc.sections.map((section) => (
          <section className="legal__section" key={section.heading}>
            <h2 className="legal__heading display">{section.heading}</h2>

            {section.facts?.map((fact) => (
              <p className="band__text" key={fact}>
                {fact}
              </p>
            ))}

            <p className="legal__note">{section.note}</p>

            {section.todo.length > 0 ? (
              <div className="legal__todo">
                <p className="legal__todo-label">{legal.todoLabel}</p>
                <ul className="legal__todo-list">
                  {section.todo.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ))}

        <a className="legal__back" href="/">
          {doc.backLabel}
        </a>
      </article>

      <Footer />
    </main>
  );
}
