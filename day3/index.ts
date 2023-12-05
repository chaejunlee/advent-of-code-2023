import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const allDir = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const regex = /\d+/g;

let answer = 0;

function isNumber(num: string) {
  return !isNaN(parseInt(num));
}

for (let y = 0; y < data.length; y++) {
  const row = data[y]!;
  let match;
  while ((match = regex.exec(row)) !== null) {
    let shouldKeep = false;
    for (let x = match.index; x < regex.lastIndex; x++) {
      for (let d of allDir) {
        const d_row = d[0]! + y;
        const d_col = d[1]! + x;

        if (
          d_row >= 0 &&
          d_row < data.length &&
          d_col >= 0 &&
          d_col < data[0]!.length
        ) {
          const char = data[d_row]![d_col]!;
          if (!isNumber(char) && char !== ".") {
            // console.log(char, match[0]);
            shouldKeep = true;
          }
        }
      }
    }
    if (shouldKeep) {
      answer += parseInt(match[0]);
    }
  }
}

console.log(answer);
