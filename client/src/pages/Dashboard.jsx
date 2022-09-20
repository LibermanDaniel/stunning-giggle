import { useState } from 'react'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import Box from '../components/Box'

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
      <form>
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
        <button type="submit" className='mt-3 fs-5'>Submit</button>
      </form>
    )
  }
  const cubeSide = () => {
    return (
      <form>
        <select>
          <option value={1} > 1 </option>
          <option value={2} > 2 </option>
          <option value={3} > 3 </option>
          <option value={4} > 4 </option>
          <option value={5} > 5 </option>
          <option value={6} > 6 </option>
        </select>
      </form>
    )
  }

  const tempTarget = () => {
    return (
      <form className="mb-3">
        <label>Temp target:</label>
        <input type="number" placeholder="25" />
      </form>
    )
  }

  const humidTarget = () => {
    return (
      <form className="mb-3">
        <label>Humid target:</label>
        <input type="number" placeholder="30%" />
      </form>
    )
  }

  const colorPicker = () => {
    return (
      <form className="mb-3">
        <label>Color:</label>
        <input type="color" defaultValue />
      </form>
    )
  }

  const notifcation = () => {
    return (
      <form className="mb-3">
        <input
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Vibrate'}
          label={'Vibrate'}
        />
        <input
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Lights'}
          label={'Lights'}
        />
        <input
          inline
          type={'checkbox'}
          id={`default-${'checkbox'}`}
          value={'Both'}
          label={'Both'}
        />
        {value === 'Lights' || value === 'Both' ? colorPicker() : null}
      </form>
    )
  }

  const weather = () => {
    return (
      <form className="mb-3">
        <label>Set city:</label>
        <input type="text" value={''} placeholder="City" />
      </form>
    )
  }
  return (
    <div>
      <h1>Welcome to the dashboard</h1>
      <Canvas style={{ height: "500px" }}>
        <OrbitControls enableZoom={false} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-2, 5, 2]} intensity={1} />
        <Box />
      </Canvas>
      <p>Set functionality</p>
      <form aria-label="Default select example" onChange={handleClick}>
        <option id='0' defaultValue hidden>Select function</option>
        {parameters.map(parameter => {
          return <option value={parameter.name}>{parameter.name}</option>
        })}
      </form >
      {parameter === null ? null : formBuilder(parameter)}
    </div >
  )
}


export default Dashboard