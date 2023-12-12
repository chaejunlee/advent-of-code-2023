import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

function main() {
  const times = data[0]
    ?.split(":")[1]
    ?.split(" ")
    .filter((v) => v)
    .map((v) => parseInt(v))!;

  const newTimes = parseInt(times.map((v) => String(v)).join(""));

  const distances = data[1]
    ?.split(":")[1]
    ?.split(" ")
    .filter((v) => v)
    .map((v) => parseInt(v))!;
  const newDistance = parseInt(distances.map((v) => String(v)).join(""));

  let totalWinsMultiplied = 1;

  for (let i = 0; i < times?.length; i++) {
    const win = getWins(i);
    console.log(win);
    totalWinsMultiplied *= win;
  }

  function getWins(i: number): number {
    let totalWins = 0;

    for (let time = 1; time < (times[i] ?? 0); time++) {
      if (didWin(distances[i]!, time, times[i]!)) {
        totalWins++;
      }
    }

    return totalWins;
  }

  function didWin(dist: number, readyTime: number, totalTime: number): boolean {
    const timeLeft = totalTime - readyTime;
    const speed = readyTime;
    const traveled = speed * timeLeft;
    return traveled > dist;
  }

  return totalWinsMultiplied;
}

function part2() {
  const times = data[0]
    ?.split(":")[1]
    ?.split(" ")
    .filter((v) => v)
    .map((v) => parseInt(v))!;

  const newTime = parseInt(times.map((v) => String(v)).join(""));

  const distances = data[1]
    ?.split(":")[1]
    ?.split(" ")
    .filter((v) => v)
    .map((v) => parseInt(v))!;
  const newDistance = parseInt(distances.map((v) => String(v)).join(""));

  let totalWins = 0;

  for (let i = 0; i < newTime; i++) {
    if (didWin(newDistance, i, newTime)) totalWins++;
  }

  function didWin(dist: number, readyTime: number, totalTime: number): boolean {
    const timeLeft = totalTime - readyTime;
    const speed = readyTime;
    const traveled = speed * timeLeft;
    return traveled > dist;
  }

  return totalWins;
}

console.log(main());
console.log(part2());
