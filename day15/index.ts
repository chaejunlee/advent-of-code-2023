import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.trim().split(",").filter((v) => v) as string[];

const boxes = data.reduce((acc, cur) => {
  let hash = 0;

  const [char, num] = cur.split(/[=-]/) as [string, string];

  for (let i = 0; i < char.length; i++) {
    hash += cur.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }

  const box = acc[hash] as {key: string, value: number}[];

  const index = box.findIndex(v => v.key === char);

  if (num.length > 0) {
    if (index === -1) {
      box.push({key: char, value: parseInt(num)});
    } else {
      box[index]!.value = parseInt(num);
    }
  } else {
    if (index !== -1) {
      const newBox = [...box.slice(0, index), ...box.slice(index + 1)];
      acc[hash] = newBox;
    }
  }
  console.log(`
${cur}
${JSON.stringify(box)}
`)

  return acc;
}, Array(256).fill(null).map(() => []) as {key: string, value: number}[][]);

const result = boxes.reduce((acc, cur, idx) => {
  const box = cur;
  let power = 0;

  for (let i = 0; i < box.length; i++) {
    const value = (i + 1) * box[i]!.value * (idx + 1);
    console.log(value)
    power += value;
  }
  return acc + power;
}, 0);

console.log(result);
