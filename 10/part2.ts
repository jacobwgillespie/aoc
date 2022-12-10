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

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 40; j++) {
      const value = cycleValues[i * 40 + j]
      if (value >= j - 1 && value <= j + 1) {
        process.stdout.write('#')
      } else {
        process.stdout.write('.')
      }
    }
    process.stdout.write('\n')
  }
}

main()
