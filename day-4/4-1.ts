import { data } from "./4-1.input-cleaned-with-macro.js";

const answer = data.reduce((currentPoints, card) => {
  // use a set to find the winning numbers
  const winningSet = new Set(card.winning);

  // using the filter means i dont need to write my own counting reducer
  const numbersHit = card.values.filter((value) =>
    winningSet.has(value),
  ).length;

  // use the formula 2 ^ (n-1) if there are values
  return currentPoints + (numbersHit > 0 ? Math.pow(2, numbersHit - 1) : 0);
}, 0);

console.log(answer);
