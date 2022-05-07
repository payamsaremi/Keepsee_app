console.log('This is the background page.');
console.log('Put the background scripts here.');

/*global chrome*/

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

contextMenuItem = {
  id: 'keepText',
  title: 'Keep text',
  contexts: ['all'],
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'keepText' && clickData.selectionText) {
    console.log(clickData);
  }
});

contextMenuItem = {
  id: 'saveTab',
  title: 'Save Tab',
  contexts: ['all'],
};

chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener((clickData) => {
  if (clickData.menuItemId === 'saveTab' && clickData.selectionText) {
    console.log(clickData);
  }
});

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
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: data}, function(response) {
        if(response){
          console.log(response);
        }
    });
  });
}

