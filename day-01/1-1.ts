const lines = (await Deno.readTextFile("1.input.txt")).split("\n");

const ans = lines.reduce((accumulator, currentLine) => {
  let sum = 0;

  for (let i = 0; i < currentLine.length; i++) {
    const val = parseInt(currentLine[i]);
    if (!isNaN(val)) {
      sum += val;
      break;
    }
  }

  sum *= 10

  for (let i = currentLine.length - 1; i >= 0; i--) {
    const val = parseInt(currentLine[i]);
    if (!isNaN(val)) {
      sum += val;
      break;
    }
  }

  return accumulator + sum;
}, 0);

console.log(ans);
