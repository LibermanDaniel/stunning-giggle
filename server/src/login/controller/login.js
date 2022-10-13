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
    return res.status(401).json({ message: 'Invalid username or password!' })
  }
  const isValid = await bcrypt.compare(user.extraSalt + password + config.pepper, user.password)

  if (isValid) {
    const userForToken = {
      username: user.username,
      id: user._id,
      name: user.name,
      passwordHash: user.passwordHash,
      isVerified: user.isVerified
    }


    jwt.sign(userForToken, config.jwtSecret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          res.status(500).json({ message: 'Error occurred!' })
        }
        res.status(200).json({ token })
      })
  } else {
    res.status(401).json({ message: 'Invalid username or password!' })
  }
}

module.exports = { loginHandler }