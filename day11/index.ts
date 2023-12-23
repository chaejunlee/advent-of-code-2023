import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

interface Galaxy {
    y: number,
    x: number
};

const galaxies = data.reduce((acc, cur, idx) => {
    for (let i = 0; i < cur.length; i++) {
        if (cur[i] === "#") {
            acc.push({ y: idx, x: i });
        }
    }
    return acc;
}, [] as Galaxy[])

const blankRow = [] as number[];
const blankCol = [] as number[];

for (let i = 0; i < data.length; i++) {
    if (data[i]!.split("").filter(v => v).every(v => v === ".")) {
        blankRow.push(i);
    }
}

for (let x = 0; x < data[0]!.length; x++) {
    let isBlank = true;
    for (let y = 0; y < data.length; y++) {
        if (data[y]![x] === "#") {
            isBlank = false;
            break;
        }
    }
    if (isBlank) {
        blankCol.push(x);
    }
}

blankRow.reverse();
blankCol.reverse();

console.log(blankRow, blankCol);

for (const r of blankRow) {
    for (const galaxy of galaxies) {
        if (galaxy.y >= r) {
            galaxy.y += 999999;
        }
    }
}

for (const c of blankCol) {
    for (const galaxy of galaxies) {
        if (galaxy.x >= c) {
            galaxy.x += 999999;
        }
    }
}

let totalDistance = 0;
for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        const yDiff = Math.abs(galaxies[i]!.y - galaxies[j]!.y);
        const xDiff = Math.abs(galaxies[i]!.x - galaxies[j]!.x);

        totalDistance += yDiff + xDiff;
    }
}

console.log("part2: ", totalDistance);

