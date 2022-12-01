const fs = require('fs-extra')
const countries = require('./countries.json')

const paramters = []

countries.forEach(country => {
  let latLon = `${country.latitude},${country.longitude}`
  paramters.push({ value: latLon, label: country.name })
})

fs.writeFileSync('./countriesParameters.json', JSON.stringify(paramters, null, 4))
