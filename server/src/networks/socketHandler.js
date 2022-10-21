const { Server } = require('socket.io')
const { logger } = require('../utils/logger')

let io

module.exports = {
  init: (server) => {
    io = new Server(server)
    io.on('connection', (socket) => {
      logger.info(`User ${socket.id} has successfully connected`)
    })

    return io
  },
  getIo: () => {
    if (!io) {
      logger.error('Can\'t get io instance before calling .init()')
    }
    return io
  }
}