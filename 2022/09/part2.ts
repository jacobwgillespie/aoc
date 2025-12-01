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

  const knots: Position[] = [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ]

  const head: Position = knots[0]
  const tail: Position = knots[9]

  for (const move of moves) {
    const dimension = move.direction === 'U' || move.direction === 'D' ? 1 : 0
    const direction = move.direction === 'U' || move.direction === 'R' ? 1 : -1

    for (let i = 0; i < move.distance; i++) {
      head[dimension] += direction

      for (let j = 1; j < knots.length; j++) {
        moveKnot(knots[j - 1], knots[j])
      }

      visited.add(`${tail[0]},${tail[1]}`)
    }
  }

  console.log(`Visited: ${visited.size}`)
  // printMap(visited)
}

function moveKnot(first: Position, second: Position) {
  if (Math.abs(first[0] - second[0]) <= 1 && Math.abs(first[1] - second[1]) <= 1) return

  const xDiff = first[0] - second[0]
  const yDiff = first[1] - second[1]

  if (xDiff > 0) second[0]++
  if (xDiff < 0) second[0]--
  if (yDiff > 0) second[1]++
  if (yDiff < 0) second[1]--
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

function printKnots(knots: Position[]) {
  const minX = Math.min(...knots.map((p) => p[0]))
  const maxX = Math.max(...knots.map((p) => p[0]))
  const minY = Math.min(...knots.map((p) => p[1]))
  const maxY = Math.max(...knots.map((p) => p[1]))

  for (let y = maxY; y >= minY; y--) {
    let row = ''
    for (let x = minX; x <= maxX; x++) {
      row += knots.find((p) => p[0] === x && p[1] === y) ? 'X' : '.'
    }
    console.log(row)
  }
}

main()
