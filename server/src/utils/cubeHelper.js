const _ = require('lodash')
const { logger } = require('./logger')
const Cube = require('../models/cube')

const cubesTracking = async (newCube) => {
  const cubes = await Cube.find({})

  const ownedCubes = cubes.filter(cube => cube.user !== null)
  if (ownedCubes) {
    handleOwnedCubes(ownedCubes)
  }


}

const handleOwnedCubes = (ownedCubes) => {
  console.log("moi")
}

module.exports = { cubesTracking }