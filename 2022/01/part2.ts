import {input} from './data'

async function main() {
  const lines = input.split('\n')
  const sums = []

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line === '') {
      sums.push(sum)
      sum = 0
      continue
    }

    const cals = Number(line)
    sum += cals
  }

  sums.sort((a, b) => b - a)

  console.log(sums[0] + sums[1] + sums[2])
}

main()
