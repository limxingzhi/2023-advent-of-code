

// do some math:
// * we have a time t for the total time for the race
// * we know the distance we want to beat, that is d
// * we know the "hold time" and speed are the same, lets call that x
// * we know this equation : distance = speed * time
// deriving this : distance = (race_time - hold_time)(speed)

// * since speed and hold_time are the same, x
// * d = (t - x)(x)
// * 0 = -(t)(x^2) + tx -d
// * quadratic equation: A=-1, B=t, C=(-d)

// conclusion: we want to find
// - increase the distance each time and see if there are solutions

function solveQuad(a: number, b: number, c: number): [number, number] {
  const innerRoot = Math.pow(b * b - 4 * a * c, 0.5);
  return [(-b + innerRoot) / (2 * a), (-b - innerRoot) / (2 * a)];
}

// quadratic equation: A=-1, B=t, C=(-d)
export function findHoldTimeOfRecord(
  distance: number,
  raceTime: number,
): Array<number> {
  const answers = solveQuad(-1, raceTime, -1 * distance);
  if (answers[0] < 0 && answers[1] < 0) return [];

  if (answers[0] === 0 && answers[1] < 0) return [];
  if (answers[1] === 0 && answers[0] < 0) return [];

  if (answers[0] === 0) return [answers[1]];
  if (answers[1] === 0) return [answers[0]];

  return answers.filter((ans) => !isNaN(ans));
}

// distance = (race_time - hold_time)(speed)
export function findDistanceFromTime(holdTime: number, raceTime: number) {
  return (raceTime - holdTime) * holdTime;
}
