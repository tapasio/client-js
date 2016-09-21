function QueryBuffer () {

}

export default QueryBuffer

// /* Merge all pending Queries inside one */
// this.batch.forEach((query) => {
//   let entryPoint = Object.keys(query)[0]
//
//   if (entryPoints[entryPoint]) {
//     entryPoints[entryPoint] = deepmerge(entryPoints[entryPoint], query[entryPoint])
//   } else {
//     entryPoints[entryPoint] = query[entryPoint]
//   }
// })
