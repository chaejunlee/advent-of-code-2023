import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n\n").filter((v) => v) as string[];

const patterns = data.map((v) => v.split("\n").filter((v) => v));

function compare(a: string[], b: string[]) {
  const length = Math.min(a.length, b.length);

  let findingSmudge = true;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < a[0]!.length; j++) {
      if (a[i]![j] !== b[i]![j]) {
        if (findingSmudge) {
          findingSmudge = false;
        } else {
          return false;
        }
      }
    }
  }
  if (findingSmudge) {
    return false;
  }
  return true;
}

function checkMirror(pattern: string[]) {
  console.log(pattern);
  const stack: string[] = [pattern[0]!];

  for (let i = 1; i < pattern.length; i++) {
    const matched = compare(
      [...stack].reverse(),
      pattern.slice(i)
    );
    console.log(`${i}
${stack.join("\n")}

${pattern.slice(i).join("\n")}

${matched}`);

    if (matched) {
      return i;
    }

    stack.push(pattern[i]!);
  }
  return 0;
}

function rotate(pattern: string[]) {
  const rotated: string[] = [];

  for (let i = 0; i < pattern[0]!.length; i++) {
    let buf = "";
    for (let j = 0; j < pattern!.length; j++) {
      buf += pattern![j]![i] ?? "";
    }
    rotated.push(buf);
  }

  return rotated;
}
const res = patterns.reduce((acc, cur, idx) => {
  const isHorizontal = checkMirror(cur);
  //  console.log(isHorizontal);
  if (isHorizontal !== 0) {
    return acc += 100 * isHorizontal;
  }
  const columns = checkMirror(rotate(cur));
  //  console.log(columns);
  if (columns === 0) console.log(rotate(cur).join("\n") + " " + idx);
  return acc += columns;
}, 0);

console.log(res);
