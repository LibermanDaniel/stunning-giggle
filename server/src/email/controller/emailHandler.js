const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const emailHandler = async (req, res) => {
  const { verificationString } = req.body

  if (verificationString === 'undefined') {
    return res.sendStatus(500)
  }
  const result = await User.findOne({ verificationString })

  if (!result) {
    res.status(401).json({ message: 'The email verfication code is incorrect' })
  }

  const { _id, username, email } = result

  await User.updateOne({ username }, { $set: { isVerified: true } })

  jwt.sign({ _id, email, isVerified: true },
    config.jwtSecret,
    { expiresIn: '1h' },
    (err, token) => {
      if (err) {
        return res.sendStatus(500)
      }
      res.status(200).json({ token })
    })
}


module.exports = { emailHandler }