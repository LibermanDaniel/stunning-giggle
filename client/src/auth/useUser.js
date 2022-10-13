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
    return getPayLoadFromToken(token)
  })

  useEffect(() => {
    if (!token) {
      console.log("empty user")
      setUser(null)
    } else {
      console.log("setting user")
      setUser(getPayLoadFromToken(token))
    }
  }, [token])

  return user
}