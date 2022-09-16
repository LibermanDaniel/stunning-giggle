const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const loginRouter = require('./src/login/routes/login')
const registerRouter = require('./src/registration/routes/registration')
const middleware = require('./src/utils/middleware')
const { logger } = require('./src/utils/logger')
const config = require('./src/config/config')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, async (err) => {
  if (err) {
    logger.error('Error while connecting to MongoDb: ', err)
  }
  logger.info('Connected to MongoDB')
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(middleware.requestLogger)
app.use('/api/', loginRouter)
app.use('/api/', registerRouter)


app.use(cookieParser())

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
}))


app.use(passport.initialize())
app.use(passport.session())

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
module.exports = app

