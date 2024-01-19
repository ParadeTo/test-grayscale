const Koa = require('koa')
const Router = require('koa-router')
const net = require('net')
const crypto = require('crypto')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'hello world'
})

app.use(router.routes())

app.on('error', console.log)

const ipcPrefix =
  (process.platform != 'win32' ? '/tmp/' : '\\\\.\\pipe\\') +
  crypto.randomBytes(8).toString('hex')

const ipcPath = `${ipcPrefix}${process.pid}`

net
  .createServer() // the IPC server
  .listen(ipcPath, () => process.send({cmd: 'ipc_ready', ipcPath}))
  .on('connection', (socket) => {
    socket.on('data', (chunk) => {
      const msg = JSON.parse(chunk.toString())
      if (msg.req) {
        socket.setHeader = () => {}
        app.callback()(msg.req, socket)
      }
    })
  })
