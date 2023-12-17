import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n\n") as string[];

const instructions = data[0]?.trim().split("")!;

const directions = data[1]?.split("\n").reduce((acc, cur) => {
  const [from, to] = cur.split(" = ") as [string, string];
  console.log(from, to);
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

// let steps = 0;
// let pos = "AAA";

// while (pos != "ZZZ") {
//   const dir = instructions[steps % instructions.length];

//   if (dir === "L") {
//     pos = directions[pos]?.left!;
//   } else {
//     pos = directions[pos]?.right!;
//   }
//   steps++;
// }

// console.log(steps);

let part2 = 0;

let positions = Object.keys(directions).filter((v) => v[2] === "A");

// console.log(positions);

const loops = positions.reduce((acc, cur) => {
  let steps = 0;
  let pos = cur;
  let done = false;

  while (!done) {
    const dir = instructions[steps % instructions.length];

    if (dir === "L") {
      pos = directions[pos]?.left!;
    } else {
      pos = directions[pos]?.right!;
    }

    if (pos[2] === "Z") {
      const acccur = acc[cur];
      if (acccur) {
        const acccurpos = acccur[pos];
        if (acccurpos) {
          const repeated = acccurpos.some(
            (v: number) =>
              v % instructions.length === steps % instructions.length
          );
          acccurpos.push(steps);
          if (repeated) {
            done = true;
            return acc;
          }
        } else {
          acccur[pos]?.push(steps);
        }
      } else {
        acc[cur] = {
          [pos]: [steps],
        };
      }
    }
    steps++;
  }
  return acc;
}, {} as Record<string, Record<string, number[]>>);

const flatArr = Object.values(loops)
  .map((v) => {
    return Object.values(v).flat() as [number, number];
  })
  .map((v: [number, number]) => ({
    start: v[0],
    jump: v[1] - v[0],
  }))
  .reduce((acc, cur) => {
    return lcm(acc, cur.jump);
  }, 1);

function gcd(a: number, b: number) {
  if (b) {
    return gcd(b, a % b);
  }
  return Math.abs(a);
}

function lcm(a: number, b: number) {
  let g = gcd(a, b);

  return (a * b) / g;
}

console.log(flatArr);
