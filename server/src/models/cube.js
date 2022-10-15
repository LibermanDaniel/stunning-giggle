const mongoose = require('mongoose')

const cubeSchema = mongoose.Schema({
  id: String,
  isOn: Boolean,
  config: {
    side_one: { type: Object, required: true },
    side_two: { type: Object, required: true },
    side_three: { type: Object, required: true },
    side_four: { type: Object, required: true },
    side_five: { type: Object, required: true },
    side_six: { type: Object, required: true },
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