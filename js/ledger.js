/* E. R. STAHL — the ledger counter.
   Converts the visitor's time on page into years, the currency of The Drift.
   One small, thematic, living element. Nothing else moves on this site. */

const SECONDS_PER_YEAR = 31557600; // Julian year: 365.25 days

export function mountYearsCounter() {
  const el = document.createElement("div");
  el.className = "years-counter";
  el.setAttribute("aria-hidden", "true"); // decorative for screen readers
  el.innerHTML =
    '<span class="years-counter__line">This visit has cost you</span>' +
    '<span class="years-counter__figure"><b>0.0000000</b> <span>YRS</span></span>' +
    '<span class="years-counter__line">The ledger does not forget</span>';
  document.body.appendChild(el);

  const figure = el.querySelector("b");
  const t0 = performance.now();

  // Update ~4 times per second: alive, but not frantic.
  const tick = () => {
    const years = (performance.now() - t0) / 1000 / SECONDS_PER_YEAR;
    figure.textContent = years.toFixed(7);
  };

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    // Respect reduced motion: update once per second, no faster.
    setInterval(tick, 1000);
  } else {
    setInterval(tick, 250);
  }
}
