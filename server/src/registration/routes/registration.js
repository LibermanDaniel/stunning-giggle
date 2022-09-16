const registerRouter = require('express').Router()
const { registerationHandler } = require('../controller/register')

registerRouter.post('/register', async (req, res) => {
  registerationHandler(req, res)
})

module.exports = registerRouter