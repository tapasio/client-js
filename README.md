# Tapas client Javascript

## TL;DR

TODO

## Init

The Tapas client communicates via the Tapas server via a unique endpoint.
All the queries are sent to this unique endpoint. But don't worry, the Tapas
Client is will manage all the communications for you. You'll just have to
concentrate on the data you need.

To start working with Tapas, create a new instance of `Tapas`, providing the
name of the transport protocol and the address of the endpoint. The supported
transport protocols are `http` and `websocket`. 

```js
let tapas = new Tapas('websocket', {endpoint: 'http://localhost:7513'})
```

## Queries

To ask Tapas for some data, use the `tapas.need` method. 

```js
tapas
  .need({
    users: {
      name: undefined,
      age: undefined
    }
  })
```

`tapas.need` will return you an instance of `TapasQuery`, which will be used to trigger a query to the server (either for one-shot data fetching or to create a live subscription to the requested data).

`tapas.need` accepts as the only argument an object with two members:

The first is the name of the **requested entity**, and the second one is the **meta data** associated with the query.

### The Requested Entity

This member contains an object whose keys correspond to the attributes of the requested entity. Use these to tell Tapas exactly which attributes you need. The attributes of a query can be initialized as `undefined` or with a value.

#### Requested attributes

Initialize these attributes as `undefined` to mark them as requested. The server will fill these attributes with the available value. For example, the query above will return all the users filled with their name and age.

#### Constraints

Assign a value to an attribute of the query to apply a constraint to it. A constraint is like a `where` in a MySQL query. [TODO - document constraints]

For example, the following query

```js
tapas
  .need({
    user: {
      id: 9872,
      name: undefined,
      age: undefined
    }
  })
```

Will ask Tapas the user with `id` 9872, filled with her id, name and age. The following one

```js
tapas
  .need({
    users: {
      name: undefined,
      age: 26
    }
  })
```

will look for all the users aged 26, providing their name and age.

#### Relation & nested objects

Your entities can have relations between each other. Imagine your users have a `friends` attribute, containing a list of friend users. You may need to know the list of the friends of your users. The query would look like the following:

```js
tapas
  .need({
    user: {
      name: undefined,
      age: undefined,
      friends: {
        name: undefined
      }
    }
  })
```

In this query, `friends` is what we call a **relational attribute**. It behaves like a query inside your query. It accepts requested (`undefined`) attributes as well as constraints.

### The Meta Data

The second attribute of the query object you provide as an argument for `tapas.need`, is named `meta` and it is convenient to ask some derived data, based on the results of the query. Take a look at the following query:

```js
tapas
  .need({
    users: {
      name: undefined,
      age: 26
    },
    meta: [count]
  })
```

It will ask the Tapas server the list of the users aged 26, together with the number of total results (`count`).

## Additional constraints on the query (filters)
TODO

## Triggering a Query

To eventually obtain the needed data from the Tapas server, we'll need to trigger the `TapasQuery` returned by `tapas.need`. To do this, the `TapasQuery` object exposes two convenient methods: `fetch` to fetch the requested data once and `subscribe` to create a live-subscription to the requested data. Both method return an `Observable`, which **will return the data as soon as it's available**.

### One-shot fetching

Take the following code:

```js
let usersQuery = tapas.need({
  users: {
    name: undefined,
    age: 35
  }
})

// usersQuery is now an instance of TapasQuery, so we can call fetch() on it.
let usersResponse = usersQuery.fetch()

// This will eventually log the list of requested users
usersResponse.subscribe((response) => {
  console.log(response.users)
})
```

We just sent a query to the Tapas server and logged the response to the console! Yay!
Since this is a `fetch`, the `subscribe` will trigger the callback only once. That's why you can also use `then` instead of subscribe (may more semantic).

### Live subscriptions

Sometimes, we need our data to be constantly kept in sync with our server. This is why we need this:

```js
let user$ = tapas.need({
  users: {
    id: 213
    stars: undefined
  }
}).subscribe()

// This will eventually log the list of requested users
user$.subscribe((response) => {
  console.log(response.users)
})
```

This code will ask Tapas the user 213 together with the number of stars she has received. Whenever this number changes, Tapas will notify the client and the callback will be triggered.
