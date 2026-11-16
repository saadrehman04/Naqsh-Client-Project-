/**
 * Built-in question answering: no API, runs in the browser.
 * Scores each knowledge entry with BM25 over its question (weighted), keywords and answer,
 * after normalising synonyms and simple word endings. Below the confidence threshold the bot
 * does not guess: it hands the visitor to WhatsApp.
 */
import { knowledgeBase, type KnowledgeEntry } from "./knowledge";

export type BotReply =
  | { kind: "answer"; entry: KnowledgeEntry; related: KnowledgeEntry[] }
  | { kind: "smalltalk"; text: string }
  | { kind: "fallback" };

const STOPWORDS = new Set(
  (
    "a an the and or but if of to in on at for from by with about as is are was were be been being am " +
    "do does did doing have has had i me my we our us you your yours it its this that these those there " +
    "can could would should will shall may might must please tell know want need like just also any some " +
    "what which who whom whose when where why how hi hello hey thanks thank ok okay yes no not " +
    "ka ki ke hai hain ho kya mein main aap ap hum"
  ).split(" ")
);
// Question words that still carry meaning for intent and must survive stopword removal.
const KEEP = new Set(["where", "when", "how", "long", "much", "many"]);

/** Phrase-level synonyms, applied before tokenising. Order matters: longer phrases first. */
const PHRASES: [RegExp, string][] = [
  [/\bhow much\b|\bkitn[ae]\b|\bqeemat\b/g, " price "],
  [/\bhow long\b|\bhow many days\b|\bkitne din\b/g, " timeline "],
  [/\bmoq\b|\bmin(imum)? (order|qty|quantity)\b/g, " minimum order quantity "],
  [/\bwelcome (kit|box)(es|s)?\b|\bonboarding\b|\bnew (hire|joiner)s?\b/g, " welcome kit onboarding "],
  [/\bwhats ?app\b|\bwa\b/g, " whatsapp contact "],
  [/\bramzan\b|\bramadan\b/g, " ramadan "],
  [/\beid ul (fitr|adha)\b/g, " eid "],
  [/\be-?mail\b/g, " email "],
];

/** Single-word synonyms → canonical word. */
const SYNONYMS: Record<string, string> = {
  ship: "deliver", shipping: "deliver", shipped: "deliver", courier: "deliver", dispatch: "deliver",
  delivered: "deliver", delivering: "deliver", deliveries: "deliver", send: "deliver",
  cost: "price", costs: "price", pricing: "price", prices: "price", rate: "price", rates: "price",
  charge: "price", charges: "price", expensive: "price", cheap: "price", affordable: "price",
  customise: "customize", customised: "customize", customization: "customize", customisation: "customize",
  customized: "customize", personalise: "personalize", personalised: "personalize",
  personalization: "personalize", personalisation: "personalize", personalized: "personalize",
  logos: "logo", branding: "logo", branded: "logo",
  gifts: "gift", gifting: "gift", hamper: "basket", hampers: "basket", baskets: "basket",
  pay: "payment", paying: "payment", payments: "payment",
  quantity: "quantity", qty: "quantity", pieces: "quantity", units: "quantity",
  sample: "sample", samples: "sample",
  catalogue: "collection", catalog: "collection", collections: "collection", range: "collection",
  products: "product", items: "product",
  phone: "contact", call: "contact", number: "contact", reach: "contact",
  located: "location", address: "location", office: "location", based: "location", kahan: "location",
  days: "timeline", weeks: "timeline", urgent: "timeline", rush: "timeline", deadline: "timeline",
  trophy: "trophies", medal: "medals", award: "awards",
  conference: "event", seminar: "event", events: "event",
  colleagues: "employee", staff: "employee", employees: "employee", team: "employee",
  clients: "client", customers: "client", customer: "client",
};

function stem(word: string): string {
  if (word.length <= 4) return word;
  if (word.endsWith("ies")) return word.slice(0, -3) + "y";
  if (word.endsWith("ing") && word.length > 6) return word.slice(0, -3);
  if (word.endsWith("ed") && word.length > 5) return word.slice(0, -2);
  if (word.endsWith("es") && /(sh|ch|x|ss)es$/.test(word)) return word.slice(0, -2);
  if (word.endsWith("s") && !word.endsWith("ss")) return word.slice(0, -1);
  return word;
}

export function tokenize(text: string): string[] {
  let t = ` ${text.toLowerCase().replace(/[’']/g, "").replace(/&/g, " and ")} `;
  t = t.replace(/[^a-z0-9\s-]/g, " ").replace(/-/g, " ");
  for (const [re, rep] of PHRASES) t = t.replace(re, rep);
  return t
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => SYNONYMS[w] ?? w)
    .filter((w) => KEEP.has(w) || (!STOPWORDS.has(w) && w.length > 1))
    .map(stem);
}

/* ---------------- BM25 index (built once) ---------------- */

const FIELD_WEIGHTS = { question: 3, keywords: 2.2, answer: 0.4 } as const;
const K1 = 1.2;
const B = 0.75;

interface Doc {
  entry: KnowledgeEntry;
  tf: Map<string, number>;
  len: number;
}

const docs: Doc[] = knowledgeBase.map((entry) => {
  const tf = new Map<string, number>();
  let len = 0;
  (Object.keys(FIELD_WEIGHTS) as (keyof typeof FIELD_WEIGHTS)[]).forEach((field) => {
    const text = entry[field] ?? "";
    for (const tok of tokenize(text)) {
      tf.set(tok, (tf.get(tok) ?? 0) + FIELD_WEIGHTS[field]);
      len += FIELD_WEIGHTS[field];
    }
  });
  return { entry, tf, len };
});

const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length;
const df = new Map<string, number>();
for (const d of docs) for (const tok of d.tf.keys()) df.set(tok, (df.get(tok) ?? 0) + 1);
const idf = (tok: string) => {
  const n = df.get(tok) ?? 0;
  return Math.log(1 + (docs.length - n + 0.5) / (n + 0.5));
};

function score(doc: Doc, query: string[]): number {
  let s = 0;
  for (const tok of query) {
    const f = doc.tf.get(tok);
    if (!f) continue;
    s += idf(tok) * ((f * (K1 + 1)) / (f + K1 * (1 - B + (B * doc.len) / avgLen)));
  }
  return s;
}

/* ---------------- Small talk ---------------- */

const GREETING = /^(hi+|hello|hey|salam|salaam|assalam|assalamualaikum|aoa|good (morning|afternoon|evening))\b/;
const THANKS = /\b(thanks|thank you|thankyou|shukriya|jazakallah|great|perfect|awesome)\b/;
const BYE = /^(bye|goodbye|see you|allah hafiz|khuda hafiz)\b/;

/**
 * Topics the site has no confirmed answer for (hours, people, socials, jobs, discounts).
 * These always go to WhatsApp so the bot never guesses.
 */
const UNKNOWN_TOPIC =
  /\b(working hours|office hours|business hours|timings?|opening|closing time|open on|sunday|saturday|ceo|founder|owner|manager|staff names?|instagram|linkedin|facebook|tiktok|social media|jobs?|careers?|hiring|vacanc\w*|internships?|discounts?|coupons?|promos?|promo codes?|sales?)\b/;
/** "Who are you / what is NAQSH" style questions: mostly stopwords, so match them directly. */
const IDENTITY = /\bwho (are|r) (you|u)\b|\bwhat (is|does) naqsh\b|\babout (you|naqsh|your company)\b|\bwhat do you do\b/;

/** Minimum best score to answer; below it the bot refers the visitor to WhatsApp. */
const THRESHOLD = 2;
/** A runner-up must be this close to the best to be offered as "related". */
const RELATED_RATIO = 0.45;

export function answer(input: string): BotReply {
  const raw = input.trim().toLowerCase();
  const query = tokenize(raw);

  if (query.length === 0 || (GREETING.test(raw) && query.length <= 2)) {
    if (BYE.test(raw)) return { kind: "smalltalk", text: "Thank you for visiting NAQSH. Allah Hafiz!" };
    if (THANKS.test(raw)) return { kind: "smalltalk", text: "You're welcome! Anything else I can help you with?" };
    if (GREETING.test(raw))
      return {
        kind: "smalltalk",
        text: "Hello! Ask me about our services, gift collections, customization, delivery or ordering.",
      };
    return { kind: "fallback" };
  }
  if (THANKS.test(raw) && query.length <= 3)
    return { kind: "smalltalk", text: "You're welcome! Anything else I can help you with?" };
  if (BYE.test(raw)) return { kind: "smalltalk", text: "Thank you for visiting NAQSH. Allah Hafiz!" };

  if (UNKNOWN_TOPIC.test(raw)) return { kind: "fallback" };
  if (IDENTITY.test(raw)) {
    const about = knowledgeBase.find((e) => e.id === "about");
    if (about) return { kind: "answer", entry: about, related: [] };
  }

  const ranked = docs
    // Product/collection detail entries yield slightly to general answers on near-ties,
    // so "can you add our logo" answers the branding FAQ, not one product's customisation list.
    .map((d) => ({ entry: d.entry, s: score(d, query) * (d.entry.hideFromSuggestions ? 0.9 : 1) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s);

  const best = ranked[0];
  if (!best || best.s < THRESHOLD) return { kind: "fallback" };

  const related = ranked
    .slice(1)
    .filter((r) => !r.entry.hideFromSuggestions && r.s >= best.s * RELATED_RATIO && r.entry.question !== best.entry.question)
    .slice(0, 2)
    .map((r) => r.entry);

  return { kind: "answer", entry: best.entry, related };
}

/** Debug helper for tests: top matches with scores. */
export function rank(input: string, n = 3) {
  const query = tokenize(input);
  return docs
    .map((d) => ({ id: d.entry.id, s: +score(d, query).toFixed(2) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n);
}
