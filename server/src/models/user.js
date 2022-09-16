const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: String,
  password: String,
  email: { type: String, required: true, unique: true },
  resetPasswordToken: String,
  settings: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Settings'
  },
  cube: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Cube'
    }
  ]
}, { timestamps: true })

userSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
    delete returnedObj.password
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User