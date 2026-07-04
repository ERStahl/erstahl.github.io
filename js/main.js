/* E. R. STAHL — main entry.
   Entries mount progressively. */
import { mountYearsCounter } from "./ledger.js";
import { renderShelf } from "./render.js";
import { renderDetail } from "./detail.js";
import { mountPrequel } from "./prequel.js";
import { mountReviews } from "./reviews.js";

mountYearsCounter();
renderShelf("#shelf-grid");
renderDetail("#detail-grid");
mountPrequel("#prequel-funnel");
mountReviews("#reviews", "#reviews-grid");
console.info("E. R. Stahl — ledger open (Phase 7 — complete).");
