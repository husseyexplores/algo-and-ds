const insertionSort = xs => {
  let curr
  let j

  for (let i = 1, len = xs.length; i < len; i++) {
    curr = xs[i]
    for (j = i - 1; j >= 0; j--) {
      if (xs[j] > curr) {
        xs[j + 1] = xs[j]
      } else {
        break
      }
    }
    xs[j + 1] = curr
  }

  return xs
}

// -----------------------------------------------------------------------

describe('Insertion Sort', () => {
  it('Basic', () => {
    const unsorted = [0, 2, 8, 3, 34, 22, 10, 19, 17]
    const sorted = unsorted.sort((a, b) => a - b)
    expect(insertionSort(unsorted)).toEqual(sorted)
  })
})

// -----------------------------------------------------------------------

module.exports = insertionSort
