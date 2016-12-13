function Query (need, queryBatch) {
  this.need = need
  this.queryBatch = queryBatch

  queryBatch.addQuery(this.need)
}

Query.prototype.execute = function () {
  return this.queryBatch.execute(this.need)
}

Query.prototype.fromCache = function () {

}

export default Query
