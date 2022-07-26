import { Box, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Outlet, Routes, useNavigate, useParams } from 'react-router-dom';
import useDragDrop from '../../hooks/useDragDrop';
import useSpace from '../../hooks/useSpace';
import { Route } from 'react-router-dom';
import TabManager from '../tabManager';
import Spaces from './spaces';
import SpaceCard from './SpaceCard';
import AnimationLayout from '../AnimationLayout';
export default function Space({ data, setState }) {
  const [spaceId, setSpaceId] = useState();
  const { navigateToSpace } = useSpace(spaceId);
  const { onDragEnd, onBeforeCapture, showCatcher } = useDragDrop(spaceId);

  return (
    <>
      <Box
        w={'100vw'}
        h={'100vh'}
        display={'flex'}
        justifyContent={'start'}
        alignItems={'center'}
        rounded={'2xl'}
      >
        <Box>
          {/* <Text fontSize={'xxx-large'}>Hello, Payam.</Text>
          <Box maxH={'100vh'} overflow={'auto'}>
            {Object.keys(data.spaces).map((spaceId) => {
              return (
                <Box key={spaceId}>
                  <SpaceCard columnId={spaceId} data={data} />
                </Box>
              );
            })}
          </Box> */}
        </Box>
        <Box>
          <DragDropContext
            onDragEnd={onDragEnd}
            onBeforeCapture={onBeforeCapture}
          >
            <Routes>
              <Route element={<AnimationLayout />}>
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
              </Route>
            </Routes>

            <Outlet />
          </DragDropContext>
        </Box>
      </Box>
    </>
  );
}
