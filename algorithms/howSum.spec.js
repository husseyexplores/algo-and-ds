/*-----------------------------------------------------------------------

Write a function `canSum(targetSum, numbers)` that takes in a
`targetSum` and an array of positive integers as arguments.

The function should return an array containing any combination of elements
that add up to exactly the `targetSum`. If there is no combination that
adds up to the `targetSum`, then return `null`.

If there are multiple combinations, you may return any one of them.

arguments:
  - Z targetSum
  - [Z] numbers

-------------------------------------------------------------------------*/

const hasOwnProp = Object.prototype.hasOwnProperty

// Recursive
const howSum = (targetSum, numbers, memo = {}) => {
  if (hasOwnProp.call(memo, targetSum)) return memo[targetSum]

  if (targetSum === 0) return []
  if (targetSum < 0) return null

  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i]
    const remainder = targetSum - x
    const result = howSum(remainder, numbers, memo)
    if (result) {
      result.push(x)
      memo[targetSum] = result
      return result
    }
  }

  memo[targetSum] = null
  return null
}

// Tabulation
const howSumTab = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null)
  table[0] = []

  const tableLen = table.length
  for (let i = 0; i < tableLen; i++) {
    if (Array.isArray(table[i])) {
      for (let j = 0; j < numbers.length; j++) {
        const num = numbers[j]
        if (i + num < tableLen) {
          table[i + num] = [...table[i], num]
        }
      }
    }
  }

  return table[targetSum]
}

// -----------------------------------------------------------------------

describe('How Sum', () => {
  it('Small', () => {
    expect(howSum(7, [2, 3])).toEqual([3, 2, 2])
    expect(howSum(7, [5, 3, 4, 7])).toEqual([4, 3])
    expect(howSum(7, [2, 4])).toEqual(null)
    expect(howSum(8, [2, 3, 5])).toEqual([2, 2, 2, 2])
    expect(howSumTab(7, [2, 3])).toEqual([3, 2, 2])
    expect(howSumTab(7, [5, 3, 4, 7])).toEqual([4, 3])
    expect(howSumTab(7, [2, 4])).toEqual(null)
    expect(howSumTab(8, [2, 3, 5])).toEqual([2, 2, 2, 2])
  })
  it('Huge', () => {
    expect(howSum(300, [7, 14])).toEqual(null)
    expect(howSumTab(300, [7, 14])).toEqual(null)
  })
})

// -----------------------------------------------------------------------

module.exports = howSum
