import { useState, useEffect } from 'react'
import { useToken } from './useToken'

export const useUser = () => {
  const [token] = useToken()

  const getPayLoadFromToken = token => {
    const encodedPayLoad = token.split('.')[1]
    return JSON.parse(window.atob(encodedPayLoad))
  }

  const [user, setUser] = useState(() => {
    if (!token) {
      return null
    }
  })

  useEffect(() => {
    if (!token) {
      setUser(null)
    } else {
      setUser(getPayLoadFromToken(token))
    }
  }, [token])

  return user
}