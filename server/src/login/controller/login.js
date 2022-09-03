const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../../models/user')

const loginHandler = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'Invalid username or password'
    })
  }

  req.user = username
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, 'insertStrongPassHere', { expiresIn: 60 * 60 })
  res.status(200).send({ token, username, name: user.name })
}

module.exports = { loginHandler }