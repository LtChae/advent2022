import * as fs from 'fs'
import * as path from 'path'

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const priorities = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let answer = inputData.split("\n")
.filter(x => x)
.map((load: string) => {
    return [load.slice(0, load.length/2), load.slice(load.length/2, load.length)]
})
.map(([c1, c2]) => {
    let item = c1.split("").filter(x => c2.split("").includes(x))[0]
    console.log(item, priorities.indexOf(item))
    return priorities.indexOf(item)
})
.reduce((acc, x) => acc += x, 0)

console.log(answer)
