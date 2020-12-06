/*-----------------------------------------------------------------------

Some people are standing in a row in a park. There are trees between them which cannot be moved. Your task is to rearrange the people by their heights in a non-descending order without moving the trees.
Example
For a = [-1, 150, 190, 170, -1, -1, 160, 180], the output should be
sortByHeight(a) = [-1, 150, 160, 170, -1, -1, 180, 190].
Input/Output
[time limit] 4000ms (py)
[input] array.integer a
If a[i] = -1, then the ith position is occupied by a tree. Otherwise a[i] is the height of a person standing in the ith position.
Constraints:
5 ≤ a.length ≤ 15,
-1 ≤ a[i] ≤ 200.
[output] array.integer
Sorted array a with all the trees untouched.

-------------------------------------------------------------------------*/

const sortByHeight = xs => {
  const ns = xs.filter(x => x !== -1)
  const sortedNs = ns.sort((a, b) => a - b)

  const result = []
  let j = 0
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i]
    if (x === -1) {
      result.push(x)
    } else {
      result.push(sortedNs[j])
      j++
    }
  }

  return result
}

// -----------------------------------------------------------------------

describe('Sort By Height', () => {
  it('Basic', () => {
    const unsorted = [-1, 150, 190, -1, 170, -1, -1, 160, 180]
    const sorted = [-1, 150, 160, -1, 170, -1, -1, 180, 190]
    expect(sortByHeight(unsorted)).toEqual(sorted)
  })
})

// -----------------------------------------------------------------------

module.exports = sortByHeight
