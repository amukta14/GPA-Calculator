import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b388ff', // Soft purple
    },
    secondary: {
      main: '#f06292', // Pink
    },
    background: {
      default: '#fce4ec', // Light pink background
      paper: '#fff1fa', // Card background
    },
  },
  typography: {
    fontFamily: '"Comic Neue", "Roboto", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme; 