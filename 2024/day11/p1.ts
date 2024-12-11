import fs from "node:fs";

const fileData = fs.readFileSync("./input", "utf8");

let numbers = fileData
  .split(" ")
  .map((n) => parseInt(n))
  .filter((n) => !isNaN(n));

for (let i = 0; i < 25; i++) {
  const newNumbers = [];
  for (const number of numbers) {
    const numberStr = number.toString();

    if (number === 0) {
      newNumbers.push(1);
    } else if (numberStr.length % 2 === 0) {
      const num1 = parseInt(numberStr.slice(0, numberStr.length / 2));
      const num2 = parseInt(
        numberStr.slice(numberStr.length / 2, numberStr.length),
      );

      newNumbers.push(num1);
      newNumbers.push(num2);
    } else {
      newNumbers.push(2024 * number);
    }
  }
  numbers = newNumbers;
}
console.log("Answer =", numbers.length);
