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

let insideTiles = 0;

const verticalWall = ["|", "F", "J", "L", "7"];
const verticalFrom: Record<string, string[]> = {
  "F": ["7"],
  "L": ["J"],
  "|": ["|", "L", "F"]
}
const horizontalWall = ["-", "F", "J", "L", "7"];
const horizontalFrom: Record<string, string[]> = {
  "F": ["L"],
  "7": ["J"],
  "-": ["-", "F", "7"]
}

let horSwipe: [number,number][] = [];
let verSwipe: [number,number][] = [];

for (let i = 0; i < data.length; i++) {
  let inside = false;
  let from = "|";
  for (let j = 0; j < data[0]!.length; j++) {
    const currChar = data[i]![j]!;
    const visit = visited[i]![j]!;

    if (!visit && inside) {
      horSwipe.push([i, j]);
    }

    if (visit && verticalWall.includes(currChar)) {
      if (verticalFrom[from]?.includes(currChar)) {
        inside = !inside;
      }
      from = ["7", "J"].includes(currChar) ? "|" : currChar;
    }
  }
}

for (let j = 0; j < data[0]!.length; j++) {
  let inside = false;
  let from = "-";
  for (let i = 0; i < data.length; i++) {
    const currChar = data[i]![j]!;
    const visit = visited[i]![j]!;

    if (!visit && inside) {
      verSwipe.push([i, j]);
    }

    if (visit && horizontalWall.includes(currChar)) {
      if (horizontalFrom[from]?.includes(currChar)) {
        inside = !inside;
      }
      from = ["J", "L"].includes(currChar) ? "-" : currChar;
    }
  }
}

console.log(horSwipe, verSwipe);

console.log(horSwipe.filter(v => {
  for (const ver of verSwipe) {
    if (ver[0] == v[0] && ver[1] === v[1])
      return true;
  }
  return false;
}).length);