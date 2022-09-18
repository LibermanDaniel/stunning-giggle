import axios from 'axios'

const baseUrl = '/api/login'

let token;

const login = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  if (data.msg === 'OK') {
    return data
  }
  return null
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`

}

export default { login, setToken }