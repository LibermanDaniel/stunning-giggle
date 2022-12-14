const mongoose = require('mongoose')

const cubeSchema = mongoose.Schema({
  cube_id: { type: String, unique: true },
  isOn: Boolean,
  name: String,
  config: {
    side_one: { type: Object, required: true },
    side_two: { type: Object, required: true },
    side_three: { type: Object, required: true },
    side_four: { type: Object, required: true },
    side_five: { type: Object, required: true },
    side_six: { type: Object, required: true },
  },
  currentSide: Number,
  measurement: { type: Object },
  user: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'User',
    default: null
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