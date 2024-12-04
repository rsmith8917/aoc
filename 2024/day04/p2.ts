import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const ws = fileData.split("\n").map((l) => l.split(""));
let count = 0;
for (let i = 1; i < ws.length - 1; i++) {
  const line = ws[i];
  for (let j = 1; j < line.length - 1; j++) {
    const letter = line[j];
    if (letter === "A") {
      const word1 = [ws[i - 1][j - 1], letter, ws[i + 1][j + 1]].join("");
      const word2 = [ws[i - 1][j + 1], letter, ws[i + 1][j - 1]].join("");
      const options = ["SAM", "MAS"];
      if (options.includes(word1) && options.includes(word2)) {
        count = count + 1;
      }
    }
  }
}

console.log("Count = ", count);
