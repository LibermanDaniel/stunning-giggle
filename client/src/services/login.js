import axios from 'axios'
const baseUrl = '/api/login'
let token;
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  console.log(response)
  return response.data
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`

}

export default { login, setToken }