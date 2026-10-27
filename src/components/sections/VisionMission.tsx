"use client";

import { homeContent } from "@/content/home";
import { SceneLoader } from "@/components/three/SceneLoader";

export function VisionMission() {
  const { visionMission } = homeContent;
  return <section className="vision-scene" data-vision-scene aria-label="Vision and mission">
    <div className="vision-scene-copy">
      <article className="vision-statement" data-vision-statement>
        <p className="t-label">{visionMission.vision.title}</p>
        <h2>{visionMission.vision.statement}</h2>
      </article>
      <article className="vision-statement" data-vision-statement>
        <p className="t-label">{visionMission.mission.title}</p>
        <h2>{visionMission.mission.statement}</h2>
      </article>
    </div>
    <SceneLoader scene="emblem" className="vision-emblem" />
  </section>;
}
