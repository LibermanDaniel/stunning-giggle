/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const sessionSecret = process.env.SESSION_SECRET
const jwtSecret = process.env.JWT_SECRET
const pepper = process.env.PEPPER_SECRET
const mqtt_secret = process.env.MQTT_SECRET

module.exports = { MONGODB_URI, PORT, sessionSecret, jwtSecret, pepper, mqtt_secret }