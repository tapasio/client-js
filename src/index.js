import Query from './Query'
import CacheManager from './CacheManager'
import QueryBatch from './QueryBatch'

function Tapas () {
  this.cacheManager = new CacheManager()
  this.queryBatch = new QueryBatch(this.cacheManager)
}

Tapas.prototype.need = function (need) {
  return new Query(need, this.queryBatch)
}

export default Tapas
