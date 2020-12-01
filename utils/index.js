function deepEqual(x, y) {
  if (x === y) {
    return true
  }
  if (
    typeof x === 'object' &&
    x != null &&
    typeof y === 'object' &&
    y != null
  ) {
    if (Object.keys(x).length !== Object.keys(y).length) return false
    /* eslint-disable no-restricted-syntax */

    for (let prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        // eslint-disable-next-line
        if (!deepEqual(x[prop], y[prop])) return false
      } else {
        return false
      }
    }

    return true
  }
  return false
}

function swap(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr
}

module.exports = {
  deepEqual,
  swap,
}
