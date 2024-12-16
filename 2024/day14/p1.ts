import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const seconds = 100;
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

for (let i = 0; i < seconds; i++) {
  for (const robot of robots) {
    robot.x = robot.x + robot.vx;
    if (robot.x > width - 1) {
      robot.x = robot.x - width;
    }
    if (robot.x < 0) {
      robot.x = width + robot.x;
    }
    robot.y = robot.y + robot.vy;
    if (robot.y > height - 1) {
      robot.y = robot.y - height;
    }
    if (robot.y < 0) {
      robot.y = height + robot.y;
    }
  }
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

console.log("Answer =", q1 * q2 * q3 * q4);
