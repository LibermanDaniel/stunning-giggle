const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const { logger } = require('../../utils/logger')

const registerationHandler = async (req, res) => {
  const { username, password, email, name } = req.body
  try {
    const salt = await bcrypt.genSalt(10)
    const checkUser = await User.findOne({ username })
    if (checkUser) {
      res.status(409).json({ msg: 'User already exist' })
    }

    const encryptedPassword = bcrypt.hashSync(password, salt)
    const user = new User({ username, encryptedPassword, email, name })
    user.save(err => {
      if (err) {
        logger.error('registerationHandler | Error occurred:', err)
      } else {
        res.status(200).json({ msg: 'User has been created!' })
      }
    })

  }
  catch (err) {
    logger.error('registerationHandler | Error occurred:', err)
    res.status(400).json({ msg: 'Error occurred!' })
  }

}

module.exports = { registerationHandler }