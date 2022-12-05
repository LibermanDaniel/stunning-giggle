const User = require('../../models/user')
const Cube = require('../../models/cube')
const Measurements = require('../../models/measurements')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')

const dashboardHandler = async (req, res) => {
  try {
    const { authorization } = req.headers
    const { userId } = req.body

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
      const { isVerified } = decodedjwt

      if (!isVerified) {
        res.sendStatus(401)
      }
    })

    const user = await User.findOne({ _id: userId })
    const { cube } = user
    const ownedCubes = await Cube.find({ _id: { $in: cube } })
    res.status(200).json(ownedCubes)
  }
  catch (e) {
    console.log(e)
  }
}

const applyChanges = async (req, res) => {
  const { authorization } = req.headers
  const { userId } = req.body

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
    const { isVerified } = decodedjwt

    if (!isVerified) {
      res.sendStatus(401)
    }
  })
}

const getMeasurements = async (req, res) => {
  try {
    const measurements = await Measurements.find({}).sort({ createdAt: -1 }).limit(15)

    res.status(200).json(measurements)
  }
  catch (err) {
    res.sendStatus(500)
  }

}


module.exports = { dashboardHandler, getMeasurements }