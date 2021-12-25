/*-----------------------------------------------------------------------

Write a function `allConstruct(targetWord, wordBank)` that takes in a
`targetWord` and an array of strings as arguments.

The function should return a 2D array containing all of the ways that the
`targetWord` can be constructed by concatenating elements of the `wordBank`
array.
Each element of the 2D array should represent one combination that
constructs the target.
You may reruse elements of the `wordBank` array as many times as needed.

arguments:
  - {String} targetWord
  - {[String]} wordBank

-------------------------------------------------------------------------*/

const prefixMatched = (prefix, word) => {
  const prefixLen = prefix.length
  const wordLen = word.length
  if (prefixLen > wordLen) return false

  for (let i = 0, len = prefix.length; i < len; i++) {
    if (prefix[i] !== word[i]) return false
  }
  return true
}

const hasOwnProp = Object.prototype.hasOwnProperty

// Recursion
const allConstruct = (target, wordBank, memo = {}) => {
  if (target === '') return [[]]
  // if (hasOwnProp.call(memo, target)) return memo[target]

  let allWays = []

  for (let i = 0; i < wordBank.length; i++) {
    const word = wordBank[i]
    if (prefixMatched(word, target)) {
      const suffix = target.slice(word.length)
      const suffixWays = allConstruct(suffix, wordBank, memo)
      const targetWays = suffixWays.map(arr => [word, ...arr])
      memo[target] = targetWays
      allWays.push(...targetWays)
    }
  }

  memo[target] = allWays
  return allWays
}

// Tabulation
const allConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1)
    .fill()
    .map(() => [])
  table[0] = [[]]

  const tableLen = table.length
  for (let i = 0; i < tableLen; i++) {
    for (let j = 0; j < wordBank.length; j++) {
      const word = wordBank[j]
      if (prefixMatched(word, target.slice(i))) {
        if (i + word.length < tableLen) {
          const newCombinations = table[i].map(subArray =>
            subArray.concat(word)
          ) // 2d array

          table[i + word.length].push(...newCombinations) // flatten by spread
        }
      }
    }
  }

  return table[target.length]
}

// -----------------------------------------------------------------------

describe('Can Construct', () => {
  it('Small', () => {
    expect(allConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])).toEqual([
      ['purp', 'le'],
      ['p', 'ur', 'p', 'le'],
    ])
    expect(
      allConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])
    ).toEqual([
      ['ab', 'cd', 'ef'],
      ['ab', 'c', 'def'],
      ['abc', 'def'],
      ['abcd', 'ef'],
    ])
    expect(
      allConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])
    ).toEqual([])

    expect(
      allConstructTab('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
    ).toEqual([
      ['purp', 'le'],
      ['p', 'ur', 'p', 'le'],
    ])
    expect(
      allConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd', 'ef', 'c'])
    ).toEqual([
      ['abc', 'def'],
      ['ab', 'c', 'def'],
      ['abcd', 'ef'],
      ['ab', 'cd', 'ef'],
    ])
    expect(
      allConstructTab('skateboard', [
        'bo',
        'rd',
        'ate',
        't',
        'ska',
        'sk',
        'boar',
      ])
    ).toEqual([])
  })
  it('Huge', () => {
    expect(
      allConstruct('eeeeeeeeeef', ['e', 'ee', 'eee', 'eeee', 'eeeee', 'eeeeee'])
    ).toEqual([])

    // expect(
    //   allConstructTab('eeeeeeeeeef', [
    //     'e',
    //     'ee',
    //     'eee',
    //     'eeee',
    //     'eeeee',
    //     'eeeeee',
    //   ])
    // ).toEqual([])
  })
})

// -----------------------------------------------------------------------

module.exports = allConstruct
