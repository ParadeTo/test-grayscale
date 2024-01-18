var http = require('http')
var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('handled by child, pid is ' + process.pid + '\n')
})

process.on('message', function (m, socket) {
  if (m === 'server') {
    // server.on('connection', function (socket) {
    console.log(socket.connecting)
    server.emit('connection', socket)
    // })
  }
})
