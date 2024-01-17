setTimeout(() => {
  console.log('end')
}, 10000)

new Promise((resolve, reject) => {
  setTimeout(resolve, 1000)
  setTimeout(reject, 2000)
})
