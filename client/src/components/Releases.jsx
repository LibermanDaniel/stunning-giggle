import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

export default function Releases() {
  return (
    <Box>
<Grid  mt={4} ml={3}>
        <Container>
            <Typography variant="h2" color="white">
            RELEASES
            </Typography>
            <Typography variant="h5" component="h2" color="white">
            The exact objective in the innovation project scope was to improve an already existing implementation of the Gyrocube which was presented in 2021. The previous prototype was delivered as proof of concept; thus, many features were developed without the intent of security and reliability. The research and implementation targeted network protocols design to ensure reliability and integrity of data transfer, multi-threaded software architecture to achieve high level of automation and configurability in the environment, and secure web application development to interface the Gyrocube network.
            </Typography>
          </Container>
          </Grid>
    </Box>

  );
}