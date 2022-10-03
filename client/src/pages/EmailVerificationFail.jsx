import { useNavigate } from 'react-router-dom'

export const EmailVerificationFail = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Verification Failed!</h1>
      <p>Error occurred while trying to verify your email :(</p>
      <button onClick={() => { navigate('/sign-up') }}>Go to signup</button>
    </div>
  )
}