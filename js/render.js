/* E. R. STAHL — saga renderer.
   Builds the book cards from data/books.js. Book cards are ledger rows:
   an entry number, the volume, its state (ON RECORD / SEALED), and a line. */

import { books } from "../data/books.js";

function pad(n) {
  return String(n).padStart(2, "0");
}

function bookCard(b) {
  const available = b.status === "available";
  const stateLabel = available ? "ON RECORD" : "SEALED";
  const title = b.title || "Untitled";

  const cover = available && b.cover
    ? `<div class="book-card__cover">
         <picture>
           <source srcset="${b.cover.replace(/\.jpg$/, ".webp")}" type="image/webp" />
           <img src="${b.cover}" alt="Cover of ${title}" loading="lazy" />
         </picture>
       </div>`
    : `<div class="book-card__cover book-card__cover--sealed" aria-hidden="true">
         <span class="book-card__vol">${b.volume}</span>
       </div>`;

  const action = available
    ? `<a href="#book-detail" class="btn btn--brace book-card__cta">Get Book One</a>`
    : `<span class="book-card__pending ledger">Entry pending</span>`;

  return `
    <article class="book-card ${available ? "is-available" : "is-sealed"}" id="${b.id}">
      ${cover}
      <div class="book-card__body">
        <p class="ledger book-card__meta">
          <span class="book-card__num">VOL ${pad(b.order)}</span>
          <span class="book-card__state ${available ? "is-open" : ""}">${stateLabel}</span>
        </p>
        <h3 class="book-card__title">${available ? title : "&mdash;&mdash;&mdash;"}</h3>
        <p class="book-card__teaser">${b.teaser}</p>
        ${action}
      </div>
    </article>`;
}

export function renderShelf(mountSelector) {
  const mount = document.querySelector(mountSelector);
  if (!mount) return;
  mount.innerHTML = books.map(bookCard).join("");
}
