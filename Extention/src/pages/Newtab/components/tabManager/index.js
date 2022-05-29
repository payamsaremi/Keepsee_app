import { Box, ScaleFade, Fade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import initialData from './initial-data';
import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cuteScrollbar } from '../../../../../utils/cuteScrollbar';
import DropCatcher from './components/DropCatcher';
function TabManager() {
  const [allTabs, setAllTabs] = useState([]);
  const managedTabs = JSON.parse(window.localStorage.getItem('managedTabs'));
  const localStorageState = JSON.parse(window.localStorage.getItem('state'));
  const [showCatcher, setShowCatcher] = useState(false);
  const [data, setData] = useState(
    localStorageState ? localStorageState : initialData
  );
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
    return;
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
        columnOrder: newColumnOrder,
      };
      setState(state);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const state = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(state);
      return;
    }

    //Creating a new column with task drop and adding that task to the column
    if (type === 'tasks' && destination.droppableId === 'catcher') {
      // destination.droppableId //catcher
      const newColumn = createNewColumn();
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };
      const newColumnTaskIds = Array.from(newColumn.taskIds);
      newColumnTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...newColumn,
        taskIds: newColumnTaskIds,
      };

      const state = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
        columnOrder: [...data.columnOrder, newFinish.id],
      };
      setState(state);
      return;
    }

    // Moving form one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const state = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
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

  const createNewColumn = () => {
    const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
    const newColumn = {
      id: id,
      title: 'untitled',
      taskIds: Array(),
    };
    return newColumn;
  };

  const removeColumn = (id) => {
    const newColumnOrder = Array.from(data.columnOrder);
    const columnIndex = newColumnOrder.indexOf(id);
    newColumnOrder.splice(columnIndex, 1);
    //removing from columns object
    const newColumns = { ...data.columns };
    delete newColumns[id];

    const state = {
      ...data,
      columns: newColumns,
      columnOrder: newColumnOrder,
    };
    setState(state);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <>
            <Box minW={'100vw'}></Box>

            <Box
              display={'flex'}
              flexDir={'row'}
              sx={cuteScrollbar}
              maxW={'100vw'}
              maxH={'100vh'}
              h={'100vh'}
              alignItems={'center'}
              overflow={'auto'}
              {...provided.droppableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              {data.columnOrder.map((columnId, index) => {
                const column = data.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => data.tasks[taskId]
                );
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    removeColumn={removeColumn}
                    setState={setState}
                    data={data}
                  />
                );
              })}
              {provided.placeholder}
              <ScaleFade initialScale={0.9} in={showCatcher}>
                {showCatcher ? (
                  <DropCatcher />
                ) : (
                  <Box w={'md'} p={4} m={2}></Box>
                )}
              </ScaleFade>
            </Box>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TabManager;

//TODO: make it So User can delete an empty column.
