const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { logger } = require('../../utils/logger')
const bcrypt = require('bcrypt')
const config = require('../../config/config')


const loginHandler = async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  if (!user) {
    logger.info('User does not exist!')
    return res.sendStatus(401)
  }
  const isValid = await bcrypt.compare(password, user.password)

  if (isValid) {
    const userForToken = {
      username: user.username,
      id: user._id,
      name: user.name,
      passwordHash: user.passwordHash,
      isVerified: user.isVerified
    }


    jwt.sign(userForToken, config.jwtSecret,
      { expiresIn: '2d' },
      (err, token) => {
        if (err) {
          res.sendStatus(500)
        }
        res.status(200).json({ token })
      })
  } else {
    res.sendStatus(401)
  }
}

module.exports = { loginHandler }