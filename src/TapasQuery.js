import { Observable } from 'rxjs/Observable'

function TapasQuery (cache, need, execute) {
  this.cache = cache
  this.need = need
  this.execute = execute
}

TapasQuery.prototype.getEntryPoint = function () {
  return Object.keys(this.need)[0]
}

TapasQuery.prototype.getQuery = function () {
  return this.need[this.getEntryPoint()]
}

TapasQuery.prototype.execute = function () {
  setTimeout(() => {
    return this.execute()
  }, 0)
}

export default TapasQuery
