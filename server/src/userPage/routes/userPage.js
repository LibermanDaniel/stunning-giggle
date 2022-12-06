const userPageRouter = require('express').Router()
const { userPageHandler } = require('../controller/userPage')

userPageRouter.get('/get-user-details', async (req, res) => {
  userPageHandler(req, res)
})

module.exports = userPageRouter