import {input} from './data'

const banks = input.split('\n').map((line) => line.split('').map((i) => parseInt(i, 10)))

function largestSequence(size: number, bank: number[]) {
  const numbers: number[] = []
  const indices: number[] = []

  for (let position = 0; position < size; position++) {
    const nextIdx = position === 0 ? 0 : indices[position - 1] + 1
    const lastPossibleIdx = bank.length - size + position

    numbers[position] = bank[nextIdx]
    indices[position] = nextIdx

    for (let i = nextIdx; i < lastPossibleIdx + 1; i++) {
      if (bank[i] > numbers[position]) {
        numbers[position] = bank[i]
        indices[position] = i
      }
    }
  }

  return Number(numbers.join(''))
}

let sum = 0

for (const bank of banks) {
  const largest = largestSequence(12, bank)
  sum += largest
}

console.log(sum)
