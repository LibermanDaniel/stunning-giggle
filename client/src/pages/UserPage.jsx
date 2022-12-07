import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { ImageList, Input, p } from '@mui/material';

import { ForgotPasswordLanding } from './ForgotPasswordLanding'


const theme = createTheme({
  palette: {
    primary: {
      main: '#CFDBC7',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#7C9473',
      contrastText: '#FFFFFF',
    },
  },
});

export const UploadAndDisplayImage = ({ ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const removeAvatar = () => {
    setSelectedImage(null);
    setImageUrl(null);
  };

  const handleChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <>
      <Stack direction='row' spacing={1}>
        <Avatar alt='not fount' src={imageUrl} />
        <button onClick={removeAvatar}>Remove</button>
        <input
          type='file'
          id='myImage'
          accept='image/*'
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <label htmlFor='myImage'>
          <IconButton aria-label='edit' color='primary' component='span'>
            <EditIcon />
          </IconButton>
        </label>
      </Stack>
    </>
  );
};

export const UserPage = () => {
  const [userData, setUserData] = useState({});
  const [cubes, setCubes] = useState([]);
  const [emailChange, setEmailChange] = useState(false);
  const [emailSave, setEmailSave] = useState(false);
  const [token] = useToken();
  const navigate = useNavigate();

  const handleSaveEmailButton = () => {
    setEmailSave(!emailSave);
    console.log("save email")
  };

  const handleEditEmailButton = () => {
    setEmailChange(!emailChange);
  };

  const resetEmailButton = () => {
    <ForgotPasswordLanding/>
    console.log("reset")
  };


  const EmailChange = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: `${userData.email.length}ch` }}>
        <input type='text' placeholder={userData.email} />
      </FormControl>
    );
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/get-user-details', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(data.user);
      setCubes(data.cubes);
    })();
  }, [token]);

  return (
    <ThemeProvider theme={theme}>
      {console.log(userData)}{' '}
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

        }}
      >
        <CssBaseline>
          <UploadAndDisplayImage />
          <Box

        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
      

          <Stack direction='row' spacing={1} mt={2}>
            <Typography component='h5'>USERNAME：</Typography>
            <Typography component='b1'>{userData?.username}</Typography>
          </Stack>

          <Stack direction='row' spacing={1} mt={1}>
            <Typography component='b1'>EMAIL：</Typography>

            {emailChange
              ? (() => (
                  <>
                    <EmailChange />
                    <Button variant='contained' 
                    size="small"
                     onClick={handleSaveEmailButton}
                    >Save</Button>

                  </>
                ))()
              : (() => (
                  <>
                    <Typography component='h5'>{userData?.email}</Typography>
                    <IconButton
                      aria-label='edit'
                      onClick={handleEditEmailButton}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                ))()}
          </Stack>
</Box>
          <Button variant='contained' color='#primary' onClick={resetEmailButton}>
              Reset Password
          </Button>
        </CssBaseline>
      </Box>
    </ThemeProvider>
  );
};
