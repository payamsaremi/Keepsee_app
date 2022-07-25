import React from 'react';
import { ColorModeScript } from '@chakra-ui/react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';
import theme from '../../theme';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from './hooks/Auth';
import { ChakraProvider } from '@chakra-ui/react';

render(
  <MemoryRouter initialEntries={['/space']}>
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Newtab />
      </ChakraProvider>
    </AuthProvider>
  </MemoryRouter>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
