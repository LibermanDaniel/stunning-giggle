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


export default function ContactInfo() {
  return (
          <Box>
          <Container>
          <Typography variant="h2" color="white">
          CONTACT US
          </Typography>
          <IconButton color="secondary" aria-label="add an alarm" 
          onClick={() => {
                alert('clicked');
           }}>
          <AlarmIcon />
          </IconButton>
          <a href="https://www.youtube.com/watch?v=jAX8xeMLdVY&t=28s" target="_blank" rel="noreferrer">
          <IconButton color="secondary" aria-label="youtube">
          <YouTuBeIcon />
          </IconButton>
          </a>
          <IconButton color="secondary" aria-label="email to us">
          <EmailIcon />
          </IconButton>

          <Typography variant="h5" component="h2" color="white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Id volutpat lacus laoreet non curabitur gravida arcu. Feugiat nisl pretium fusce id velit ut tortor. Egestas congue quisque egestas diam in. Venenatis lectus magna fringilla urna porttitor rhoncus dolor.
          </Typography>
          </Container>
          </Box>
  );
}