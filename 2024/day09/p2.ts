import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

const numbers = fileData
  .split("")
  .map((n) => parseInt(n))
  .filter((n) => !isNaN(n));

const disk = [];
const files = [];
let id = 0;
let position = 0;
for (let i = 0; i < numbers.length; i++) {
  const number = numbers[i];
  if (i % 2 === 0) {
    files.push({ id, size: number, position });
    for (let j = 0; j < number; j++) {
      disk.push(id);
      position = position + 1;
    }
    id = id + 1;
  } else {
    for (let j = 0; j < number; j++) {
      disk.push(".");
      position = position + 1;
    }
  }
}

files.reverse();

for (const file of files) {
  let start = 0;
  let end = 0;
  let fileMoved = false;

  while (!fileMoved && end < file.position) {
    if (disk[start] !== ".") {
      // In another file. Take a step forward, looking for start of free space.
      start = start + 1;
      end = end + 1;
    } else {
      if (disk[end] !== ".") {
        // Not enough free space to fit file. Reset and look for a bigger spot.
        end = end + 1;
        start = end;
      } else {
        const availableSpace = end - start + 1;
        if (file.size > availableSpace) {
          // File doesn't fit. Keep expanding search to see if there's enough free space.
          end = end + 1;
        } else {
          // File fits! Move it to the free space.
          for (let i = 0; i < file.size; i++) {
            disk[start + i] = disk[file.position + i];
            disk[file.position + i] = ".";
          }
          fileMoved = true;
        }
      }
    }
  }
}

let checksum = 0;

for (let i = 0; i < disk.length; i++) {
  const value = parseInt(disk[i].toString());
  if (!isNaN(value)) {
    checksum = checksum + i * value;
  }
}

console.log(checksum);
