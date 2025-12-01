import {input} from './data'

const lowercase = 'a'.charCodeAt(0)
const uppercase = 'A'.charCodeAt(0)

async function main() {
  const lines = input.split('\n').filter((line) => line)

  let sum = 0

  for (let i = 0; i < lines.length; i += 3) {
    const group = [lines[i], lines[i + 1], lines[i + 2]]
    const common = group[0].split('').filter((char) => {
      return group[1].includes(char) && group[2].includes(char)
    })[0]
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
