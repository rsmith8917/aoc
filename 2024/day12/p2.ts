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
  // Get first and last row and col in region
  let firstRow = garden.length;
  let firstCol = garden.length;
  let lastRow = 0;
  let lastCol = 0;
  let numSides = 0;
  for (const str of region) {
    const parts = str.split(":");
    const row = parseInt(parts[0]);
    const col = parseInt(parts[1]);
    if (row < firstRow) {
      firstRow = row;
    }
    if (col < firstCol) {
      firstCol = col;
    }
    if (row > lastRow) {
      lastRow = row;
    }
    if (col > lastCol) {
      lastCol = col;
    }
  }

  // Scan through rows top to bottom and columns left to right
  // looking for top sides (neighbor is different) and keeping track
  // of when we are in a continuous side with boolean flag
  let topSides = 0;
  for (let row = firstRow; row <= lastRow; row++) {
    let inFenceTop = false;
    for (let col = firstCol; col <= lastCol; col++) {
      if (region.has(`${row}:${col}`)) {
        const plant = garden[row][col];
        if (row === 0 || plant !== garden[row - 1][col]) {
          if (!inFenceTop) {
            inFenceTop = true;
            numSides = numSides + 1;
            topSides = topSides + 1;
          }
        } else {
          inFenceTop = false;
        }
      } else {
        inFenceTop = false;
      }
    }
  }

  // Repeat scan bottom to top to look for bottom sides
  let botSides = 0;
  for (let row = lastRow; row >= firstRow; row--) {
    let inFenceBottom = false;
    for (let col = firstCol; col <= lastCol; col++) {
      if (region.has(`${row}:${col}`)) {
        const plant = garden[row][col];
        if (row === garden.length - 1 || plant !== garden[row + 1][col]) {
          if (!inFenceBottom) {
            inFenceBottom = true;
            numSides = numSides + 1;
            botSides = botSides + 1;
          }
        } else {
          inFenceBottom = false;
        }
      } else {
        inFenceBottom = false;
      }
    }
  }

  // Repeat scan left to right to look for left sides
  let leftSides = 0;
  for (let col = firstCol; col <= lastCol; col++) {
    let inFenceLeft = false;
    for (let row = firstRow; row <= lastRow; row++) {
      if (region.has(`${row}:${col}`)) {
        const plant = garden[row][col];
        if (col === 0 || plant !== garden[row][col - 1]) {
          if (!inFenceLeft) {
            inFenceLeft = true;
            numSides = numSides + 1;
            leftSides = leftSides + 1;
          }
        } else {
          inFenceLeft = false;
        }
      } else {
        inFenceLeft = false;
      }
    }
  }

  // Repeat scan right to left to look for right sides
  let rightSides = 0;
  for (let col = lastCol; col >= firstCol; col--) {
    let inFenceRight = false;
    for (let row = firstRow; row <= lastRow; row++) {
      if (region.has(`${row}:${col}`)) {
        const plant = garden[row][col];
        if (col === garden[0].length - 1 || plant !== garden[row][col + 1]) {
          if (!inFenceRight) {
            inFenceRight = true;
            numSides = numSides + 1;
            rightSides = rightSides + 1;
          }
        } else {
          inFenceRight = false;
        }
      } else {
        inFenceRight = false;
      }
    }
  }
  const area = region.size;
  const price = area * numSides;
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
