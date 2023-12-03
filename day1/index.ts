import { readFileSync } from "fs";

const filename = "day1/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const answer = data.reduce((acc, cur) => {
  let first = 0;
  for (let i = 0; i < cur.length; i++) {
    const char = cur.at(i);
    if (char) {
      const found = parseInt(char);
      console.log(found);
      if (!isNaN(found)) {
        console.log("found!");
        first = found;
        break;
      }
    }
  }
  let second = 0;
  for (let i = cur.length - 1; i >= 0; i--) {
    const char = cur.at(i);
    if (char) {
      const found = parseInt(char);
      if (!isNaN(found)) {
        second = found;
        break;
      }
    }
  }
  console.log(cur, first, second);

  return acc + first * 10 + second;
}, 0);

console.log(answer);
