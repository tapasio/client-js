var Tapas = require('../lib/tapas.js').default
var tapas = new Tapas()

tapas
  .need({users: {id: 13, name: undefined, dogs: {name: undefined}}})
  .execute()
  .forEach((user) => console.log(user))
