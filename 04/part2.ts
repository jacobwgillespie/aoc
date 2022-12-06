import {input} from './data'

async function main() {
  const lines = input.split('\n').filter((line) => line)

  let sum = 0

  for (const line of lines) {
    const [one, two] = line.split(',')
    const [a, b] = one.split('-').map((char) => Number(char))
    const [c, d] = two.split('-').map((char) => Number(char))

    const overlaps = Math.max(a, c) <= Math.min(b, d)
    if (overlaps) {
      sum += 1
    }
  }

  console.log(`Overlaps: ${sum}`)
}

main()
