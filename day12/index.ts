import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n").filter(v => v) as string[];

const part1 = data.map(v => {
    const [condition, group] = v.split(" ") as [string, string];

    return arrangements(condition, group);
})

function arrangements(condition: string, groupStr: string): number {
    const group = groupStr.split(",").filter(v => v).map(v => parseInt(v));

    let count = 0;
    let full = true;

    const groupNum = group.reduce((a, c) => a + c, 0);
    const condNum = condition.split("").filter(v => v === "#" || v === "?").reduce((a, _) => a + 1, 0);

    if (condNum < groupNum) return 0;

    for (let i = 0; i < condition.length; i++) {
        if (condition[i] === "?") {
            full = false;
            const operational = condition.slice(0, i) + "." + condition.slice(i + 1);
            count += arrangements(operational, groupStr);

            const damaged = condition.slice(0, i) + "#" + condition.slice(i + 1);
            count += arrangements(damaged, groupStr);

            break;
        }
    }

    if (full) {
        const conditions = condition.split(".").filter(v => v).map(v => v.length);
        if (group.length != conditions.length) return 0;
        for (let i = 0; i < group.length; i++) {
            if (group[i] != conditions[i]) return 0;
        }
        return 1;
    }

    return count;
}

console.log(part1.reduce((acc, cur) => acc + cur, 0));

const part2 = data.map(v => {
    const [cond, group] = v.split(" ") as [string, string];

    let groupArr = [];
    let condArr = [];

    for (let i = 0; i < 5; i++) {
        groupArr.push(group);
        condArr.push(cond);
    }

    let unfoldedGroup = groupArr.join(",");
    let unfoldedCond = condArr.join("?");
    console.log(unfoldedCond, unfoldedGroup);

    return arrangements(unfoldedCond, unfoldedGroup);
})
console.log(part2.reduce((a, c) => a + c, 0))

