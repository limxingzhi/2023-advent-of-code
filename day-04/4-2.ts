import { data } from "./4-1.input-cleaned-with-macro.js";

const queue = data.map((card, index) => ({ ...card, index }));

// cache for the cards generated
const cardsGenerationCache = new Map();

for (let i = 0; i < queue.length; i++) {
  const card = queue[i];

  if (cardsGenerationCache.has(card.index)) {
    const newCards = cardsGenerationCache.get(card.index) ?? [];
    queue.push(...newCards);
  } else {
    // use a set to find the winning numbers
    const winningSet = new Set(card.winning);

    // using the filter means i dont need to write my own counting reducer
    const numbersHit = card.values.filter((value) =>
      winningSet.has(value),
    ).length;

    const toAddToCache = [];
    for (let x = 1; x <= numbersHit; x++) {
      // add to queue if it exist on the original dataset
      if (data[card.index + x]) {
        queue.push(queue[card.index + x]);
        toAddToCache.push(queue[card.index + x]);
      }
    }
    cardsGenerationCache.set(card.index, toAddToCache);
  }
}

const answer = queue.length;

console.log(answer);
