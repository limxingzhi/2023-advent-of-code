mv 1.input.txt 1.input_bu.txt
mv 1.input.test.txt 1.input.txt

deno run --allow-read 1-2.ts

mv 1.input.txt 1.input.test.txt
mv 1.input_bu.txt 1.input.txt
