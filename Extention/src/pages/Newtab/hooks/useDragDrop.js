import { useState } from 'react';
import useSetState from './useSetState';

export default function useDraDrop(data, setState) {
  const [showCatcher, setShowCatcher] = useState(false);

  const createNewColumn = () => {
    const id = 'column-' + Math.floor(Math.random() * 10000); //TODO:make  this better
    const newColumn = {
      id: id,
      title: 'untitled',
      color: 'cyan',
      taskIds: Array(),
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

  return { onDragEnd, onBeforeCapture, showCatcher };
}
