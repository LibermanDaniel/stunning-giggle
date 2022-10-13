const { v4: uuid } = require('uuid')
const bcrypt = require('bcrypt')
const logger = require('../../utils/logger')
const { sendEmail } = require('../../utils/email')
const config = require('../../config/config')
const User = require('../../models/user')
const { passwordValidator } = require('../../utils/validator')

const passwordResetHandler = async (req, res) => {
  console.log(req.params)
  const { email } = req.params

  console.log(email)

  const passwordString = uuid()
  console.log(passwordString)

  const user = await User.findOneAndUpdate({ 'email': email }, { resetPasswordToken: passwordString })
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
      res.status(500).json({ message: 'Couldn\'t reset password!' })
    }
  }

  res.sendStatus(200)
}

const updatePassword = async (req, res) => {
  const { passwordString } = req.params
  const { newPassword } = req.body
  if (!passwordValidator(newPassword)) {
    return res.sendStatus(404)
  }
  const salt = await bcrypt.genSalt(10)

  const extraSalt = uuid()
  const pepper = config.pepper

  const encryptedPassword = bcrypt.hashSync(extraSalt + newPassword + pepper, salt)

  const result = await User.findOneAndUpdate(
    { 'resetPasswordToken': passwordString },
    {
      $set: { password: encryptedPassword, 'extraSalt': extraSalt },
      $unset: { resetPasswordToken: '' }
    })

  if (!result) {
    return res.status(404).json({ message: 'Error occurred whilte setting up the new password!' })
  }
  res.sendStatus(200)
}

module.exports = { passwordResetHandler, updatePassword }