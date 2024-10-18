// cleaned via nvim macro `0vf:xxj`
// full macro `qq0vf:xxj<esc>99@q`

const lines = (await Deno.readTextFile("2.input.txt")).split("\n");

lines.pop(); // remove last line

type Color = "red" | "blue" | "green";

// find out the minimum number of cubes needed for each game
function parseGame(line: string, index: number) {
  const games = line.split(";");

  return games.reduce(
    (gameSum, game) => {
      const cubes = game.split(",");
      cubes.map((item) => {
        const [count, color] = item.trimStart().split(" ") as [string, Color];

        if (gameSum[color] < parseInt(count, 10))
          gameSum[color] = parseInt(count, 10);
      });

      return gameSum;
    },

    { red: 0, blue: 0, green: 0, id: index + 1 },
  );
}

// console.log(parseGame(lines[0]));

const minCubesRequired = lines.map(parseGame);

// console.log(JSON.stringify(minCubesRequired, null, 2))

// testing requirement : 12 red cubes, 13 green cubes, and 14 blue cubes
// { red: 12, green: 13, blue: 14 }

const ans = minCubesRequired.reduce((sum, game) => {
  if (game.red <= 12 && game.green <= 13 && game.blue <= 14) {
    sum += game.id;
  }
    // console.log(sum, game.id);
  return sum;
}, 0);

console.log(ans);
