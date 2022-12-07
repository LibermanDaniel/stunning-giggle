const dashboardRouter = require('express').Router()
const { dashboardHandler, getMeasurements, applyChanges } = require('../controller/dashboardHandler')

dashboardRouter.post('/owned-cubes', async (req, res) => {
  await dashboardHandler(req, res)
})

dashboardRouter.post('/form-details', async (req, res) => {
  await applyChanges(req, res)
})

dashboardRouter.get('/get-measurements', async (req, res) => {
  await getMeasurements(req, res)
})

module.exports = dashboardRouter