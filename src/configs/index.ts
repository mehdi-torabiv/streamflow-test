import { createTheme, Theme } from '@mui/material';

const theme: Theme = createTheme({
  palette: {
    primary: {
      main: '#007bff',
      light: '#4a90e2',
    },
    secondary: {
      main: '#6610f2',
    },
  },
});

export default {
  theme,
};
