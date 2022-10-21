const emailRouter = require('express').Router()
const { emailHandler } = require('../controller/emailHandler')

emailRouter.put('/verify-email', async (req, res) => {
  await emailHandler(req, res)
})

module.exports = emailRouter