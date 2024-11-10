// const lines = (await Deno.readTextFile("3-1.input.test.txt")).split("\n");
const lines = (await Deno.readTextFile("3-1.input.original.txt")).split("\n");

const characterMap = lines.map((line) => line.split(""));

function isSymbol(x: number, y: number) {
  return (
    characterMap[y]?.[x] !== undefined &&
    isNaN(parseInt(characterMap[y][x])) &&
    characterMap[y]?.[x] !== "."
  );
}

function isNumber(x: number, y: number) {
  return !isNaN(parseInt(characterMap[y][x]));
}

type NumberPosition = {
  x: number;
  y: number;
  value: number;
};

function isEnginePart(numberPosition: NumberPosition): boolean {
  // add every position around the number into a queue

  // we dont need a queue actually, just check for it
  // const queryQueue: Array<[number, number]> = [];

  // .....
  // X123X
  // .....
  // add the position before and after the number

  // we dont need a queue actually, just check for it
  // queryQueue.push([numberPosition.x - 1, numberPosition.y]);
  // queryQueue.push([
  //   numberPosition.x + numberPosition.value.toString().length,
  //   numberPosition.y,
  // ]);
  if (isSymbol(numberPosition.x - 1, numberPosition.y)) return true;
  if (
    isSymbol(
      numberPosition.x + numberPosition.value.toString().length,
      numberPosition.y,
    )
  )
    return true;

  // xxxxx
  // .123.
  // XXXXX
  // add the row top and below
  for (
    let x = numberPosition.x - 1;
    x <= numberPosition.x + numberPosition.value.toString().length;
    x++
  ) {
    // we dont need a queue actually, just check for it
    // queryQueue.push([x, numberPosition.y - 1]);
    // queryQueue.push([x, numberPosition.y + 1]);
    if (isSymbol(x, numberPosition.y - 1)) return true;
    if (isSymbol(x, numberPosition.y + 1)) return true;
  }

  return false;
}

const numberSet = new Set<NumberPosition>();

(function generateSets() {
  characterMap.map((lineMap, yPos) => {
    let xPos = 0;
    let num = 0;

    let state: "CAPTURING" | "IDLING" = "IDLING";

    function capturingHandler() {
      if (isNumber(xPos, yPos)) {
        num *= 10;
        num += parseInt(lineMap[xPos], 10);
      } else {
        numberSet.add({
          x: xPos - num.toString().length,
          y: yPos,
          value: num,
        });

        // state changed from CAPTURING to IDLE
        state = "IDLING";
        num = 0;
      }
    }

    while (xPos < lineMap.length) {
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

// Array.from(numberSet).map((num) =>
//   console.log({
//     xy: [num.x, num.y, num.value],
//     isEnginePart: isEnginePart(num),
//   }),
// );

// check and sum
const ans = Array.from(numberSet).reduce((acc, current) => {
  // if (isEnginePart(current)) console.log(current.value);
  return acc + (isEnginePart(current) ? current.value : 0);
}, 0);

console.log(ans);
