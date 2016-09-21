function Cache () {
  this.cache = {user: {name: 'toto', test: {toto: 'toto'}}}
}

Cache.prototype.compareToCache = function (query) {
  return compareToCache(query, this.cache)
}

function compareToCache (query, cache) {
  let cached = {}
  let missing = {}

  Object.keys(query).forEach(attribute => {
    if (cache[attribute]) {
      if (typeof cache[attribute] === 'object') {
        let nested = compareToCache(query[attribute], cache[attribute])

        if (nested.cached) {
          cached[attribute] = {...nested.cached}
        }
        if (nested.missing) {
          missing[attribute] = {...nested.missing}
        }
      } else {
        cached[attribute] = cache[attribute]
      }
    } else {
      missing[attribute] = query[attribute]
    }
  })

  if (!Object.keys(cached).length) {
    cached = null
  }

  if (!Object.keys(missing).length) {
    missing = null
  }

  return {cached, missing}
}

export default Cache

