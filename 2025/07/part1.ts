import {input} from './data'

const rows = input.split('\n').map((row) => row.split('')) as ('.' | '^' | 'S' | '|')[][]

let numSplits = 0

const processed = new Set<string>()

for (let i = 0; i < rows.length; i++) {
  for (let j = 0; j < rows[i].length; j++) {
    switch (rows[i][j]) {
      case 'S':
        if (rows[i + 1] && rows[i + 1][j] === '.') rows[i + 1][j] = '|'
        break
      case '^':
        if (processed.has(`${i},${j}`)) break
        if (rows[i - 1] && (rows[i - 1][j] === '|' || rows[i - 1][j] === 'S')) {
          processed.add(`${i},${j}`)
          numSplits += 1
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
}

console.log(numSplits)
