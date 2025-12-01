import {input} from './data'

const lowercase = 'a'.charCodeAt(0)
const uppercase = 'A'.charCodeAt(0)

async function main() {
  const lines = input.split('\n')

  let sum = 0

  for (const line of lines) {
    if (line === '') continue
    const midpoint = Math.floor(line.length / 2)
    const first = line.slice(0, midpoint)
    const second = line.slice(midpoint)
    const common = first.split('').filter((char) => second.includes(char))[0]
    sum += getPriority(common)
  }

  console.log(`Sum: ${sum}`)
}

main()

function getPriority(char: string): number {
  const code = char.charCodeAt(0)
  if (code >= lowercase) {
    return code - lowercase + 1
  }
  if (code >= uppercase) {
    return code - uppercase + 27
  }
  throw new Error(`Invalid char: ${char}`)
}
