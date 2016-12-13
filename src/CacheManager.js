function Cache () {
  let user = {
    1: {
      __observabes__: [],
      username: 'toto username',
      name: 'toto'
    },
    2: {
      username: 'tutu username',
      name: 'tutu'
    }
  }
  let home = {
    1: {
      address: 'blabla',
      users: [user[1], user[2]]
    },
    2: {
      address: 'bla bla bla',
      users: [user[1]]
    }
  }

  this.cache = {user, home}
}

Cache.prototype.compareToCache = function (query) {
  let entryPoint = Object.keys(query)[0]

  if (query[entryPoint].id) {
    let id = query[entryPoint].id
    if (this.cache[entryPoint] && this.cache[entryPoint][id]) {
      return compareToCacheWithId(query[entryPoint], this.cache[entryPoint][id])
    }
  }

  return compareToCache(query, this.cache)
}

function compareToCacheWithId (query, cache) {
  delete query.id

  let {cached, missing} = compareToCache(query, cache.attrs)
  console.log(cached, missing)
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
