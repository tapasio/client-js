# Tapas client Javascript

## Init

```js
let tapas = new Tapas()
```

```js
let tapas = new Tapas('websocket', {port: 8080})
```

## Read

### Select attributes

```js
tapas
  .need({
    users: {
      name: undefined,
      age: undefined
    }
  })
  .execute()
  .then((res) => console.log(res.users))
```

### Filter by id

```js
tapas
  .need({
    user: {
      id: 9872,
      name: undefined,
      age: undefined
    }
  })
  .execute()
  .then((res) => console.log(res.user))
```

### Use Observable

```js
let users$ = tapas.need({
  users: {
    name: undefined,
    age: undefined
  }
})

users$
  .filter((user) => user.name.indexOf('a') === 0)
  .scan((totalAge, user) => totalAge + user.age, 0)
  .forEach((user) => console.log(user, totalAge))

tapas.execute()
```

### Relation & nested objects

```js
tapas
  .need({
    user: {
      id: 9827
      name: undefined,
      age: undefined,
      friends: {
        name: undefined
      }
    }
  })
  .execute()
  .then((res) => console.log(res.user.friends))
```

### Get all attributes

TODO

### Batch multiple queries

```js
tapas
  .need({users: {name: undefined}})
  .need({articles: {name: undefined}})

tapas
  .execute()
  .then((res) => console.log(res.users, res.articles))
```

### Apply filters

```js
tapas
  .need({users: {name: undefined}})
  .with(<where, order, size, from, anything to pass to the server>)
  .execute()
  .then((res) => console.log(res.users))
```

## Subscribe

```js
tapas
  .need({users: {name: undefined}})
  .subscribe()
  .forEach((user) => console.log(user.name))
```

## Write

### Simple mutation

```js
tapas
  .send({
    user: {
      id: undefined
      name: 'toto',
      age: 24
    }
  })
  .execute()
  .then((res) => console.log(res.user.id, res.user.name, res.user.age))
```

### Batch

```js
tapas
  .send({
    user: {
      id: undefined
      name: 'toto'
    }
  })
  .send({
    article: {
      id: undefined,
      name: 'Great article about something'
    }
  })
  .execute()
  .then((res) => console.log(res.user.id, res.article.id))
```

### Mutation with relations

```js
tapas
  .send({
    user: {
      id: undefined
      name: 'toto',
      age: 24,
      friends: [{
        id: undefined
        name: 'tutu',
        age: 30
      }]
    }
  })
  .execute()
  .then((res) => console.log(res.user.friends))
```
