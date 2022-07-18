import { useState, useEffect, useRef } from 'react';
import initialData from '../components/tabManager/initial-data';

export default function useSetState() {
  const [unManagedTabs, setUnmanagedTabs] = useState([]);
  const [managedTabs, setManagedTabs] = useState([]);
  const localStorageState = JSON.parse(window.localStorage.getItem('state'));
  const [data, setData] = useState(
    localStorageState ? localStorageState : initialData
  );

  const setState = (state) => {
    const initialState = initialData;
    window.localStorage.setItem(
      'state',
      JSON.stringify(state ? state : initialState)
    );
    setData(state ? state : initialState);
  };

  //**** managedTabs *****/
  useEffect(() => {
    window.localStorage.setItem('managedTabs', JSON.stringify(managedTabs));
  }, [managedTabs]);

  useEffect(() => {
    const tabs = [];
    data.columnOrder.forEach((el) => {
      tabs.push(...data.columns[el].taskIds);
    });
    setManagedTabs(tabs);
  }, [data]);
  //**** managedTabs *****/

  const prevManagedTabs = useRef();
  useEffect(() => {
    prevManagedTabs.current = managedTabs;
  }, [managedTabs]);

  const handlerRef = useRef();

  const tabHandler = (tabId, changeInfo, tab) => {
    if (tab.status === 'complete') {
      handleTabs();
    }
  };
  useEffect(() => {
    if (handlerRef.current) {
      chrome.tabs.onUpdated.removeListener(handlerRef.current);
    }
    chrome.tabs.onUpdated.addListener(tabHandler);
  }, [managedTabs]);
  useEffect(() => {
    handlerRef.current = tabHandler;
  });

  //**handle user's un-managed tabs
  useEffect(() => {
    const unManagedTabs = JSON.parse(
      window.localStorage.getItem('unManagedTabs')
    );
    setUnmanagedTabs(unManagedTabs);
  }, []);
  useEffect(() => {
    window.localStorage.setItem('unManagedTabs', JSON.stringify(unManagedTabs));
  }, [unManagedTabs]);

  // Handle closing a tab and removing it from un-managed tabs
  useEffect(() => {
    console.log('running  chrome.tabs.onRemoved');
    chrome.tabs.onRemoved.addListener((tabId) => {
      handleTabs();
    });
  }, []);

  const handleTabs = () => {
    const unManagedTabsClone = [];
    chrome.runtime.sendMessage({ message: 'tabsList' }).then((res) => {
      if (res) {
        res.forEach((item) => {
          const tab = tabFilter(item);
          if (typeof tab === 'undefined') return;
          unManagedTabsClone.filter((el, index) => {
            if (el.url === tab.url) {
              console.log('removed url to avoid duplicates', el.url);
              unManagedTabsClone.splice(index, 1); //remove duplicates
            }
          });
          unManagedTabsClone.push(tab); //used to be  item here but i changed to tab
        });
      }

      setUnmanagedTabs(unManagedTabsClone);
    });
  };

  const tabFilter = (tab) => {
    const tabUrl = tab.url === '' ? tab.pendingUrl : tab.url; //if there is no url maybe its a pendingUrl //also it removes any tags as # after the url

    // const tabUrl =
    // tab.url === '' ? tab.pendingUrl.split('#')[0] : tab.url.split('#')[0];

    const blackList = [
      'chrome-extension://lgmcmpdfjcpfaiifjophccfficimfpbd/Onboarding.html',
      'chrome://newtab/',
      'chrome-extension://lgmcmpdfjcpfaiifjophccfficimfpbd/NewTab.html#',
      'chrome-extension://lgmcmpdfjcpfaiifjophccfficimfpbd/NewTab.html'
    ];
    const isBlackListed = blackList.includes(tabUrl);
    const managed = prevManagedTabs.current.some((el) => el === '' + tabUrl);
    if (!managed && !isBlackListed) {
      return tab;
    }
  };

  return {
    setState,
    setData,
    data,
    unManagedTabs,
    managedTabs,
    setManagedTabs,
    setUnmanagedTabs
  };
}
