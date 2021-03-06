/*-----------------------------------------------------------------------

Write a function `bestSum(targetSum, numbersArray)` that takes in a
`targetSum` and an array of positive integers as arguments.

The function should return an array containing `shortest` combination
of numbers that add up to exactly the `targetSum`.
Each number can be used many times.

If there is a tie for the shortest combination, you may return any one
of the the shortest combinations.

arguments:
  - {Z} targetSum
  - {[Z]} numbers

-------------------------------------------------------------------------*/

const hasOwnProp = Object.prototype.hasOwnProperty

// Recursive
const bestSum = (targetSum, numbers, memo = {}) => {
  if (hasOwnProp.call(memo, targetSum)) return memo[targetSum]

  if (targetSum === 0) return []
  if (targetSum < 0) return null

  let shortestCombination = null

  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i]
    const remainder = targetSum - x
    const combination = bestSum(remainder, numbers, memo)
    if (combination !== null) {
      const newCombination = combination.concat(x)
      if (
        shortestCombination === null ||
        newCombination.length < shortestCombination.length
      )
        shortestCombination = newCombination
    }
  }

  memo[targetSum] = shortestCombination
  return shortestCombination
}

// Tabulation
const bestSumTab = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null)
  table[0] = []

  const tableLen = table.length
  for (let i = 0; i < tableLen; i++) {
    if (Array.isArray(table[i])) {
      for (let j = 0; j < numbers.length; j++) {
        const num = numbers[j]
        if (i + num < tableLen) {
          const sumCombination = [...table[i], num]
          if (
            !table[i + num] || // If not array(null) OR
            sumCombination.length <= table[i + num].length // new combination is smaller than existing combination
          ) {
            table[i + num] = [...table[i], num]
          }
        }
      }
    }
  }

  return table[targetSum]
}

// -----------------------------------------------------------------------

describe('Best Sum', () => {
  it('Small', () => {
    expect(bestSum(7, [5, 3, 4, 7])).toEqual([7])
    expect(bestSum(8, [2, 3, 5])).toEqual([5, 3])
    expect(bestSum(8, [1, 2, 4, 5])).toEqual([4, 4])
    expect(bestSumTab(7, [5, 3, 4, 7])).toEqual([7])
    expect(bestSumTab(8, [2, 3, 5])).toEqual([5, 3])
    expect(bestSumTab(8, [1, 2, 4, 5])).toEqual([4, 4])
  })
  it('Huge', () => {
    expect(bestSum(100, [1, 2, 5, 25])).toEqual([25, 25, 25, 25])
    expect(bestSumTab(100, [1, 2, 5, 25])).toEqual([25, 25, 25, 25])
  })
})

// -----------------------------------------------------------------------

module.exports = bestSum
