var http = require('http')
var httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handled by child, pid is ' + process.pid + '\n')
})

process.on('message', function (m, tcpServer) {
  if (m === 'server') {
    tcpServer.on('connection', function (socket) {
      console.log('child socket')
      console.log(
        socket.remoteAddress,
        socket.remotePort,
        socket.localAddress,
        socket.localPort
      )
      httpServer.emit('connection', socket)
    })
  }
})
