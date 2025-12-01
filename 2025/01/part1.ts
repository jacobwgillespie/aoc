import {input} from './data'

let dial = 50
let atZero = 0

function rotateDial(direction: 'left' | 'right', steps: number) {
  if (direction === 'left') {
    dial = (dial - steps) % 100
  } else {
    dial = (dial + steps) % 100
  }

  if (dial < 0) {
    dial += 100
  }

  if (dial === 0) {
    atZero++
  }
}

const lines = input.split('\n')

for (const line of lines) {
  const direction = line[0]
  const steps = Number(line.slice(1))
  rotateDial(direction === 'L' ? 'left' : 'right', steps)
}

console.log(atZero)
