import {input} from './data'

const rows = input.split('\n').map((row) => row.split('')) as ('.' | '^' | 'S' | '|')[][]

let particles = new Map<number, number>()
for (let j = 0; j < rows[0].length; j++) {
  if (rows[0][j] === 'S') {
    particles.set(j, 1)
    break
  }
}

const processed = new Set<string>()
const splitsThisRow = new Map<number, number>()

for (let i = 0; i < rows.length; i++) {
  splitsThisRow.clear()

  for (let j = 0; j < rows[i].length; j++) {
    switch (rows[i][j]) {
      case 'S':
        if (rows[i + 1] && rows[i + 1][j] === '.') rows[i + 1][j] = '|'
        break
      case '^':
        if (processed.has(`${i},${j}`)) break
        if (rows[i - 1] && (rows[i - 1][j] === '|' || rows[i - 1][j] === 'S')) {
          processed.add(`${i},${j}`)
          splitsThisRow.set(j, particles.get(j) || 0)
          if (rows[i][j + 1] && rows[i][j + 1] === '.') {
            rows[i][j + 1] = '|'
          }
          if (rows[i][j - 1] && rows[i][j - 1] === '.') {
            rows[i][j - 1] = '|'
            j -= 2
          }
        }
        break
      case '|':
        if (rows[i + 1] && rows[i + 1][j] === '.') rows[i + 1][j] = '|'
        break
    }
  }

  const nextParticles = new Map<number, number>()
  for (const [col, count] of particles) {
    if (splitsThisRow.has(col)) {
      nextParticles.set(col - 1, (nextParticles.get(col - 1) || 0) + count)
      nextParticles.set(col + 1, (nextParticles.get(col + 1) || 0) + count)
    } else {
      nextParticles.set(col, (nextParticles.get(col) || 0) + count)
    }
  }
  particles = nextParticles
}

let timelines = 0
for (const count of particles.values()) {
  timelines += count
}

console.log(timelines)
