import fs from 'fs';
import path from 'path';

export function parseLine(line: string) {
  const [targetStr, numbersStr] = line.split(': ');
  const target = Number(targetStr);
  const numbers = numbersStr.split(' ').map(Number);

  return { target, numbers };
}

export function evaluateExpression(
  numbers: number[],
  operators: string[]
): number {
  let result = numbers[0];
  for (let i = 0; i < operators.length; i++) {
    if (operators[i] === '+') {
      result += numbers[i + 1];
    } else if (operators[i] === '*') {
      result *= numbers[i + 1];
    } else if (operators[i] === '||') {
      result = Number(result.toString() + numbers[i + 1].toString());
    }
  }
  return result;
}

export function generateOperators(
  numbers: number[],
  target: number,
  operators: string[] = []
): boolean {
  if (operators.length === numbers.length - 1) {
    return evaluateExpression(numbers, operators) === target;
  }

  return (
    generateOperators(numbers, target, [...operators, '+']) ||
    generateOperators(numbers, target, [...operators, '*']) ||
    generateOperators(numbers, target, [...operators, '||'])
  );
}

export function calculateTotalCalibration(input: string[]): number {
  let total = 0;

  for (const line of input) {
    const { target, numbers } = parseLine(line);

    if (generateOperators(numbers, target)) {
      total += target;
    }
  }

  return total;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8');
  const input = data.split('\n');

  const result = calculateTotalCalibration(input);
  console.log('Total Calibration Result:', result);
}
