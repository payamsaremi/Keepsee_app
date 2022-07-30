import React, { useState } from 'react';
import { useAuth } from './Auth';

export default function useTab(spaceData) {
  const { data, setState, setUnmanagedTabs, unManagedTabs } = useAuth();
  const close = (tab) => {
    console.log('gonna remove this', tab);
    chrome.tabs.remove(Number(tab.id));
  };

  const open = (tab) => {
    chrome.tabs.query({ url: tab.url }, (activeTab) => {
      if (!activeTab[0]) {
        chrome.tabs.create({ url: tab.url, active: false }, (t) => {
          const updatedTask = {
            ...tab,
            id: t.id
          };
          console.log('updatedTask', updatedTask);
          //update the tab id
          const state = {
            ...data,
            spaces: {
              ...data.spaces,
              [spaceData.id]: {
                ...spaceData,
                tasks: {
                  ...spaceData.tasks,
                  [updatedTask.url]: updatedTask
                }
              }
            }
          };
          console.log(state);
          setState(state);
        });
      }
      if (activeTab[0]) {
        //if the tab is open make it active
        chrome.tabs.update(tab.id, {
          active: true
        });
      }
      return;
    });
  };

  const remove = (tab) => {
    //Remove the tab from its column taskIds
    const colIds = Array.from(spaceData.columnOrder);
    const columns = spaceData.columns;
    colIds.forEach((colId) => {
      const taskIds = columns[colId].taskIds;
      taskIds.forEach((taskId) => {
        if (taskId === tab.url) {
          const index = columns[colId].taskIds.indexOf(taskId);
          columns[colId].taskIds.splice(index, 1);
          // also remove it from tasks
          const tasks = spaceData.tasks;
          delete tasks[tab.url];
          //update the state
          const state = {
            ...data,
            spaces: {
              ...data.spaces,
              [spaceData.id]: {
                ...spaceData,
                columns,
                tasks: tasks
              }
            }
          };
          setState(state);
          return;
        }
      });
    });
  };

  return { close, open, remove };
}
