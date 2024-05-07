import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.trim().split(",").filter((v) => v) as string[];

const result = data.reduce((acc, cur) => {
  let hash = 0;

  for (let i = 0; i < cur.length; i++) {
    hash += cur.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }
  console.log(hash);
  return acc + hash;
}, 0)

console.log(result);
