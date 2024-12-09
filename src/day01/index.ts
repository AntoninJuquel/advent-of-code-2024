import fs from 'fs';
import path from 'path';

export function splitLinesIntoColumns(data: string[]) {
  const left: number[] = [];
  const right: number[] = [];

  data.forEach((line) => {
    const [leftCol, rightCol] = line.trim().split(/\s+/);
    left.push(parseInt(leftCol, 10));
    right.push(parseInt(rightCol, 10));
  });

  return { left, right };
}

function sortFn(a: number, b: number) {
  return a - b;
}

function sumReducer(acc: number, curr: number) {
  return acc + curr;
}

export function calculateDistance(left: number[], right: number[]) {
  left.sort(sortFn);
  right.sort(sortFn);
  const distances = left.map((num, index) => Math.abs(num - right[index]));
  const distanceSum = distances.reduce(sumReducer, 0);
  return distanceSum;
}

export function calculateSimilarity(left: number[], right: number[]) {
  const similarities = left.map(
    (num) => right.filter((rightNum) => rightNum === num).length * num
  );
  const similaritySum = similarities.reduce(sumReducer, 0);
  return similaritySum;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');
  const { left, right } = splitLinesIntoColumns(data);
  console.log('Distance:', calculateDistance(left, right));
  console.log('Similarity:', calculateSimilarity(left, right));
}
