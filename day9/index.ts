import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const answerArray = data.map((report) => {
  const reportArr = report.split(" ")
  const reportArray = reportArr.map(v => parseInt(v));

  return findHistory(reportArray);
})

function findHistory(report: number[]): number {
  const sum = report.every(v => v === 0);
  if (sum) return 0;

  let diffs = [];
  let diff = 0;
  for (let i = 0; i < report.length - 1; i++) {
    diff = report[i + 1]! - report[i]!;
    diffs.push(diff);
  }

  const numberToAdd = findHistory(diffs);

  const lastNumber = report.at(-1)! + numberToAdd;

  return lastNumber;
}

console.log(answerArray.reduce((acc, cur) => acc + cur, 0));