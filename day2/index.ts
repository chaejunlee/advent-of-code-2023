import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const RED_CUBES = 12;
const GREEN_CUBES = 13;
const BLUE_CUBES = 14;

const CUBES = {
  red: 12,
  green: 13,
  blue: 14,
};

type Color = keyof typeof CUBES;

const answer = data.reduce((acc, cur, index) => {
  const splitData = cur.split(/[:;]/);
  const [_, ...games] = [...splitData];

  for (let game of games) {
    const balls = game.split(",");

    for (let ball of balls) {
      const [num, color] = ball.trim().split(" ");
      if (color && num && CUBES[color as Color] < parseInt(num)) {
        console.log("WRONG:", index, num, CUBES[color as Color]);
        return acc;
      }
    }
  }

  return acc + index + 1;
}, 0);

const part2Answer = data.reduce((acc, cur, index) => {
  const splitData = cur.split(/[:;]/);
  const [_, ...games] = [...splitData];

  let possibleBalls = {
    red: 0,
    blue: 0,
    green: 0,
  };

  for (let game of games) {
    const balls = game.split(",");

    for (let ball of balls) {
      const [num, color] = ball.trim().split(" ");
      if (color && num && possibleBalls[color as Color] < parseInt(num)) {
        possibleBalls[color as Color] = parseInt(num);
      }
    }
  }

  return acc + Object.values(possibleBalls).reduce((acc, cur) => cur * acc);
}, 0);

console.log(part2Answer);
