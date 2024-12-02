import fs from 'fs';
import path from 'path';
function splitLinesIntoLevels(data: string[]) {
  return data.map((line) =>
    line.split(' ').map((level) => parseInt(level, 10))
  );
}
function isLevelSafe(arr: number[]): boolean {
  let isIncreasing = true;
  let isDecreasing = true;

  for (let i = 0; i < arr.length - 1; i++) {
    const current = arr[i];
    const next = arr[i + 1];
    const distance = Math.abs(current - next);

    if (distance < 1 || distance > 3) {
      return false;
    }

    if (current >= next) {
      isIncreasing = false;
    }

    if (current <= next) {
      isDecreasing = false;
    }
  }

  return isIncreasing || isDecreasing;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');
  const levels = splitLinesIntoLevels(data);
  const levelsSafety = levels.map(isLevelSafe);
  const safeLevels = levelsSafety.filter((level) => level === true);
  console.log('Safe levels:', safeLevels.length);
}
