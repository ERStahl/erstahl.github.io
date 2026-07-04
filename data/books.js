/* E. R. STAHL — THE DRIFT saga data.
   Single source of truth: every book card on the site renders from here.
   To add a volume when it publishes: fill its entry, set status "available". */

export const saga = {
  name: "The Drift",
  author: "E. R. Stahl",
  hook: "In a dying universe, your years are currency — and one immortal owns the ledger.",
  atmosphere: "The engine that lit a thousand worlds is freezing the universe to death.",
  comps: ["Dune", "The Expanse"],
  plannedVolumes: 5,
};

export const books = [
  {
    id: "book-one",
    order: 1,
    status: "available",
    series: "The Drift",
    volume: "Book One",
    title: "Half a Degree",
    cover: "assets/covers/book-one.jpg", // added when asset lands
    teaser: "Half a degree is the margin between a world and a tomb.",
    synopsis: [
      "The Well was meant to warm a thousand worlds. Instead it drinks the void, and the void answers with the Cold \u2014 a frost that spreads star to star, closing the sky one degree at a time.",
      "Six of them carry the last living fire between the dying suns, thawing worlds that were left to freeze. Every world they save costs the deathless man who rules them a single year of his own \u2014 and he keeps a ledger. He always collects.",
      "Half a degree is all that stands between the next world and the last. It will not hold."
    ],
    tropes: [
      "Dying-universe hard SF",
      "Life measured and traded as currency",
      "A deathless, ledger-keeping antagonist",
      "Small crew, impossible cargo",
      "Cold-as-antagonist survival stakes",
      "First book of a sealed five-volume arc"
    ],
    formats: "Paperback \u00b7 Kindle \u00b7 Kindle Unlimited",
    links: {
      amazon: "https://www.amazon.com/dp/B0H6TMXJSC",
      kindleUnlimited: "https://www.amazon.com/dp/B0H6TMXJSC",
    },
  },
  {
    id: "book-two",
    order: 2,
    status: "coming-soon",
    placeholder: true,
    series: "The Drift",
    volume: "Book Two",
    title: null,
    cover: null,
    teaser: "The Cold does not negotiate.",
    links: {},
  },
  {
    id: "book-three",
    order: 3,
    status: "coming-soon",
    placeholder: true,
    series: "The Drift",
    volume: "Book Three",
    title: null,
    cover: null,
    teaser: "The fine things die first.",
    links: {},
  },
  {
    id: "book-four",
    order: 4,
    status: "coming-soon",
    placeholder: true,
    series: "The Drift",
    volume: "Book Four",
    title: null,
    cover: null,
    teaser: "The ledger comes due.",
    links: {},
  },
  {
    id: "book-five",
    order: 5,
    status: "coming-soon",
    placeholder: true,
    series: "The Drift",
    volume: "Book Five",
    title: null,
    cover: null,
    teaser: "Every debt has a face.",
    links: {},
  },
];

export const featured = books.find((b) => b.status === "available");
export const upcoming = books.filter((b) => b.status === "coming-soon");

/* --- Games (future category) -------------------------------------------
   The Ledger Game (tabletop RPG) is in development, not yet for sale.
   When it ships, fill an entry here and the site can render a product card
   the same way it does for books. No fake price/link until it exists. */
export const games = [
  {
    id: "ledger-game",
    status: "in-development",      // -> "available" when it ships
    title: "The Price of Years — the Ledger Game",
    kind: "Tabletop RPG",
    teaser: "Keep the sum even. Or someone gets struck.",
    channel: "",                    // "DriveThruRPG" | "itch.io" | "Amazon" — decided later
    links: {},                      // filled when for sale
  },
];
