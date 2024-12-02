import { readFileSync } from 'fs';

export function readInput(filePath: string) {
  return readFileSync(filePath, 'utf-8').trim().split('\n');
}
