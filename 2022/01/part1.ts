import {input} from './data'

async function main() {
  const lines = input.split('\n')
  let most = 0

  let sum = 0
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line === '') {
      if (sum > most) most = sum
      sum = 0
      continue
    }

    const cals = Number(line)
    sum += cals
  }

  console.log(most)
}

main()
