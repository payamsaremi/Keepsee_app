import { useState, useEffect } from 'react';
import initialData from '../components/tabManager/initial-data';

//TODO: Please clean this code up.

export default function useSetState() {
  const localStorageState = JSON.parse(window.localStorage.getItem('state'));
  const [data, setData] = useState(
    localStorageState ? localStorageState : initialData
  );
  const [allTabs, setAllTabs] = useState([]);

  const managedTabs = JSON.parse(window.localStorage.getItem('managedTabs'));
  const setState = (state) => {
    window.localStorage.setItem('state', JSON.stringify(state));
    setData(state);
    const managedTabs = [];
    data.columnOrder.forEach((el) => {
      if (el !== 'column-1') {
        managedTabs.push(...data.columns[el].taskIds);
      }
    });
    window.localStorage.setItem('managedTabs', JSON.stringify(managedTabs));
  };

  const initialise = () => {
    if (allTabs.includes(data.columns.ids)) console.log('data', data);
    const tabIds = Array();
    const newData = allTabs.reduce((a, x) => {
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
      // columnOrder: [...data.columnOrder, 'column-1'],
    };

    setState(state);
    console.log(state);
    return;
  };

  useEffect(() => {
    const fetchTabs = () => {
      let data = chrome.runtime.sendMessage({ message: 'tabsList' });
      data.then((res) => {
        if (res) {
          if (managedTabs) {
            const unmanagedTabs = [];
            res.forEach((item) => {
              const managed = managedTabs.some((el) => el === '' + item.id);
              if (!managed) unmanagedTabs.push(item);
            });
            setAllTabs(unmanagedTabs);
            console.log('unmanagedTabs', unmanagedTabs);
          } else {
            setAllTabs(res);
            console.log('all tabs loaded');
          }
        }
      });
    };
    fetchTabs();
  }, []);

  useEffect(() => {
    initialise();
  }, [allTabs]);

  return { setState, setData, data };
}
