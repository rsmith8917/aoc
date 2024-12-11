import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

let numbers = fileData
  .split(" ")
  .map((n) => parseInt(n))
  .filter((n) => !isNaN(n));
const memo: Record<string, number> = {};
let stoneCount = 0;
for (const number of numbers) {
  let blinkCount = 0;
  stoneCount = stoneCount + blink(number, 1, blinkCount);
}

console.log("Answer =", stoneCount);

function blink(number: number, stoneCount: number, blinkCount: number): number {
  if (memo[`${number}:${stoneCount}:${blinkCount}`]) {
    return memo[`${number}:${stoneCount}:${blinkCount}`];
  }
  if (blinkCount === 75) {
    memo[`${number}:${stoneCount}:${blinkCount}`] = stoneCount;
    return stoneCount;
  }

  if (number === 0) {
    const result = blink(1, stoneCount, blinkCount + 1);

    memo[`${number}:${stoneCount}:${blinkCount}`] = result;
    return result;
  } else if (number.toString().length % 2 === 0) {
    const numberStr = number.toString();
    const num1 = parseInt(numberStr.slice(0, numberStr.length / 2));
    const num2 = parseInt(
      numberStr.slice(numberStr.length / 2, numberStr.length),
    );
    const count1 = blink(num1, stoneCount, blinkCount + 1);
    const count2 = blink(num2, stoneCount, blinkCount + 1);
    const result = count1 + count2;
    memo[`${number}:${stoneCount}:${blinkCount}`] = result;
    return result;
  } else {
    const result = blink(number * 2024, stoneCount, blinkCount + 1);
    memo[`${number}:${stoneCount}:${blinkCount}`] = result;
    return result;
  }
}
