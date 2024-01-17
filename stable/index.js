// process.on('message', function (m, {req, res}) {
//   console.log('CHILD got message', m)
// })

// process.send({foo: 'bar'})
const Koa = require('koa')
const Router = require('koa-router')
var net = require('net')

const app = new Koa()
const router = new Router()

router.get('/', (ctx) => {
  // throw new Error('stable')

  console.log('get /')
  ctx.body = 'stable'
})

app.use(router.routes())

// app.on('error', console.log)
// app.listen(3001)
module.exports = app
