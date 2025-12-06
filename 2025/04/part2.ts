import {input} from './data'

const grid = input.split('\n').map((line) => line.split(''))

function countAdjacent(grid: string[][], i: number, j: number): number {
  let count = 0
  for (let x = i - 1; x <= i + 1; x++) {
    for (let y = j - 1; y <= j + 1; y++) {
      if (x < 0 || y < 0) continue
      if (x >= grid.length || y >= grid[i].length) continue
      if (x === i && y === j) continue

      if (grid[x][y] === '@') count += 1
    }
  }
  return count
}

let countAccessible = 0
let removed = true

while (removed) {
  removed = false

  outerLoop: for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '@' && countAdjacent(grid, i, j) < 4) {
        countAccessible++
        removed = true
        grid[i][j] = '.'
        break outerLoop
      }
    }
  }
}

console.log(countAccessible)
