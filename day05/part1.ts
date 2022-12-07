import { createSecretKey } from "crypto";
import * as fs from "fs";
import * as path from "path";

const inputData = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

let [diagram, instructions] = inputData.split("\n\n")
// diagram = diagram.replace(/\[/g, "").replace(/\]/g, "").replace(/  /g, "")
let cells = diagram.split("\n").map(x => x.split(""))
let stacks: { [key: number]: string[] } = {}
for (const [yindex, row] of cells.entries()) {
    console.log(row)
    for (const [xindex, column] of row.entries()) {
    if(column.match(/[A-Z]/)) {
        if (stacks[xindex]) {
            stacks[xindex].push(column)
        } else {
            stacks[xindex] = [column]
        }
    }
  }
}
let stackList: string[][] = []
for (let key in stacks) {
    stackList.push(stacks[key].reverse())
}

let instructionSequence = instructions.split("\n").filter(x => x).map(instructionString => {
    let instructionRegex = /move (\d+) from (\d+) to (\d+)/
    let matches = instructionRegex.exec(instructionString)
    if (matches) {
        return {
            crates: parseInt(matches[1], 10),
            source: parseInt(matches[2], 10),
            target: parseInt(matches[3], 10),
        }
    } else {
        return {
            crates: 0,
            source: 0,
            target: 0,
        }
    }
})

instructionSequence.forEach((instructions) => {
    for (let i = 0; i < instructions.crates; i++) {
        let crate = stackList[instructions.source - 1].pop()
        if (crate) {stackList[instructions.target - 1].push(crate)}
        
    }
})

// console.log(diagram, stackList, instructionSequence)
console.log(stackList)

let answer = stackList.map((stack) => stack[stack.length-1])
console.log(answer.join(""))
