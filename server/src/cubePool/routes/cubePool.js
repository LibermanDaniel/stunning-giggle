const cubePoolRouter = require('express').Router()
const { cubePoolHandler } = require('../controller/cubePoolHandler')

cubePoolRouter.get('/available-cubes', async (req, res) => {
  cubePoolHandler(req, res)
})

module.exports = cubePoolRouter