cp 2.input.txt bu.input.txt
cp 2-2.test.txt 2.input.txt

deno run --allow-read 2-2.ts
echo should be 2286

cp bu.input.txt 2.input.txt

