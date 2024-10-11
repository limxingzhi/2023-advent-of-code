const numberMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const entriesNumberMap = Object.entries(numberMap);

// reversing the numberMap
const numberMapReverse: Record<string, number> = Object.entries({
  ...numberMap,
}).reduce(
  (accumulator, [key, value]) => {
    if (typeof key === "string") {
      accumulator[key.split("").reverse().join("")] = value;
      return accumulator;
    } else {
      accumulator[value] = value;
      return accumulator;
    }
  },
  {} as Record<string, number>,
);

const entriesNumberMapReverse = Object.entries(numberMapReverse);

const lines = (await Deno.readTextFile("1.input.txt")).split("\n");

const ans = lines.reduce((accumulator, currentLine) => {
  let sum = 0;

  for (let i = 0; i < currentLine.length; i++) {
    let end = false;
    entriesNumberMap.filter(([key, value]) => {
      if (currentLine.startsWith(key, i)) {
        end = true;
        sum += value;
      }
    });

    if (end) break;
  }

  sum *= 10;

  const currentLineReversed = currentLine.split("").reverse().join("");
  for (let i = 0; i < currentLineReversed.length; i++) {
    let end = false;
    entriesNumberMapReverse.filter(([key, value]) => {
      if (currentLineReversed.startsWith(key, i)) {
        end = true;
        sum += value;
      }
    });

    if (end) break;
  }

  return accumulator + sum;
}, 0);

console.log(ans);
