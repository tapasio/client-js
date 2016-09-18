import deepmerge from 'deepmerge'

function TapasQuery (batch, cache, need) {
  this.cache = cache
  this.batch = deepmerge(batch, need)
}

TapasQuery.prototype.execute = function () {
  let request = deepDiffAttributes(this.batch, this.cache)
}

function deepDiffAttributes (batch, cache) {
  let result = {}

  Object.keys(batch).forEach(attribute => {
    if (cache[attribute]) {
      if (typeof cache[attribute] === 'object') {
        let nestedAttributes = deepDiffAttributes(batch[attribute], cache[attribute])
        if (Object.keys(nestedAttributes).length > 0) {
          result[attribute] = Object.assign({}, nestedAttributes)
        }
      } else if (batch[attribute] !== undefined && cache[attribute] !== batch[attribute]) {
        result[attribute] = batch[attribute]
      }
    } else {
      result[attribute] = batch[attribute]
    }
  })

  return result
}

export default TapasQuery
