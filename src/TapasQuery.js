import deepExtend from 'deep-extend'

function TapasQuery (batch, cache, need) {
  this.cache = cache
  this.batch = batch

  return this.need(need)
}

TapasQuery.prototype.need = function (need) {
  deepExtend(this.batch, need)

  return this
}

TapasQuery.prototype.execute = function () {
  let request = deepDiffAttributes(this.batch, this.cache)

  console.log(this.batch, this.cache, request)
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
