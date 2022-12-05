const mongoose = require('mongoose')
const { v4: uuid } = require('uuid')


const measurementsSchema = new mongoose.Schema({
  humidity: { type: String, required: true },
  temperature: { type: String, required: true },
}, { timestamps: true })

measurementsSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Measurements = mongoose.model('measurements', measurementsSchema)
module.exports = Measurements