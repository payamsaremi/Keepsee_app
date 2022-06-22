import React from 'react';
import { render } from 'react-dom';

import Onboarding from './Onboarding';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from '../Newtab/hooks/Auth';
import './index.css';

render(
  <MemoryRouter initialEntries={['/greeting']}>
    <ChakraProvider>
      <AuthProvider>
        <Onboarding />
      </AuthProvider>
    </ChakraProvider>
  </MemoryRouter>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
