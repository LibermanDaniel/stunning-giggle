const http = require('http')
const app = require('./app')
const { logger } = require('./src/utils/logger')
const { init } = require('./src/networks/socketHandler')

const server = http.createServer(app)
init(server)
server.listen(3003, () => {
  logger.info('server listening on 3003')
})

