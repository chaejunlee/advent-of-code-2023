import { readFileSync } from "fs";

const filename = "day1/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const answer = data.reduce((acc, cur) => {
  let first = 0;
  for (let i = 0; i < cur.length; i++) {
    const char = cur.at(i);
    if (char) {
      const found = parseInt(char);
      if (!isNaN(found)) {
        first = found;
        break;
      } else {
        let found = 0;
        if (
          digits.some((value, index) => {
            const substr = cur.substring(i, i + value.length);
            if (substr === value) {
              found = index + 1;
              return true;
            }
            return false;
          })
        ) {
          first = found;
          break;
        }
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
      } else {
        let found = 0;
        if (
          digits.some((value, index) => {
            const substr = cur.substring(i - value.length + 1, i + 1);
            if (substr === value) {
              found = index + 1;
              return true;
            }
            return false;
          })
        ) {
          second = found;
          break;
        }
      }
    }
  }
  console.log(cur, first, second);

  return acc + first * 10 + second;
}, 0);

console.log(answer);
