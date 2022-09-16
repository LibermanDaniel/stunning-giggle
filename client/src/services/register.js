import axios from 'axios'
const baseUrl = '/api/register'

const register = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}


export default { register }