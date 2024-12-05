import fs from "node:fs";

// Parsing
const fileData = fs.readFileSync("./input", "utf8");

const lines = fileData.split("\n");
const rules = [];
const updates = [];
for (const line of lines) {
  if (line.includes("|")) {
    // Parse rule
    const pages = line
      .split("|")
      .map((page) => parseInt(page))
      .filter((page) => !isNaN(page));
    if (pages.length > 0) rules.push(pages);
  } else {
    // Parse update
    const pages = line
      .split(",")
      .map((page) => parseInt(page))
      .filter((page) => !isNaN(page));
    if (pages.length > 0) updates.push(pages);
  }
}

// Main
let total = 0;
for (const update of updates) {
  let pass = false;
  let swapCount = 0;
  while (!pass) {
    const result = checkRules(update, rules);
    pass = result.pass;
    if (!pass) {
      const violation = result.violation;
      swap(update, violation);
      swapCount = swapCount + 1;
    }
  }

  if (swapCount > 0) {
    const middleValue = getMiddleValue(update);
    total = total + middleValue;
  }
}

console.log("Total = ", total);

function swap(update: number[], violation: number[] | null) {
  if (violation != null) {
    const firstIdx = update.findIndex((u) => u === violation[0]);
    const secondIdx = update.findIndex((u) => u === violation[1]);

    update[firstIdx] = violation[1];
    update[secondIdx] = violation[0];
  }
}

function checkRules(update: number[], rules: number[][]) {
  const indexes: Record<number, number> = {};
  for (let i = 0; i < update.length; i++) {
    indexes[update[i]] = i;
  }

  for (const rule of rules) {
    const first = rule[0];
    const second = rule[1];
    const firstIdx = indexes[first];
    const secondIdx = indexes[second];
    if (firstIdx != null && secondIdx != null) {
      if (secondIdx < firstIdx) return { pass: false, violation: rule };
    }
  }

  return { pass: true, violation: null };
}

function getMiddleValue(update: number[]) {
  return update[Math.floor((update.length - 1) / 2)];
}
