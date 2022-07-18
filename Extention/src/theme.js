// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react';

// 2. Add your color mode config
const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};
const customColors = {
  colors: {
    // gray: {
    //   10: '#f8fafc',
    //   50: '#F2F2F2',
    //   100: '#DCDCDB',
    //   200: '#C5C5C3',
    //   300: '#AFAFAC',
    //   400: '#989895',
    //   500: '#82827D',
    //   600: '#686864',
    //   700: '#4E4E4B',
    //   800: '#343432',
    //   900: '#1A1A19',
    // },
    gray: {
      10: '#f8fafc',
      // 50: '#f8fafc',
      50: '#F2F2F3',
      100: '#D9DADD',
      200: '#C1C3C8',
      300: '#A9ABB2',
      400: '#90939D',
      500: '#787C87',
      600: '#60636C',
      700: '#484A51',
      800: '#282C2F',
      900: '#202124',
    },
  },
};
// 3. extend the theme
const theme = extendTheme({
  config,
  ...customColors,
});

export default theme;
