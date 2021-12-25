//
// This is only a SKELETON file for the 'Change' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

class Coins {
  constructor(coinsArray) {
    this.coins = coinsArray.reduce((map, x) => {
      map.set(x, (map.get(x) || 0) + 1)
      return map
    }, new Map())
  }

  print() {
    const obj = Object.fromEntries([...this.coins.entries()])
    const stringified = JSON.stringify(obj)
    console.log(stringified)
  }

  put(...coins) {
    coins.forEach(coin => {
      // validate coin
      if (coin < 1) return

      let currentCount = this.coins.get(coin) || 0
      let nextCount = currentCount + 1
      this.coins.set(coin, nextCount)
    })
  }

  take(...coins) {
    let taken = []

    coins.forEach(coin => {
      const hasCoin = this.coins.has(coin)
      if (hasCoin) {
        let total = this.coins.get(coin)
        if (total < 1) {
          this.coins.delete(coin)
          return taken
        }

        // Take the coin
        taken.push(coin)

        // Decrease the count or remove if none left
        let remainingCoinCount = total - 1
        const noneLeft = remainingCoinCount <= 0
        if (noneLeft) {
          this.coins.delete(coin)
        } else {
          this.coins.set(coin, remainingCoinCount)
        }
      }
    })

    return taken
  }

  has(coin) {
    return this.coins.has(coin)
  }

  empty() {
    return this.coins.size < 1
  }
}

// export class Change {
//   calculate(coinArray, target) {
//     const coins = new Coins(coinArray)

//     throw new Error('Remove this statement and implement this function')
//   }
// }
