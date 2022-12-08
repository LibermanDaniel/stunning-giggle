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
  try {

    const { authorization } = req.headers
    const formDetails = req.body

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

      let updatedSide = {}

      const cubeSides = ['side_one', 'side_two', 'side_three', 'side_four', 'side_five', 'side_six']

      if (formDetails.function === 'lamp') {
        updatedSide = {
          function: formDetails.function,
          color: formDetails.functionTarget
        }
      }

      else if (formDetails.function === 'weather') {
        if (formDetails.functionTarget.temperature < 30 && formDetails.functionTarget.temperature >= 20) {
          updatedSide = {
            function: formDetails.function,
            color: '#ab280e'
          }
        }
        else if (formDetails.functionTarget.temperature < 20 && formDetails.functionTarget.temperature >= 10) {
          updatedSide = {
            function: formDetails.function,
            color: '#cf9d32'
          }
        }
        else if (formDetails.functionTarget.temperature < 10 && formDetails.functionTarget.temperature > 0) {
          updatedSide = {
            function: formDetails.function,
            color: '#1b33e3'
          }
        } else {
          updatedSide = {
            function: formDetails.function,
            color: '#1bbee3'
          }
        }
      }
      else if (formDetails.function === 'notifications') {
        console.log(formDetails.functionTarget)
        updatedSide = {
          function: formDetails.function,
          color: formDetails.functionTarget?.color
        }
      }

      console.log(updatedSide)

      const cubeSide = `config.${cubeSides[formDetails.cubeSide - 1]}`
      await Cube.updateOne({ cube_id: formDetails.cube_id }, { $set: { [`${cubeSide}`]: updatedSide } })

      res.status(200).json({ message: 'Updated successfully!' })
    })
  }
  catch (e) {
    console.log(e)
  }
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


module.exports = { dashboardHandler, applyChanges, getMeasurements }