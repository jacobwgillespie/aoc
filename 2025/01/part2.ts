import {input} from './data'

let dial = 50
let numTimesVisitedZero = 0

function rotateDial(direction: 'left' | 'right', steps: number) {
  if (direction === 'left') {
    if (dial === 0) {
      numTimesVisitedZero += Math.floor(steps / 100)
    } else {
      numTimesVisitedZero += Math.floor((steps - dial) / 100) + 1
    }

    dial = dial - steps
    dial = ((dial % 100) + 100) % 100
  } else {
    numTimesVisitedZero += Math.floor((dial + steps) / 100)

    dial = (dial + steps) % 100
  }
}

const lines = input.split('\n')

for (const line of lines) {
  const direction = line[0]
  const steps = Number(line.slice(1))
  rotateDial(direction === 'L' ? 'left' : 'right', steps)
}

console.log(numTimesVisitedZero)
