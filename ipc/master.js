const child = require('child_process').fork('./child.js')
const http = require('http')
const net = require('net')
const url = require('url')

child.on('message', (msg) => {
  if (msg.cmd === 'ipc_ready') {
    http
      .createServer((req, res) => {
        const {pathname} = url.parse(req.url)
        const reqNeedToSerialize = {
          host: 'localhost',
          port: 3001,
          path: pathname,
          method: req.method,
          headers: req.headers,
          url: pathname,
        }

        const socket = net.createConnection({path: msg.ipcPath})
        socket.write(JSON.stringify({req: reqNeedToSerialize}))
        socket.pipe(res)
      })
      .listen(8080)
  }
})
