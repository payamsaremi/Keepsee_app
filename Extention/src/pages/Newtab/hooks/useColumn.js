import React, { useState } from 'react';
import { getRandomColor } from '../../../../utils/color';
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

const createColumn = (data, title, tasks) => {
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
  const newColumnOrder = [...data.columnOrder];
  newColumnOrder.unshift(newColumn.id);
  const state = {
    ...data,
    columns: {
      ...data.columns,
      [newColumn.id]: col
    },
    columnOrder: newColumnOrder,
    tasks: { ...data.tasks, ...newTasks }
  };
  return state;
};

export default function useColumn(setState, data) {
  const [isOpen, setIsOpen] = useState(false);

  const create = (title, tasks) => {
    const newState = createColumn(data, title, tasks);
    console.log(newState);
    setState(newState);
    removeTabsFromChrome(tasks); //Close all tabs
    setIsOpen(!isOpen);
  };

  return { create };
}
