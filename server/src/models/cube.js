const mongoose = require('mongoose')

const cubeSchema = mongoose.Schema({
  config: {
    side_one: { type: String, required: true },
    side_two: { type: String, required: true },
    side_three: { type: String, required: true },
    side_four: { type: String, required: true },
    side_five: { type: String, required: true },
    side_six: { type: String, required: true },
  },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    unique: true
  }
}, { timestamps: true })

cubeSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Cube = mongoose.model('Cube', cubeSchema)
module.exports = Cube