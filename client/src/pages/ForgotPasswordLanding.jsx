import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ForgotPasswordFail } from './ForgotPasswordFail'
import { ForgotPasswordSuccess } from './ForgotPasswordSuccess'

export const ForgotPasswordLanding = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFailure, setIsFailure] = useState(false)
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
  const { passwordString } = useParams()


  if (isFailure) return <ForgotPasswordFail/>
  if(isSuccess) return <ForgotPasswordSuccess/>

  const onResetClick = async () => {
    try {
      await axios.put(`/api/${passwordString}/reset-password`, {newPassword: passwordValue})
      setIsSuccess(true)
      setIsFailure(false)

    } catch (e) {
      setIsFailure(true)
      setIsSuccess(false)
    }
  }

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Please enter your new password</p>
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        placeholder="Password"
        onChange={(e)=> {setPasswordValue(e.target.value)}}
      />
      <label htmlFor="password">Confirm Password: </label>
      <input
        type="password"
        placeholder="Confirm password"
        onChange={(e)=> {setConfirmPasswordValue(e.target.value)}} 
      />
      <button
        disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
        onClick={onResetClick}
      >Reset Password</button>
    </div>
  )
}