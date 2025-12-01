import {input} from './data'

async function main() {
  const pairs = input.trim().split('\n\n')

  let sum = 0

  for (const [idx, pair] of pairs.entries()) {
    const [firstLine, secondLine] = pair.split('\n')

    const first = JSON.parse(firstLine)
    const second = JSON.parse(secondLine)

    const correct = isCorrectOrder(first, second)
    if (correct) sum += idx + 1
  }

  console.log(sum)
}

type Packet = number[] | (number | Packet)[]

function isCorrectOrder(first: Packet, second: Packet): boolean | null {
  while (first.length > 0 && second.length > 0) {
    const a = first.shift()
    const b = second.shift()

    if (typeof a === 'number' && typeof b === 'number') {
      if (a < b) return true
      if (a > b) return false
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      const result = isCorrectOrder(a, b)
      if (result !== null) return result
    }

    if (typeof a === 'number' && Array.isArray(b)) {
      const result = isCorrectOrder([a], b)
      if (result !== null) return result
    }

    if (Array.isArray(a) && typeof b === 'number') {
      const result = isCorrectOrder(a, [b])
      if (result !== null) return result
    }
  }

  if (first.length > 0) return false
  if (second.length > 0) return true

  return null
}

main()
