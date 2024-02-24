import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  common: {
    greybg: '#aaaaaa',
    green: '#4bb543',
  },
  palette: {
    primary: {
      main: '#5E5ADB',
      main2: '#FF731D', // Pumpkin
      light: '#F16813', // Metallic Orange
      dark: '#FF731D', // Orange-Red
    },
    secondary: {
      main: '#1746A2', // Dark blue
      light: '#F7FBFF', // Cloud Blue
      dark: '#FFF7E9', // Cosmic Latte
    },
    common: {
      purple: '#5E5ADB',
    },
    error: {
      main: '#d0342c',
    },
    grey: {
      50: '#F6F6F6', // Shaded white
      100: '#DDDDDD', // Light gray
      200: '#AAAAAA', // Pale gray
      300: '#888888', // Tinted gray
      400: '#777777', // Medium gray
      500: '#555555', // Dark gray
      600: '#222222', // Tinted black
      700: '#000000', // Black
      800: '#000000', // Black (duplicated for consistency)
      900: '#000000', // Black (duplicated for consistency)
    },
    blue: {
      light: '#3F81E0', // Tufts Blue
      main: '#2A6CCB', // Celtic Blue
      dark: '#1A5BB9', // Denim
    },
  },
  // You can also add other theme customizations here
})

export default theme
