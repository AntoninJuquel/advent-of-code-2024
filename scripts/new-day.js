const fs = require('fs');
const path = require('path');

const daysPath = path.resolve(__dirname, '../src');

const days = fs.readdirSync(daysPath).filter((el) => el.includes('day'));
const lastDay = days
  .map((el) => Number(el.replace('day', '')))
  .sort((a, b) => b - a)[0];
const dayString = `day${(lastDay + 1).toString().padStart(2, '0')}`;
const dir = path.resolve(daysPath, `${dayString}`);

fs.mkdirSync(dir);
fs.writeFileSync(path.resolve(dir, 'input.txt'), '');
fs.writeFileSync(
  path.resolve(dir, 'index.ts'),
  `export default function main(): void {\n  console.log("Hello from ${dayString}");\n}\n`
);
fs.writeFileSync(
  path.resolve(dir, 'index.test.ts'),
  `describe("${dayString}", () => {\n  it("should work", () => {\n    expect(1).toBe(1);\n  });\n});`
);

console.log(`Day ${dayString} created at ${dir}`);
