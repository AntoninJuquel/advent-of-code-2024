import fs from 'fs';
import path from 'path';
import {
  isWithinBounds,
  findWord,
  countXmasOccurrences,
  default as main,
} from './index';

const data = [
  'MMMSXXMASM',
  'MSAMXMSMSA',
  'AMXSXMAAMM',
  'MSAMASMSMX',
  'XMASAMXAMM',
  'XXAMMXXAMA',
  'SMSMSASXSS',
  'SAXAMASAAA',
  'MAMMMXMMMM',
  'MXMXAXMASX',
];

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => data.join('\n')),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('isWithinBounds', () => {
  it('should return true if the coordinates are within the grid', () => {
    expect(isWithinBounds(data, 0, 0)).toBe(true);
    expect(isWithinBounds(data, 9, 9)).toBe(true);
  });

  it('should return false if the coordinates are outside the grid', () => {
    expect(isWithinBounds(data, -1, 0)).toBe(false);
    expect(isWithinBounds(data, 0, 11)).toBe(false);
    expect(isWithinBounds(data, 10, 0)).toBe(false);
    expect(isWithinBounds(data, 9, -1)).toBe(false);
  });
});

describe('findWord', () => {
  it('should return true if the word is found in the grid', () => {
    expect(findWord(data, 'XMAS', 4, 0, 0, 1)).toBe(true);
    expect(findWord(data, 'XMAS', 0, 5, 0, 1)).toBe(true);
    expect(findWord(data, 'XMAS', 0, 4, 1, 1)).toBe(true);
    expect(findWord(data, 'XMAS', 9, 9, -1, -1)).toBe(true);
  });

  it('should return false if the word is not found in the grid', () => {
    expect(findWord(data, 'XMAS', 0, 0, 1, 0)).toBe(false);
    expect(findWord(data, 'XMAS', 0, 0, 0, 1)).toBe(false);
    expect(findWord(data, 'XMAS', 0, 0, 1, 1)).toBe(false);
    expect(findWord(data, 'XMAS', 0, 0, -1, -1)).toBe(false);
  });
});

describe('countXmasOccurrences', () => {
  it('should return the number of occurrences of "XMAS"', () => {
    expect(countXmasOccurrences(data)).toBe(18);
  });
});

describe('main', () => {
  it('should read input, process reports, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Number of occurrences of XMAS:',
      18
    );
    consoleSpy.mockRestore();
  });
});
