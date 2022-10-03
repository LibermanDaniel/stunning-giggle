import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useToken } from '../auth/useToken'
import axios from 'axios'
import { EmailVerificationSuccess } from './EmailVerificationSuccess'
import { EmailVerificationFail } from './EmailVerificationFail'

export const EmailVerificationPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const { verificationString } = useParams()
  const [, setToken] = useToken()

  useEffect(() => {
    const loadVerification = async () => {
      try {
        const { token } = await axios.put('/api/verify-email', { verificationString }).data
        setToken(token)
        setIsSuccess(false)
        setIsLoading(false)
      } catch (err) {
        setIsSuccess(false)
        setIsLoading(false)
      }
    }

    loadVerification()
  }, [setToken, verificationString])

  if (isLoading) {
    return (<p>Loading...</p>)
  }
  if (!isSuccess) return (<EmailVerificationFail />)
  return <EmailVerificationSuccess />
}