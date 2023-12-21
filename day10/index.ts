import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const dir = [
  [0, -1],
  [-1, 0],
  [0, 1],
  [1, 0],
];

const pipes = [
  ["-", "L", "F"],
  ["|", "7", "F"],
  ["-", "J", "7"],
  ["|", "L", "J"]
];

const from = [
  ["S", "-", "J", "7"],
  ["S", "|", "L", "J"],
  ["S", "-", "L", "F"],
  ["S", "|", "7", "F"]
]

let startPos: [number, number] = [0, 0];
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0]?.length!; j++) {
    if (data[i]![j] === "S")
      startPos = [i, j];
  }
}

let steps = -1;

let outerQ: [number, number][] = [startPos];

let visited = Array.from({ length: data.length }, () => new Array(data[0]!.length).fill(false));

while (outerQ.length) {
  steps++;
  console.log(outerQ);
  let q = [...outerQ];
  outerQ = [];
  while (q.length) {
    const curr = q.pop();
    if (curr) {
      visited[curr[0]]![curr[1]] = true;
      for (let i = 0; i < dir.length; i++) {
        const dy = curr[0] + dir[i]![0]!;
        const dx = curr[1] + dir[i]![1]!;
        const currChar = data?.[curr[0]]?.[curr[1]];
        
        const dnext = data?.[dy]?.[dx];
        if (dnext && currChar && from[i]!.includes(currChar) && pipes[i]!.includes(dnext)) {
          const didVisit = visited[dy]![dx]; 
          if (!didVisit)
            outerQ.push([dy, dx]);
        }
      }
    }
  }
}

console.log(steps);