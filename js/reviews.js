/* E. R. STAHL — social proof.
   Renders real reviews as ledger testimony. If there are none, the whole
   section is removed from the page: better empty than fake. */

import { reviews } from "../data/reviews.js";

function stars(n) {
  const full = "\u2605".repeat(n);      // ★
  const empty = "\u2606".repeat(5 - n); // ☆
  return `<span class="review__stars" aria-label="${n} out of 5 stars">${full}${empty}</span>`;
}

function reviewCard(r) {
  return `
    <figure class="review">
      ${stars(r.stars || 5)}
      <blockquote class="review__quote">${r.quote}</blockquote>
      <figcaption class="review__by">
        <span class="review__name">${r.name}</span>
        <span class="ledger review__source">${r.source}</span>
      </figcaption>
    </figure>`;
}

export function mountReviews(sectionSelector, gridSelector) {
  const section = document.querySelector(sectionSelector);
  if (!section) return;

  if (!reviews.length) {
    // No verified reviews yet: remove the section entirely.
    section.remove();
    return;
  }

  const grid = section.querySelector(gridSelector);
  grid.innerHTML = reviews.map(reviewCard).join("");
}
