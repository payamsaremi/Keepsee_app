import { Box, ScaleFade, Fade, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Column from './components/Column';
import { Droppable } from 'react-beautiful-dnd';
import DropCatcher from './components/DropCatcher';
import { cuteScrollbar } from '../../../../../utils/cuteScrollbar';
import UnmanagedTabsColumn from './components/UnmanagedTabsColumn';
import CreateTabsColumn from './components/CreateTabsColumn';
import { useAuth } from '../../hooks/Auth';
import { useParams } from 'react-router-dom';
import useSpace from '../../hooks/useSpace';
import formattedDate from '../utils/getFormattedDate';
import SpaceTopSection from './components/SpaceTopSection';
function TabManager({ showCatcher, setSpaceId }) {
  const { unManagedTabs, managedTabs, data, setState } = useAuth();
  const { spaceId } = useParams();
  useEffect(() => {
    setSpaceId(spaceId);
  }, [spaceId]);
  const spaceData = data.spaces[spaceId];
  const removeColumn = (id) => {
    const newColumnOrder = Array.from(spaceData.columnOrder);
    const columnIndex = newColumnOrder.indexOf(id);
    newColumnOrder.splice(columnIndex, 1);
    //removing from columns object
    const newColumns = { ...spaceData.columns };
    delete newColumns[id];
    const state = {
      ...data,
      spaces: {
        ...data.spaces,
        [spaceData.id]: {
          ...spaceData,
          columns: newColumns,
          columnOrder: newColumnOrder
        }
      }
    };
    console.log('newstate', state);
    setState(state);
  };

  if (!spaceData) {
    return <>Loading...</>;
  }

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided, snapshot) => (
        <Box
          pt={'16'}
          mb={'12'}
          w={'100vw'}
          h={'100vh'}
          {...provided.droppableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          overflow={'auto'}
          sx={cuteScrollbar}
        >
          <Box display={'flex'} flexDir={'row'} justifyContent={'start'}>
            <UnmanagedTabsColumn
              data={data}
              setState={setState}
              unManagedTabs={unManagedTabs}
              spaceData={spaceData}
            />
            <Box display={'flex'} flexDir={'column'}>
              <SpaceTopSection spaceData={spaceData} />
              <Box display={'flex'} flexDir={'row'}>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  my={'12'}
                  ml={'5'}
                >
                  <CreateTabsColumn spaceData={spaceData} />
                </Box>

                {spaceData.columnOrder.map((columnId, index) => {
                  const column = spaceData.columns[columnId];
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      index={index}
                      removeColumn={removeColumn}
                      setState={setState}
                      data={data}
                      spaceData={spaceData}
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
            </Box>
          </Box>
        </Box>
      )}
    </Droppable>
  );
}

export default TabManager;
