import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const lines = fileData.split("\n");

let Y = 0;
let ay = 0;
let ax = 0;
let X = 0;
let by = 0;
let bx = 0;

let totalTokens = 0;
for (const line of lines) {
  if (line.includes("A")) {
    const regex = /Button A: X\+([0-9]*), Y\+([0-9]*)/gm;
    const matches = regex.exec(line);
    ax = parseInt(matches?.[1] ?? "0");
    ay = parseInt(matches?.[2] ?? "0");
  } else if (line.includes("B")) {
    const regex = /Button B: X\+([0-9]*), Y\+([0-9]*)/gm;
    const matches = regex.exec(line);
    bx = parseInt(matches?.[1] ?? "0");
    by = parseInt(matches?.[2] ?? "0");
  } else if (line.includes("Prize")) {
    const regex = /Prize: X=([0-9]*), Y=([0-9]*)/gm;
    const matches = regex.exec(line);
    X = parseInt(matches?.[1] ?? "0") + 10000000000000;
    Y = parseInt(matches?.[2] ?? "0") + 10000000000000;

    const B = Math.round((Y - (ay / ax) * X) / (by - (ay * bx) / ax));
    const A = Math.round((X - B * bx) / ax);
    const check = A * ax + B * bx;
    const check2 = A * ay + B * by;

    if (X === check && Y === check2 && A >= 0 && B >= 0) {
      const tokens = A * 3 + B;
      totalTokens = totalTokens + tokens;
    }
    Y = 0;
    ay = 0;
    ax = 0;
    X = 0;
    by = 0;
    bx = 0;
  }
}

console.log("Answer =", totalTokens);
