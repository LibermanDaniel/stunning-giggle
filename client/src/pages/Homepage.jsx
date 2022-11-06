import * as React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import Welcome from '../components/Welcome';
import AboutUs from '../components/AboutUs';
import Releases from '../components/Releases';
import ContactInfo from '../components/ContactInfo';
import StickyFooter from '../components/StickyFooter';

const theme = createTheme({
  palette: {
    primary: {
      light: '#CFDBC7',
      main: '#CFDBC7',
      dark: '#7C9473',
      contrastText: '#fff',
    },
  },
});

export default function Homepage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#7C9473',
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Welcome />
          <AboutUs />
          <Releases />
          <ContactInfo />
        </CssBaseline>
      </ThemeProvider>
    </Box>
  );
}
