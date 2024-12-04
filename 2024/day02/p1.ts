import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const lines = fileData.split("\n");

function isIncreasing(levels: number[]) {
  let i = 1;
  while (i < levels.length) {
    if (levels[i] <= levels[i - 1]) {
      return false;
    }
    i = i + 1;
  }
  return true;
}
function isDecreasing(levels: number[]) {
  let i = 1;
  while (i < levels.length) {
    if (levels[i] >= levels[i - 1]) {
      return false;
    }
    i = i + 1;
  }
  return true;
}
function isGradual(levels: number[]) {
  let i = 1;
  while (i < levels.length) {
    const diff = Math.abs(levels[i] - levels[i - 1]);
    if (diff > 3) {
      return false;
    }
    i = i + 1;
  }
  return true;
}

function isSafe(levels: number[]) {
  const inc = isIncreasing(levels);
  const dec = isDecreasing(levels);
  const grad = isGradual(levels);
  return (inc || dec) && grad;
}

let count = 0;
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const levels = line
    .split(" ")
    .map((l) => parseInt(l))
    .filter((l) => !isNaN(l));
  if (levels.length > 0) {
    if (isSafe(levels)) {
      count = count + 1;
    }
  }
}

console.log("Safe count = ", count);
