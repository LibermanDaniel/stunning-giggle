const { logger } = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method} | Path: ${req.path} | Body: ${JSON.stringify(req.body, null, 2)}`)
  next()
}

const errorHandler = (err, req, res, next) => {
  logger.error(err.message)

  if (err.name === 'CastError') {
    return res.sendStatus(400).send({ error: 'malformatted id' })
  }
  else if (err.name === 'ValidationError') {
    return res.sendStatus(400).json({ error: err.message })
  }
  else if (err.name === 'JsonWebTokenError') {
    return res.sendStatus(401).json({ error: 'invalid token' })
  }
  next(err)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else {
    request.token = null
  }
  next()
}

const userExtractor = (req, res, next) => {
  const token = req.token

  if (!token) {
    return res.sendStatus(404).json({ error: 'token is missing!' })
  }
  const decodedToken = jwt.verify(token, 'insertStrongPassHere')
  if (!decodedToken.id) {
    return res.sendStatus(401).json({ error: 'token missing or invalid!' })
  }
  req.user = decodedToken
  next()
}

const ensureAuthenticated = (req, res, next) => {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}


module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor,
  ensureAuthenticated
}


