import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n").filter((v) => v) as string[];

const platform = data.map(v => v.split("").filter(v => v));

/**
 * 1. Roll the round rocks
 * 2. Calculate the weight
 */


function isRock(data: string) {
  return data === "#" || data === "O";
}

let weight = platform.length;


function rollToTop(platform: string[][]) {
  /**
   * if we find a rock at data[y][x],
   * we just have to put that rock at front[x]
   * and update the front[x]
   */
  const front = Array(platform[0]!.length).fill(0);

  for (let y = 0; y < platform.length; y++) {
    for (let x = 0; x < platform[0]!.length; x++) {
      const object = platform[y]![x]!;
      if (isRock(object)) {
        // move rock
        if (object === "O") {
          if (front[x] >= platform[0]!.length) continue;
          platform[y]![x] = ".";
          platform[front[x]]![x] = "O";
          front[x]++;
        }

        // update front
        if (object === "#") {
          front[x] = y + 1;
        }
      }
    }
  }
  return platform;
}

function getTotal(data: string[][]) {
  let local = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[0]!.length; j++) {
      if (data[i]![j] === "O") {
        local += (weight - i);
      }
    }
  }
  return local;
}

function rotateLeft(data: string[][]): string[][] {
  let rotated: string[][] = [];
  for (let i = 0; i < data[0]!.length; i++) {
    let row: string[] = [];
    for (let j = 0; j < data.length; j++) {
      row.push(data[j]![data[0]!.length - i - 1]!);
    }
    rotated.push(row);
  }
  return rotated;
}

function rotateRight(data: string[][]): string[][] {
  let rotated: string[][] = [];
  for (let i = 0; i < data[0]!.length; i++) {
    let row: string[] = [];
    for (let j = 0; j < data.length; j++) {
      row.push(data[data.length - j - 1]![i]!);
    }
    rotated.push(row);
  }
  return rotated;
}

const north = platform;
const platforms = [north, rotateRight(north), rotateRight(rotateRight(north)), rotateRight(rotateRight(rotateRight(north)))];
let prev = [];
let from = 0;

const CYCLE = 1000000000;
for (let k = 0; k < CYCLE; k++) {
  for (let i = 0; i < 4; i++) {
    let platform = platforms[i % 4]!;
    platform = rollToTop(platform);
    platforms[(i + 1) % 4] =  rotateRight(platform);
  }
  let same = prev.findIndex(v => v === JSON.stringify(platforms[0]));
  if (same !== -1) {
    from = prev.findIndex(v => v === JSON.stringify(platforms[0]));
    break;
  }

  prev.push(JSON.stringify(platforms[0]));
}

const range = prev.length - from;
let iter = prev.length;
while (iter + range < CYCLE) {
  iter += range;
}

const offset = CYCLE - iter - 1;

// 0 1 2 /3 4 5 6 7 8 9 /10 11 12 13 14 15 16/ 17 18 19

prev.forEach(v => console.log(getTotal(JSON.parse(v))));

console.log(getTotal(JSON.parse(prev[offset + from]!) as string[][]));
