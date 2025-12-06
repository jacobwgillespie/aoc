import {input} from './data'

const [ranges] = input.split('\n\n') as [string, string]

const rangePairs = ranges
  .split('\n')
  .map((range) => range.split('-').map((i) => parseInt(i, 10)) as [number, number])
  .sort((a, b) => a[0] - b[0])
const mergedRanges: [number, number][] = [...rangePairs]

let merged = false
outerLoop: while (!merged) {
  for (let i = 0; i < mergedRanges.length - 1; i++) {
    const [a, b] = mergedRanges[i]
    const [c, d] = mergedRanges[i + 1]
    if (b >= c) {
      mergedRanges[i] = [a, Math.max(b, d)]
      mergedRanges.splice(i + 1, 1)
      merged = false
      continue outerLoop
    }
  }
  merged = true
}

let count = 0

for (const range of mergedRanges) {
  count += range[1] - range[0] + 1
}

console.log(count)
