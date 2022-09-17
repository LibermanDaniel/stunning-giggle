const loginRouter = require('express').Router()
const passport = require('passport')
const { loginHandler } = require('../controller/login')

loginRouter.post('/login', passport.authenticate('local'), async (req, res) => {
  loginHandler(req, res)
})

module.exports = loginRouter