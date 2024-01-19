const http = require('http')

const httpServer = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handled by child, pid is ' + process.pid + '\n')
})

process.on('message', function (m, socket) {
  if (m === 'socket') {
    console.log(
      socket.remoteAddress,
      socket.remotePort,
      socket.localAddress,
      socket.localPort
    )
    httpServer.emit('connection', socket)
  }
})
