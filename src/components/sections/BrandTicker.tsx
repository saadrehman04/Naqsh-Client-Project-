const marks = [
  { eyebrow: "FOR EVERY FIRST DAY", name: "THE WELCOME EDIT", style: "welcome" },
  { eyebrow: "MADE PERSONAL", name: "BRANDED TO BELONG", style: "branded" },
  { eyebrow: "FOR PEOPLE & CULTURE", name: "MOMENTS THAT MATTER", style: "moments" },
  { eyebrow: "THOUGHTFULLY CURATED", name: "THE GIFTING STUDIO", style: "studio" },
  { eyebrow: "FOR EVERY MILESTONE", name: "A MEANINGFUL GESTURE", style: "gesture" },
];

function MarkRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="brand-ticker-row" aria-hidden={duplicate || undefined}>
      {marks.map((mark) => (
        <div
          className={`brand-ticker-mark brand-ticker-mark--${mark.style}`}
          key={mark.name}
        >
          <span>{mark.eyebrow}</span>
          <strong>{mark.name}</strong>
          <i aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}

export function BrandTicker() {
  return (
    <section className="brand-ticker" aria-label="Naqsh gifting specialties">
      <div className="brand-ticker-heading container-x" data-reveal="up">
        <span>Naqsh, for the moments that bring people together</span>
      </div>
      <div className="brand-ticker-window">
        <div className="brand-ticker-track" data-marquee-track>
          <MarkRow />
          <MarkRow duplicate />
        </div>
      </div>
    </section>
  );
}
