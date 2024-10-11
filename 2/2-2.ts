// cleaned via nvim macro `0vf:xxj`
// full macro `qq0vf:xxj<esc>99@q`

const lines = (await Deno.readTextFile("2.input.txt")).split("\n");

lines.pop(); // remove last line

type Color = "red" | "blue" | "green";

// find out the minimum number of cubes needed for each game
function parseGame(line: string) {
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

    { red: 0, blue: 0, green: 0 },
  );
}

function countPowerOfSet(game: Record<Color, number>): number {
  return Object.values(game).reduce((acc, sum) => acc * sum, 1);
}

const ans = lines
  .map(parseGame)
  .map(countPowerOfSet)
  .reduce((acc, current) => acc + current, 0);

console.log(ans);
