process.on('message', function (m, {req, res}) {
  console.log('CHILD got message', m)
})

process.send({foo: 'bar'})
