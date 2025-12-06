import {input} from './data'

const [ranges, items] = input.split('\n\n') as [string, string]

const rangePairs = ranges.split('\n').map((range) => range.split('-').map((i) => parseInt(i, 10)) as [number, number])
const itemNumbers = items.split('\n').map((i) => parseInt(i, 10))

let count = 0

for (const item of itemNumbers) {
  for (const range of rangePairs) {
    if (item >= range[0] && item <= range[1]) {
      count += 1
      break
    }
  }
}

console.log(count)
