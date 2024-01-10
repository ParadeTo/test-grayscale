const Koa = require('koa')
const Router = require('koa-router')
var net = require('net')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  console.log('get /')
  ctx.body = 'canary'
})

app.use(router.routes())

app.on('error', console.log)

process.on('message', (msg) => {
  console.log(msg)
  switch (msg.cmd) {
    case 'req':
      {
        const socket = net.createConnection({path: msg.ipcPath})
        socket.setHeader = () => {}
        app.callback()(msg.req, socket)
      }
      break
  }
})
