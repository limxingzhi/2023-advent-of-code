// import { times, distances } from "./6-1.test.input.js";
import { times, distances } from "./6-1.input.js";

import { findHoldTimeOfRecord, findDistanceFromTime } from "./6.utils.ts";

const mapping = times.map((time, i) => ({ time, distance: distances[i] }));

const solutions = mapping.map(({ time, distance }) => {
  const holdTimeSet = new Set<number>();

  let newDistance = distance + 1;
  let keepGoing = false;
  do {
    newDistance += 1;
    const potentialAnswers = findHoldTimeOfRecord(newDistance, time);
    keepGoing = potentialAnswers.length > 0;

    potentialAnswers.map((x) => {
      holdTimeSet.add(Math.ceil(x));
      holdTimeSet.add(Math.floor(x));
    });
  } while (keepGoing);

  const correctTimes = Array.from(holdTimeSet).filter(
    (potentialTime) => findDistanceFromTime(potentialTime, time) > distance,
  );

  return correctTimes.length;
});

console.log(solutions.reduce((prev, current) => prev * current));
