const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  fontSize: Number,
  darkMode: Boolean,
  clearDataInterval: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

settingsSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString()
    delete returnedObj._id
    delete returnedObj.__v
  }
})

const Settings = mongoose.model('Settings', settingsSchema)
module.exports = Settings