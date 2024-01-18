const http = require('http')

const agent = new http.Agent({
  keepAlive: true, // connection: keep-alive 告诉 TCP 连接不要关闭
  maxSockets: 1, // 允许建了多少条 TCP 连接，类似于我们常说的 Chrome 浏览器同一个域名最多 6 条连接
})

let client = http.request(
  {
    agent,
    host: 'localhost',
    port: 3000,
    pathname: '/',
  },
  (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString())
    })
  }
)

client.end()

setTimeout(() => {
  client = http.request(
    {
      agent,
      host: 'localhost',
      port: 3000,
      pathname: '/',
    },
    (res) => {
      res.on('data', (chunk) => {
        console.log(chunk.toString())
      })
    }
  )

  client.end()

  client = http.request(
    {
      agent,
      host: 'localhost',
      port: 3000,
      pathname: '/',
    },
    (res) => {
      res.on('data', (chunk) => {
        console.log(chunk.toString())
      })
    }
  )

  client.end()
}, 1000)
