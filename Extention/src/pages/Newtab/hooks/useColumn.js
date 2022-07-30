import React, { useState } from 'react';
import { getRandomColor } from '../../../../utils/color';
import { useAuth } from './Auth';
import useSpace from './useSpace';
const removeTabsFromChrome = (tabs) => {
  const tabIds = tabs?.reduce((a, x) => {
    a.push(x.id);
    return a;
  }, []);
  console.log(tabIds);
  if (tabIds) {
    chrome.tabs.remove(tabIds);
  }
};

const createColumn = (data, spaceData, title, tasks) => {
  //create a column with random id
  const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
  const newColumn = {
    id: id,
    title: title ? title : '',
    color: getRandomColor(),
    taskIds: Array()
  };
  //If there are tasks
  const newTaskIds = [];
  tasks?.forEach((el) => {
    const taskId = el.url;
    newTaskIds.push(taskId);
  });
  const newTasks = tasks?.reduce((o, x) => {
    o[x.url] = x;
    return o;
  }, {});

  const col = {
    ...newColumn,
    taskIds: newTaskIds
  };
  const newColumnOrder = [...spaceData.columnOrder];
  console.log('newColumnOrder', newColumnOrder);
  newColumnOrder.unshift(newColumn.id);

  const state = {
    ...data,
    spaces: {
      ...data.spaces,
      [spaceData.id]: {
        ...spaceData,
        columns: {
          ...spaceData.columns,
          [newColumn.id]: col
        },
        columnOrder: newColumnOrder,
        tasks: { ...spaceData.tasks, ...newTasks }
      }
    }
  };

  return state;
};

export default function useColumn() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setState, setUnmanagedTabs, unManagedTabs } = useAuth();
  const { spaceId } = useSpace();

  const spaceData = data.spaces[spaceId];

  const create = (title, tasks) => {
    const newState = createColumn(data, spaceData, title, tasks);
    console.log(newState);
    setState(newState);
    if (tasks) {
      //if column is created with tasks
      removeTabsFromChrome(tasks); //Close all tabs
      //*** recently implemented */
      const unmanagedTabsClone = Array.from(unManagedTabs);
      Object.keys(tasks).forEach((index) => {
        unmanagedTabsClone.splice(index, 1);
      });
      console.log('unmanagedTabsClone', unmanagedTabsClone);
      setUnmanagedTabs(unmanagedTabsClone);
      //*** recently implemented */
    }

    setIsOpen(!isOpen);
  };

  return { create };
}
