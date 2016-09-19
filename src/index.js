import TapasQuery from './TapasQuery'

function Tapas (config) {
  this.cache = {users: {name: 'tutu'}}
  this.batch = []
}

Tapas.prototype.need = function (need) {
  let tapasQuery = new TapasQuery(this.batch, this.cache, need)
  this.batch.push(tapasQuery)

  return tapasQuery
}

Tapas.prototype.execute = function (tapasQueries) {

}

export default Tapas
