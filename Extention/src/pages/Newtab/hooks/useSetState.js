import { useState, useEffect } from 'react';
import initialData from '../components/tabManager/initial-data';

export default function useSetState() {
  const [managedTabs, setManagedTabs] = useState([]);
  const [unManagedTabs, setUnManagedTabs] = useState([]);
  const [newOpenedTab, setNewOpenedTab] = useState();
  const [closedTabId, setClosedTabId] = useState();
  const localStorageState = JSON.parse(window.localStorage.getItem('state'));
  const [data, setData] = useState(
    localStorageState ? localStorageState : initialData
  );

  useEffect(() => {
    initialise();
  }, [unManagedTabs]);

  useEffect(() => {
    const tabs = [];
    data.columnOrder.forEach((el) => {
      if (el !== 'column-1') {
        tabs.push(...data.columns[el].taskIds);
      }
    });
    setManagedTabs([...managedTabs, ...tabs]);
  }, []);

  useEffect(() => {
    fetchTabs();
  }, [newOpenedTab, closedTabId]);

  useEffect(() => {
    handleNewOpenedTab();
  }, []);

  useEffect(() => {
    handleClosedTab();
  }, []);

  const handleNewOpenedTab = () => {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      setNewOpenedTab(tab); // now it just triggeres initialise so the unmanaged tabs get the latest open tabs
    });
  };

  const handleClosedTab = () => {
    chrome.tabs.onRemoved.addListener((tabId) => {
      setClosedTabId(tabId); // it sets the tabId of the tab that user just closed
    });
  };

  // Filter and check if an OpenTab is a managedTab or not
  const filterUnManagedTabs = unManagedTabs.filter((item) => {
    if (item.url === 'chrome://newtab/') return;
    if (
      item.url ===
      'chrome-extension://lgmcmpdfjcpfaiifjophccfficimfpbd/NewTab.html#'
    )
      return;
    const managed = managedTabs.some(
      (el) => data.tasks[el]?.url === '' + item.url
    );
    if (!managed) return item;
  });

  const setState = (state) => {
    const initialState = initialData;
    window.localStorage.setItem(
      'state',
      JSON.stringify(state ? state : initialState)
    );
    setData(state ? state : initialState);
  };

  const initialise = () => {
    if (filterUnManagedTabs.includes(data.columns.ids));
    const tabIds = Array();

    const newData = filterUnManagedTabs?.reduce((a, x) => {
      a[x.id] = x;
      tabIds.push(x.id);
      return a;
    }, {});
    const state = {
      ...data,
      tasks: {
        ...data.tasks,
        ...newData,
      },
      columns: {
        ...data.columns,
        'column-1': {
          ...data.columns['column-1'],
          taskIds: [...tabIds],
        },
      },
      managedTabs,
      // columnOrder: [...data.columnOrder, 'column-1'],
    };
    setState(state);
    return;
  };

  const fetchTabs = () => {
    let tabsList = chrome.runtime.sendMessage({ message: 'tabsList' });

    // console.log('tabsList', tabsList);
    tabsList.then((res) => {
      if (res) {
        if (managedTabs) {
          const unmanagedTabs = [];
          res.forEach((item) => {
            const managed = managedTabs.some((el) => el === '' + item.id);
            if (!managed) unmanagedTabs.push(item);
          });
          // console.log('newOpenedTab', newOpenedTab);
          // console.log('unmanagedTabs', unmanagedTabs);
          setUnManagedTabs(unmanagedTabs);
        } else {
          setUnManagedTabs(res);
          //TODO:make a is loading here
        }
      }
    });
  };

  return { setState, setData, data };
}
