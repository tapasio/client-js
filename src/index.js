import TapasQuery from './TapasQuery'

function Tapas (config) {
  this.cache = {users: {name: 'tutu'}}
}

Tapas.prototype.need = function (need) {
  return new TapasQuery(this.cache, this.cache, need)
}

export default Tapas
