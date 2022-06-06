import { Box, ScaleFade, Fade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import DropCatcher from './components/DropCatcher';
import useSetState from '../../hooks/useSetState';
function TabManager({ showCatcher, data, setState }) {
  // const { setState } = useSetState();

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
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided, snapshot) => (
        <>
          <Box minW={'100vw'}></Box>

          <Box
            px={'8'}
            display={'flex'}
            flexDir={'row'}
            maxW={'100vw'}
            maxH={'100vh'}
            justifyContent={'start'}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
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
              {showCatcher ? <DropCatcher /> : <Box w={'md'} p={4} m={2}></Box>}
            </ScaleFade>
          </Box>
        </>
      )}
    </Droppable>
  );
}

export default TabManager;

//TODO: On each render check if the Date is same Return then if it is Bigger than previus value Make a back Up.
//TODO: For example today is 2 jun if I reload and its 3 jun I should make a backup.
