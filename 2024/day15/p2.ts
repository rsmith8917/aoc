import fs from "node:fs";
import readlineSync from "readline-sync";

// Parsing
const fileData = fs.readFileSync("./input", "utf8");
const lines = fileData.split("\n");
const robot = { row: 0, col: 0 };
const walls = new Set<string>();
const boxes = new Set<string>();
const moves: string[] = [];
let collisionboxes: { row: number; col: number }[] = [];
let width = 0;
let height = 0;
for (let row = 0; row < lines.length; row++) {
  const line = lines[row].split("");
  if (line[0] === "#") {
    height = height + 1;
    width = line.length * 2;
    for (let col = 0; col < line.length; col++) {
      const cell = line[col];
      if (cell === "#") {
        walls.add(`${row}:${col * 2}`);
        walls.add(`${row}:${col * 2 + 1}`);
      }
      if (cell === "O") {
        boxes.add(`${row}:${col * 2}`);
      }
      if (cell === "@") {
        robot.row = row;
        robot.col = col * 2;
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
  // console.log("Move", move, ":");
  const canMove = checkMoveRobot(robot, move);
  if (canMove) {
    const newRobot = parseSetItem(next(robot.row, robot.col, move));
    robot.row = newRobot.row;
    robot.col = newRobot.col;
    // console.log(collisionboxes);
    for (const box of collisionboxes) {
      boxes.delete(`${box.row}:${box.col}`);
    }
    for (const box of collisionboxes) {
      boxes.add(next(box.row, box.col, move));
    }
  }

  collisionboxes = [];
  const keepGoing = true; //readlineSync.keyInYN("Continue? (y/n)");
  if (!keepGoing) {
    break;
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

function checkMoveRobot(
  from: { row: number; col: number },
  dir: string,
): boolean {
  const { row, col } = from;
  const to = next(row, col, dir);
  if (to === "") return false;

  const toObj = parseSetItem(to);
  if (walls.has(to)) {
    return false;
  } else if (boxes.has(to)) {
    return checkMoveBox(toObj, dir);
  } else if (boxes.has(`${toObj.row}:${toObj.col - 1}`)) {
    return checkMoveBox({ row: toObj.row, col: toObj.col - 1 }, dir);
  } else {
    return true;
  }
}

function checkMoveBox(
  from: { row: number; col: number },
  dir: string,
): boolean {
  const { row, col } = from;
  collisionboxes.push(from);
  const to = next(row, col, dir);
  if (to === "") return false;

  const toObj = parseSetItem(to);
  // Box collision checks left
  if (dir === "<") {
    if (walls.has(to)) {
      return false;
    }
    if (boxes.has(`${toObj.row}:${toObj.col - 1}`)) {
      // collision with box to the left
      return checkMoveBox({ row: toObj.row, col: toObj.col - 1 }, dir);
    } else {
      return true;
    }
  }
  // Box collision checks right
  else if (dir === ">") {
    if (walls.has(`${toObj.row}:${toObj.col + 1}`)) {
      return false;
    }
    if (boxes.has(`${toObj.row}:${toObj.col + 1}`)) {
      // collision with box to the right
      return checkMoveBox({ row: toObj.row, col: toObj.col + 1 }, dir);
    } else {
      return true;
    }
  }
  // Box collision checks up
  else if (dir === "^" || dir === "v") {
    if (walls.has(to) || walls.has(`${toObj.row}:${toObj.col + 1}`)) {
      return false;
    }

    const hasBoxToUpperLeft = boxes.has(`${toObj.row}:${toObj.col - 1}`);
    const hasBoxToUpperRight = boxes.has(`${toObj.row}:${toObj.col + 1}`);
    const hasBoxDirectlyUp = boxes.has(`${toObj.row}:${toObj.col}`);

    if (hasBoxDirectlyUp) {
      // collision with box directly above
      return checkMoveBox({ row: toObj.row, col: toObj.col }, dir);
    } else if (hasBoxToUpperRight && hasBoxToUpperLeft) {
      // collision with two boxes above
      const canMoveLeftBox = checkMoveBox(
        { row: toObj.row, col: toObj.col - 1 },
        dir,
      );
      const canMoveRightBox = checkMoveBox(
        { row: toObj.row, col: toObj.col + 1 },
        dir,
      );
      return canMoveLeftBox && canMoveRightBox;
    } else if (hasBoxToUpperLeft) {
      // collision with box to upper left
      return checkMoveBox({ row: toObj.row, col: toObj.col - 1 }, dir);
    } else if (hasBoxToUpperRight) {
      // collision with box to upper right
      return checkMoveBox({ row: toObj.row, col: toObj.col + 1 }, dir);
    } else {
      return true;
    }
  } else {
    // catch all
    return false;
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
    map[row][col] = "[";
    map[row][col + 1] = "]";
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
