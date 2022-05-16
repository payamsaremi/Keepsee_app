console.log('This is the background page.');
console.log('Put the background scripts here.');

/*global chrome*/
contextMenuItem = {
  id: 'openModal',
  title: 'Open modal',
  contexts: ['all'],
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'openModal' && clickData.selectionText) {
    openModal(clickData);
  }
});

function openModal(data) {
  console.log('modal is open');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { data: data }, function (response) {
      if (response) {
        console.log(response);
      }
    });
  });
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === 'tabsList') {
    chrome.tabs.query(
      {
        active: false,
        currentWindow: false,
      },
      function (tabs) {
        processMessage(req).then(sendResponse(tabs));
      }
    );
    return true; // keep the messaging channel open for sendResponse
  }
});

async function processMessage(req) {
  console.log('Processing message', req);
}
