import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const map = fileData
  .split("\n")
  .filter((line) => !!line)
  .map((line) =>
    line
      .split("")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n)),
  );

const trailheads = getTrailheads(map);
let answer = 0;
for (const trailhead of trailheads) {
  const finalPositions = new Set<string>();
  step(map, trailhead, finalPositions);
  answer = answer + finalPositions.size;
}

console.log("Answer =", answer);

function step(
  map: number[][],
  pos: { row: number; col: number },
  finalPositions: Set<string>,
) {
  const height = map[pos.row][pos.col];
  if (height === 9) {
    // At the end of the trail. Increment the score.
    finalPositions.add(`${pos.row}:${pos.col}`);
  } else {
    // Try to take a step
    // Up
    if (pos.row > 0) {
      const heightDiff = map[pos.row - 1][pos.col] - height;
      if (heightDiff === 1) {
        // recurse
        step(map, { row: pos.row - 1, col: pos.col }, finalPositions);
      }
    }
    // Down
    if (pos.row < map.length - 1) {
      const heightDiff = map[pos.row + 1][pos.col] - height;
      if (heightDiff === 1) {
        // recurse
        step(map, { row: pos.row + 1, col: pos.col }, finalPositions);
      }
    }
    // Right
    if (pos.col < map[0].length - 1) {
      const heightDiff = map[pos.row][pos.col + 1] - height;
      if (heightDiff === 1) {
        // recurse
        step(map, { row: pos.row, col: pos.col + 1 }, finalPositions);
      }
    }
    // Left
    if (pos.col > 0) {
      const heightDiff = map[pos.row][pos.col - 1] - height;
      if (heightDiff === 1) {
        // recurse
        step(map, { row: pos.row, col: pos.col - 1 }, finalPositions);
      }
    }
  }
}

function getTrailheads(map: number[][]) {
  const trailheads = [];
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map.length; col++) {
      if (map[row][col] === 0) {
        trailheads.push({ row, col });
      }
    }
  }
  return trailheads;
}
