import {input} from './data'

async function main() {
  const lines = input.split('\n').slice(1)
  const split = lines.findIndex((line) => line === '')
  const crateCount = (lines[split - 1].length + 2) / 4

  const stacks: string[][] = []
  for (let i = 0; i < crateCount; i++) {
    stacks.push([])
  }

  const crates = lines.slice(0, split - 1).reverse()
  for (const line of crates) {
    for (let i = 0; i <= crates.length; i++) {
      const crate = ` ${line}`[i * 4 + 2]
      if (crate && crate !== ' ') stacks[i].push(crate)
    }
  }

  const moves = lines.slice(split)
  for (const line of moves) {
    if (line === '') continue
    const match = line.match(/move (\d+) from (\d+) to (\d+)/)
    if (!match) throw new Error(`Invalid move: ${line}`)
    const [, count, from, to] = match.map(Number)
    const fromStack = stacks[from - 1]
    const toStack = stacks[to - 1]
    const crates = fromStack.splice(fromStack.length - count)
    if (crates.length !== count) {
      throw new Error(`Invalid move: ${line}`)
    }
    toStack.push(...crates.reverse())
  }

  console.log(stacks.map((stack) => stack[stack.length - 1] ?? '').join(''))
}

main()
