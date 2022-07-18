import React, { useEffect, useRef, useState } from 'react';
import { Box, Divider, useColorModeValue, VStack } from '@chakra-ui/react';
import TabManager from './components/tabManager';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import useQueryFromSupabase from './hooks/useQueryFromSupabase';
import Sidebar from './components/sidebar';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import useDragDrop from './hooks/useDragDrop';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/Auth';
import useDailyBackup from './hooks/useDailyBackup';
import Loading from '../../compponents/Loading';
import initialData from './components/tabManager/initial-data';
import { supabase } from '../../supabaseClient';
import useSetState from './hooks/useSetState';
import BasicIconButton from './components/utils/BasicIconButton';
import { BiCog, BiMessageSquare, BiPlus } from 'react-icons/bi';
function Newtab() {
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const { user, data, setState, unManagedTabs, managedTabs } = useAuth();
  // makes daily backups
  //? It checks if its a new day with every render
  //? so if its a new day it makes a backup. but Still needs testing
  useEffect(() => {
    const dailyBackup = useDailyBackup(data, setState, user);
    console.log(dailyBackup());
  }, []);

  const { onDragEnd, onBeforeCapture, showCatcher } = useDragDrop(
    data,
    setState,
    unManagedTabs,
    managedTabs
  );

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      <Box
        display={'flex'}
        flexDir={'row'}
        boxShadow={'inner'}
        bg={useColorModeValue('gray.50', 'gray.900')}
        overflow={'hidden'}
        // bgGradient={useColorModeValue(
        //   'linear(to-r, green.50, blue.100, cyan.50)',
        //   'linear(to-t, gray.800, gray.900, gray.800)'
        // )}
      >
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'space-between'}
          h={'100vh'}
        >
          <Box h={'50px'} mr={'16'} bgColor={'orange.400'}>
            <Navbar
              toggleSideMenu={toggleSideMenu}
              setToggleSideMenu={setToggleSideMenu}
              user={user}
              // SignUp={SignUp}
              data={data}
              setState={setState}
            />
          </Box>
          {/* <Box
            h={'100%'}
            display={'flex'}
            flexDir={'column'}
            justifyContent={'space-between'}
            alignItems={'center'}
            py={'2'}
            mb={'1'}
          >
            <Box p={'1'} m={'3'} h={'100%'} rounded={'2xl'}>
              <Box
                display={'flex'}
                flexDir={'column'}
                justifyContent="space-between"
                h={'100%'}
              >
                <Box>
                  <VStack spacing={1.5}>
                    <Box>
                      <VStack spacing={1.5}>
                        <BasicIconButton
                          onClick={() => console.log('clicky')}
                          notification={10}
                          icon={<BiMessageSquare size={'18'} />}
                        />
                      </VStack>
                    </Box>
                    <BasicIconButton
                      onClick={() => console.log('clicky')}
                      icon={<BiPlus size={'18'} />}
                    />
                  </VStack>
                </Box>
              </Box>
            </Box>
          </Box> */}
          {/* <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            mb={'4'}
          >
            <BasicIconButton
              onClick={() => console.log('clicky')}
              icon={<BiCog size="18" />}
            />
          </Box> */}
        </Box>
        <Box>
          <Sidebar
            toggleSideMenu={toggleSideMenu}
            setToggleSideMenu={setToggleSideMenu}
            data={data}
            setState={setState}
          />
        </Box>
        <Box display={'flex'} flexDir={'column'}>
          <Box>
            <Routes>
              {/* <Route element={<AnimationLayout />}> */}
              <Route>
                <Route
                  path="/tabManager"
                  element={
                    <TabManager
                      showCatcher={showCatcher}
                      data={data}
                      setState={setState}
                    />
                  }
                />
              </Route>
            </Routes>
          </Box>
        </Box>
      </Box>
    </DragDropContext>
  );
}

export default Newtab;
