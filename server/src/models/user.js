const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  extraSalt: String,
  verificationString: String,
  resetPasswordToken: String,
  isVerified: Boolean,
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
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User