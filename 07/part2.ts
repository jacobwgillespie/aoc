import {input} from './data'

interface Dir {
  name: string
  parent?: Dir
  size: number
  dirs: Record<string, Dir>
  files: Record<string, number>
}

const total = 70000000
const needed = 30000000

async function main() {
  const root: Dir = {
    name: '/',
    size: 0,
    dirs: {},
    files: {},
  }

  const parts = input
    .split('$ ')
    .map((line) => line.trim())
    .filter((line) => line)
    .map((line) => line.split('\n'))

  let current = root

  for (const [command, ...lines] of parts) {
    if (command.startsWith('cd ')) {
      const dirName = command.slice(3)
      if (dirName === '/') {
        current = root
      } else if (dirName === '..') {
        if (!current.parent) throw new Error('Cannot go up from root')
        current = current.parent
      } else {
        current = current.dirs[dirName]
      }
      continue
    }

    if (command.startsWith('ls')) {
      for (const line of lines) {
        const [size, name] = line.split(' ')
        if (size === 'dir' && !current.dirs[name]) {
          current.dirs[name] = {
            name,
            parent: current,
            size: 0,
            dirs: {},
            files: {},
          }
        } else {
          current.files[name] = parseInt(size, 10)
        }
      }
    }
  }

  calculateSizes(root)

  const currentFree = total - root.size
  const target = needed - currentFree

  const candidates = calculateCandidateDirs(root, target)

  candidates.sort((a, b) => a.size - b.size)
  const chosen = candidates[0]

  console.log(chosen.name, chosen.size)
}

function calculateSizes(dir: Dir) {
  for (const subdir of Object.values(dir.dirs)) {
    calculateSizes(subdir)
  }

  let sum = 0

  for (const file of Object.values(dir.files)) {
    sum += file
  }
  for (const subDir of Object.values(dir.dirs)) {
    sum += subDir.size
  }

  dir.size = sum
}

function calculateCandidateDirs(dir: Dir, target: number): Dir[] {
  const candidates: Dir[] = []
  for (const subdir of Object.values(dir.dirs)) {
    candidates.push(...calculateCandidateDirs(subdir, target))
  }
  if (dir.size >= target) {
    candidates.push(dir)
  }
  return candidates
}

main()
