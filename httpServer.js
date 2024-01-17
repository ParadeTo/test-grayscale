const http = require('http')
const net = require('net')
const canary = require('./canary')
const stable = require('./stable')

const server = http
  .createServer((req, res) => {
    if (req.url.indexOf('stable') > -1) {
      stable.callback()(req, res)
    } else {
      canary.callback()(req, res)
    }
  })
  .listen(3000)

// server.on('error', (err) => {
//   console.log('err', err)
// })

// process.on('uncaughtException', (e) => {
//   console.log('uncaughtException', e)
// })

// process.on('unhandledRejection', (e) => {
//   console.log('unhandledRejection', e)
// })

// let ns = net.createServer().listen(3000)
// ns.on('listening', function () {
//   server.close()
//   // resolve(port)
// })
// ns.on('error', function (err) {
//   // console.log(err)
//   if (/EADDRINUSE/.test(err)) {
//     // resolve(err)
//     console.log('-----')
//   }
// })
