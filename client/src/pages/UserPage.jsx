import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../auth/useToken';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import { ImageList, Input, p } from '@mui/material';

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
  const [usernameChange, setUsernameChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [token] = useToken();
  const navigate = useNavigate();

  const handleSaveEmailButton = () => {
    console.log('save email');
  };

  const handleEditEmailButton = () => {
    setEmailChange(!emailChange);
  };

  const EmailChange = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: `${userData.email.length}ch` }}>
        <input type='text' placeholder={userData.email} />
      </FormControl>
    );
  };

  const handleSaveUsernameButton = () => {
    console.log('save Username');
  };

  const handleEditUsernameButton = () => {
    setUsernameChange(!usernameChange);
  };

  const UsernameChange = () => {
    return (
      <FormControl sx={{ m: 3, minWidth: `${userData.username.length}ch` }}>
        <input type='text' placeholder={userData.username} />
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
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline>
          <UploadAndDisplayImage />
          <Stack direction='row' spacing={1}>
            <Typography component='h5'>USERNAME：</Typography>
            {usernameChange ? (
              <UsernameChange />
            ) : (
              <Typography component='b1'>{userData?.username}</Typography>
            )}
            <Button variant='contained'>Save</Button>
            <IconButton aria-label='edit' onClick={handleEditUsernameButton}>
              <EditIcon />
            </IconButton>
          </Stack>

          <Stack direction='row' spacing={1}>
            <Typography component='b1'>EMAIL：</Typography>

            {emailChange
              ? (() => (
                  <>
                    <EmailChange />
                    <Button variant='contained'>Save</Button>
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

          <button variant='contained' color='#primary'>
            <Link href='reset-password' variant='body2'>
              Reset Password
            </Link>
          </button>
        </CssBaseline>
      </Box>
    </ThemeProvider>
  );
};
