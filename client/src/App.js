import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from "react-router-dom";
import loginSerivce from './services/login'
import registerService from './services/register';
import Login from './pages/Login'
import Registration from './pages/Registration';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginSerivce.login({
        username, password
      })
      loginSerivce.setToken(user.token)
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      await registerService.register({ username, password, email, name })
      setPassword('')
      setUsername('')
      setEmail('')
      setName('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  const handleEmailChange = (event) => {
    event.preventDefault()
    setEmail(event.target.value)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
  }

  return (
    <Container fluid className="p-5">
      <nav>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/registration">Registration</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/logout">Logout</Link>
      </nav>
      <Login
        handleLogin={handleLogin}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
      />
      <Registration
        handleRegistration={handleRegistration}
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        email={email}
        handleEmailChange={handleEmailChange}
        name={name}
        handleNameChange={handleNameChange}
      />

      {user === null ? <p> moi</p> : <p>moimoi</p>}
    </Container>
  )
}

export default App
