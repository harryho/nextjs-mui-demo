'use client';
import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  } as TODO,
  typography: {
    fontFamily: 'var(--font-roboto)',

  },
  cssVariables: true,
});

export default theme;