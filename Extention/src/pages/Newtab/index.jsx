import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { MemoryRouter } from 'react-router';
import { AuthProvider } from './hooks/Auth';
import { ChakraProvider } from '@chakra-ui/react';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? 'from a content script:' + sender.tab.url
      : 'from the extension?????'
  );
  if (request) {
    console.log(request);
  }
});

render(
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={['/tabManager']}>
      <AuthProvider>
        <ChakraProvider>
          <Newtab />
        </ChakraProvider>
      </AuthProvider>
    </MemoryRouter>
  </QueryClientProvider>,
  window.document.querySelector('#app-container')
);

if (module.hot) module.hot.accept();
