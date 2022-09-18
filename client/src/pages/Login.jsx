import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import loginSerivce from '../services/login'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = await loginSerivce.login({
        username, password
      })
      if (data === null) {
        navigate('/login')
      } else {
        loginSerivce.setToken(data.token)
        setPassword('')
        setUsername('')
        navigate('/dashboard')
      }
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

  return (
    <Card style={{ width: '50rem' }} className={'mx-auto'}>
      <Card.Title className={'p-2 fs-1'}>Login</Card.Title>
      <Card.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3'>
            <Form.Label className='mr-2 fs-4'>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              name="Username"
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className='mr-2 fs-4'>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              name="Password"
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Button type="submit" className='mt-3 fs-5'>Login</Button>
        </Form>
      </Card.Body>
    </Card >
  )
}
export default Login