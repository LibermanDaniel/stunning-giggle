const dashboardRouter = require('express').Router()
const { dashboardHandler } = require('../controller/dashboardHandler')

dashboardRouter.post('/owned-cubes', async (req, res) => {
  await dashboardHandler(req, res)
})

dashboardRouter.post('/form-details', async (req, res) => {
  console.log(req.body)
})

module.exports = dashboardRouter