import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

const Registration = (
  { handleRegistration,
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    email,
    handleEmailChange,
    name,
    handleNameChange }
) => (
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

        <Form.Group>
          <Form.Label className='mr-2 fs-4'>Name</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>
        <Button type="submit" className='mt-3 fs-5'>Submit</Button>
      </Form>
    </Card.Body>
  </Card >
)

export default Registration