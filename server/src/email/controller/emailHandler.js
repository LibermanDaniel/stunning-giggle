const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const emailHandler = async (req, res) => {
  const { verificatioString } = req.body
  const result = await User.findOne({ verificatioString })

  if (!result) {
    res.status(401).json({ message: 'The email verfication code is incorrect' })
  }

  const { _id, username, email } = result

  await User.updateOne({ username }, { $set: { isVerified: true }, $unset: { verificationString: '' } })

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