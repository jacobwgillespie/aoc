import {input} from './data'

async function main() {
  const lines = input.split('\n').filter((line) => line)
  const segments = lines.map((line) =>
    line.split(' -> ').map((segment) => segment.split(',').map((num) => parseInt(num, 10))),
  )

  const maxY = Math.max(...segments.map((segment) => Math.max(...segment.map((point) => point[1]))))

  function getValue(grid: Map<number, Map<number, string>>, x: number, y: number) {
    if (y === maxY + 2) return '#'
    if (!grid.has(y)) return '.'
    return grid.get(y)!.get(x) || '.'
  }

  function setValue(grid: Map<number, Map<number, string>>, x: number, y: number, value: string) {
    if (!grid.has(y)) grid.set(y, new Map())
    grid.get(y)!.set(x, value)
  }

  const grid = new Map<number, Map<number, string>>()

  for (const line of segments) {
    for (let i = 0; i < line.length - 1; i++) {
      const start = line[i]
      const end = line[i + 1]

      setValue(grid, start[0], start[1], '#')
      setValue(grid, end[0], end[1], '#')

      for (let x = start[0]; x < end[0]; x++) {
        setValue(grid, x, start[1], '#')
      }

      for (let y = start[1]; y < end[1]; y++) {
        setValue(grid, start[0], y, '#')
      }

      for (let x = end[0]; x < start[0]; x++) {
        setValue(grid, x, start[1], '#')
      }

      for (let y = end[1]; y < start[1]; y++) {
        setValue(grid, start[0], y, '#')
      }
    }
  }

  let done = false
  let resting = 0

  while (!done) {
    let sandX = 500
    let sandY = 0

    let falling = true
    while (falling) {
      if (getValue(grid, sandX, sandY + 1) === '.') {
        sandY += 1
      } else if (getValue(grid, sandX, sandY + 1) === '#' || getValue(grid, sandX, sandY + 1) === 'o') {
        if (getValue(grid, sandX - 1, sandY + 1) === '.') {
          sandX -= 1
          sandY += 1
        } else if (getValue(grid, sandX + 1, sandY + 1) === '.') {
          sandX += 1
          sandY += 1
        } else {
          setValue(grid, sandX, sandY, 'o')
          falling = false
          resting += 1

          if (sandX === 500 && sandY === 0) {
            done = true
            break
          }
        }
      }
    }
  }

  console.log(resting)
}

function displayGrid(grid: string[][]) {
  console.log(grid.map((row) => row.join('')).join('\n'))
}

main()
