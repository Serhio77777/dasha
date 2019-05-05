const http = require('http')
const app = require('./app')
const config = require('./config/config')

let port = ((val) => {
    let port = parseInt(val, 10)

    if (isNaN(port)) {
        // named pipe
        return val
    }

    if (port >= 0) {
        // port number
        return port
    }

    return false
})(config.web.port)
  
app.set('port', port)
  
let server = http.createServer(app)

server.listen(port)

server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error
    }
  
    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges')
        process.exit(1)
        break
      case 'EADDRINUSE':
        console.error(bind + ' is already in use')
        process.exit(1)
        break
      default:
        throw error
    }
})
server.on('listening', () => {
    let addr = server.address()
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port
    console.info('Listening on ' + bind)
})


server.on('exit', function(code) {
    console.log('client exit', code);
});