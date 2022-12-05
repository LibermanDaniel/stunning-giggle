const fs = require('fs-extra')
const countries = require('./countries.json')

const paramters = []

countries.forEach(country => {
  let cityLatLon = `${country.name},${country.latitude},${country.longitude}`
  paramters.push({ value: cityLatLon, label: country.name })
})

fs.writeFileSync('./countriesParameters.json', JSON.stringify(paramters, null, 4))
