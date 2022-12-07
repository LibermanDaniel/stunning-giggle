import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import YouTuBeIcon from '@mui/icons-material/YouTube';
import AlarmIcon from '@mui/icons-material/Alarm';
import EmailIcon from '@mui/icons-material/Email';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';


export default function ContactInfo() {
  return (
          <Box>
             <Grid  mt={8} ml={4} mb={8}>
            <Container>
            <Typography variant="h2" color="white">
            CONTACT US
            </Typography>
            <a href="https://www.youtube.com/watch?v=jAX8xeMLdVY&t=28s" target="_blank" rel="noreferrer">
            <IconButton  aria-label="youtube">
            <YouTuBeIcon />
            </IconButton>
            </a>

            </Container>
            </Grid>
            <Container maxWidth="sm" >
          <Typography color="#FFFFFF" variant="body1">
          &copy; GRYOCUBE TEAM {new Date().getFullYear()} 
          </Typography>
        </Container>
          </Box>
  );
}