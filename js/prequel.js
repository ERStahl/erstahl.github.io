/* E. R. STAHL — prequel funnel Step 2 (the release-follow).
   Step 1 is the EmailOctopus embed in index.html (its script draws the
   field + button; the site's CSS restyles it to the ledger look).
   Step 2 is rendered here so its Amazon link stays data-driven. */

import { config } from "../data/config.js";

export function mountPrequel(step2Selector) {
  const step2 = document.querySelector(step2Selector);
  if (!step2) return;

  const wired = Boolean(config.amazonFollowUrl);
  const cta = wired
    ? `<a href="${config.amazonFollowUrl}" class="btn btn--ghost" target="_blank" rel="noopener">Follow on Amazon</a>`
    : `<span class="btn btn--ghost is-disabled" aria-disabled="true">Follow on Amazon</span>`;

  step2.innerHTML = `
    <p class="ledger funnel__num">Step 2</p>
    <h3 class="funnel__head">Never miss a release</h3>
    <p class="funnel__lede">Four volumes are still sealed. Follow E. R. Stahl on Amazon and get a notice the moment each one opens.</p>
    ${cta}`;
}
