// Entry: one-line office joke for the laugh-off bounty.
// Template from the playbook: state the rule, have the machine violate
// it literally, land the consequence flat. Here the rule is "the printer
// is out of toner"; the printer violates it by burning toner on a 40-page
// color error report that proves it is not out of toner at all.
import { mkdirSync, writeFileSync } from "node:fs";

// The joke itself — one sentence, kept verbatim.
const JOKE =
  "I told the office printer it was out of toner, so it printed a 40-page error report, in color, to prove me wrong.";

const MAX_CHARS = 200;
const MIN_CHARS = 1;
const EXPECTED_LINES = 1;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "/output/entry.txt";
const OUTPUT_SUFFIX = "\n";

// Gate check 1: the entry must be a single line, no line breaks inside.
function assertSingleLine(value: string): void {
  const parts = value.split("\n");
  if (parts.length !== EXPECTED_LINES) {
    throw new Error(`entry must be exactly ${EXPECTED_LINES} line, got ${parts.length}`);
  }
}

// Gate check 2: the entry must not be empty.
function assertNonEmpty(value: string): void {
  if (value.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
}

// Gate check 3: character count (code points) must sit inside 1-200.
function assertLengthInRange(value: string): void {
  const count = Array.from(value).length;
  if (count < MIN_CHARS || count > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${count}`,
    );
  }
}

assertSingleLine(JOKE);
assertNonEmpty(JOKE);
assertLengthInRange(JOKE);

const payload = JOKE + OUTPUT_SUFFIX;

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_FILE, payload, "utf8");
