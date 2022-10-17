const { Server } = require("socket.io");
const { logger } = require('../utils/logger')

const socketInit = (server) => {
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('a user connected')
  })

}


module.exports = { socketInit }