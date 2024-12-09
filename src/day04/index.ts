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

export function isXmasPattern(grid: string[], x: number, y: number): boolean {
  const patterns = [
    [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, 0],
    ],
    [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, 0],
    ],
    [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, 0],
    ],
    [
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
      [0, 0],
    ],
  ];

  const letterSets = [
    ['M', 'S', 'M', 'S', 'A'],
    ['S', 'S', 'M', 'M', 'A'],
    ['M', 'M', 'S', 'S', 'A'],
    ['S', 'M', 'S', 'M', 'A'],
  ];

  for (let p = 0; p < patterns.length; p++) {
    const deltas = patterns[p];
    const letters = letterSets[p];
    let matches = true;

    for (let i = 0; i < deltas.length; i++) {
      const [dx, dy] = deltas[i];
      const nx = x + dx;
      const ny = y + dy;

      if (!isWithinBounds(grid, nx, ny) || grid[nx][ny] !== letters[i]) {
        matches = false;
        break;
      }
    }

    if (matches) return true;
  }

  return false;
}

export function countXmasPatterns(grid: string[]): number {
  let count = 0;

  for (let i = 1; i < grid.length - 1; i++) {
    for (let j = 1; j < grid[0].length - 1; j++) {
      if (isXmasPattern(grid, i, j)) {
        count++;
      }
    }
  }

  return count;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');

  const xmasOccurrences = countXmasOccurrences(data);
  console.log('Number of occurrences of XMAS:', xmasOccurrences);

  const xmasPatterns = countXmasPatterns(data);
  console.log('Number of XMAS patterns:', xmasPatterns);
}
