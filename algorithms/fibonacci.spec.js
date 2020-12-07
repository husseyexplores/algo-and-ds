/*-----------------------------------------------------------------------

You're given a positive integer `n`.
And are required to return `n`th number in the Fibonacci sequence.

The sequence is starting from 0.

Sample sequence:
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, ...

The next number is found by adding up the two numbers before it:

- the 2 is found by adding the two numbers before it (1+1),
- the 3 is found by adding the two numbers before it (1+2),
- the 5 is (2+3)
- and so on!
- n = (n - 1) + (n - 2)

`n` will always be greater or equal to 0 and less than 79
(If we surpass 79, we exceed the limit of Number.MAX_SAFE_INTEGER
  and our result will not be precise afterward)

-------------------------------------------------------------------------*/

const fib = (n, memo = {}) => {
  if (n === 0) return 0
  if (n <= 2) return 1

  if (n in memo) return memo[n]
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)

  return memo[n]
}

// -----------------------------------------------------------------------

describe('Fibonacci', () => {
  it('Small', () => {
    expect(fib(4)).toEqual(3)
    expect(fib(7)).toEqual(13)
    expect(fib(11)).toEqual(89)
  })
  it('Huge', () => {
    expect(fib(50)).toEqual(12586269025)
    expect(fib(70)).toEqual(190392490709135)
  })
})

// -----------------------------------------------------------------------

module.exports = fib
