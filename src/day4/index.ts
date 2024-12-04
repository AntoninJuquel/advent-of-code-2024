import fs from 'fs';
import path from 'path';

export function isWithinBounds(grid: string[], x: number, y: number): boolean {
  return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
}

export function findWord(
  grid: string[],
  word: string,
  x: number,
  y: number,
  dx: number,
  dy: number
): boolean {
  for (let i = 0; i < word.length; i++) {
    const nx = x + i * dx;
    const ny = y + i * dy;
    if (isWithinBounds(grid, nx, ny)) {
      const isCorrectLetter = grid[nx][ny] === word[i];
      if (!isCorrectLetter) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}

export function countXmasOccurrences(grid: string[]): number {
  const word = 'XMAS';
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  let count = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      for (const [dx, dy] of directions) {
        if (findWord(grid, word, x, y, dx, dy)) {
          count++;
        }
      }
    }
  }

  return count;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  const result = countXmasOccurrences(data);
  console.log('Number of occurrences of XMAS:', result);
}
