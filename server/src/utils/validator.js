const validator = require('email-validator')


const passwordValidator = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/
  return (regex.test(password))
}

const emailValidator = (email) => {
  return validator.validate(email)
}


module.exports = { passwordValidator, emailValidator }