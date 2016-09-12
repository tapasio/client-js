import TapasQuery from './TapasQuery'

function Tapas (config) {
  this.batch = {}
  this.cache = {users: {name: 'tutu'}}
}

Tapas.prototype.need = function (need) {
  return new TapasQuery(this.batch, this.cache, need)
}

export default Tapas
