const net = require('net')
const cp = require('child_process')

const child1 = cp.fork('child.js')
const child2 = cp.fork('child.js')

const processes = [child1, child2]

const handle = net._createServerHandle('0.0.0.0', 3001)

handle.listen()

handle.onconnection = function (err, handle) {
  const child = processes.pop()
  child1.send('handle', handle)
  processes.unshift(child)
}
