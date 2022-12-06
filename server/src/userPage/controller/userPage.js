const jwt = require('jsonwebtoken')
const User = require('../../models/user')
const Cube = require('../../models/cube')
const config = require('../../config/config')


const userPageHandler = async (req, res) => {
  try {
    const { authorization } = req.headers || null

    if (!authorization) {
      res.sendStatus(401)
    }
    const token = authorization.split(' ')[1]

    jwt.verify(token, config.jwtSecret, async (err, decodedjwt) => {
      if (err) {
        res.sendStatus(401)
      }
      if (!decodedjwt) {
        res.sendStatus(500)
      }
      const { isVerified, id, username, name } = decodedjwt

      if (!isVerified) {
        res.sendStatus(401)
      }

      const user = await User.findOne({ username: username }, '_id username email isVerified')
      if (!user) {
        res.sendStatus(404)
      }

      const ownedCubes = await Cube.find({ user: { $eq: user._id } })


      const userDetails = {
        user,
        cubes: ownedCubes
      }

      res.status(200).json(userDetails)
    })

  } catch (e) {
    res.sendStatus(500)
  }
}


module.exports = { userPageHandler }