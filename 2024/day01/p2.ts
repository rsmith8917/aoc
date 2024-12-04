import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const lines = fileData.split("\n");
const leftList = [];
const rightList = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const parts = line.split(" ");
  const left = parseInt(parts[0]);
  if (!isNaN(left)) leftList.push(left);
  const right = parseInt(parts[3]);
  if (!isNaN(right)) rightList.push(right);
}

leftList.sort();
rightList.sort();

let leftIndex = 0;
let rightIndex = 0;
let totalScore = 0;
while (leftIndex < leftList.length && rightIndex < rightList.length) {
  let left = leftList[leftIndex];
  let right = rightList[rightIndex];
  if (left < right) {
    leftIndex = leftIndex + 1;
  }
  if (left > right) {
    rightIndex = rightIndex + 1;
  }

  if (left === right) {
    let count = 0;
    while (left === right) {
      count = count + 1;
      rightIndex = rightIndex + 1;
      right = rightList[rightIndex];
    }
    const score = left * count;
    totalScore = totalScore + score;
  }
}

console.log("Score = ", totalScore);
