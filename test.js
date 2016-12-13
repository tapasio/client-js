var Tapas = require('./lib/tapas').default

var tapas = new Tapas()

tapas
  .need('user', {id: 3, name: undefined})
  .fromCache()
  .forEach((user) => console.log(user))

tapas
  .need('user', {id: 3, username: undefined})
  .fromCache()
  .forEach((user) => console.log(user))

tapas
  .need('user', {id: 2, name: undefined})
  .fromCache()
  .forEach((user) => console.log(user))

tapas.setCache('user', 3, {name: 'tata'})