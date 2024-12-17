import fs from "node:fs";

// Parsing
const fileData = fs.readFileSync("./input", "utf8");
const lines = fileData.split("\n");
const robot = { row: 0, col: 0 };
const walls = new Set<string>();
const boxes = new Set<string>();
const moves: string[] = [];

let width = 0;
let height = 0;
for (let row = 0; row < lines.length; row++) {
  const line = lines[row].split("");
  if (line[0] === "#") {
    height = height + 1;
    width = line.length;
    for (let col = 0; col < line.length; col++) {
      const cell = line[col];
      if (cell === "#") {
        walls.add(`${row}:${col}`);
      }
      if (cell === "O") {
        boxes.add(`${row}:${col}`);
      }
      if (cell === "@") {
        robot.row = row;
        robot.col = col;
      }
    }
  } else {
    for (const move of line.filter((l) => ["<", ">", "^", "v"].includes(l))) {
      moves.push(move);
    }
  }
}

// Main
print(robot, walls, boxes, height, width);
for (const move of moves) {
  const canMove = checkMove(robot, move);
  if (canMove) {
    const newRobot = parseSetItem(next(robot.row, robot.col, move));
    robot.row = newRobot.row;
    robot.col = newRobot.col;
  }
}
print(robot, walls, boxes, height, width);
let gps = 0;
for (const box of boxes) {
  const { row, col } = parseSetItem(box);
  gps = gps + calcGps(row, col);
}
console.log("Answer =", gps);

// Functions
function calcGps(row: number, col: number) {
  return row * 100 + col;
}

function checkMove(from: { row: number; col: number }, dir: string): boolean {
  const { row, col } = from;
  const to = next(row, col, dir);
  if (to === "") return false;
  if (walls.has(to)) {
    return false;
  } else if (boxes.has(to)) {
    const toObj = parseSetItem(to);
    const canMove = checkMove(toObj, dir);
    if (canMove) {
      boxes.delete(to);
      boxes.add(next(toObj.row, toObj.col, dir));
      return canMove;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function next(row: number, col: number, dir: string) {
  if (dir === "<") {
    return `${row}:${col - 1}`;
  } else if (dir === ">") {
    return `${row}:${col + 1}`;
  } else if (dir === "^") {
    return `${row - 1}:${col}`;
  } else if (dir === "v") {
    return `${row + 1}:${col}`;
  } else {
    return "";
  }
}
function print(
  robot: { row: number; col: number },
  walls: Set<string>,
  boxes: Set<string>,
  height: number,
  width: number,
) {
  const map: string[][] = [];

  for (let row = 0; row < height; row++) {
    const line = [];
    for (let col = 0; col < width; col++) {
      line.push(".");
    }
    map.push(line);
  }

  map[robot.row][robot.col] = "@";

  for (const wall of walls) {
    const { row, col } = parseSetItem(wall);
    map[row][col] = "#";
  }
  for (const box of boxes) {
    const { row, col } = parseSetItem(box);
    map[row][col] = "O";
  }

  for (const line of map) {
    console.log(line.join(""));
  }
  console.log("");
}

function parseSetItem(item: string) {
  const parts = item.split(":");
  return {
    row: parseInt(parts[0]),
    col: parseInt(parts[1]),
  };
}
