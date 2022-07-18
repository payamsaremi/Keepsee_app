import { useEffect, useState } from 'react';
import { useAuth } from './Auth';

export default function useDraDrop() {
  const {
    data,
    setState,
    unManagedTabs,
    managedTabs,
    setManagedTabs,
    setUnmanagedTabs
  } = useAuth();
  const [showCatcher, setShowCatcher] = useState(false);

  const removeTabFromChrome = (tab) => {
    console.log(`Remove ${tab} from chrome tabs`);
    chrome.runtime.sendMessage(
      { tabId: tab.id, message: 'removeTab' },
      function (res) {
        console.log(res.message);
      }
    );
  };

  const createNewColumn = () => {
    const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
    const newColumn = {
      id: id,
      title: '',
      color: 'cyan',
      taskIds: Array()
    };
    return newColumn;
  };

  const onDragEnd = (result) => {
    setShowCatcher(false);
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const state = {
        ...data,
        columnOrder: newColumnOrder
      };
      setState(state);
      return;
    }

    let start = data.columns[source.droppableId];
    let finish = data.columns[destination.droppableId];

    if (
      destination.droppableId === 'catcher' &&
      source.droppableId === 'unManagedColumn'
    ) {
      const newColumn = createNewColumn();
      finish = newColumn;
      const unManagedtabsClone = Array.from(unManagedTabs);
      const managedTabsClone = Array.from(managedTabs);

      unManagedtabsClone.forEach((el, index) => {
        const TabId = el.url;
        if (TabId === draggableId) {
          unManagedtabsClone.splice(index, 1); //remove from array
          managedTabsClone.push(TabId); //add to array
          setManagedTabs(managedTabsClone);
          setUnmanagedTabs(unManagedtabsClone);
          removeTabFromChrome(el);

          const newFinish = {
            ...finish,
            taskIds: [TabId]
          };

          const state = {
            ...data,
            columnOrder: [...data.columnOrder, finish.id],
            columns: {
              ...data.columns,
              [newFinish.id]: newFinish
            },
            tasks: {
              ...data.tasks,
              [TabId]: el
            }
          };
          setState(state);
        }
      });
      return;
    }

    if (destination.droppableId === 'catcher') {
      const newColumn = createNewColumn();
      finish = newColumn;

      const startTaskIds = Array.from(start.taskIds);

      startTaskIds.forEach((el, index) => {
        const TabId = el;
        if (TabId === draggableId) {
          startTaskIds.splice(index, 1); //remove from array

          const newStart = {
            ...start,
            taskIds: startTaskIds
          };
          const newFinish = {
            ...finish,
            taskIds: [TabId]
          };
          const state = {
            ...data,
            columnOrder: [...data.columnOrder, finish.id],
            columns: {
              ...data.columns,
              [newStart.id]: newStart,
              [newFinish.id]: newFinish
            },
            tasks: {
              ...data.tasks,
              [TabId]: data.tasks[el]
            }
          };
          setState(state);
        }
      });
      return;
    }

    if (source.droppableId === 'unManagedColumn') {
      const unManagedtabsClone = Array.from(unManagedTabs);
      const managedTabsClone = Array.from(managedTabs);

      unManagedtabsClone.forEach((el, index) => {
        const TabId = el.url;
        if (TabId === draggableId) {
          unManagedtabsClone.splice(index, 1); //remove from array
          managedTabsClone.push(TabId); //add to array
          setManagedTabs(managedTabsClone);
          setUnmanagedTabs(unManagedtabsClone);
          const finishTaskIds = Array.from(data.columns[finish.id].taskIds);

          const newFinish = {
            ...finish,
            taskIds: [...finishTaskIds, TabId]
          };
          const state = {
            ...data,
            columns: {
              ...data.columns,
              [newFinish.id]: newFinish
            },
            tasks: {
              ...data.tasks,
              [TabId]: el
            }
          };
          setState(state);
          removeTabFromChrome(el);
        }
      });
      return;
    }

    // If user is sorting the tasks inside same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const state = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      };
      setState(state);
      return;
    }

    // Moving form one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    };
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    setState(state);
    return;
  };

  const onBeforeCapture = (result) => {
    if (!result.draggableId.includes('column')) {
      setShowCatcher(true);
    }
    return;
  };

  return { onDragEnd, onBeforeCapture, showCatcher };
}
