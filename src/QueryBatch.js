import { of } from 'rxjs/observable/of'

function QueryBatch (cacheManager) {
  this.cacheManager = cacheManager
  this.batch = []
}

QueryBatch.prototype.addQuery = function (query) {
  this.batch.push(query)
}

QueryBatch.prototype.execute = function (need) {
  let {cached, missing} = this.cacheManager.compareToCache(need)

  if (cached && !missing) {
    return of(cached)
  }

  this.batch.push(missing)
}

export default QueryBatch
