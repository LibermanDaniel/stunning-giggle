
import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

import  Cube from '../img/cube3.gif'

const AboutUs = () => {
  return (



    <Container  >
        <Grid container spacing={2} mt={8} ml={3}>
            <Grid item xs={6} >
             
                <Typography variant="h1" color="white">
                ABOUT US
                </Typography>
                
                <Grid item mt={1}>
                <Typography variant="h5" component="h2" color="white">
                The Gyrocube consists of cube shaped devices, that can be controlled by flip motion: the functionality of the cube changes based on the side the gadget is placed on. The Gyrocube environment is designed to have an easy setup for new users, providing a web application interface and a set of programable functions that can be assigned to the cube’s sides. The basic configuration includes smart lights controls and notification trackers. 
                </Typography>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <img src={Cube} alt="loading..." />
            </Grid>    

        </Grid>
    </Container>

  ) 
}

export default AboutUs