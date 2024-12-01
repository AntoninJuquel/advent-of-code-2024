const fs = require("fs");
const path = require("path");

const left = [];
const right = [];
const distances = [];

const inputPath = path.join(__dirname, "input.txt");
const outputPath = path.join(__dirname, "output.txt");

const data = fs.readFileSync(inputPath, "utf8");

data.split("\n").forEach((line) => {
  const [leftCol, rightCol] = line.trim().split(/\s+/);
  left.push(parseInt(leftCol, 10));
  right.push(parseInt(rightCol, 10));
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

for (let i = 0; i < left.length; i++) {
  distances.push(Math.abs(left[i] - right[i]));
}

const sum = distances.reduce((acc, curr) => acc + curr, 0);

fs.writeFileSync(outputPath, sum.toString());
