import {input} from './data'

const banks = input.split('\n').map((line) => line.split('').map((i) => parseInt(i, 10)))

function largestPair(bank: number[]) {
  let firstLargest = bank[0]
  let firstLargestIdx = 0
  for (let i = 0; i < bank.length - 1; i++) {
    if (bank[i] > firstLargest) {
      firstLargest = bank[i]
      firstLargestIdx = i
    }
  }

  const secondLargestIdx = firstLargestIdx + 1
  let secondLargest = bank[secondLargestIdx]
  for (let i = secondLargestIdx + 1; i < bank.length; i++) {
    if (bank[i] > secondLargest) {
      secondLargest = bank[i]
    }
  }

  return Number(`${firstLargest}${secondLargest}`)
}

let sum = 0

for (const bank of banks) {
  const largest = largestPair(bank)
  sum += largest
}

console.log(sum)
