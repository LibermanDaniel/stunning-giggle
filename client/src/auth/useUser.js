import { useState, useEffect } from 'react'
import { useToken } from './useToken'
import { useUserStore } from '../common/useUserStore'

export const useUser = () => {
  const [token,] = useToken()
  const addUser = useUserStore(state => state.addUser)
  const removeUser = useUserStore(state => state.removeUser)

  const getPayLoadFromToken = token => {
    try {
      const encodedPayLoad = token.split('.')[1]
      return JSON.parse(window.atob(encodedPayLoad))
    }
    catch {
      return null
    }
  }

  const [user, setUser] = useState(() => {
    if (!token) {
      return null
    }
    return getPayLoadFromToken(token)
  })

  useEffect(() => {
    if (!token) {
      removeUser()
      setUser(null)
    } else {
      const decodedJwt = getPayLoadFromToken(token)

      if (!decodedJwt || decodedJwt?.exp * 1000 < Date.now()) {
        setUser(null)
        removeUser()
      } else {
        setUser(decodedJwt)
        addUser(decodedJwt)
      }
    }
  }, [addUser, removeUser, token])

  return user
}