import {input} from './data'

async function main() {
  const lines = input.split('\n').filter((line) => line)
  const segments = lines.map((line) =>
    line.split(' -> ').map((segment) => segment.split(',').map((num) => parseInt(num, 10))),
  )

  const maxX = Math.max(...segments.map((segment) => Math.max(...segment.map((point) => point[0]))))
  const maxY = Math.max(...segments.map((segment) => Math.max(...segment.map((point) => point[1]))))
  const minX = Math.min(...segments.map((segment) => Math.min(...segment.map((point) => point[0]))))
  const minY = Math.min(...segments.map((segment) => Math.min(...segment.map((point) => point[1]))))

  const grid = Array.from({length: maxY + 1}, () => Array.from({length: maxX - minX + 1}, () => '.'))

  console.log(segments)

  for (const line of segments) {
    for (let i = 0; i < line.length - 1; i++) {
      const start = line[i]
      const end = line[i + 1]

      grid[start[1]][start[0] - minX] = '#'
      grid[end[1]][end[0] - minX] = '#'

      for (let x = start[0]; x < end[0]; x++) {
        grid[start[1]][x - minX] = '#'
      }

      for (let y = start[1]; y < end[1]; y++) {
        grid[y][start[0] - minX] = '#'
      }

      for (let x = end[0]; x < start[0]; x++) {
        grid[start[1]][x - minX] = '#'
      }

      for (let y = end[1]; y < start[1]; y++) {
        grid[y][start[0] - minX] = '#'
      }
    }
  }

  displayGrid(grid)

  let done = false
  let resting = 0

  while (!done) {
    let sandX = 500 - minX
    let sandY = 0

    let falling = true
    while (falling) {
      if (sandX < 0 || sandX >= maxX || sandY >= maxY) {
        done = true
        break
      }

      if (grid[sandY + 1][sandX] === '.') {
        sandY += 1
      } else if (grid[sandY + 1][sandX] === '#' || grid[sandY + 1][sandX] === 'o') {
        if (grid[sandY + 1][sandX - 1] === '.') {
          sandX -= 1
          sandY += 1
        } else if (grid[sandY + 1][sandX + 1] === '.') {
          sandX += 1
          sandY += 1
        } else if (sandX === 0 || sandX === maxX) {
          done = true
          break
        } else {
          grid[sandY][sandX] = 'o'
          falling = false
          resting += 1
        }
      }
    }
  }

  displayGrid(grid)
  console.log(resting)
}

function displayGrid(grid: string[][]) {
  console.log(grid.map((row) => row.join('')).join('\n'))
}

main()
