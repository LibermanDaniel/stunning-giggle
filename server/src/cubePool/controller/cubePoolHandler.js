const jwt = require('jsonwebtoken')
const Cube = require('../../models/cube')
const User = require('../../models/user')
const config = require('../../config/config')

const cubePoolHandler = async (req, res) => {
  try {
    const { authorization } = req.headers

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

    const availableCubes = await Cube.find({ isOn: { $eq: true }, user: { $eq: null } })

    console.log(availableCubes)
    res.status(200).json(availableCubes)
  } catch (e) {
    res.sendStatus(500)
  }
}

const ownCube = async (req, res) => {
  try {
    const { authorization } = req.headers
    const { userId } = req.params
    const { cube } = req.body

    if (!authorization) {
      res.sendStatus(401)
    }

    const token = authorization.split(' ')[1]

    jwt.verify(token, config.jwtSecret, async (err, decodedjwt) => {
      if (err) {
        res.sendStatus(401)
      }

      const { isVerified, id, username, name } = decodedjwt

      if (id !== userId) {
        res.sendStatus(403)
      }
      if (!isVerified) {
        res.sendStatus(403)
      }

      const result = await Cube.updateOne({ cube_id: cube.cube_id }, { $set: { user: id } })
      await User.updateOne({ _id: id }, { $push: { cube: cube.id } })

      const availableCubes = await Cube.find({ isOn: { $eq: true }, user: { $eq: null } })

      if (result) {
        jwt.sign({ id, username, isVerified, name }, config.jwtSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            res.status(200).json(err)
          }
          res.status(200).json({ token, cubes: availableCubes })
        })
      }
    })
  } catch (e) {
    res.sendStatus(500)
  }

}

module.exports = { cubePoolHandler, ownCube }