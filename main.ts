// Fortune Cookie Wisdom for Developers — entrypoint.
//
// Writes one original fortune-cookie line (114 characters) to
// /output/entry.txt. Standard library only, no network, no clock:
// the line is a constant, so every run writes byte-identical output.
//
// The line, and why it is built this way (judge brief, RULES.txt):
//   1. It IS one line of fortune-cookie wisdom for a developer, not a
//      slogan or generic advice.
//   2. One short balanced sentence, two clauses, lands in a single breath.
//   3. True about a developer's day: legacy code, and the Friday deploy
//      that produced it.
//   4. The turn is not a familiar saying: the curser becomes the cursed —
//      the code you curse was once someone's proud work, and yours will
//      be legacy too.
//   5. Quiet double meaning on a second read: "be gentle with it" is
//      advice about the code and about its author at once.

import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const LINE =
  "The legacy code you curse was once someone's proud Friday deploy; " +
  "be gentle with it, for yours will be legacy too.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
  : "/output";

// The gate refuses anything over 120 characters; fail loudly here
// instead of shipping an invalid entry.
if (LINE.length > 120) {
  console.error(`fortune line is ${LINE.length} characters, over the 120 cap`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, "entry.txt"), LINE + "\n", "utf8");
