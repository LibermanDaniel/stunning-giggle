
import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

import  Cube from '../img/cube3.gif'

const AboutUs = () => {
  return (



    <Container>
        <Grid container spacing={2}>
            <Grid item xs={6}>
                <Typography variant="h2" color="white">
                ABOUT US
                </Typography>
                <Typography variant="h5" component="h2" color="white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida arcu. Feugiat nisl pretium fusce id velit ut tortor. Egestas congue quisque egestas diam in. Venenatis lectus magna fringilla urna porttitor rhoncus dolor.
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <img src={Cube} alt="loading..." />
            </Grid>    

        </Grid>
    </Container>

  ) 
}

export default AboutUs