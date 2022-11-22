const dashboardRouter = require('express').Router()
const { dashboardHandler } = require('../controller/dashboardHandler')

dashboardRouter.post('/owned-cubes', async (req, res) => {
  await dashboardHandler(req, res)
})

module.exports = dashboardRouter