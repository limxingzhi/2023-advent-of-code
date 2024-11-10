// the function that looks for parts around number, we have to reverse it

// const lines = (await Deno.readTextFile("3-1.input.test.txt")).split("\n");
 const lines = (await Deno.readTextFile("3-1.input.original.txt")).split("\n");

const characterMap = lines.map((line) => line.split(""));

function isGearSymbol(x: number, y: number) {
  return characterMap[y]?.[x] === "*";
}

function isNumber(x: number, y: number) {
  return !isNaN(parseInt(characterMap[y][x]));
}

const numberTable = new Map<string, { value: number; id: number }>(); // key: x,y, value: number and id
const gearSet = new Set<string>(); // [x,y] position

(function generateSets() {
  // keep track of each unique part
  let runningNumberCount = 0;

  characterMap.map((lineMap, yPos) => {
    let xPos = 0;
    let num = 0;

    let state: "CAPTURING" | "IDLING" = "IDLING";

    let numberPostions: Array<string> = [];

    function capturingHandler() {
      if (isNumber(xPos, yPos)) {
        numberPostions.push(`${xPos},${yPos}`);

        num *= 10;
        num += parseInt(lineMap[xPos], 10);
      } else {
        numberPostions.map((position) =>
          numberTable.set(position, { value: num, id: runningNumberCount }),
        );
        runningNumberCount += 1;

        // state changed from CAPTURING to IDLE
        state = "IDLING";
        num = 0;
        numberPostions = []
      }
    }

    while (xPos < lineMap.length) {
      if (isGearSymbol(xPos, yPos)) gearSet.add(`${xPos},${yPos}`);

      if (state === "IDLING") {
        // shift state to CAPTURING and continue
        if (isNumber(xPos, yPos)) state = "CAPTURING";
      }

      if (state === "CAPTURING") capturingHandler();

      xPos++;
    }

    // end of the line, check state and do cleanup
    if (state === "CAPTURING") {
      capturingHandler();
    }
  });
})();


function calculateGearRatio(gearPosition: [number, number]): number {
  let ratio = 1;

  const positions: Array<string> = [
    `${gearPosition[0] + 1},${gearPosition[1] + 1}`,
    `${gearPosition[0] + 0},${gearPosition[1] + 1}`,
    `${gearPosition[0] - 1},${gearPosition[1] + 1}`,
    `${gearPosition[0] + 1},${gearPosition[1] + 0}`,
    `${gearPosition[0] - 1},${gearPosition[1] + 0}`,
    `${gearPosition[0] + 1},${gearPosition[1] - 1}`,
    `${gearPosition[0] + 0},${gearPosition[1] - 1}`,
    `${gearPosition[0] - 1},${gearPosition[1] - 1}`,
  ];

  const usedGear = new Set();

  // don't multiple the same parts together
  positions.map((position) => {
    if (numberTable.has(position)) {
      const gear = numberTable.get(position);
      if (!usedGear.has(gear?.id)) {
        ratio *= gear?.value ?? 1;
        usedGear.add(gear?.id);
      }
    }
  });

  return usedGear.size >= 2 ? ratio : 0;
}

// check and sum
const ans = Array.from(gearSet).reduce((acc, current) => {
  const [x, y] = current.split(",").map((val) => parseInt(val, 10));
  return acc + calculateGearRatio([x, y]);
}, 0);

console.log(ans);
