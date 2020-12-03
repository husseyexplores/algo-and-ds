const { swap } = require('../../utils')

// -----------------------------------------------------------------------

const selectionSort = xs => {
  let lowest
  for (let i = 0; i < xs.length; i++) {
    lowest = i
    for (let j = i + 1; j < xs.length; j++) {
      if (xs[j] < xs[lowest]) {
        lowest = j
      }
    }

    if (i !== lowest) swap(xs, i, lowest)
  }

  return xs
}

// -----------------------------------------------------------------------

describe('Selection Sort', () => {
  it('Basic', () => {
    const unsorted = [0, 2, 8, 3, 34, 22, 10, 19, 17]
    const sorted = unsorted.sort((a, b) => a - b)
    expect(selectionSort(unsorted)).toEqual(sorted)
  })
})

// -----------------------------------------------------------------------

module.exports = selectionSort
