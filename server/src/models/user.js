const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  email: String,
  resetPasswordToken: String,
  settings: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Settings'
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