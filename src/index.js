import TapasQuery from './TapasQuery'
import deepmerge from 'deepmerge'
import { Observable } from 'rxjs/Observable'

function Tapas (config) {
  this.cache = {users: {name: 'tutu'}}
  this.tapasQueries = []
}

Tapas.prototype.need = function (need) {
  let tapasQuery = new TapasQuery(this.cache, need, this.execute)
  this.tapasQueries.push(tapasQuery)

  return tapasQuery
}

Tapas.prototype.execute = function (tapasQueries) {
  let batch = {}

  /* Batch all current tapasQueries */
  this.tapasQueries.forEach((tapasQuery) => {
    if (batch[tapasQuery.getEntryPoint()]) {
      batch[tapasQuery.getEntryPoint()] = deepmerge(batch[tapasQuery.getEntryPoint()], tapasQuery.getQuery())
    } else {
      batch[tapasQuery.getEntryPoint()] = tapasQuery.getQuery()
    }
  })

  /* Remove data already cached */

  return Observable.create((observer) => {
    setTimeout(() => {
      observer.next({users: [{name: 'Anthony'}]})
    }, 4000)
  })
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

export default Tapas
