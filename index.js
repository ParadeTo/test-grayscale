var child = require('child_process').fork('./canary/index.js', [], {
  stdio: ['pipe', 'inherit', 'inherit', 'ipc'],
})
var http = require('http')
var net = require('net')
var url = require('url')
var crypto = require('crypto')
var fs = require('fs')
const ipcPrefix =
  (process.platform != 'win32' ? '/tmp/' : '\\\\.\\pipe\\') +
  crypto.randomBytes(8).toString('hex')
let requestNumber = 0
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

    // const creq = http.request(opts, (cres) => {
    //   // passthrough status code and headers
    //   sres.writeHead(cres.statusCode, cres.headers)
    //   cres.pipe(sres)
    // })

    // sreq.pipe(creq)
    // console.log(req)
    const ipcPath = ipcPrefix + requestNumber++
    net
      .createServer() // the IPC server
      .listen(ipcPath, () =>
        child.send({cmd: 'req', req: reqNeedToSerialize, ipcPath})
      )
      .on('connection', (socket) => {
        // console.log('socket', socket)
        socket.on('close', () => {
          res.end()
          fs.unlinkSync(ipcPath) // clean it up
          console.log('close')
        })
        socket.on('timeout', () => {
          socket.destroy()
          console.log('Subprocess response timed out...')
        })
        socket.pipe(res)
      })
  })
  .listen(8080)
