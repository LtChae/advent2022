import * as fs from 'fs'
import * as path from 'path'

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');

let loads = inputData.split("\n\n")

let calorieTotals: number[] = loads.map((load: String) => {
    let calorieCounts: number[] = load.split("\n").map((count) => parseInt(count, 10))
    return calorieCounts.reduce((acc, x) => acc + x)
})

calorieTotals = calorieTotals.sort().reverse().filter(value => value)
console.log("Part 1:", calorieTotals[0])
console.log("Part 2:", calorieTotals.slice(0, 3).reduce((acc, x) => acc + x))
