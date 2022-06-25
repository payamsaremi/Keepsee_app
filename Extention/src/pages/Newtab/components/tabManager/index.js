import { Box, ScaleFade, Fade, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Column from './components/Column';
import { Droppable } from 'react-beautiful-dnd';
import DropCatcher from './components/DropCatcher';
import { cuteScrollbar } from '../../../../../utils/cuteScrollbar';
import UnmanagedTabsColumn from './components/UnmanagedTabsColumn';
import CreateTabsColumn from './components/CreateTabsColumn';
function TabManager({ showCatcher, data, setState }) {
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
        <Box>
          <Box minW={'100vw'}></Box>

          <Box
            px={'8'}
            display={'flex'}
            flexDir={'row'}
            overflow={'auto'}
            h={'100vh'}
            w={'100vw'}
            pt={'16'}
            sx={cuteScrollbar}
            justifyContent={'start'}
            {...provided.droppableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <UnmanagedTabsColumn />
            <Box display={'flex'} justifyContent={'center'} my={'12'} ml={'5'}>
              <CreateTabsColumn setState={setState} data={data} />
            </Box>
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
              if (column.id === 'column-1') {
                return;
              }
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
        </Box>
      )}
    </Droppable>
  );
}

export default TabManager;
