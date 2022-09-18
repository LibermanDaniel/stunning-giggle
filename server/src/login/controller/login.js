const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { logger } = require('../../utils/logger')
const config = require('../../config/config')


const loginHandler = async (req, res) => {
  const { username } = req.body
  try {
    const user = await User.findOne({ username })
    if (!user) {
      logger.info('User does not exist!')
    } else {
      const userForToken = {
        username: user.username,
        id: user._id
      }
      const token = jwt.sign(userForToken, config.jwtSecret, { expiresIn: 60 * 60 })
      res.cookie('token', token, { httpOnly: true })
      res.status(200).send({ token, username, msg: 'OK' })
    }
  }
  catch (err) {
    logger.error(err)
    res.status(400).json({ msg: 'Log in error!' })
  }
}

module.exports = { loginHandler }