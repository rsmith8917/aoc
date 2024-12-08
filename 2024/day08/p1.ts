import fs from "node:fs";

const fileData = fs.readFileSync("./test_input", "utf8");
const lines = fileData.split("\n").filter((l) => !!l);
type Antenna = {
  row: number;
  col: number;
  freq: string;
};
const antennas: Antenna[] = [];
const frequencies = new Set<string>();
let totalRows = 0;
for (let row = 0; row < lines.length; row++) {
  const line = lines[row].split("");
  totalRows = line.length;
  for (let col = 0; col < line.length; col++) {
    const cell = line[col];
    if (cell !== ".") {
      antennas.push({ row, col, freq: cell });
      frequencies.add(cell);
    }
  }
}
console.log(totalRows);
const antinodes = new Set<{ row: number; col: number }>();
for (const frequency of frequencies) {
  const matchingAntennas = antennas.filter((a) => a.freq === frequency);

  for (let i = 0; i < matchingAntennas.length; i++) {
    for (let j = 0; j < matchingAntennas.length; j++) {
      if (i !== j) {
        const ant1 = matchingAntennas[i];
        const ant2 = matchingAntennas[j];
        const antinode = {
          row: ant1.row + (ant1.row - ant2.row),
          col: ant1.col + (ant1.col - ant2.col),
        };

        if (
          antinode.row < totalRows - 1 &&
          antinode.row >= 0 &&
          antinode.col >= 0 &&
          antinode.col < lines.length - 1 &&
          !antennas.some(
            (a) => a.row === antinode.row && a.col === antinode.col,
          )
        ) {
          antinodes.add(antinode);
        }
      }
    }
  }
}
console.log(antinodes);
console.log("Count = ", antinodes.size);
