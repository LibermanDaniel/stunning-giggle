const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const { logger } = require('../utils/logger')
const bcrypt = require('bcrypt')

const passpotLocal = async (passport) => {
  await passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username })
      if (!user) {
        throw new Error('Username not found')
      }
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          logger.error(err)
        }
        if (match) {
          return done(null, user)
        }
      })
    } catch (err) {
      logger.error('- passport - passportLocal', err)
      return (null, false, { msg: 'username or password is incorrect' })
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = passpotLocal