const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuid } = require('uuid')
const { logger } = require('../../utils/logger')
const config = require('../../config/config')
const { sendEmail } = require('../../utils/email')

const registerationHandler = async (req, res) => {
  const { username, password, email } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const verificationString = uuid()

    const checkUser = await User.findOne({ username })
    if (checkUser) {
      res.sendStatus(409)
    }

    const encryptedPassword = bcrypt.hashSync(password, salt)
    const user = new User({
      username,
      password: encryptedPassword,
      email,
      isVerified: false,
      verificationString
    })

    user.save(async (err, user) => {
      if (err) {
        logger.error('registerationHandler | Error occurred:', err)
        res.sendStatus(500)
      }

      try {
        await sendEmail(
          email,
          username,
          'Verification Email',
          'Verification Email',
          `Thanks for signing up! To verify your email, click here: <a href=http://localhost:3000/verify-email/${verificationString}>Verify</a>`
        )
      } catch (err) {
        logger.error(err)
        res.sendStatus(500)
      }

      jwt.sign({
        id: user._id,
        email,
        isVerified: false
      }, config.jwtSecret, {
        expiresIn: '2d'
      }, (err, token) => {
        if (err) {
          return res.sendStatus(500).send(err)
        }
        res.status(200).json({ token })
      })
    })
  }
  catch (err) {
    logger.error('registerationHandler | Error occurred:', err)
    res.sendStatus(400).json({ msg: 'Error occurred!' })
  }

}

module.exports = { registerationHandler }