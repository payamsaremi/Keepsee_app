import React from 'react';
import { render } from 'react-dom';

import Onboarding from './Onboarding';
import { ChakraProvider } from '@chakra-ui/react';
import './index.css';

render(
  <ChakraProvider>
    <Onboarding />
  </ChakraProvider>,

  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
