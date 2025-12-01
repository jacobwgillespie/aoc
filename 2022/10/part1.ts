import {input} from './data'

type Instruction = {cmd: 'addx'; value: number} | {cmd: 'noop'}

async function main() {
  const lines = input.trim().split('\n')
  const instructions = lines.map((line): Instruction => {
    const [cmd, value] = line.split(' ')
    if (cmd === 'noop') return {cmd}
    if (cmd === 'addx') return {cmd, value: Number(value)}
    throw new Error(`Unknown command: ${cmd}`)
  })

  const cycleValues: number[] = []
  let register = 1

  for (const instruction of instructions) {
    if (instruction.cmd === 'noop') {
      cycleValues.push(register)
    } else if (instruction.cmd === 'addx') {
      cycleValues.push(register)
      cycleValues.push(register)
      register += instruction.value
    }
  }

  const signalStrength =
    cycleValues[20 - 1] * 20 +
    cycleValues[60 - 1] * 60 +
    cycleValues[100 - 1] * 100 +
    cycleValues[140 - 1] * 140 +
    cycleValues[180 - 1] * 180 +
    cycleValues[220 - 1] * 220

  console.log(`Signal strength: ${signalStrength}`)
}

main()
