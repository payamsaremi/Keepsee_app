// import { extendTheme } from "@chakra-ui/react";

// // 2. Add your color mode config
// const config = {
//   initialColorMode: "light",
//   useSystemColorMode: false,
// };

// 3. extend the theme
// const theme = extendTheme({ config });

const theme = {
    styles: {
      global: (props) => ({
        'html, body': {
          fontSize: 'sm',
          color: props.colorMode === 'dark' ? 'white' : 'gray.600',
          lineHeight: 'tall',
        },
        a: {
          color: props.colorMode === 'dark' ? 'teal.300' : 'teal.500',
        },
      }),
    },
  }
  
export default theme;