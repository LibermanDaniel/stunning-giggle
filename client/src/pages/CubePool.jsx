import { useState,useEffect } from "react"
import io from 'socket.io-client'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const socket = io()

export const CubePool = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [availableCubes, setAvailableCubes] = useState([])

  useEffect(() => {
    (async () => {
      const {data} = await axios.get('/api/available-cubes')
      if(data) {
        setAvailableCubes(data)
      }
    })()
    
     
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('cubePool', (data) => {
      setAvailableCubes(data)
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('cubePool')
    }
  },[availableCubes])

  /**
   * TODO:
   * 1. Add JWT and user verfication logic -> make sure to send user _id 
   * 2. OWN now should send a post '/api/own-cube/${userId}
   * 3. Add the cube as owned by the user
   * 4. Modify the list into mui 
   * 5. Make functions for name corrections(name, config, etc)
   * 6.Break down the available cubes into 2 components
   * 7. Component 1: AvailableCubes
   * 8. Component 2: AvailableCube
   *  
   */

  return (
    <>
    {availableCubes ? availableCubes.map(cube => (
    <Card sx={{ minWidth: 275 }} style={{display: 'flex',margin:'auto', justifyContent: 'center', flexDirection: 'column', flexWrap: 'wrap'}}>
        <CardContent style={{ margin:'auto'}}>
          <Typography gutterBottom variant="h5" component="div">
            {cube.name} - {cube.cube_id}
          </Typography>
          <div style={{height: '100px', width: '100px',  margin:'auto',backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`}}/>
          <Typography variant="h5">
            Config
          </Typography>
          <ul>
            <li>Current Side: {cube.currentSide}</li>
            {Object.entries(cube.config).map(([key, value]) => (
              <li key={key} >{key} <ol>{Object.entries(value).map(([key, value]) =>(
                <li key={key}> {key}: {value} </li>))}
              </ol>
            </li>
            ))}
          </ul>
          <Button onClick={() => {console.log("moi")}}>Own now!</Button>
        </CardContent>
      </Card>
      )) : null}
    </>
  )
} 

