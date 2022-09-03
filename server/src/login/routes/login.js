const loginRouter = require('express').Router()
const { loginHandler } = require('../controller/login')

loginRouter.post('/login', async (req, res) => {
  loginHandler(req, res)
})