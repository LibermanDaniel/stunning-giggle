const Cube = require('../../models/cube')

const cubePoolHandler = async (req, res) => {
  const availableCubes = await Cube.find({ isOn: { $eq: true } })
  res.status(200).send(availableCubes)
}

module.exports = { cubePoolHandler }