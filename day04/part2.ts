import * as fs from "fs";
import * as path from "path";

function range(start: number, stop: number, step: number) {
  return Array.from(
    { length: (stop - start) / step + 1 },
    (_, i) => start + i * step
  );
}

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const answer = inputData
  .split("\n")
  .filter((x) => x)
  .map((assignment) =>
    assignment.split(",").map((rangeString) => {
      const [start, end] = rangeString.split("-");
      console.log(start, end);
      return range(parseInt(start, 10), parseInt(end, 10), 1);
    })
  )
  .map(([range1, range2]) => {
    return (
      range1.some((x) => range2.includes(x)) ||
      range2.some((x) => range1.includes(x))
    );
  })
  .filter((x) => x)
  .length;

console.log(answer);
