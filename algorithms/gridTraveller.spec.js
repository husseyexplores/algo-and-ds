/*-----------------------------------------------------------------------

Say that you're a traveller on a 2D grid. You begin in the
top-left corner and your goal is to travel to the bottom-right
corner. You may only move down or right.

arguments:
  - Z x
  - Z y

-------------------------------------------------------------------------*/

const hasOwnProp = Object.prototype.hasOwnProperty

// Recursive
const gridTraveller = (x, y, memo = {}) => {
  if (x === 0 || y === 0) return 0
  if (x === 1 && y === 1) return 1

  const key = `${x},${y}`
  if (hasOwnProp.call(memo, key)) return memo[key]

  memo[key] = gridTraveller(x - 1, y, memo) + gridTraveller(x, y - 1, memo)
  return memo[key]
}

// Tabulation
/**
  if we have grid(3,3), we need to create this grid
  and add every value to the right and bottom neighbours
[ y + 1 length
  [0, 0, 0, 0], x + 1 length
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]

*/
const gridTravellerTab = (x, y) => {
  if (x === 0 || y === 0) return 0
  if (x === 1 && y === 1) return 1

  // make grid
  const grid = Array(x + 1)
    .fill()
    .map(() => Array(y + 1).fill(0))
  grid[1][1] = 1

  const gridLen = grid.length

  for (let i = 0; i < gridLen; i++) {
    const jLen = grid[i].length
    for (let j = 0; j < jLen; j++) {
      const currValue = grid[i][j]
      // Add it to the right neighbour
      if (j < jLen - 1) {
        grid[i][j + 1] += currValue
      }
      // Add it to the bottom neighbour
      if (i < gridLen - 1) {
        grid[i + 1][j] += currValue
      }
    }
  }

  return grid[x][y]
}

// -----------------------------------------------------------------------

describe('Grid Traveller', () => {
  it('Small', () => {
    expect(gridTraveller(1, 1)).toEqual(1)
    expect(gridTraveller(2, 3)).toEqual(3)
    expect(gridTraveller(3, 2)).toEqual(3)
    expect(gridTraveller(3, 3)).toEqual(6)
    expect(gridTravellerTab(1, 1)).toEqual(1)
    expect(gridTravellerTab(2, 3)).toEqual(3)
    expect(gridTravellerTab(3, 2)).toEqual(3)
    expect(gridTravellerTab(3, 3)).toEqual(6)
  })
  it('Huge', () => {
    expect(gridTraveller(18, 18)).toEqual(2333606220)
    expect(gridTravellerTab(18, 18)).toEqual(2333606220)
  })
})

// -----------------------------------------------------------------------

module.exports = gridTraveller
