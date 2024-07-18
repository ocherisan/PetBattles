const http = require('http')
const port = 8080

const server = http.createServer(function (req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/html'
  })
  res.write('Hello')
  res.end()
})

server.listen(port, function (error) {
  if (error) {
    console.log('ERROR', error)
  }
  else {
    console.log('Server is listening on port ' + port)
  }
})