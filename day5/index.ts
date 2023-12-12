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

const soil = data[1]
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
const fertilizer = data[2]
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
const water = data[3]
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
const light = data[4]
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
const temperature = data[5]

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
const humidity = data[6]
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
const location = data[7]
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

console.log(
  seed,
  soil,
  fertilizer,
  water,
  light,
  temperature,
  humidity,
  location
);

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
