import { useState, useEffect } from 'react'
import { useToken } from './useToken'

export const useUser = () => {
  const [token, setToken] = useToken()

  const getPayLoadFromToken = token => {
    const encodedPayLoad = token.split('.')[1]
    return JSON.parse(window.atob(encodedPayLoad))
  }

  const [user, setUser] = useState(() => {
    if (!token) {
      return null
    }
    return getPayLoadFromToken(token)
  })

  useEffect(() => {
    if (!token) {
      setUser(null)
    } else {
      const decodedJwt = getPayLoadFromToken(token)
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        setUser(null)
      } else {
        setUser(decodedJwt)
      }
    }
  }, [token])

  return user
}