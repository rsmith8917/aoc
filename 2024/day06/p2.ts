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
let current = 0;
let cycleCount = 0;
for (const guardPosition of guardPositions) {
  const { guard, obstacles } = findItems(map);
  const parts = guardPosition.split(":").map((p) => parseInt(p));
  const newObstacle = { row: parts[0], col: parts[1] };
  if (!(guard.row === newObstacle.row && guard.col === newObstacle.col)) {
    obstacles.push(newObstacle);
    const slowGuard = structuredClone(guard);
    let guardAtEdge = false;
    let cycleDetected = false;
    let step = 0;
    while (!guardAtEdge && !cycleDetected) {
      moveGuard(guard, obstacles);
      if (step % 2 === 1) {
        moveGuard(slowGuard, obstacles);
      }
      step = step + 1;
      guardAtEdge = isGuardAtEdge(guard, map);
      cycleDetected = guardsMatch(guard, slowGuard);
    }
    if (cycleDetected) {
      cycleCount = cycleCount + 1;
    }
  }
  current = current + 1;
}
console.log("Elaped time (sec) = ", (Date.now() - start) / 1000);
console.log("Count = ", cycleCount);

// Functions
function moveGuard(guard: Guard, obstacles: { row: number; col: number }[]) {
  const nextCell = getNextCell(guard);
  if (isObstacle(nextCell, obstacles)) {
    turnGuard(guard);
  } else {
    stepGuard(guard);
  }
}
function guardsMatch(g1: Guard, g2: Guard) {
  return (
    g1.row === g2.row && g1.col === g2.col && g1.direction === g2.direction
  );
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
  const obstacles = [];

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
        obstacles.push({ row: i, col: j });
      }
    }
  }
  return { guard, obstacles };
}

function isGuard(cell: string) {
  return cell === "^" || cell === ">" || cell === "<" || cell === "v";
}

function isObstacle(
  pos: { row: number; col: number },
  obstacles: { row: number; col: number }[],
) {
  for (const obstacle of obstacles) {
    if (obstacle.row === pos.row && obstacle.col === pos.col) return true;
  }
  return false;
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
