/*-----------------------------------------------------------------------

Write a function `canSum(targetSum, numbers)` that takes in a
`targetSum` and an array of positive integers as arguments.

The function should return boolean indicating whether or not it is
possible to generate `targetSum` using numbers from the array.

You may use element of the array as many times as needed.

arguments:
  - Z targetSum
  - [Z] numbers

-------------------------------------------------------------------------*/

const hasOwnProp = Object.prototype.hasOwnProperty

// Recursive
const canSum = (targetSum, numbers, memo = {}) => {
  if (hasOwnProp.call(memo, targetSum)) return memo[targetSum]

  if (targetSum === 0) return true
  if (targetSum < 0) return false

  for (let i = 0; i < numbers.length; i++) {
    const x = numbers[i]
    const remainder = targetSum - x
    const result = canSum(remainder, numbers, memo)
    if (result) {
      memo[targetSum] = true
      return true
    }
  }

  memo[targetSum] = false
  return false
}

// Tabulation
const canSumTab = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(false)
  table[0] = true

  const tableLen = table.length
  const numbersLen = numbers.length

  for (let i = 0; i < tableLen; i++) {
    if (table[i] === false) continue

    for (let j = 0; j < numbersLen; j++) {
      const num = numbers[j]
      if (i + num < tableLen) {
        table[i + num] = true
      }
    }
  }

  return table[targetSum]
}

// -----------------------------------------------------------------------

describe('Can Sum', () => {
  it('Small', () => {
    expect(canSum(7, [2, 3])).toEqual(true)
    expect(canSum(7, [5, 3, 4, 7])).toEqual(true)
    expect(canSum(7, [2, 4])).toEqual(false)
    expect(canSum(8, [2, 3, 5])).toEqual(true)
    expect(canSumTab(7, [2, 3])).toEqual(true)
    expect(canSumTab(7, [5, 3, 4, 7])).toEqual(true)
    expect(canSumTab(7, [2, 4])).toEqual(false)
    expect(canSumTab(8, [2, 3, 5])).toEqual(true)
  })
  it('Huge', () => {
    expect(canSum(300, [7, 14])).toEqual(false)
    expect(canSumTab(300, [7, 14])).toEqual(false)
  })
})

// -----------------------------------------------------------------------

module.exports = canSum
