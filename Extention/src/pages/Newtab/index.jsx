import React from 'react';
import { render } from 'react-dom';

import Newtab from './Newtab';
import './index.css';

chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    console.log(
      sender.tab
        ? 'from a content script:' + sender.tab.url
        : 'from the extension?????'
    );
    if (request){

        console.log(request);
    }
  });

render(<Newtab />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();
