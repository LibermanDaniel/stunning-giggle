const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const loginRouter = require('./src/login/routes/login')
const registerRouter = require('./src/registration/routes/registration')
const emailRouter = require('./src/email/routes/emailRoutes')
const cubePoolRouter = require('./src/cubePool/routes/cubePool')
const passwordResetRouter = require('./src/passwordReset/routes/passwordReset')
const middleware = require('./src/utils/middleware')
const dashboardRouter = require('./src/dashboard/routes/dashboard')

const { logger } = require('./src/utils/logger')
const config = require('./src/config/config')
const mongoose = require('mongoose')
const { mqttHandler } = require('./src/networks/mqttHandler')

const mongoUrl = config.MONGODB_URI

mongoose.connect(mongoUrl, async (err) => {
  if (err) {
    logger.error('Error while connecting to MongoDb: ', err)
  }
  logger.info('Connected to MongoDB')
})

mqttHandler()

app.use(cors())
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(middleware.requestLogger)
app.use(middleware.errorHandler)

app.use('/api/', loginRouter)
app.use('/api/', registerRouter)
app.use('/api/', emailRouter)
app.use('/api/', passwordResetRouter)
app.use('/api/', cubePoolRouter)
app.use('/api/', dashboardRouter)

module.exports = app

