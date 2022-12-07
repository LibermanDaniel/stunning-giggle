const { logger } = require('./logger')
const Cube = require('../models/cube')
const Measurements = require('../models/measurements')

const { getIo } = require('../networks/socketHandler')

const cubesTracking = async (newCube) => {
  const io = getIo()

  const cubes = await Cube.find({ isOn: { $eq: true }, user: { $eq: null } })

  io.emit('cubePool', cubes)

}

const measurementsHandler = async () => {
  const io = getIo()


  const measurements = await Measurements.find({}).sort({ createdAt: -1 }).limit(15)

  io.emit('measurements', measurements)
}

module.exports = { cubesTracking, measurementsHandler }