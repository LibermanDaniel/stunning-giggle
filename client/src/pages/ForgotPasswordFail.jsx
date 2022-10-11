import { useNavigate } from 'react-router-dom'

export const ForgotPasswordFail = () => {
  const navigate = useNavigate()

  return (
    <div>
      <h1>Password Rest Failed!</h1>
      <p>Error occurred while trying to reset your password! :(</p>
      <button onClick={() => { navigate('/login') }}>Go to login</button>
    </div>
  )
}