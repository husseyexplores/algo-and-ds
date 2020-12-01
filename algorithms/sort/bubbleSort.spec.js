const bubbleSort = xs => {
  let len = xs.length
  let swapped = false
  let i = 1

  while (i < len) {
    const x = xs[i - 1]
    const y = xs[i]
    if (x > y) {
      xs[i - 1] = y
      xs[i] = x
      swapped = true
    }
    i++
    if (swapped && i === len) {
      i = 1
      swapped = false
      len--
    }
  }
  return xs
}

// -----------------------------------------------------------------------

describe('Bubble Sort', () => {
  it('Basic', () => {
    const unsorted = [53, 21, 654, 2, 56]
    const sorted = unsorted.sort((a, b) => a - b)
    expect(bubbleSort(unsorted)).toEqual(sorted)
  })
})

// -----------------------------------------------------------------------

module.exports = bubbleSort
