import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const ws = fileData.split("\n").map((l) => l.split(""));
let count = 0;
for (let i = 0; i < ws.length; i++) {
  const line = ws[i];
  for (let j = 0; j < line.length; j++) {
    // Horizontal
    if (j + 3 < line.length) {
      const candidate = [
        ws[i][j],
        ws[i][j + 1],
        ws[i][j + 2],
        ws[i][j + 3],
      ].join("");
      if (candidate === "XMAS" || candidate === "SAMX") {
        count = count + 1;
      }
    }

    // Vertical
    if (i + 3 < ws.length) {
      const candidate = [
        ws[i][j],
        ws[i + 1][j],
        ws[i + 2][j],
        ws[i + 3][j],
      ].join("");
      if (candidate === "XMAS" || candidate === "SAMX") {
        count = count + 1;
      }
    }

    // Diagonal Right
    if (i + 3 < ws.length && j + 3 < ws.length) {
      const candidate = [
        ws[i][j],
        ws[i + 1][j + 1],
        ws[i + 2][j + 2],
        ws[i + 3][j + 3],
      ].join("");
      if (candidate === "XMAS" || candidate === "SAMX") {
        count = count + 1;
      }
    }

    // Diagonal Left
    if (i + 3 < ws.length && j - 3 >= 0) {
      const candidate = [
        ws[i][j],
        ws[i + 1][j - 1],
        ws[i + 2][j - 2],
        ws[i + 3][j - 3],
      ].join("");
      if (candidate === "XMAS" || candidate === "SAMX") {
        count = count + 1;
      }
    }
  }
}

console.log("Count = ", count);
