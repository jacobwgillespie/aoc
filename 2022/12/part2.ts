import {input} from './data'

async function main() {
  const start: [number, number] = [0, 0]
  const end: [number, number] = [0, 0]

  const grid = input
    .trim()
    .split('\n')
    .map((line, i) =>
      line.split('').map((char, j) => {
        if (char === 'S') {
          start[0] = i
          start[1] = j
          return 0
        }
        if (char === 'E') {
          end[0] = i
          end[1] = j
          return 25
        }
        return char.charCodeAt(0) - 'a'.charCodeAt(0)
      }),
    )

  const possibleStartPositions: [number, number][] = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 0) {
        possibleStartPositions.push([i, j])
      }
    }
  }

  const candidates = possibleStartPositions
    .flatMap(([i, j]) => {
      return traverse(grid, [i, j], end)
    })
    .map(([, , distance]) => distance)

  console.log(Math.min(...candidates))
}

function traverse(grid: number[][], start: [number, number], end: [number, number]): [number, number, number][] {
  const queue: [number, number, number][] = [[start[0], start[1], 0]]
  const possibilities: [number, number, number][] = []
  const visited: Set<string> = new Set()

  while (queue.length) {
    const [i, j, distance] = queue.shift()!

    if (i === end[0] && j === end[1]) {
      possibilities.push([i, j, distance])
      continue
    }

    const key = `${i},${j}`
    if (visited.has(key)) continue
    visited.add(key)

    const maxNextValue = grid[i][j] + 1

    if (i > 0 && grid[i - 1][j] <= maxNextValue) {
      queue.push([i - 1, j, distance + 1])
    }
    if (i < grid.length - 1 && grid[i + 1][j] <= maxNextValue) {
      queue.push([i + 1, j, distance + 1])
    }
    if (j > 0 && grid[i][j - 1] <= maxNextValue) {
      queue.push([i, j - 1, distance + 1])
    }
    if (j < grid[i].length - 1 && grid[i][j + 1] <= maxNextValue) {
      queue.push([i, j + 1, distance + 1])
    }
  }

  return possibilities
}

main()
