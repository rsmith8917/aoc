import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");
const lines = fileData.split("\n").filter((l) => !!l);
type Antenna = {
  row: number;
  col: number;
  freq: string;
};
const antennas: Antenna[] = [];
const frequencies = new Set<string>();
let totalCols = 0;
for (let row = 0; row < lines.length; row++) {
  const line = lines[row].split("");
  totalCols = line.length;
  for (let col = 0; col < line.length; col++) {
    const cell = line[col];
    if (cell !== ".") {
      antennas.push({ row, col, freq: cell });
      frequencies.add(cell);
    }
  }
}

const antinodes = new Set<string>();
for (const frequency of frequencies) {
  const matchingAntennas = antennas.filter((a) => a.freq === frequency);
  for (let i = 0; i < matchingAntennas.length; i++) {
    for (let j = 0; j < matchingAntennas.length; j++) {
      if (i !== j) {
        const ant1 = matchingAntennas[i];
        const ant2 = matchingAntennas[j];
        antinodes.add(`${ant1.row}:${ant1.col}`);
        const rowDelta = ant1.row - ant2.row;
        const colDelta = ant1.col - ant2.col;
        const antinode = {
          row: ant1.row + rowDelta,
          col: ant1.col + colDelta,
        };

        while (
          antinode.row < lines.length &&
          antinode.row >= 0 &&
          antinode.col >= 0 &&
          antinode.col < totalCols
        ) {
          antinodes.add(`${antinode.row}:${antinode.col}`);

          antinode.row = antinode.row + rowDelta;
          antinode.col = antinode.col + colDelta;
        }
      }
    }
  }
}
console.log("Count = ", antinodes.size);
