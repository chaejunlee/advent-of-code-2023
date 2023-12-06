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

const scratchCards: number[] = [];
for (let i = 0; i < data.length; i++) scratchCards.push(1);
console.log(scratchCards);

data.forEach((cur, idx) => {
  solve2(cur, idx);
});

function solve2(cur: string, idx: number) {
  if (scratchCards[idx] == 0) return;

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
      point++;
      i++;
      j++;
    }
  }

  newScratchCards(point, idx);
}

function newScratchCards(point: number, idx: number) {
  console.log(point, idx, scratchCards[idx]);
  for (let i = 1; i <= point; i++) {
    if (scratchCards[idx + i] !== undefined)
      scratchCards[idx + i] += scratchCards[idx]!;
  }
}

console.log(scratchCards);
const answer2 = scratchCards.reduce((acc, cur) => {
  return acc + cur;
}, 0);

console.log(answer2);
