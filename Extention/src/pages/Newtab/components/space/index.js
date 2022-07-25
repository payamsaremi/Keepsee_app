import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Outlet, Routes, useNavigate, useParams } from 'react-router-dom';
import useDragDrop from '../../hooks/useDragDrop';
import useSpace from '../../hooks/useSpace';
import { Route } from 'react-router-dom';
import TabManager from '../tabManager';
export default function Space({ data, setState }) {
  const [spaceId, setSpaceId] = useState();
  const { navigateToSpace } = useSpace(spaceId);
  console.log(spaceId);
  const { onDragEnd, onBeforeCapture, showCatcher } = useDragDrop(spaceId);

  return (
    <>
      <Box
        w={'100vw'}
        h={'100vh'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}
        // bgGradient={`linear(to-r,blue.900 5%, gray.900 95%)`}
        rounded={'2xl'}
      >
        <Box>
          <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeCapture={onBeforeCapture}
          >
            <Routes>
              <Route
                path=":spaceId"
                element={
                  <TabManager
                    showCatcher={showCatcher}
                    data={data}
                    setState={setState}
                    setSpaceId={setSpaceId}
                  />
                }
              />
            </Routes>

            <Outlet />
          </DragDropContext>
        </Box>
      </Box>
    </>
  );
}
