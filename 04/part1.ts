import {input} from './data'

async function main() {
  const lines = input.split('\n').filter((line) => line)

  let sum = 0

  for (const line of lines) {
    const [one, two] = line.split(',')
    const [a, b] = one.split('-').map((char) => Number(char))
    const [c, d] = two.split('-').map((char) => Number(char))

    if (a >= c && b <= d) {
      sum += 1
    } else if (c >= a && d <= b) {
      sum += 1
    }
  }

  console.log(`Fully contains: ${sum}`)
}

main()
