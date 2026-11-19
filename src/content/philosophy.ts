/**
 * Our Philosophy page. Text is verbatim from the client's "Website Content 2.pdf"
 * (received 2026-11-19). Do not reword.
 */

export interface PhilosophyPrinciple {
  term: string;
  text: string;
}

export const philosophyContent = {
  label: "Our Philosophy",
  title: "Rooted in Ethics. Crafted with Integrity.",
  intro:
    "At Naqsh, we believe in reflecting the highest standards of integrity, responsibility, and purpose. Our operations are guided by ethical and Shariah-compliant principles across every touchpoint:",
  principles: [
    {
      term: "100% Interest-Free",
      text: "We operate entirely without interest-based loans, credit lines, or bank borrowings, ensuring pure and transparent financial practices without any involvement of riba.",
    },
    {
      term: "Conscious & Ethical Sourcing",
      text: "We strictly vet our supply chain. We do not source from companies that support or fund genocides, nor do we compromise on fair labor or environmental responsibility.",
    },
    {
      term: "Promise Kept (Amanah)",
      text: "We stand behind fair pricing, honest representation, and delivering the exact quality we promise - on time, every time.",
    },
    {
      term: "Dignified Storytelling",
      text: "Our branding, packaging, and content are created with modesty and within the bounds of Islamic guidelines.",
    },
    {
      term: "Halal Standards",
      text: "Every gift is carefully selected to be permissible and free from any prohibited elements.",
    },
  ] satisfies PhilosophyPrinciple[],
  closing:
    "Perfection belongs to the Almighty alone. As we take every precaution to uphold these principles, we pray for His continued guidance and forgiveness on any unintentional shortcomings.",
};
