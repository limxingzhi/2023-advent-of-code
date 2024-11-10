import { seeds, mappings } from "./5-1.input.ts";
// import { seeds, mappings } from "./5-1.test.ts";

let ans = Infinity;

// populate seed ranges
for (let i = 0; i < seeds.length; i += 2) {
  for (let x = 0; x < seeds[i + 1]; x++) {
    const seed = x + seeds[i];

    const val = mappings.reduce((source, currentMapping) => {
      // console.log(source)
      const relevantMapping = currentMapping.find((mapping) => {
        if (mapping.source > source) return false;

        return mapping.source + mapping.range > source;
      });

      // compute the destination
      if (relevantMapping) {
        const difference = relevantMapping.destination - relevantMapping.source;
        return source + difference;
      } else return source;
    }, seed);

    if (ans > val) {
      console.log(ans);
      ans = val;
    }
  }
}

console.log(ans);
