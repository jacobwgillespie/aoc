import {input} from './data'

interface Move {
  direction: 'U' | 'D' | 'L' | 'R'
  distance: number
}

type Position = [number, number]

async function main() {
  const lines = input.trim().split('\n')
  const moves = lines.map((line): Move => {
    const [direction, distance] = line.split(' ')
    return {direction: direction as any, distance: parseInt(distance)}
  })

  const visited = new Set(['0,0'])

  const head: Position = [0, 0]
  const tail: Position = [0, 0]

  for (const move of moves) {
    const dimension = move.direction === 'U' || move.direction === 'D' ? 1 : 0
    const otherDimension = dimension === 1 ? 0 : 1
    const direction = move.direction === 'U' || move.direction === 'R' ? 1 : -1

    for (let i = 0; i < move.distance; i++) {
      head[dimension] += direction

      if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
        tail[otherDimension] = head[otherDimension]
        tail[dimension] = head[dimension] - direction
      }
      visited.add(`${tail[0]},${tail[1]}`)
    }
  }

  console.log(`Visited: ${visited.size}`)
  // printMap(visited)
}

function printMap(visited: Set<string>) {
  const minX = Math.min(...[...visited].map((s) => parseInt(s.split(',')[0])))
  const maxX = Math.max(...[...visited].map((s) => parseInt(s.split(',')[0])))
  const minY = Math.min(...[...visited].map((s) => parseInt(s.split(',')[1])))
  const maxY = Math.max(...[...visited].map((s) => parseInt(s.split(',')[1])))

  for (let y = maxY; y >= minY; y--) {
    let row = ''
    for (let x = minX; x <= maxX; x++) {
      row += visited.has(`${x},${y}`) ? 'X' : '.'
    }
    console.log(row)
  }
}

main()
