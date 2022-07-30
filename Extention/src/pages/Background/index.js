console.log('This is the background page.');
console.log('Put the background scripts here.');

// Onboarding Page
chrome.runtime.onInstalled.addListener((reason) => {
  if (reason.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // chrome.windows.create({ url: 'Onboarding.html' }, (window) => {
    //   console.log(window);
    // });
    chrome.tabs.create({
      url: 'Onboarding.html'
      // windowId: window.id,
      // pinned: true,
    });
  }
});

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === 'tabsList') {
    chrome.windows.getAll({ populate: true }, (windows) => {
      const tabs = [];
      windows.forEach((window) => {
        window.tabs.forEach((tab) => {
          tabs.push(tab);
        });
      });
      processMessage(req).then(sendResponse(tabs));
    });
    return true; // keep the messaging channel open for sendResponse
  }
});

async function processMessage(req) {
  console.log('Processing message', req);
}

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.message === 'openTab') {
    chrome.tabs.create(
      {
        url: req.url
      },
      (t) => {
        console.log(t);
      }
    );
    return true;
  }
});

//? Toggle Workspace (Open tabs, Close Tabs within a column or group)
chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'openWorkspace') {
    console.log(req.tabs);
    req.tabs.forEach((tab) => {
      console.log(tab.url);
      chrome.tabs.create({ url: tab.url });
    });
    return true;
  }
});
chrome.runtime.onMessage.addListener((req) => {
  if (req.message === 'closeWorkspace') {
    req.tabIds.forEach((id) => {
      chrome.tabs.remove(id);
      console.log(id);
    });
    return true;
  }
});

//Remove a tab from Chrome Tabs
chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  console.log(req);
  if (req.message === 'removeTab') {
    console.log('passed the if statement', req.tabId);
    chrome.tabs.remove(Number(req.tabId));
  }
  sendResponse({
    message: `Tab with id:${tabId} was removed from current open tabs`
  });
  return true;
});
