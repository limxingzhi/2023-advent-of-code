import { seeds, mappings } from "./5-1.input.ts";
// import { seeds, mappings } from "./5-1.test.ts";

const locations = seeds.map((seed) => {
  // run the seed through the mapping and derive the location
  return mappings.reduce((source, currentMapping) => {
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
});

const answer = Math.min(...locations);

console.log(answer);
