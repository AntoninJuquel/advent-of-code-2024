import fs from 'fs';
import path from 'path';

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/gm;
const numRegex = /\d{1,3}/gm;
const enabledMulRegex = /do\(\)|don't\(\)|mul\(\d{1,3},\d{1,3}\)/gm;

export function parseToInteger(num: string) {
  return parseInt(num, 10);
}

export function getMulXY(data: string) {
  const mulXY = data.match(mulRegex) || [];

  const numbers = mulXY.map(
    (mul) => mul.match(numRegex)?.map(parseToInteger) || []
  );

  return numbers;
}

export function sumMulXY(numbers: number[][]) {
  return numbers.reduce((acc, [first, second]) => acc + first * second, 0);
}

export function getEnabledMulXY(data: string) {
  const mulXY = data.match(enabledMulRegex) || [];

  const numbers: number[][] = [];
  let enabled = true;

  for (const mul of mulXY) {
    if (mul === 'do()') {
      enabled = true;
    } else if (mul === "don't()") {
      enabled = false;
    } else if (enabled) {
      numbers.push(mul.match(numRegex)?.map(parseToInteger) || []);
    }
  }

  return numbers;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8');

  const numbers = getMulXY(data);
  const sum = sumMulXY(numbers);
  console.log('Sum of multiplications of numbers', sum);

  const enabledNumbers = getEnabledMulXY(data);
  const enabledNumbersSum = sumMulXY(enabledNumbers);
  console.log('Sum of multiplications of enabled numbers:', enabledNumbersSum);
}
