var cp = require('child_process')
var child1 = cp.fork('child.js')
var child2 = cp.fork('child.js')

var tcpServer = require('net').createServer()

// var http = require('http')
// var httpServer = http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'})
//   res.end('handled by child, pid is ' + process.pid + '\n')
// })

tcpServer.on('connection', function (socket) {
  // socket.end('handled by parent\n')
  // httpServer.emit('connection', socket)
  console.log('master socket')
  console.log(
    socket.remoteAddress,
    socket.remotePort,
    socket.localAddress,
    socket.localPort
  )
})

tcpServer.listen(8080, function () {
  child1.send('server', tcpServer)
  child2.send('server', tcpServer)
  // tcpServer.close()
})
