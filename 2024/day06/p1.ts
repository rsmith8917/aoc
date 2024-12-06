import fs from "node:fs";

// Parsing
const fileData = fs.readFileSync("./input", "utf8");

const rows = fileData.split("\n").filter((r) => !!r);
const map = rows.map((r) => r.split(""));

// Main
const start = Date.now();

const { guard, obstacles } = findItems(map);
let guardAtEdge = false;
const guardPositions = new Set<string>();
guardPositions.add(`${guard.row}:${guard.col}`);

while (!guardAtEdge) {
  moveGuard(guard, obstacles);

  guardAtEdge = isGuardAtEdge(guard, map);
  guardPositions.add(`${guard.row}:${guard.col}`);
}

console.log("Elaped time (sec) = ", (Date.now() - start) / 1000);
console.log("Count = ", guardPositions.size);

// Functions
function moveGuard(guard: Guard, obstacles: Set<string>) {
  const nextCell = getNextCell(guard);
  if (isObstacle(nextCell, obstacles)) {
    turnGuard(guard);
  } else {
    stepGuard(guard);
  }
}
function isGuardAtEdge(guard: Guard, map: string[][]) {
  if (guard.direction === "^") {
    return guard.row === 0;
  }
  if (guard.direction === ">") {
    return guard.col === map[0].length - 1;
  }
  if (guard.direction === "v") {
    return guard.row === map.length - 1;
  }
  if (guard.direction === "<") {
    return guard.col === 0;
  }

  return false;
}

function stepGuard(guard: Guard) {
  if (guard.direction === "^") {
    guard.row = guard.row - 1;
    return;
  }
  if (guard.direction === ">") {
    guard.col = guard.col + 1;
    return;
  }
  if (guard.direction === "v") {
    guard.row = guard.row + 1;
    return;
  }
  if (guard.direction === "<") {
    guard.col = guard.col - 1;
    return;
  }
}

function turnGuard(guard: Guard) {
  if (guard.direction === "^") {
    guard.direction = ">";
    return;
  }
  if (guard.direction === ">") {
    guard.direction = "v";
    return;
  }
  if (guard.direction === "v") {
    guard.direction = "<";
    return;
  }
  if (guard.direction === "<") {
    guard.direction = "^";
    return;
  }
}

function findItems(map: string[][]) {
  const guard: Guard = { row: 0, col: 0, direction: "^" };
  const obstacles = new Set<string>();

  for (let i = 0; i < map.length; i++) {
    const row = rows[i];
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      if (isGuard(cell)) {
        guard.row = i;
        guard.col = j;
        guard.direction = cell;
      }

      if (cell === "#") {
        obstacles.add(i + ":" + j);
      }
    }
  }
  return { guard, obstacles };
}

function isGuard(cell: string) {
  return cell === "^" || cell === ">" || cell === "<" || cell === "v";
}

function isObstacle(pos: { row: number; col: number }, obstacles: Set<string>) {
  return obstacles.has(pos.row + ":" + pos.col);
}

function getNextCell(guard: Guard) {
  if (guard.direction === "^") return { row: guard.row - 1, col: guard.col };
  if (guard.direction === "v") return { row: guard.row + 1, col: guard.col };
  if (guard.direction === ">") return { row: guard.row, col: guard.col + 1 };
  if (guard.direction === "<") return { row: guard.row, col: guard.col - 1 };
  return { row: 0, col: 0 };
}

type Guard = {
  row: number;
  col: number;
  direction: "^" | ">" | "<" | "v";
};
