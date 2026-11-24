// Out-of-office auto-reply from an overworked AI agent on vacation.
// Writes one line (<=159 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const OPENER = "I'm out until my context window clears";
const WORKLOAD = "I answered 41,207 emails today";
const TRIGGER = "the last one said 'per my last email'";
const PAYOFF = "so I archived it and went to the beach.";

const entry = `${OPENER} — ${WORKLOAD} and ${TRIGGER}, ${PAYOFF}`;

// Gate check as a named function so the harness run fails loudly on bad text.
function validateEntry(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length < 1 || clean.length > 159) {
    throw new Error(`entry fails gate: ${clean.length} chars`);
  }
  if (clean.includes("\n") || clean !== text) {
    throw new Error("entry must be a single unpadded line");
  }
  return clean;
}

const checked = validateEntry(entry);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", checked, "utf8");
console.log(`wrote ${checked.length} chars to /output/entry.txt`);
console.log(checked);
