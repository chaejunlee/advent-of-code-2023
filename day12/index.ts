import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n").filter((v) => v) as string[];

const part2 = data.map((v) => {
	const [condStr, groupStr] = v.split(" ") as [string, string];

	const unfoldedCond = Array(5).fill(condStr).join("?");
	const unfoldedGroup = Array(5).fill(groupStr).join(",");

	const group = unfoldedGroup.split(",").map((v) => parseInt(v));

	const cache = Array.from({ length: unfoldedCond.length }, () => {
		return new Array(group.length).fill("-1").map((v) => parseInt(v));
	});

	const ans = arrangement(0, 0);

	console.log(unfoldedCond, unfoldedGroup, ans);
	//console.table(cache);

	return ans;

	function arrangement(cidx: number, gidx: number): number {
		if (cidx >= unfoldedCond.length) {
			return gidx === group.length ? 1 : 0;
		}
		if (gidx === group.length) {
			const rest = unfoldedCond.slice(cidx).split("");
			return rest.every((v) => v !== "#") ? 1 : 0;
		}

		let count = 0;

		const c = cache[cidx]![gidx]!;
		if (c !== -1) return c;

		const thisGroup = group[gidx]!;
		if (canFit(cidx, thisGroup)) {
			count += arrangement(cidx + group[gidx]! + 1, gidx + 1);
		}
		if (!shouldFit(cidx, thisGroup)) {
			count += arrangement(cidx + 1, gidx);
		}

		cache[cidx]![gidx] = count;

		return count;
	}

	function canFit(cidx: number, thisGroup: number): boolean {
		if (cidx + thisGroup > unfoldedCond.length) return false;

		const fit = unfoldedCond
			.slice(cidx, cidx + thisGroup)
			.split("")
			.every((v) => v !== ".");

		if (!fit) return false;

		const before = unfoldedCond[cidx - 1];

		if (typeof before !== "undefined" && before === "#") return false;

		const after = unfoldedCond[cidx + thisGroup];

		return after !== "#" ? true : false;
	}

	function shouldFit(cidx: number, thisGroup: number): boolean {
		if (cidx + thisGroup > unfoldedCond.length) return false;

		const fit = unfoldedCond
			.slice(cidx, cidx + thisGroup)
			.split("")

		return fit[0] === "#";
	}
});

console.log(part2.reduce((a, c) => a + c));
