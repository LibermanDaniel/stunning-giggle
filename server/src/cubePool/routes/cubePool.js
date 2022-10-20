const cubePoolRouter = require('express').Router()
const { cubePoolHandler, ownCube } = require('../controller/cubePoolHandler')

cubePoolRouter.get('/available-cubes', async (req, res) => {
  cubePoolHandler(req, res)
})

cubePoolRouter.put('/own-cube/:userId', async (req, res) => {
  ownCube(req, res)
})

module.exports = cubePoolRouter