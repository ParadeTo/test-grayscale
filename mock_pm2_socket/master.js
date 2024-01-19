const cp = require('child_process')
const child1 = cp.fork('child.js')
const child2 = cp.fork('child.js')

const tcpServer = require('net').createServer()

const processes = [child1, child2]

tcpServer.on('connection', function (socket) {
  console.log(
    socket.remoteAddress,
    socket.remotePort,
    socket.localAddress,
    socket.localPort
  )
  const child = processes.pop()
  child1.send('socket', socket)
  processes.unshift(child)
})

tcpServer.listen(8081)
