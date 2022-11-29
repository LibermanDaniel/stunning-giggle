import { useState } from 'react'

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token')
  })

  const setToken = newToken => {
    if (newToken === null) {
      localStorage.removeItem('token')
      console.log("me null", token)
      setTokenInternal(token)

    } else {
      localStorage.setItem('token', newToken)
      setTokenInternal(token)
    }
  }

  return [token, setToken]
}

