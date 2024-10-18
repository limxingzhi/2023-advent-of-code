# 2023-advent-of-code

## Day 1

- run `deno run --allow-read 1-1.ts`
- use `sh 1-2.test.sh` to test for q2
    - rename the text file to a backup
    - rename the test file as the text file
    - reverse after the tests are done

## Day 2

- use `head -n 5 2.input.txt` and to verify the `parseGame` funciton is working with just 5 lines.
- part 1 of the solution already looks for the minimum numbers, so part 2 is just doing the math.

## Day 3

- used a state machine to capture the words and check the surrounding for parts
- part2: same as part1, but I checked around the gear symbols instead
- I also used a table where they key is the position for each number, and the value is the number + its ID
    - the ID is important so we don't end up using the same number twice in the same ratio

