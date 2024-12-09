import fs from 'fs';
import path from 'path';

export function parseInput(inputText: string) {
  const lines = inputText.split('\n').filter((line) => line.trim() !== '');

  const rulesSection = lines.filter((line) => line.includes('|'));
  const updatesSection = lines.filter((line) => line.includes(','));

  const rules = rulesSection.map((line) => {
    return line.split('|').map(Number);
  });

  const updates = updatesSection.map((line) => line.split(',').map(Number));

  return { rules, updates };
}

export function isUpdateValid(update: number[], rules: number[][]): boolean {
  const positionMap = new Map<number, number>();

  update.forEach((page, index) => positionMap.set(page, index));

  for (const [x, y] of rules) {
    if (positionMap.has(x) && positionMap.has(y)) {
      if (positionMap.get(x)! > positionMap.get(y)!) {
        return false;
      }
    }
  }

  return true;
}

export function getMiddlePage(update: number[]): number {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
}

export function reorderUpdate(update: number[], rules: number[][]): number[] {
  const dependencyGraph = new Map<number, Set<number>>();
  const pages = new Set(update);

  for (const [x, y] of rules) {
    if (pages.has(x) && pages.has(y)) {
      if (!dependencyGraph.has(y)) {
        dependencyGraph.set(y, new Set());
      }
      dependencyGraph.get(y)!.add(x);
    }
  }

  const sortedPages: number[] = [];
  const visited = new Set<number>();

  function visit(page: number): void {
    if (visited.has(page)) {
      return;
    }
    visited.add(page);
    const dependencies = dependencyGraph.get(page) || new Set();
    for (const dep of dependencies) {
      visit(dep);
    }
    sortedPages.push(page);
  }

  for (const page of update) {
    visit(page);
  }

  return sortedPages;
}

export function solvePrintQueue(input: string) {
  const { rules, updates } = parseInput(input);

  let sumOfMiddlePagesCorrect = 0;
  let sumOfMiddlePagesReordered = 0;

  for (const update of updates) {
    if (isUpdateValid(update, rules)) {
      sumOfMiddlePagesCorrect += getMiddlePage(update);
    } else {
      const reorderedUpdate = reorderUpdate(update, rules);
      sumOfMiddlePagesReordered += getMiddlePage(reorderedUpdate);
    }
  }

  return {
    sumOfMiddlePagesCorrect,
    sumOfMiddlePagesReordered,
  };
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8');

  const { sumOfMiddlePagesCorrect, sumOfMiddlePagesReordered } =
    solvePrintQueue(data);

  console.log('Sum of middle pages:', sumOfMiddlePagesCorrect);
  console.log(
    'Sum of middle pages after reordering:',
    sumOfMiddlePagesReordered
  );
}
