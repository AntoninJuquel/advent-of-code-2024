import fs from 'fs';
import path from 'path';

function splitLinesIntoReports(data: string[]) {
  return data.map((line) =>
    line.split(' ').map((level) => parseInt(level, 10))
  );
}
function isSafe(report: number[]): boolean {
  const increasing = report.every(
    (_, i) =>
      i === 0 || (report[i] > report[i - 1] && report[i] - report[i - 1] <= 3)
  );

  const decreasing = report.every(
    (_, i) =>
      i === 0 || (report[i] < report[i - 1] && report[i - 1] - report[i] <= 3)
  );

  return increasing || decreasing;
}

function isSafeWithDampener(report: number[]): boolean {
  if (isSafe(report)) {
    return true;
  }

  let isSafeWithDampener = false;
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
    if (isSafe(modifiedReport)) {
      isSafeWithDampener = true;
      break;
    }
  }

  if (isSafeWithDampener) {
    return true;
  }

  return false;
}

export default function main() {
  const inputPath = path.join(__dirname, 'input.txt');
  const data = fs.readFileSync(inputPath, 'utf8').split('\n');
  const reports = splitLinesIntoReports(data);

  const reportsSafety = reports.map(isSafe);
  const safeReports = reportsSafety.filter((level) => level === true);
  console.log('Safe reports:', safeReports.length);

  const reportsSafetyWithDampener = reports.map(isSafeWithDampener);
  const safeReportsWithDampener = reportsSafetyWithDampener.filter(
    (level) => level === true
  );
  console.log('Safe reports with dampener:', safeReportsWithDampener.length);
}
