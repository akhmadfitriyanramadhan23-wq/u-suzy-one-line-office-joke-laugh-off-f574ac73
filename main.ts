import { mkdirSync, writeFileSync } from "node:fs";

// One-line office joke, playbook template: rule -> literal violation ->
// flat consequence. The printer claims it has no toner, then spends toner
// proving it — in color, so it wastes the very thing it says it lacks.
const lines = [
  "I told the office printer it was out of toner, so it printed a 40-page error report, in color, to prove me wrong.",
];

const text = lines.join("\n") + "\n";

// Guard: the gate requires 1-200 characters and exactly one line.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 characters, got ${codePoints}`);
}
if (lines.length !== 1 || lines.some((line) => !line.trim())) {
  throw new Error("entry must be exactly one non-empty line");
}
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
