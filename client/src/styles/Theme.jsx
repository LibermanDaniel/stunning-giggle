
import { createTheme, ThemeProvider } from '@mui/material/styles';


const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#7C9473',
    },
    secondary: {
      main: '#ffc400',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
})
const DarkTheme = createTheme({
  palette: {
    type: 'Dark',
    primary: {
      main: '#7C9473',
    },
    secondary: {
      main: '#ffc400',
    },
  },
  typography: {
    fontFamily: 'Quicksand',
  },
})


