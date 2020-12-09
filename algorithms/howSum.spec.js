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

// -----------------------------------------------------------------------

describe('How Sum', () => {
  it('Small', () => {
    expect(howSum(7, [2, 3])).toEqual([3, 2, 2])
    expect(howSum(7, [5, 3, 4, 7])).toEqual([4, 3])
    expect(howSum(7, [2, 4])).toEqual(null)
    expect(howSum(8, [2, 3, 5])).toEqual([2, 2, 2, 2])
  })
  it('Huge', () => {
    expect(howSum(300, [7, 14])).toEqual(null)
  })
})

// -----------------------------------------------------------------------

module.exports = howSum
