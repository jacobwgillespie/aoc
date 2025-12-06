import {input} from './data'

const lines = input.split('\n').map((line) => line.split('').toReversed().join(''))

let result = 0

let numbers = [] as number[]
for (let i = 0; i < lines[0].length; i++) {
  const characters = [] as string[]
  for (let j = 0; j < lines.length - 1; j++) {
    if (lines[j][i] === ' ') continue
    characters.push(lines[j][i])
  }
  if (characters.length === 0) continue

  numbers.push(parseInt(characters.join(''), 10))

  const operator = lines[lines.length - 1][i]
  if (operator === ' ') continue

  if (operator === '*') {
    result += numbers.reduce((a, b) => a * b, 1)
  } else if (operator === '+') {
    result += numbers.reduce((a, b) => a + b, 0)
  }
  numbers = []
}

console.log(result)
