import { useState } from 'react';
import registerService from '../services/register'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Registration = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleRegistration = async (event) => {
    event.preventDefault()
    try {
      await registerService.register({ username, password, email })
      setPassword('')
      setUsername('')
      setEmail('')
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
  return (
    <Card style={{ width: '50rem' }} className={'mx-auto'}>
      <Card.Title className={'p-2 fs-1'}>Registration</Card.Title>
      <Card.Body>
        <Form onSubmit={handleRegistration}>
          <Form.Group className='mb-3'>
            <Form.Label className='mr-2 fs-4'>Username:</Form.Label>
            <Form.Control
              type="text"
              name="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className='mr-2 fs-4'>Password</Form.Label>
            <Form.Control
              type="password"
              name="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label className='mr-2 fs-4'>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>
          <Button type="submit" className='mt-3 fs-5'>Submit</Button>
        </Form>
      </Card.Body>
    </Card >
  )
}

export default Registration