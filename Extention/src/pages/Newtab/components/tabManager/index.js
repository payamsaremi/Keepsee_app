import { Box, ScaleFade, Fade } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import Column from './components/Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { cuteScrollbar } from '../../../../../utils/cuteScrollbar';
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
            display={'flex'}
            flexDir={'row'}
            sx={cuteScrollbar}
            maxW={'100vw'}
            // alignItems={'center'}
            justifyContent={'start'}
            overflow={'auto'}
            // mt={'4'}
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
