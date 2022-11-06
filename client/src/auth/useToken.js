import { useState } from 'react'

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    return localStorage.getItem('token')
  })

  const setToken = newToken => {

    localStorage.setItem('token', newToken)
    setTokenInternal(token)

  }

  return [token, setToken]
}

