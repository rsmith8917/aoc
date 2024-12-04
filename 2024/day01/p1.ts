import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const lines = fileData.split("\n");
const leftList = [];
const rightList = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(" ");
  leftList.push(parseInt(parts[0]));
  rightList.push(parseInt(parts[3]));
}

leftList.sort();
rightList.sort();

let sum = 0;
for (let i = 0; i < leftList.length; i++) {
  const left = leftList[i];
  const right = rightList[i];
  if (!isNaN(left) && !isNaN(right)) {
    const diff = Math.abs(left - right);
    sum = sum + diff;
  }
}

console.log("Sum = ", sum);
