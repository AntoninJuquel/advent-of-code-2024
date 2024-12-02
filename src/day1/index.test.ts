import fs from 'fs';
import path from 'path';
import {
  splitLinesIntoColumns,
  calculateDistance,
  calculateSimilarity,
  default as main,
} from './index';

const left = [3, 4, 2, 1, 3, 3];
const right = [4, 3, 5, 3, 9, 3];

jest.mock('fs', () => ({
  readFileSync: jest.fn(() =>
    left.map((num, index) => `${num}   ${right[index]}`).join('\n')
  ),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('splitColumnsIntoLists', () => {
  it('should split columns into lists', () => {
    const data = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'];
    const { left: leftTest, right: rightTest } = splitLinesIntoColumns(data);
    expect(leftTest).toEqual(left);
    expect(rightTest).toEqual(right);
  });
});

describe('calculateDistance', () => {
  it('should calculate the distance between two lists', () => {
    expect(calculateDistance(left, right)).toBe(11);
  });
});

describe('calculateSimilarity', () => {
  it('should calculate the similarity between two lists', () => {
    expect(calculateSimilarity(left, right)).toBe(31);
  });
});

describe('main', () => {
  it('should read input, calculate distance and similarity, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith('Distance:', 11);
    expect(consoleSpy).toHaveBeenCalledWith('Similarity:', 31);
    consoleSpy.mockRestore();
  });
});
