import { Emblem } from "@/components/brand/Logo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { homeContent } from "@/content/home";

export function VisionMission() {
  const { visionMission } = homeContent;

  return (
    <section
      className="vision-panel on-dark"
      data-vision-scene
      aria-labelledby="vision-panel-heading"
    >
      {/* Black overlay element fades 0 -> 1 over the first 25% of viewport entry */}
      <div
        className="vision-black-overlay"
        data-vision-overlay
        aria-hidden="true"
      />
      <div className="vision-pin-stage" data-vision-pin>
        <div className="container-x relative z-10">
          <header className="vision-panel-heading" data-reveal="up">
            <div>
              <SectionLabel variant="ivory">{visionMission.label}</SectionLabel>
              <h2 id="vision-panel-heading" data-reveal="lines">
                Gifting with intention.
              </h2>
            </div>
            <Emblem variant="copper" className="vision-panel-emblem" />
          </header>

          <div className="vision-panel-stage">
            <article
              className="vision-panel-card is-active"
              data-vision-card="vision"
            >
              <span className="vision-panel-index">01</span>
              <div>
                <p>{visionMission.vision.title}</p>
                <h3 data-vision-words="vision">
                  {visionMission.vision.statement}
                </h3>
              </div>
            </article>

            <div
              className="vision-diamond-divider"
              data-vision-divider
              aria-hidden="true"
            >
              <span className="vision-divider-line" />
              <span className="vision-divider-diamond" />
              <span className="vision-divider-line" />
            </div>

            <article
              className="vision-panel-card"
              data-vision-card="mission"
            >
              <span className="vision-panel-index">02</span>
              <div>
                <p>{visionMission.mission.title}</p>
                <h3 data-vision-words="mission">
                  {visionMission.mission.statement}
                </h3>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
