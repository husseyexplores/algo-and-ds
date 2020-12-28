/*-----------------------------------------------------------------------

Write a function `countConstruct(targetWord, wordBank)` that takes in a
`targetWord` and an array of strings as arguments.

The function should return number of ways that the `targetWord` can be
constructed by concatenating elements of the `wordBank` array.
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

// Recursive
const countConstruct = (target, wordBank, memo = {}) => {
  if (target === '') return 1
  if (hasOwnProp.call(memo, target)) return memo[target]

  let totalCount = 0

  for (let i = 0; i < wordBank.length; i++) {
    const word = wordBank[i]
    if (prefixMatched(word, target)) {
      const newTarget = target.slice(word.length)
      const numWaysForRest = countConstruct(newTarget, wordBank, memo)
      totalCount += numWaysForRest
    }
  }

  memo[target] = totalCount
  return totalCount
}

// Tabulation
/*
countConstructTab(abcdef, [ab, abc, cd, def, abcd])

  Starting table
  ----------------------------------------------
  | 0      1      2      3      4      5      6 | index
  | 1      0      0      0      0      0      0  | values
  | a      b      c      d      e      f        | string char position
  ----------------------------------------------

  Final table
  ----------------------------------------------
  | 0      1      2      3      4      5      6 | index
  | 1      0      1      1      2      0      1  | values
  | a      b      c      d      e      f        | string char position
  ----------------------------------------------
  answer: table[target.length]
*/
const countConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1).fill(0)
  table[0] = 1

  const tableLen = table.length
  const wordBankLen = wordBank.length

  for (let i = 0; i < tableLen; i++) {
    for (let j = 0; j < wordBankLen; j++) {
      const word = wordBank[j]
      if (prefixMatched(word, target.slice(i))) {
        if (i + word.length < tableLen) table[i + word.length] += table[i]
      }
    }
  }
  return table[target.length]
}

// -----------------------------------------------------------------------

describe('Can Construct', () => {
  it('Small', () => {
    expect(
      countConstruct('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
    ).toEqual(2)
    expect(
      countConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
    ).toEqual(1)
    expect(
      countConstruct('skateboard', [
        'bo',
        'rd',
        'ate',
        't',
        'ska',
        'sk',
        'boar',
      ])
    ).toEqual(0)
    expect(
      countConstruct('enterapotentpot', [
        'a',
        'p',
        'ent',
        'enter',
        'ot',
        'o',
        't',
      ])
    ).toEqual(4)

    expect(
      countConstructTab('purple', ['purp', 'p', 'ur', 'le', 'purpl'])
    ).toEqual(2)
    expect(
      countConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
    ).toEqual(1)
    expect(
      countConstructTab('skateboard', [
        'bo',
        'rd',
        'ate',
        't',
        'ska',
        'sk',
        'boar',
      ])
    ).toEqual(0)
    expect(
      countConstructTab('enterapotentpot', [
        'a',
        'p',
        'ent',
        'enter',
        'ot',
        'o',
        't',
      ])
    ).toEqual(4)
  })
  it('Huge', () => {
    expect(
      countConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
        'e',
        'ee',
        'eee',
        'eeee',
        'eeeee',
        'eeeeee',
      ])
    ).toEqual(0)

    expect(
      countConstructTab('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
        'e',
        'ee',
        'eee',
        'eeee',
        'eeeee',
        'eeeeee',
      ])
    ).toEqual(0)
  })
})

// -----------------------------------------------------------------------

module.exports = countConstruct
