import {input} from './data'

const encoding = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
} satisfies Record<string, Move>

type Move = 'rock' | 'paper' | 'scissors'
type Instruction = 'win' | 'lose' | 'draw'
type Round = [Move, Instruction]

const moveValues = {
  rock: 1,
  paper: 2,
  scissors: 3,
} satisfies Record<Move, number>

async function main() {
  const lines = input.split('\n')

  const rounds: Round[] = []
  for (const line of lines) {
    if (line === '') continue
    const [move1, move2] = line.split(' ')
    rounds.push([encoding[move1 as keyof typeof encoding], move2 === 'X' ? 'lose' : move2 === 'Y' ? 'draw' : 'win'])
  }

  let scores = [0, 0]

  for (const [move1, instruction] of rounds) {
    const move2 = getMove(move1, instruction)
    scores[0] += moveValues[move1]
    scores[1] += moveValues[move2]

    const isDraw = move1 === move2
    const theyWin =
      (move1 === 'rock' && move2 === 'scissors') ||
      (move1 === 'paper' && move2 === 'rock') ||
      (move1 === 'scissors' && move2 === 'paper')

    if (isDraw) {
      scores[0] += 3
      scores[1] += 3
    } else if (theyWin) {
      scores[0] += 6
    } else {
      scores[1] += 6
    }
  }

  console.log(`Them: ${scores[0]}`)
  console.log(`You: ${scores[1]}`)
}

main()

function getMove(other: Move, instruction: Instruction): Move {
  if (instruction === 'win') {
    return other === 'rock' ? 'paper' : other === 'paper' ? 'scissors' : 'rock'
  } else if (instruction === 'lose') {
    return other === 'rock' ? 'scissors' : other === 'paper' ? 'rock' : 'paper'
  } else {
    return other
  }
}
