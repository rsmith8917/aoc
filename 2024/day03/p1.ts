import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const regexp = /mul\([0-9]{1,3},[0-9]{1,3}\)/g;
const matches = fileData.matchAll(regexp);

let sum = 0;
for (const match of matches) {
  const instruction = match[0];
  const regexp = /mul\(([0-9]{1,3}),([0-9]{1,3})/;
  const matches = instruction.match(regexp);

  if (matches && matches[1] && matches[2]) {
    const num1 = parseInt(matches[1]);
    const num2 = parseInt(matches[2]);
    const product = num1 * num2;
    sum = sum + product;
  }
}

console.log("Sum = ", sum);
