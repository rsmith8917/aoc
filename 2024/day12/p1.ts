import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const garden = fileData
  .split("\n")
  .filter((line) => !!line)
  .map((line) => line.split("").filter((plant) => !!plant));

const regions: Set<string>[] = [];

for (let row = 0; row < garden.length; row++) {
  for (let col = 0; col < garden[0].length; col++) {
    const str = `${row}:${col}`;

    if (!regions.some((r) => r.has(str))) {
      const region = new Set<string>();
      region.add(str);
      addNeighbors(region, garden, row, col);
      regions.push(region);
    }
  }
}

let answer = 0;
for (const region of regions) {
  let perimeter = 0;
  for (const str of region) {
    // For each plant in each region, check neighboring plants.
    // If it is at the edge of the garden or if the neighboring plant
    // is different, increment the perimeter
    const parts = str.split(":");
    const row = parseInt(parts[0]);
    const col = parseInt(parts[1]);
    const plant = garden[row][col];
    // Up
    if (row === 0 || garden[row - 1][col] !== plant) {
      perimeter = perimeter + 1;
    }

    // Down
    if (row === garden.length - 1 || garden[row + 1][col] !== plant) {
      perimeter = perimeter + 1;
    }
    // Left
    if (col === 0 || garden[row][col - 1] !== plant) {
      perimeter = perimeter + 1;
    }
    // Right
    if (col === garden[0].length || garden[row][col + 1] !== plant) {
      perimeter = perimeter + 1;
    }
  }
  const area = region.size;
  const price = area * perimeter;
  answer = answer + price;
}

console.log("Answer =", answer);

function addNeighbors(
  region: Set<string>,
  garden: string[][],
  row: number,
  col: number,
) {
  const plant = garden[row][col];

  // Up
  if (row > 0 && garden[row - 1][col] === plant) {
    const str = `${row - 1}:${col}`;
    if (!region.has(str)) {
      region.add(str);
      addNeighbors(region, garden, row - 1, col);
    }
  }
  // Down
  if (row < garden.length - 1 && garden[row + 1][col] === plant) {
    const str = `${row + 1}:${col}`;
    if (!region.has(str)) {
      region.add(str);
      addNeighbors(region, garden, row + 1, col);
    }
  }
  // Left
  if (col > 0 && garden[row][col - 1] === plant) {
    const str = `${row}:${col - 1}`;
    if (!region.has(str)) {
      region.add(str);
      addNeighbors(region, garden, row, col - 1);
    }
  }
  // Right
  if (col < garden[0].length && garden[row][col + 1] === plant) {
    const str = `${row}:${col + 1}`;
    if (!region.has(str)) {
      region.add(str);
      addNeighbors(region, garden, row, col + 1);
    }
  }
}
