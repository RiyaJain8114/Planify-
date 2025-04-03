import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode } from 'react';

// Define a subtle professional color palette with earth tones
const theme = createTheme({
  palette: {
    primary: {
      main: '#546E7A', // Subtle blue-gray
      light: '#78909C',
      dark: '#455A64',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#90A4AE', // Lighter blue-gray
      light: '#B0BEC5',
      dark: '#78909C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F7F9', // Very light gray
      paper: '#FFFFFF',
    },
    text: {
      primary: '#37474F', // Dark gray
      secondary: '#546E7A', // Medium gray
    },
    success: {
      main: '#66796A', // Muted green
      light: '#7B8D7D',
      dark: '#4D5D4F',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#9A7374', // Muted red
      light: '#AB8788',
      dark: '#806162',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#8B7355', // Muted brown
      light: '#9C8668',
      dark: '#756147',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#607D8B', // Light blue-gray
      light: '#78909C',
      dark: '#546E7A',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
      color: '#37474F',
    },
    h2: {
      fontWeight: 500,
      color: '#37474F',
    },
    h3: {
      fontWeight: 500,
      color: '#37474F',
    },
    h4: {
      fontWeight: 500,
      color: '#37474F',
    },
    h5: {
      fontWeight: 500,
      color: '#37474F',
    },
    h6: {
      fontWeight: 500,
      color: '#37474F',
    },
    subtitle1: {
      color: '#546E7A',
    },
    subtitle2: {
      color: '#546E7A',
    },
    body1: {
      color: '#37474F',
    },
    body2: {
      color: '#546E7A',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 400,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
});

interface ThemeRegistryProps {
  children: ReactNode;
}

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 