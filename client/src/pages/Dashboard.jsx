import Form from 'react-bootstrap/Form';
import { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


const Dashboard = () => {
  const [parameter, setParameter] = useState(null)
  const [value, setValue] = useState(null)
  const [checks, setChecks] = useState([{ name: "Vibrate", checked: false },
  { name: "Lights", checked: false },
  { name: "Both", checked: false }])
  const parameters = [
    { name: 'Temp', id: 1, inputFields: ['cubeSide', 'targetTemp'] },
    { name: 'Humid', id: 2, inputFields: ['cubeSide', 'targetHumid'] },
    { name: 'Weather', id: 3, inputFields: ['cubeSide', 'weather'] },
    { name: 'Notification', id: 4, inputFields: ['cubeSide', 'notifcation'] },
    { name: 'Lamp', id: 5, inputFields: ['cubeSide', 'lamp'] },
    { name: 'Idle', id: 6, inputFields: ['cubeSide'] }
  ]

  const handleClick = (event) => {
    event.preventDefault();
    const [selected] = parameters.filter(parameter => {
      return parameter.name === event.target.value
    })
    setParameter(selected)
  }

  const formBuilder = (parameter) => {
    console.log(parameter)
    return (
      <Form>
        {parameter.inputFields.map(inputField => {
          switch (inputField) {
            case 'cubeSide':
              return cubeSide()

            case 'targetTemp':
              return tempTarget()

            case 'targetHumid':
              return humidTarget()

            case 'lamp':
              return colorPicker()

            case 'notifcation':
              return notifcation()

            case 'weather':
              return weather()

            default:
              return null;
          }
        })}
        <Button type="submit" className='mt-3 fs-5'>Submit</Button>
      </Form>
    )
  }
  const cubeSide = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Cube side:</Form.Label>

        <Form.Select>
          <option value={1} > 1 </option>
          <option value={2} > 2 </option>
          <option value={3} > 3 </option>
          <option value={4} > 4 </option>
          <option value={5} > 5 </option>
          <option value={6} > 6 </option>
        </Form.Select>
      </Form.Group >
    )
  }

  const tempTarget = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Temp target:</Form.Label>
        <Form.Control type="number" placeholder="25" />
      </Form.Group>
    )
  }

  const humidTarget = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Humid target:</Form.Label>
        <Form.Control type="number" placeholder="30%" />
      </Form.Group>
    )
  }

  const colorPicker = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Color:</Form.Label>
        <Form.Control type="color" defaultValue />
      </Form.Group>
    )
  }

  const notifcation = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Check
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Vibrate'}
          label={'Vibrate'}
        />
        <Form.Check
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Lights'}
          label={'Lights'}
        />
        <Form.Check
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Both'}
          label={'Both'}
        />
        {value === 'Lights' || value === 'Both' ? colorPicker() : null}
      </Form.Group>
    )
  }

  const weather = () => {
    return (
      <Form.Group className="mb-3">
        <Form.Label>Set city:</Form.Label>
        <Form.Control type="text" value={''} placeholder="City" />
      </Form.Group>
    )
  }
  return (
    <Container>
      <h1>Welcome to the dashboard</h1>
      <p>Set functionality</p>
      <Form.Select aria-label="Default select example" onChange={handleClick}>
        <option id='0' defaultValue hidden>Select function</option>
        {parameters.map(parameter => {
          return <option value={parameter.name}>{parameter.name}</option>
        })}
      </Form.Select >
      {parameter === null ? null : formBuilder(parameter)}
    </Container >
  )
}

export default Dashboard