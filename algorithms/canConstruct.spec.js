/*-----------------------------------------------------------------------

Write a function `canConstruct(targetWord, wordBank)` that takes in a
`targetWord` and an array of strings as arguments.

The function should return a boolean indicating whether or not the
`targetWord` can be constructed by concatenating elements of the `wordBank`
array.
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
const canConstruct = (target, wordBank, memo = {}) => {
  if (hasOwnProp.call(memo, target)) return memo[target]
  if (target === '') return true

  for (let i = 0; i < wordBank.length; i++) {
    const word = wordBank[i]
    if (prefixMatched(word, target)) {
      const newTarget = target.slice(word.length)
      const result = canConstruct(newTarget, wordBank, memo)
      memo[target] = result
      if (result) return true
    }
  }

  memo[target] = false
  return false
}

// Tabulation
const canConstructTab = (target, wordBank) => {
  const table = Array(target.length + 1).fill(false)
  table[0] = true

  const tableLen = table.length

  for (let i = 0; i < tableLen; i++) {
    if (table[i] === false) continue

    for (let j = 0; j < wordBank.length; j++) {
      const word = wordBank[j]
      if (prefixMatched(word, target.slice(i))) {
        if (i + word.length < tableLen) table[i + word.length] = true
      }
    }
  }

  return table[target.length]
}

// -----------------------------------------------------------------------

describe('Can Construct', () => {
  it('Small', () => {
    expect(canConstruct('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])).toEqual(
      true
    )
    expect(
      canConstruct('skateboard', ['bo', 'rd', 'ate', 't', 'ska', 'sk', 'boar'])
    ).toEqual(false)
    expect(
      canConstruct('enterapotentpot', [
        'a',
        'p',
        'ent',
        'enter',
        'ot',
        'o',
        't',
      ])
    ).toEqual(true)

    expect(
      canConstructTab('abcdef', ['ab', 'abc', 'cd', 'def', 'abcd'])
    ).toEqual(true)
    expect(
      canConstructTab('skateboard', [
        'bo',
        'rd',
        'ate',
        't',
        'ska',
        'sk',
        'boar',
      ])
    ).toEqual(false)
    expect(
      canConstructTab('enterapotentpot', [
        'a',
        'p',
        'ent',
        'enter',
        'ot',
        'o',
        't',
      ])
    ).toEqual(true)
  })
  it('Huge', () => {
    expect(
      canConstruct('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
        'e',
        'ee',
        'eee',
        'eeee',
        'eeeee',
        'eeeeee',
      ])
    ).toEqual(false)

    expect(
      canConstructTab('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef', [
        'e',
        'ee',
        'eee',
        'eeee',
        'eeeee',
        'eeeeee',
      ])
    ).toEqual(false)
  })
})

// -----------------------------------------------------------------------

module.exports = canConstruct
