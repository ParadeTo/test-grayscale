var cp = require('child_process')
var child1 = cp.fork('child.js')
var child2 = cp.fork('child.js')
var http = require('http')

var server = http
  .createServer(function (req, res) {
    child1.send('server', req.socket)
  })
  .listen(3000)

// process.on('message', function (m, server) {
//   if (m === 'server') {
//     server.on('connection', function (socket) {
//       server.emit('connection', socket)
//     })
//   }
// })
