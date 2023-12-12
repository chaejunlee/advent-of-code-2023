import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n\n") as string[];

console.log(data);

const seed = data[0]
  ?.split(":")[1]
  ?.split(" ")
  .filter((v) => v)
  .map((v) => parseInt(v));

const mapFrom = (data?: string) => {
  return data
    ?.split(":")[1]
    ?.split("\n")
    .filter((v) => v)
    .map((row) => {
      const [dest, start, range] = row
        .split(" ")
        .filter((v) => v)
        .map((v) => parseInt(v)) as [number, number, number];

      return {
        from: start,
        to: start + range,
        destFrom: dest,
        range: range,
      };
    })
    .sort((a, b) => a.from - b.from);
};

const soil = mapFrom(data[1]);
const fertilizer = mapFrom(data[2]);
const water = mapFrom(data[3]);
const light = mapFrom(data[4]);
const temperature = mapFrom(data[5]);
const humidity = mapFrom(data[6]);
const location = mapFrom(data[7]);

const answer1 = seed
  ?.map((a) => {
    const map = soil?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map?.from;
  })
  .map((a) => {
    const map = fertilizer?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .map((a) => {
    const map = water?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .map((a) => {
    const map = light?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .map((a) => {
    const map = temperature?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .map((a) => {
    const map = humidity?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .map((a) => {
    const map = location?.find((v) => {
      return v.from <= a && a < v.to;
    });
    if (!map) return a;
    return map?.destFrom + a - map.from;
  })
  .sort((a, b) => a - b)[0];

console.log(answer1);

let newSeed = [];
for (let i = 0; i < seed!.length ?? 0; i += 2) {
  const from = seed![i];
  const to = seed![i + 1];

  if (!from || !to) break;

  newSeed.push({
    from: from,
    to: from + to,
  });
}

newSeed.sort((a, b) => a.from - b.from);

const mapFrom2 = (source: { from: number; to: number }, map: typeof soil) => {
  let result: {
    from: number;
    to: number;
  }[] = [];
  if (!map) return result;
  for (let i = 0; i < map.length; i++) {
    const compare = map[i];
    if (!compare) return result;
    if (compare.from <= source.from) {
      if (compare.to <= source.from) continue;
      if (source.to < compare.to) {
        result.push({
          from: compare.destFrom + (source.from - compare.from),
          to: compare.destFrom + (source.to - compare.from),
        });
        return result;
      }
      result.push({
        from: compare.destFrom + (source.from - compare.from),
        to: compare.destFrom + compare.range,
      });
      source.from = compare.to;
    } else {
      if (source.to < compare.from) {
        result.push({
          from: source.from,
          to: source.to,
        });
        return result;
      }
      result.push({
        from: source.from,
        to: compare.from,
      });
      if (source.to < compare.to) {
        result.push({
          from: compare.destFrom,
          to: compare.destFrom + source.to - compare.from,
        });
        return result;
      }
      result.push({
        from: compare.destFrom,
        to: compare.destFrom + compare.range,
      });
      source.from = compare.to;
    }
  }
  return result;
};

console.log(newSeed);

const soil2 = newSeed
  .map((v) => mapFrom2(v, soil))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(soil2);
const fert2 = soil2
  .map((v) => mapFrom2(v, fertilizer))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(fert2);
const wate2 = fert2
  .map((v) => mapFrom2(v, water))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(wate2);
const ligh2 = wate2
  .map((v) => mapFrom2(v, light))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(ligh2);
const temp2 = ligh2
  .map((v) => mapFrom2(v, temperature))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(temp2);
const humi2 = temp2
  .map((v) => mapFrom2(v, humidity))
  .flat()
  .sort((a, b) => a.from - b.from);
console.log(humi2);
const loca2 = humi2
  .map((v) => mapFrom2(v, location))
  .flat()
  .sort((a, b) => a.from - b.from);

console.log(loca2[0]!.from);
