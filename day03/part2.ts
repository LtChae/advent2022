import * as fs from 'fs'
import * as path from 'path'

const inputData = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf8');
const priorities = '-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let answer = inputData.split("\n")
.filter(x => x)
.reduce((acc, x: string) => {
    if (acc[acc.length - 1] && acc[acc.length - 1].length < 3) {
        acc[acc.length - 1].push(x)
    } else {
        acc.push([x])
    }
    return acc
}, [] as string[][])
.map(([p1, p2, p3]) => {
    let item = p1.split("").filter(x => p2.split("").includes(x) && p3.split("").includes(x))[0]
    console.log(item, priorities.indexOf(item))
    return priorities.indexOf(item)
})
.reduce((acc, x) => acc += x, 0)


console.log(answer)
