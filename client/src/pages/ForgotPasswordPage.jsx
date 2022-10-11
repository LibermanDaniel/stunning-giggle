import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ForgotPasswordPage = () => {
  const [emailValue, setEmailValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()


  useEffect(()=> {
    setTimeout(()=> {
      setErrorMessage('')
    },3000 )
  }, [errorMessage])

  const onClickSubmit = async() => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`)
      setIsSuccess(true)
      setTimeout(()=> {
        navigate('/login')
      }, 4000)
    } catch (err) {
      setIsSuccess(false)
      setErrorMessage(err.message)
    }
  } 

  return (
    isSuccess 
    ? (<div>
        <h1>Success!</h1>
        <p>The reset password link will be shortly in your email</p>
      </div>)
    : (<div>
      {errorMessage}
      <h1>Forgot Password</h1>
        <label for="email">Enter your email and the reset link will be sent shortly after.</label>
        <input
          value={emailValue}
          type="email"
          onChange={(e)=>{setEmailValue(e.target.value)}}
          placeholder="JohnDoe@example.com"
        />
      <button disabled={!emailValue} onClick={onClickSubmit}>Send Reset Link</button>
    </div>)

  )
}