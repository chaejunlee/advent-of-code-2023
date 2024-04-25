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

/**
 * if we find a rock at data[y][x],
 * we just have to put that rock at front[x]
 * and update the front[x]
 */
const front = Array(platform[0]!.length).fill(0);

function isRock(data: string) {
  return data === "#" || data === "O";
}

let weight = platform.length;
let total = 0;

for (let y = 0; y < platform.length; y++) {
  for (let x = 0; x < platform[0]!.length; x++) {
    const object = platform[y]![x]!;
    if (isRock(object)) {
      // move rock
      if (object === "O") {
        if (front[x] >= platform[0]!.length) continue;
        platform[front[x]]![x] = "O";
        total += (weight - front[x]);

        platform[y]![x] = ".";
        front[x]++;
      }

      // update front
      if (object === "#") {
        front[x] = y + 1;
      }
    }
  }
}

console.log(total);
