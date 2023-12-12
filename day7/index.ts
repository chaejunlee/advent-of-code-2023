import { readFileSync } from "fs";
import { cwd } from "process";

const currentDirectory = cwd();
const filename = currentDirectory + "/input.txt";

const rawData = readFileSync(filename, "utf8");

const data = rawData.split("\n") as string[];

const cardMap = {
  A: 1,
  K: 2,
  Q: 3,
  J: 4,
  T: 5,
  "9": 6,
  "8": 7,
  "7": 8,
  "6": 9,
  "5": 10,
  "4": 11,
  "3": 12,
  "2": 13,
  "1": 14,
};

function part1() {
  let game: { hand: string; bid: string }[] = [];

  data.forEach((v) => {
    const [hand, bid] = v.split(" ") as [string, string];
    game.push({
      hand: hand,
      bid: bid,
    });
  });

  game.sort((a, b) => {
    const rankOfA = getRank(a.hand);
    const rankOfB = getRank(b.hand);

    if (rankOfA === rankOfB) {
      for (let i = 0; i < a.hand.length; i++) {
        if (a.hand[i] != b.hand[i])
          return (
            cardMap[b.hand[i]! as keyof typeof cardMap] -
            cardMap[a.hand[i]! as keyof typeof cardMap]
          );
      }
    }
    return rankOfB - rankOfA;
  });

  function getRank(hand: string): number {
    const split = hand.split("");
    let set: any = {};
    for (const a of split) {
      if (set[a] === undefined) {
        set[a] = 1;
      } else {
        set[a]++;
      }
    }
    if (Object.keys(set).length === 1) {
      return 1;
    }
    if (Object.keys(set).length === 2) {
      const value = Object.values(set)[0];
      if (value === 1 || value === 4) return 2;
      return 3;
    }
    if (Object.keys(set).length === 3) {
      const values = Object.values(set) as number[];
      values.sort((a, b) => b - a);
      if (values[0] === 3) return 4;
      return 5;
    }
    if (Object.keys(set).length === 4) {
      return 6;
    }
    return 7;
  }

  let answer = 0;
  console.log(game);
  for (let i = 0; i < game.length; i++) {
    answer += parseInt(game?.[i]?.bid ?? "0") * (i + 1);
  }
  return answer;
}

console.log(part1());
