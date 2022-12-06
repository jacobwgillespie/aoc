import {input} from './data'

async function main() {
  const chars = input.split('')

  for (let i = 3; i < chars.length; i++) {
    const isUniqueSequence = new Set(chars.slice(i - 4, i)).size === 4
    if (isUniqueSequence) {
      console.log(i)
      return
    }
  }

  throw new Error('Failed to parse')
}

main()
