const http = require('http')
const app = require('./app')
const { logger } = require('./src/utils/logger')
const server = http.createServer(app)

server.listen(3003, () => {
  logger.info('server listening on 3003')
})