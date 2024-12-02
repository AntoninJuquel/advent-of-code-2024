import {
  splitColumnsIntoLists,
  calculateDistance,
  calculateSimilarity,
} from './index';

describe('splitColumnsIntoLists', () => {
  it('should split columns into lists', () => {
    const data = ['1 2', '3 4', '5 6'];
    const { left, right } = splitColumnsIntoLists(data);
    expect(left).toEqual([1, 3, 5]);
    expect(right).toEqual([2, 4, 6]);
  });

  it('should ignore leading and trailing whitespace', () => {
    const data = ['  1 2  ', '  3 4  ', '  5 6  '];
    const { left, right } = splitColumnsIntoLists(data);
    expect(left).toEqual([1, 3, 5]);
    expect(right).toEqual([2, 4, 6]);
  });
});

describe('calculateDistance', () => {
  it('should calculate the distance between two lists', () => {
    const left = [1, 3, 5];
    const right = [2, 4, 6];
    expect(calculateDistance(left, right)).toBe(3);
  });

  it('should handle negative numbers', () => {
    const left = [-1, -3, -5];
    const right = [-2, -4, -6];
    expect(calculateDistance(left, right)).toBe(3);
  });
});

describe('calculateSimilarity', () => {
  it('should calculate the similarity between two lists', () => {
    const left = [1, 3, 5];
    const right = [2, 3, 6];
    expect(calculateSimilarity(left, right)).toBe(3);
  });

  it('should handle negative numbers', () => {
    const left = [-1, -3, -5];
    const right = [-2, -3, -6];
    expect(calculateSimilarity(left, right)).toBe(-3);
  });
});
