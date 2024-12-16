import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const height = 103;
const width = 101;
let robots = fileData
  .split("\n")
  .map((line) => line.match(/-?[0-9]+/g))
  .map((nums) =>
    nums
      ? {
          x: parseInt(nums[0]),
          y: parseInt(nums[1]),
          vx: parseInt(nums[2]),
          vy: parseInt(nums[3]),
        }
      : null,
  )
  .filter((obj) => !!obj);
const xMemo = new Map<string, number>();
const yMemo = new Map<string, number>();
let done = false;
let i = 0;
while (!done) {
  i = i + 1;
  const robotSet = new Set<string>();
  for (const robot of robots) {
    let xStr = `${robot.x}:${robot.vx}`;
    if (xMemo.has(xStr)) {
      robot.x = xMemo.get(xStr) || 0;
    } else {
      robot.x = robot.x + robot.vx;
      if (robot.x > width - 1) {
        robot.x = robot.x - width;
      } else if (robot.x < 0) {
        robot.x = width + robot.x;
      }
      xMemo.set(xStr, robot.x);
    }

    let yStr = `${robot.y}:${robot.vy}`;
    if (yMemo.has(yStr)) {
      robot.y = yMemo.get(yStr) || 0;
    } else {
      robot.y = robot.y + robot.vy;
      if (robot.y > height - 1) {
        robot.y = robot.y - height;
      } else if (robot.y < 0) {
        robot.y = height + robot.y;
      }
      yMemo.set(yStr, robot.y);
    }
    robotSet.add(`${robot.x}:${robot.y}`);
  }

  let q1 = 0;
  let q2 = 0;
  let q3 = 0;
  let q4 = 0;
  const x = Math.floor(width / 2);
  const y = Math.floor(height / 2);
  for (const robot of robots) {
    if (robot.x < x && robot.y < y) {
      q1 = q1 + 1;
    }
    if (robot.x > x && robot.y < y) {
      q2 = q2 + 1;
    }
    if (robot.x < x && robot.y > y) {
      q3 = q3 + 1;
    }
    if (robot.x > x && robot.y > y) {
      q4 = q4 + 1;
    }
  }

  const safetyFactor = q1 * q2 * q3 * q4;
  // found this threshold via trial and error
  if (safetyFactor < 90686500) {
    printRobots(robots, height, width);
    console.log("Answer=", i);
    done = true;
  }
}

function printRobots(
  robots: { x: number; y: number }[],
  height: number,
  width: number,
) {
  const map: string[][] = [];
  for (let row = 0; row < height; row++) {
    map.push([]);
    for (let col = 0; col < width; col++) {
      map[row].push(".");
    }
  }
  for (const robot of robots) {
    map[robot.y][robot.x] = "x";
  }

  for (const line of map) {
    console.log(line.join(""));
  }
  console.log();
}
