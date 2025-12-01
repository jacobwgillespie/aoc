import {input} from './data'

async function main() {
  const packets = input
    .trim()
    .split('\n')
    .filter((line) => line)
    .map((line): Packet => JSON.parse(line))

  const divider1: Packet = [[2]]
  const divider2: Packet = [[6]]
  packets.push(divider1, divider2)

  packets.sort((a, b) => {
    const result = isCorrectOrder(structuredClone(a), structuredClone(b))
    if (result === null) throw new Error('Invalid order')
    return result ? -1 : 1
  })
  const divider1Index = packets.indexOf(divider1) + 1
  const divider2Index = packets.indexOf(divider2) + 1
  console.log(divider1Index * divider2Index)
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
