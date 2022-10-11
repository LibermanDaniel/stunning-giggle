const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')
const logger = require('../../utils/logger')
const { sendEmail } = require('../../utils/email')
const User = require('../../models/user')

const passwordResetHandler = async (req, res) => {
  console.log(req.params)
  const { email } = req.params

  console.log(email)

  const passwordString = uuid()
  console.log(passwordString)

  const user = await User.findOneAndUpdate({ 'email': email }, { resetPasswordToken: passwordString })
  console.log(user)
  if (user) {
    try {
      await sendEmail(email,
        email,
        'Password Reset',
        'Password Reset',
        `To reset your password, click the following link http://localhost:3000/reset-password/${passwordString}`)
    }
    catch (err) {
      logger.error(err)
      res.sendStatus(500)
    }
  }

  res.sendStatus(200)
}

const updatePassword = async (req, res) => {
  const { passwordString } = req.params
  const { newPassword } = req.body
  const salt = await bcrypt.genSalt(10)

  const encryptedPassword = bcrypt.hashSync(newPassword, salt)

  const result = await User.findOneAndUpdate(
    { 'resetPasswordToken': passwordString },
    {
      $set: { password: encryptedPassword },
      $unset: { resetPasswordToken: '' }
    })

  if (!result) {
    return res.sendStatus(404)
  }
  res.sendStatus(200)
}

module.exports = { passwordResetHandler, updatePassword }