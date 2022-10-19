const { logger } = require('./logger')
const Cube = require('../models/cube')
const { getIo } = require('../networks/socketHandler')

const cubesTracking = async (newCube) => {
  const io = getIo()

  const cubes = await Cube.find({ isOn: { $eq: true }, user: { $ne: null } })

  io.emit('cubePool', cubes)

}

const handleOwnedCubes = (ownedCubes) => {
  logger.info("owned cubes")
}

module.exports = { cubesTracking }