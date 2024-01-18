const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200)
    res.end('3000')
  })
  .listen(3000)

http
  .createServer((req, res) => {
    res.writeHead(200)
    res.end('3001')
  })
  .listen(3001)
