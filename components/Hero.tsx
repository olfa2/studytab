import { site } from "@/lib/site";
import DownloadCta from "./DownloadCta";
import Screens from "./Screens";
import { HERO_CTA_ID } from "./Header";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        {site.showScanLine ? (
          <div className="scanline">
            <span className="scanline__dot" aria-hidden="true" />
            <span>{site.scanLine}</span>
          </div>
        ) : null}

        <h1 className="headline display">{site.headline}</h1>
        <p className="lede">{site.lede}</p>

        <div className="average">
          <div>
            <div className="average__label">{site.average.label}</div>
            <div className="average__value display">{site.average.value}</div>
          </div>
          <div className="average__side">
            <div className="average__term">{site.average.term}</div>
            <div className="average__note">{site.average.note}</div>
          </div>
        </div>

        <div id={HERO_CTA_ID}>
          <DownloadCta />
        </div>

        <p className="privacy">{site.privacy}</p>
      </div>

      <Screens />
    </section>
  );
}
