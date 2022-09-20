const https = require('https')
const fs = require('fs-extra')
const app = require('./app')
const { logger } = require('./src/utils/logger')

const options = {
  key: fs.readFileSync('../ssl/key.pem'),
  cert: fs.readFileSync('../ssl/cert.crt')
}

const server = https.createServer(options, app)

server.listen(3003, () => {
  logger.info('server listening on 3003')
})