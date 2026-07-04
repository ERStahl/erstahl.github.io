/* E. R. STAHL — Book One detail.
   Renders the featured book's full record from data/books.js:
   cover, synopsis, trope checklist (the US scan-and-decide list), buy row. */

import { featured } from "../data/books.js";

export function renderDetail(mountSelector) {
  const mount = document.querySelector(mountSelector);
  if (!mount || !featured) return;

  const b = featured;

  const cover = b.cover
    ? `<img src="${b.cover}" alt="Cover of ${b.title}" loading="lazy" />`
    : `<div class="detail__cover-placeholder" aria-hidden="true">
         <span>${b.volume}</span><span>${b.title}</span>
       </div>`;

  const synopsis = (b.synopsis || [b.teaser])
    .map((p) => `<p>${p}</p>`)
    .join("");

  const tropes = (b.tropes || [])
    .map((t) => `<li>${t}</li>`)
    .join("");

  // Buy buttons: enabled only when a link exists; otherwise labelled clearly.
  const amazon = b.links && b.links.amazon
    ? `<a href="${b.links.amazon}" class="btn btn--brace" target="_blank" rel="noopener">Buy on Amazon</a>`
    : `<span class="btn btn--brace is-disabled" aria-disabled="true">Buy on Amazon</span>`;

  const ku = b.links && b.links.kindleUnlimited
    ? `<a href="${b.links.kindleUnlimited}" class="btn btn--ghost" target="_blank" rel="noopener">Read on Kindle Unlimited</a>`
    : `<span class="btn btn--ghost is-disabled" aria-disabled="true">Read on Kindle Unlimited</span>`;

  mount.innerHTML = `
    <div class="detail__cover">${cover}</div>
    <div class="detail__body">
      <p class="ledger detail__eyebrow">
        <span>${b.series} &middot; ${b.volume}</span>
        <span class="detail__state">On record</span>
      </p>
      <h2 class="detail__title">${b.title}</h2>
      <div class="detail__synopsis">${synopsis}</div>

      <p class="ledger detail__tropes-head">In this record</p>
      <ul class="detail__tropes">${tropes}</ul>

      <p class="ledger detail__formats">${b.formats || ""}</p>
      <div class="detail__buy">${amazon}${ku}</div>
    </div>`;
}
