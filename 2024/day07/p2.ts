import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const lines = fileData.split("\n");
let total = 0;
for (const line of lines) {
  if (line.includes(":")) {
    const value = parseInt(line.split(":")[0]);
    const numbers = line
      .split(":")[1]
      .split(" ")
      .map((n) => parseInt(n))
      .filter((n) => !isNaN(n));

    const results: number[] = [];
    foo(1, numbers[0], numbers, results);
    if (results.includes(value)) {
      total = total + value;
    }
  }
}

console.log(total);

function foo(
  index: number,
  start: number,
  numbers: number[],
  results: number[],
) {
  if (index === numbers.length) {
    results.push(start);
  } else {
    const num1 = start + numbers[index];
    const num2 = start * numbers[index];
    foo(index + 1, num1, numbers, results);
    foo(index + 1, num2, numbers, results);
  }
}
