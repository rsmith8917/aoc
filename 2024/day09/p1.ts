import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const numbers = fileData
  .split("")
  .map((n) => parseInt(n))
  .filter((n) => !isNaN(n));

console.log(numbers);

const disk = [];
let id = 0;
for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  if (i % 2 === 0) {
    for (let j = 0; j < number; j++) {
      disk.push(id);
    }
    id = id + 1;
  } else {
    for (let j = 0; j < number; j++) {
      disk.push(".");
    }
  }
}

let start = 0;
let end = disk.length - 1;

while (end > start) {
  if (disk[start] === ".") {
    disk[start] = disk[end];
    disk[end] = ".";
    end = end - 1;
  } else {
    start = start + 1;
  }
}

console.log(disk.join(""));

let checksum = 0;

for (let i = 0; i < disk.length; i++) {
  const value = parseInt(disk[i].toString());
  if (!isNaN(value)) {
    checksum = checksum + i * value;
  }
}

console.log(checksum);
