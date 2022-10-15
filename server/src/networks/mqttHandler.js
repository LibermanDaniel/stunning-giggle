const mqtt = require('mqtt')
const { logger } = require('../utils/logger')
const { mqtt_secret } = require('../config/config')
const Cube = require('../models/cube')

/**
 *  Pasha's GyroCube simulator's topics
 *  CONFIG       = "gyro/config"       # Configuration of the cubes
 *  MEASUREMENTS = "gyro/measurement"  # Measurements related info
 *  CUBE_STATE   = "gyro/cube"         # Updates from cubes
 *  NETWORK      = "gyro/network"      # Network updates
 *  ERROR        = "gyro/error"        # Errors
 */
const mqttHandler = () => {
  const options = {
    host: '490fecfb40b0499bb757dfeca3e993f1.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'GyroChad',
    password: mqtt_secret
  }
  const topics = ['gyro/config', 'gyro/measurement', 'gyro/cube', 'gyro/network', 'gyro/error']

  const client = mqtt.connect(options)

  client.on('connect', () => {
    logger.info(`MQTT successfully connected with the client ID: ${client.options.clientId}`)
  })
  client.on('error', (err) => {
    logger.error(err)
  })

  topics.forEach((topic) => {
    subscribe(client, topic)
  })

  client.on('message', (topic, message) => {
    // logger.info(`Message received from ${topic}\nMessage: ${message}`)
    if (message && message.toString() !== 'Moi!') {
      const index = topic.lastIndexOf('/')
      const topicName = topic.substring(index + 1)
      const topicMessage = JSON.parse(message.toString())
      topicHandler[topicName](topicMessage)
    }
  })
}

const subscribe = (client, topic) => {
  client.subscribe(topic)
  logger.info(`Subscribed successfully to topic: ${topic}`)
}

const config = (message) => {
  logger.info("moi config")
}

const measurement = (message) => {
  logger.info("moi measurement")
}

/**
 * EVENT: CUBE EXITED NETWORK
 * SENT: {"cube_id": 186, "mtype": 2, "tag": 2, "timestamp": 1665847026.5578983}
 *
 * EVENT: CUBE JOINED NETWORK
 * SENT: {"cube_id": 215, "mtype": 2, "tag": 1, "timestamp": 1665847171.976537} 
 * */
const network = (message) => {
  console.log(message)
  if (message.tag === 1) {
    const cube = Cube.findOne({ id: message.cube_id })

    if (cube) {
      Cube.findOneAndUpdate({ id: cube.id }, { $set: { isOn: true } })
      // send data to client
    }

  }
  else if (message.tag === 2) {
    logger.info("moimoi")
  }
}

const cube = (message) => {
  logger.info("moi cube")
}

const error = (message) => {
  logger.info("moi error")
}

const topicHandler = {
  config,
  measurement,
  network,
  cube,
  error
}

module.exports = { mqttHandler }