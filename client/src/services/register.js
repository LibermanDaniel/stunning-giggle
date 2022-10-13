import axios from 'axios'
const baseUrl = '/api/register'

export const register = async (credentials) => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}


