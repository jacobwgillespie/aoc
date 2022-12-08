import {input} from './data'

async function main() {
  const lines = input.trim().split('\n')
  const grid = lines.map((line) => line.split('').map(Number))

  let maxScore = 0

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const score = computeScenicScore(grid, i, j)
      if (score > maxScore) {
        maxScore = score
      }
    }
  }

  console.log(`Max scenic score ${maxScore}`)
}

function computeScenicScore(grid: number[][], i: number, j: number): number {
  let up = 0
  let down = 0
  let left = 0
  let right = 0

  const value = grid[i][j]

  for (let k = i - 1; k >= 0; k--) {
    up++
    if (grid[k][j] >= value) break
  }

  for (let k = i + 1; k < grid.length; k++) {
    down++
    if (grid[k][j] >= value) break
  }

  for (let k = j - 1; k >= 0; k--) {
    left++
    if (grid[i][k] >= value) break
  }

  for (let k = j + 1; k < grid[0].length; k++) {
    right++
    if (grid[i][k] >= value) break
  }

  return up * down * left * right
}

main()
