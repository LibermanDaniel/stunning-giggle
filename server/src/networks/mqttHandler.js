const mqtt = require('mqtt')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

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

/**
 * Refactoring idea -> in cases where cube is assumed to be existing use findOneAndUpdate within try..catch 
 * It will result in one less interaction with db
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

/**
 * {
 *  side_idx: 5,
 *  cube_id: 45,
 *  config: { color: '4b2b81' },
 *  mtype: 2,
 *  tag: 7,
 *  timestamp: 1665859038.0797572
 * }
 */

const config = async (message) => {
  const functions = ['idle', 'weather', 'notifications', 'lamp', 'temperature', 'humidity']
  const sides = {
    1: 'side_one',
    2: 'side_two',
    3: 'side_three',
    4: 'side_four',
    5: 'side_five',
    6: 'side_six'
  }
  const cubeSide = `config.${sides[message.side_idx]}`
  const cube = await Cube.findOne({ cube_id: message.cube_id }).clone()
  if (cube && cube.isOn) {
    await Cube.updateOne(
      { cube_id: cube.cube_id },
      {
        $set: {
          [cubeSide]: {
            function: functions[Math.floor(Math.random() * functions.length)],
            color: message.config.color
          }
        }
      },
    )
    logger.info(`New config applied to cube ${cube.cube_id} (${cube.name}) on side: ${cubeSide}`)
    return
  }
}

const measurement = (message) => {
  logger.info('')
}

const network = async (message) => {
  if (message.tag === 1) {
    const cube = await Cube.findOne({ cube_id: message.cube_id }).clone()
    if (cube) {
      await Cube.updateOne({ cube_id: cube.cube_id }, { $set: { isOn: true } })
      // send data to client
      return
    }
    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] })

    const newCube = new Cube({
      cube_id: message.cube_id,
      name: randomName,
      isOn: true,
      currentSide: 1,
      measurement: {
        temperature: randomIntFromInterval(10, 30),
        humidity: randomIntFromInterval(10, 70)
      },
      config: {
        side_one: {
          funciton: 'idle'
        },
        side_two: {
          funciton: 'lamp'
        },
        side_three: {
          funciton: 'weather'
        },
        side_four: {
          funciton: 'temperature'
        },
        side_five: {
          funciton: 'humidity'
        },
        side_six: {
          funciton: 'notifications'
        }
      }
    })

    newCube.save(async (err, savedCube) => {
      if (err) {
        logger.error(`MQTT handler | network | Error: ${err}`)
      }
      logger.info(`New cube saved: ${savedCube}`)
    })

  }
  else if (message.tag === 2) {
    const cube = await Cube.findOne({ cube_id: message.cube_id })
    if (cube) {
      await Cube.findOneAndUpdate({ cube_id: cube.cube_id }, { $set: { isOn: false } })
      logger.info(`Cube ${cube.cube_id} has been turned off`)
      // send data to client
      return
    }
  }
}

const cube = (message) => {
  logger.info('')
}

const error = (message) => {
  logger.info('')
}

const topicHandler = {
  config,
  measurement,
  network,
  cube,
  error
}

const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = { mqttHandler }