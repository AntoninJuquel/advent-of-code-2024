import fs from 'fs';
import path from 'path';
import {
  parseLine,
  evaluateExpression,
  generateOperators,
  calculateTotalCalibration,
  default as main,
} from './index';

const data = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => data),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('parseLine', () => {
  it('should parse the line correctly', () => {
    expect(parseLine(data.split('\n')[0])).toEqual({
      target: 190,
      numbers: [10, 19],
    });
  });
});

describe('evaluateExpression', () => {
  it('should evaluate simple multiplication', () => {
    expect(evaluateExpression([10, 19], ['*'])).toBe(190);
  });
  it('should evaluate simple addition', () => {
    expect(evaluateExpression([10, 19], ['+'])).toBe(29);
  });
  it('should evaluate simple concatenation', () => {
    expect(evaluateExpression([10, 19], ['||'])).toBe(1019);
  });
});

describe('generateOperators', () => {
  it('should generate the correct operators', () => {
    expect(generateOperators([6, 8, 6, 15], 7290)).toBe(true);
    expect(generateOperators([9, 7, 18, 13], 21037)).toBe(false);
  });
});

describe('calculateTotalCalibration', () => {
  it('should calculate the total calibration', () => {
    expect(calculateTotalCalibration(data.split('\n'))).toBe(11387);
  });
});

describe('main', () => {
  it('should read input, process reports, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith('Total Calibration Result:', 11387);
    consoleSpy.mockRestore();
  });
});
