import { useEffect } from "react";
import {useNavigate } from 'react-router-dom'

export const PleaseVerifyPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    setTimeout(() => {
      navigate.push('/')
    }, 3000)
  }, [navigate])

  return (
    <div>
      <h1>Thankks for signing up!</h1>
      <p>You will receive a verification email shortly to the email you have provided.</p>
      <p>Please verify to utilize the web application's features.</p>
    </div>
  )
}