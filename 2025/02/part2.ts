import {input} from './data'

const ranges = input.split(',').map((range) => range.split('-').map((i) => parseInt(i, 10)) as [number, number])

let sum = 0

function splitChunks(string: string, length: number) {
  const chunks = []
  for (let i = 0; i < string.length; i += length) {
    chunks.push(string.slice(i, i + length))
  }
  return chunks
}

function hasRepeats(number: number) {
  const string = number.toString()
  const length = string.length

  for (let i = 0; i < string.length; i++) {
    if (length % i !== 0) continue
    const chunks = splitChunks(string, i)
    if (chunks.every((chunk) => chunk === chunks[0])) return true
  }

  return false
}

for (const range of ranges) {
  const [a, b] = range
  for (let i = a; i <= b; i++) {
    if (hasRepeats(i)) {
      sum += i
    }
  }
}

console.log(sum)
