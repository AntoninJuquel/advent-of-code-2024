import fs from 'fs';
import path from 'path';
import {
  parseInput,
  isUpdateValid,
  getMiddlePage,
  reorderUpdate,
  solvePrintQueue,
  default as main,
} from './index';

const data = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const rules = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

const updates = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => data),
}));
jest.mock('path', () => ({
  join: jest.fn(() => 'mockFilePath'),
}));

describe('splitPageInstructions', () => {
  it('splits the input into rules and page updates', () => {
    const { rules: testRules, updates: testUpdates } = parseInput(data);
    expect(testRules).toEqual(rules);
    expect(testUpdates).toEqual(updates);
  });
});

describe('isUpdateValid', () => {
  it('returns true if the update is in the right order', () => {
    expect(isUpdateValid(updates[0], rules)).toBe(true);
  });

  it('returns false if the update is not in the correct order', () => {
    expect(isUpdateValid(updates[3], rules)).toBe(false);
  });
});

describe('getMiddlePage', () => {
  it('returns the middle page of an update', () => {
    expect(getMiddlePage(updates[0])).toBe(61);
    expect(getMiddlePage(updates[1])).toBe(53);
    expect(getMiddlePage(updates[2])).toBe(29);
  });
});

describe('reorderUpdate', () => {
  it('reorders the update based on the rules', () => {
    expect(reorderUpdate(updates[3], rules)).toEqual([97, 75, 47, 61, 53]);
    expect(reorderUpdate(updates[4], rules)).toEqual([61, 29, 13]);
    expect(reorderUpdate(updates[5], rules)).toEqual([97, 75, 47, 29, 13]);
  });
});

describe('solvePrintQueue', () => {
  it('returns the sum of middle pages for valid updates', () => {
    const result = solvePrintQueue(data);
    expect(result.sumOfMiddlePagesCorrect).toBe(143);
    expect(result.sumOfMiddlePagesReordered).toBe(123);
  });
});

describe('main', () => {
  it('should read input, process reports, and log results', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    main();
    expect(path.join).toHaveBeenCalledWith(__dirname, 'input.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('mockFilePath', 'utf8');
    expect(consoleSpy).toHaveBeenCalledWith('Sum of middle pages:', 143);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Sum of middle pages after reordering:',
      123
    );
    consoleSpy.mockRestore();
  });
});
