const {fork} = require('child_process')

const child = fork('./work.js', {env: {a: true}})

child.on('exit', (code, single) => {
  console.log('exit', code, single)
})

// child.on('close', (code, signal) => {
//   console.log(`child process terminated due to receipt of signal ${signal}`)
// })

// child.send({event: 'suicide', ms: 1000})

// setTimeout(() => {
//   child.kill()
// }, 2000)
