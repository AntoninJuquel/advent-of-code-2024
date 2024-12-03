import fs from 'fs';
import path from 'path';
import { getMulXY, sumMulXY, getEnabledMulXY, default as main } from './index';

jest.mock('fs', () => ({
  readFileSync: jest.fn(
    () =>
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"
  ),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('getMulXY', () => {
  it('should return 2 digits numbers', () => {
    const data = 'mul(44,46)';
    const expected = [[44, 46]];

    expect(getMulXY(data)).toEqual(expected);
  });
  it('should return 1-3 digits numbers', () => {
    const data = 'mul(123,4)';
    const expected = [[123, 4]];

    expect(getMulXY(data)).toEqual(expected);
  });
  it('should ignore incomplete mul sequence', () => {
    const data = 'mul(4*';
    expect(getMulXY(data)).toEqual([]);
  });
  it('should ignore incomplete mul sequence', () => {
    const data = 'mul(6,9!';
    expect(getMulXY(data)).toEqual([]);
  });
  it('should ignore invalid mul sequence', () => {
    const data = '?(12,34)';
    expect(getMulXY(data)).toEqual([]);
  });
  it('should ignore mul sequence with whitespace', () => {
    const data = 'mul ( 2 , 4 )';
    expect(getMulXY(data)).toEqual([]);
  });
  it('should return multiple mul sequences', () => {
    const data =
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
    const expected = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];

    expect(getMulXY(data)).toEqual(expected);
  });
});

describe('sumMulXY', () => {
  it('should return 0 if no numbers', () => {
    expect(sumMulXY([])).toBe(0);
  });
  it('should return the multiplication', () => {
    expect(sumMulXY([[44, 46]])).toBe(2024);

    expect(sumMulXY([[123, 4]])).toBe(492);
  });
  it('should return sum of multiple numbers', () => {
    const numbers = [
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ];
    expect(sumMulXY(numbers)).toBe(161);
  });
});

describe('getEnabledMulXY', () => {
  it('should return only enabled mul sequences', () => {
    const data =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const expected = [
      [2, 4],
      [8, 5],
    ];

    expect(getEnabledMulXY(data)).toEqual(expected);
  });
});

describe('main', () => {
  it('should read input, process reports, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sum of multiplications of numbers',
      161
    );
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sum of multiplications of enabled numbers:',
      48
    );
    consoleSpy.mockRestore();
  });
});
