import fs from 'fs';
import path from 'path';
import {
  splitLinesIntoReports,
  isSafe,
  isSafeWithDampener,
  default as main,
} from './index';

describe('splitLinesIntoReports', () => {
  it('should split lines into reports', () => {
    const data = ['1 2 3', '4 5 6'];
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    expect(splitLinesIntoReports(data)).toEqual(expected);
  });
});

const reports = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
];

jest.mock('fs', () => ({
  readFileSync: jest.fn(() =>
    reports.map((report) => report.join(' ')).join('\n')
  ),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('isSafe', () => {
  it('should return true because the levels are all decreasing by 1 or 2', () => {
    expect(isSafe(reports[0])).toBe(true);
  });

  it('should return false because 2 7 is an increase of 5', () => {
    expect(isSafe(reports[1])).toBe(false);
  });

  it('should return false because 6 2 is a decrease of 4', () => {
    expect(isSafe(reports[2])).toBe(false);
  });

  it('should return false because 1 3 is increasing but 3 2 is decreasing', () => {
    expect(isSafe(reports[3])).toBe(false);
  });

  it('should return false because 4 4 is neither an increase or a decrease', () => {
    expect(isSafe(reports[4])).toBe(false);
  });

  it('should return true because the levels are all increasing by 1, 2, or 3', () => {
    expect(isSafe(reports[5])).toBe(true);
  });
});

describe('isSafeWithDampener', () => {
  it('should return true without removing any level', () => {
    expect(isSafeWithDampener(reports[0])).toBe(true);
  });

  it('should return false regardless of which level is removed', () => {
    expect(isSafeWithDampener(reports[1])).toBe(false);
  });

  it('should return false regardless of which level is removed', () => {
    expect(isSafeWithDampener(reports[2])).toBe(false);
  });

  it('should return true by removing the second level, 3', () => {
    expect(isSafeWithDampener(reports[3])).toBe(true);
  });

  it('should return true by removing the third level, 4', () => {
    expect(isSafeWithDampener(reports[4])).toBe(true);
  });

  it('should return true without removing any level', () => {
    expect(isSafeWithDampener(reports[5])).toBe(true);
  });
});

describe('main', () => {
  it('should read input, process reports, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith('Safe reports:', 2);
    expect(consoleSpy).toHaveBeenCalledWith('Safe reports with dampener:', 4);
    consoleSpy.mockRestore();
  });
});
