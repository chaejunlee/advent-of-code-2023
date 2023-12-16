import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n\n") as string[];

const instructions = data[0]?.trim().split("")!;

const directions = data[1]?.split("\n").reduce((acc, cur) => {
  const [from, to] = cur.split(" = ") as [string, string];
  const [left, right] = to?.replace("(", "").replace(")", "").split(", ") as [
    string,
    string
  ];

  if (!from) return acc;

  acc[from] = {
    left,
    right,
  };

  return acc;
}, {} as Record<string, { left: string; right: string }>)!;

let steps = 0;
let pos = "AAA";

while (pos != "ZZZ") {
  const dir = instructions[steps % instructions.length];

  if (dir === "L") {
    pos = directions[pos]?.left!;
  } else {
    pos = directions[pos]?.right!;
  }
  steps++;
}

console.log(steps);
