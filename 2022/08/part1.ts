import {input} from './data'

async function main() {
  const lines = input.trim().split('\n')
  const grid = lines.map((line) => line.split('').map(Number))
  const width = grid[0].length
  const height = grid.length

  const matches = new Set<string>()

  for (let i = 0; i < height; i++) {
    let largest = -1
    for (let j = 0; j < width; j++) {
      const current = grid[i][j]
      if (current > largest) {
        matches.add(`${i},${j}`)
        largest = current
      }
    }
  }

  for (let i = height - 1; i >= 0; i--) {
    let largest = -1
    for (let j = width - 1; j >= 0; j--) {
      const current = grid[i][j]
      if (current > largest) {
        matches.add(`${i},${j}`)
        largest = current
      }
    }
  }

  for (let j = 0; j < width; j++) {
    let largest = -1
    for (let i = 0; i < height; i++) {
      const current = grid[i][j]
      if (current > largest) {
        matches.add(`${i},${j}`)
        largest = current
      }
    }
  }

  for (let j = width - 1; j >= 0; j--) {
    let largest = -1
    for (let i = height - 1; i >= 0; i--) {
      const current = grid[i][j]
      if (current > largest) {
        matches.add(`${i},${j}`)
        largest = current
      }
    }
  }

  console.log(`Number Visible: ${matches.size}`)
}

main()
