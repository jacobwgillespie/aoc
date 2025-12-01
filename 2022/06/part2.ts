import {input} from './data'

async function main() {
  const chars = input.split('')

  const sequenceLength = 14

  for (let i = sequenceLength - 1; i < chars.length; i++) {
    const isUniqueSequence = new Set(chars.slice(i - sequenceLength, i)).size === sequenceLength
    if (isUniqueSequence) {
      console.log(i)
      return
    }
  }

  throw new Error('Failed to parse')
}

main()
