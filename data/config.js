/* E. R. STAHL — public site config.
   These are NOT secrets: an EmailOctopus form action and public store links
   are meant to live in the browser. Fill them once the accounts exist.
   Leave a value empty to keep its UI in a clearly-labelled "not wired yet"
   state instead of pointing at a dead link. */

export const config = {
  // EmailOctopus embedded form action URL (from your list's "Embedded form").
  // Looks like: https://emailoctopus.com/lists/<LIST_ID>/members/embedded/.../subscribe
  emailOctopusAction: "",

  // Amazon author "Follow" page (US). Fill after the KDP author page is live.
  amazonFollowUrl: "",
};
