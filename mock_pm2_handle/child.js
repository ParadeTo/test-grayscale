const http = require('http')
const net = require('net')

const httpServer = http.createServer(function (req, res) {
  const str = 'handled by child, pid is ' + process.pid
  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': str.length,
  })
  res.end(str)
})

process.on('message', function (m, handle) {
  if (m === 'handle') {
    const socket = new net.Socket({
      handle,
    })
    socket.readable = socket.writable = true
    httpServer.emit('connection', socket)
  }
})
