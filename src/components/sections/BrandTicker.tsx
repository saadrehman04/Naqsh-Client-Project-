function SunburstLogo() {
  return (
    <svg
      viewBox="0 0 54 38"
      fill="currentColor"
      className="ticker-logo ticker-logo--sunburst"
      aria-hidden="true"
    >
      <path d="M19 28 A 8 8 0 0 1 35 28 Z" />
      <rect x="10" y="30.5" width="34" height="2" rx="1" />
      <path d="M10 27 L2 24 L2 22 L10 25.5 Z" />
      <path d="M12 22 L5 16.5 L6 14.8 L13 20.8 Z" />
      <path d="M15 17.5 L10 10 L11.5 8.8 L16.8 16.5 Z" />
      <path d="M19 14 L16.5 4.5 L18.5 4 L20.8 13.5 Z" />
      <path d="M23.5 12 L24 2 L26 2 L26.5 12 Z" />
      <path d="M29.2 13.5 L31.5 4 L33.5 4.5 L31 14 Z" />
      <path d="M33.2 16.5 L38.5 8.8 L40 10 L35 17.5 Z" />
      <path d="M37 20.8 L44 14.8 L45 16.5 L38 22 Z" />
      <path d="M40 25.5 L48 22 L48 24 L40 27 Z" />
    </svg>
  );
}

function GiftBoxLogo() {
  return (
    <svg
      viewBox="0 0 46 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ticker-logo ticker-logo--gift"
      aria-hidden="true"
    >
      <rect x="9" y="17" width="28" height="20" rx="1.5" />
      <rect x="6" y="12" width="34" height="5" rx="1.2" />
      <line x1="23" y1="12" x2="23" y2="37" />
      <path d="M17 12 C13 7 15 3 20 6 C22 7.2 23 11 23 12 C23 11 24 7.2 26 6 C31 3 33 7 29 12" />
    </svg>
  );
}

function MonogramLogo() {
  return (
    <svg
      viewBox="0 0 44 40"
      fill="currentColor"
      className="ticker-logo ticker-logo--monogram"
      aria-hidden="true"
    >
      <path d="M10 7 H22 C26 7 28.5 9 28.5 12 C28.5 14 27.2 15.5 25 16.2 C27.8 17 29.5 19.2 29.5 22.5 C29.5 26.5 26.5 29 22 29 H10 V7 Z M15 11 V15.5 H21 C23 15.5 24.2 14.5 24.2 13.2 C24.2 12 23 11 21 11 H15 Z M15 19.5 V25 H21.5 C23.8 25 25.2 23.8 25.2 22.2 C25.2 20.8 23.8 19.5 21.5 19.5 H15 Z" />
      <rect x="4" y="16.5" width="36" height="1.5" rx="0.75" />
    </svg>
  );
}

function PeopleLogo() {
  return (
    <svg
      viewBox="0 0 50 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ticker-logo ticker-logo--people"
      aria-hidden="true"
    >
      <circle cx="25" cy="11" r="4.2" fill="currentColor" fillOpacity="0.12" />
      <circle cx="15" cy="14" r="3.6" fill="currentColor" fillOpacity="0.12" />
      <circle cx="35" cy="14" r="3.6" fill="currentColor" fillOpacity="0.12" />
      <path d="M9 27 C11 22 16 21 20 23.5 C22.8 25.2 25 28 25 28 C25 28 27.2 25.2 30 23.5 C34 21 39 22 41 27" />
      <path d="M13 30 C18 34 22 35 25 35 C28 35 32 34 37 30" />
    </svg>
  );
}

function SparkleLogo() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className="ticker-logo ticker-logo--sparkle"
      aria-hidden="true"
    >
      <path d="M20 2 C20 12 28 20 38 20 C28 20 20 28 20 38 C20 28 12 20 2 20 C12 20 20 12 20 2 Z" />
    </svg>
  );
}

const marks = [
  {
    eyebrow: "FOR EVERY MILESTONE",
    name: "A MEANINGFUL GESTURE",
    style: "gesture",
    Logo: SunburstLogo,
  },
  {
    eyebrow: "FOR EVERY FIRST DAY",
    name: "THE WELCOME EDIT",
    style: "welcome",
    Logo: GiftBoxLogo,
  },
  {
    eyebrow: "MADE PERSONAL",
    name: "BRANDED TO BELONG",
    style: "branded",
    Logo: MonogramLogo,
  },
  {
    eyebrow: "FOR PEOPLE & CULTURE",
    name: "MOMENTS THAT MATTER",
    style: "moments",
    Logo: PeopleLogo,
  },
  {
    eyebrow: "THOUGHTFULLY CURATED",
    name: "THE GIFTING STUDIO",
    style: "studio",
    Logo: SparkleLogo,
  },
];

function MarkRow({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="brand-ticker-row" aria-hidden={duplicate || undefined}>
      {marks.map((mark) => {
        const Logo = mark.Logo;
        return (
          <div
            className={`brand-ticker-mark brand-ticker-mark--${mark.style}`}
            key={mark.name}
          >
            <div className="brand-ticker-icon-wrap" aria-hidden="true">
              <Logo />
            </div>
            <div className="brand-ticker-content">
              <span className="brand-ticker-eyebrow">{mark.eyebrow}</span>
              <strong className="brand-ticker-name">{mark.name}</strong>
            </div>
            <span className="brand-ticker-divider" aria-hidden="true" />
          </div>
        );
      })}
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
