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

        if (data[d_row] && data[d_row]![d_col]) {
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

let answer2 = 0;

const numberArray: {
  num: number;
  xStart: number;
  xEnd: number;
}[][] = [];

const signArray: {
  x: number;
  sign: string;
}[][] = [];

for (let y = 0; y < data.length; y++) {
  const row = data[y]!;
  let match;
  let numberArrayRow = [];
  while ((match = regex.exec(row)) !== null) {
    numberArrayRow.push({
      num: parseInt(match[0]),
      xStart: match.index,
      xEnd: regex.lastIndex,
    });
  }
  numberArray.push(numberArrayRow);
  let signArrayRow = [];
  for (let x = 0; x < data[0]!.length; x++) {
    if (!isNumber(data[y]![x]!) && data[y]![x]! !== ".") {
      signArrayRow.push({ x, sign: data[y]![x]! });
    }
  }
  signArray.push(signArrayRow);
}

for (let y = 0; y < signArray.length; y++) {
  const signs = signArray[y];
  if (signs) {
    for (let sign of signs) {
      if (sign.sign === "*") {
        let set: Set<number> = new Set();
        let gear = 1;
        for (const d of allDir) {
          const d_y = d[0]! + y;
          const d_x = d[1]! + sign.x;

          if (numberArray[d_y]) {
            const numbers = numberArray[d_y];
            if (numbers) {
              for (const num of numbers) {
                if (d_x >= num.xStart && d_x < num.xEnd) {
                  set.add(num.num);
                }
              }
            }
          }
        }
        if (set.size == 2) {
          let s = 1;
          for (const a of set) {
            s *= a;
          }
          answer2 += s;
        }
      }
    }
  }
}

console.log(answer2);
