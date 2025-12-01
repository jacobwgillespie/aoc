import {input} from './data'

interface Monkey {
  number: number
  startingItems: number[]
  operation: (old: number) => number
  test: (worry: number) => boolean
  ifTrue: number
  ifFalse: number
  inspectedItemCount: number
}

async function main() {
  const monkeys = input.trim().split('\n\n').map(parseMonkey)

  for (let i = 0; i < 20; i++) {
    for (const monkey of monkeys) {
      let item = monkey.startingItems.shift()
      while (item !== undefined) {
        const newItem = Math.floor(monkey.operation(item) / 3)
        if (monkey.test(newItem)) {
          monkeys[monkey.ifTrue].startingItems.push(newItem)
        } else {
          monkeys[monkey.ifFalse].startingItems.push(newItem)
        }
        monkey.inspectedItemCount++
        item = monkey.startingItems.shift()
      }
    }
  }

  const mostBusyMonkeys = monkeys.sort((a, b) => b.inspectedItemCount - a.inspectedItemCount).slice(0, 2)

  console.log(`Monkey business: ${mostBusyMonkeys[0].inspectedItemCount * mostBusyMonkeys[1].inspectedItemCount}`)
}

function parseMonkey(input: string): Monkey {
  const lines = input.split('\n').map((line) => line.trim())
  const number = Number(lines[0].split(' ')[1].slice(0, -1))
  const startingItems = lines[1].split(': ')[1].split(', ').map(Number)
  const operation = parseOperation(lines[2].split(': ')[1])
  const test = parseTest(lines[3].split(': ')[1])
  const ifTrue = Number(lines[4].split(' ')[5])
  const ifFalse = Number(lines[5].split(' ')[5])
  return {number, startingItems, operation, test, ifTrue, ifFalse, inspectedItemCount: 0}
}

function parseOperation(input: string): (old: number) => number {
  if (input.startsWith('new = old * old')) {
    return (old) => old * old
  } else if (input.startsWith('new = old * ')) {
    const multiplier = Number(input.slice(12))
    return (old) => old * multiplier
  } else if (input.startsWith('new = old + ')) {
    const addend = Number(input.slice(12))
    return (old) => old + addend
  } else {
    throw new Error(`Unknown operation: ${input}`)
  }
}

function parseTest(input: string): (worry: number) => boolean {
  if (input.startsWith('divisible by ')) {
    const divisor = Number(input.slice(13))
    return (worry) => worry % divisor === 0
  } else {
    throw new Error(`Unknown test: ${input}`)
  }
}

main()
