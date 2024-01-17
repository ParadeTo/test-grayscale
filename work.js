// throw new Error('333')
// process.on('message', (msg) => {
//   if (msg?.event === 'suicide') {
//     const ms = msg?.ms || 10000
//     setTimeout(() => {
//       console.log(3333)
//       process.exit(0)
//     }, ms)
//   }
// })

console.log(process.env.a.toString() === 'true')
