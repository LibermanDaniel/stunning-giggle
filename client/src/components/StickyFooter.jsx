import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


export default function StickyFooter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '10vh',
        backgroundColor:"#7C9473"
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">

      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: "#CFDBC7"
                }}
      >
        <Container maxWidth="sm">
          <Typography color="#7C9473" variant="body1">
          &copy; GRYOCUBE TEAM {new Date().getFullYear()} 
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}