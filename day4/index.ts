import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const answer1 = data.reduce((acc, cur) => {
  return acc + solve(cur);
}, 0);

function solve(cur: string): number {
  const [left, right] = cur
    .split(":")[1]
    ?.split("|")
    .map((value) => value.trim()) as [string, string];

  const possibleWinningNumbers = left
    .split(" ")
    .map((value) => parseInt(value))
    .filter((cur) => !isNaN(cur));
  const comparingNumbers = right
    .split(" ")
    .map((value) => parseInt(value))
    .filter((cur) => !isNaN(cur));

  possibleWinningNumbers.sort((a, b) => a - b);
  comparingNumbers.sort((a, b) => a - b);
  console.log(possibleWinningNumbers, comparingNumbers);

  let point = 0;

  let i = 0;
  let j = 0;
  while (i < possibleWinningNumbers.length && j < comparingNumbers.length) {
    const winningNumber = possibleWinningNumbers[i]!;
    const compare = comparingNumbers[j]!;
    if (winningNumber > compare) {
      j++;
    } else if (winningNumber < compare) {
      i++;
    } else {
      point = increase(point);
      i++;
      j++;
    }
  }

  return point;
}

function increase(point: number) {
  if (point == 0) return 1;
  return point * 2;
}

console.log(answer1);
