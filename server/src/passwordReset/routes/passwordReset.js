const passwordResetRouter = require('express').Router()
const { passwordResetHandler, updatePassword } = require('../controller/passwordReset')

passwordResetRouter.put('/forgot-password/:email', async (req, res) => {
  passwordResetHandler(req, res)
})

passwordResetRouter.put('/:passwordString/reset-password', (req, res) => {
  updatePassword(req, res)
})

module.exports = passwordResetRouter