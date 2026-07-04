/* E. R. STAHL — the prequel funnel (two steps, Chaney-style).
   Step 1: email -> The Price of Years, delivered by EmailOctopus.
   Step 2: follow on Amazon for release notifications.
   Submit is browser-side (no server proxy, no secret in runtime). */

import { config } from "../data/config.js";

export function mountPrequel(rootSelector) {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  const wired = Boolean(config.emailOctopusAction);
  const followWired = Boolean(config.amazonFollowUrl);

  // The email field name must match the EmailOctopus embedded form.
  const formInner = `
    <label class="visually-hidden" for="eo-email">Your email address</label>
    <input id="eo-email" name="email_address" type="email" inputmode="email"
           autocomplete="email" placeholder="your email address" required />
    <button type="submit" class="btn btn--brace">Send me the prequel</button>`;

  root.innerHTML = `
    <ol class="funnel">
      <li class="funnel__step">
        <p class="ledger funnel__num">Step 1</p>
        <h3 class="funnel__head">Claim your years back</h3>
        <p class="funnel__lede">Before the Censor took everything, one man paid his own years into the register. Read <em>The Price of Years</em> &mdash; the free prequel to The Drift &mdash; and see where the first debt began.</p>
        <form id="prequel-form" class="funnel__form" ${wired ? `action="${config.emailOctopusAction}" method="post"` : ""} novalidate>
          ${formInner}
        </form>
        <p id="prequel-msg" class="funnel__msg" role="status" aria-live="polite"></p>
        <p class="funnel__fine ledger">Free EPUB &amp; PDF. No spam. Leave the ledger any time.</p>
      </li>

      <li class="funnel__step">
        <p class="ledger funnel__num">Step 2</p>
        <h3 class="funnel__head">Never miss a release</h3>
        <p class="funnel__lede">Four volumes are still sealed. Follow E. R. Stahl on Amazon and get a notice the moment each one opens.</p>
        ${followWired
          ? `<a href="${config.amazonFollowUrl}" class="btn btn--ghost" target="_blank" rel="noopener">Follow on Amazon</a>`
          : `<span class="btn btn--ghost is-disabled" aria-disabled="true">Follow on Amazon</span>`}
      </li>
    </ol>`;

  const form = root.querySelector("#prequel-form");
  const msg = root.querySelector("#prequel-msg");

  form.addEventListener("submit", async (e) => {
    const email = form.querySelector("#eo-email").value.trim();

    if (!email || !email.includes("@")) {
      e.preventDefault();
      show(msg, "Enter a valid email so the ledger can find you.", "error");
      return;
    }

    if (!wired) {
      // Account not connected yet: don't pretend it worked.
      e.preventDefault();
      show(msg, "Signup opens soon. The ledger is not accepting entries yet.", "error");
      return;
    }

    // Wired: let the browser POST straight to EmailOctopus (native form post).
    // EmailOctopus shows its own confirmation page; nothing else to do here.
    show(msg, "Recording your entry\u2026", "ok");
  });
}

function show(el, text, kind) {
  el.textContent = text;
  el.className = "funnel__msg is-" + kind;
}
