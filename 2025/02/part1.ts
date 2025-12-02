import {input} from './data'

const ranges = input.split(',').map((range) => range.split('-').map(Number) as [number, number])

let sum = 0

for (const range of ranges) {
  const [a, b] = range
  for (let i = a; i <= b; i++) {
    const string = i.toString()
    if (string.length % 2 !== 0) continue
    const [first, second] = [string.slice(0, string.length / 2), string.slice(string.length / 2)]
    if (first === second) {
      sum += i
    }
  }
}

console.log(sum)
