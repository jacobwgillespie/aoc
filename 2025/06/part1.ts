import {input} from './data'

const lines = input.split('\n') as string[]
const numberLines = lines.slice(0, -1)
const operatorLine = lines[lines.length - 1]

const grid = numberLines.map((line) => line.replaceAll(/\s+/g, ' ').trim().split(' ').map(Number))
const operators = operatorLine.replaceAll(/\s+/g, ' ').trim().split(' ')

let result = 0
for (let i = 0; i < operators.length; i++) {
  const operator = operators[i]
  const numbers = grid.map((line) => line[i])
  if (operator === '*') {
    result += numbers.reduce((a, b) => a * b, 1)
  } else if (operator === '+') {
    result += numbers.reduce((a, b) => a + b, 0)
  }
}

console.log(result)
