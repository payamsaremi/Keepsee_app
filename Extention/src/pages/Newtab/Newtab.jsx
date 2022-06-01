import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import TabManager from './components/tabManager';
import {
  BiTask,
  BiNetworkChart,
  BiWindows,
  BiNote,
  BiChevronRightSquare,
  BiChevronLeftSquare,
} from 'react-icons/bi';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import useQueryFromSupabase from './hooks/useQueryFromSupabase';
import useCreateUser from './hooks/useCreateUser';
import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
import useSetState from './hooks/useSetState';
import SpaceDetail from './components/tabManager/components/SpaceDetail';
import { DragDropContext } from 'react-beautiful-dnd';
import Spaces from './components/spaces';
import useDragDrop from './hooks/useDragDrop';
function Newtab() {
  const navItems = [
    {
      name: 'Spaces',
      icon: <BiWindows size={25} />,
      link: '/spaces',
    },
    {
      name: 'Mind',
      icon: <BiNetworkChart size={25} />,
      link: '/Mind',
    },
  ];

  const [activeButton, setActiveButton] = useState(null);
  const toggleMenu = (item) => {
    setActiveButton(item.link);
  };
  //Query data using custom hook
  const snippets = useQueryFromSupabase('snippets', '*');

  const { data, setState } = useSetState();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const { onDragEnd, onBeforeCapture, showCatcher } = useDragDrop(
    data,
    setState
  );

  return (
    <ChakraProvider>
      <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
        <Box
          display={'flex'}
          flexDir={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          boxShadow={'inner'}
          bg={'gray.100'}
          // bgGradient="linear(to-r, green.50, blue.100, pink.50)"
          bgGradient="linear(to-r, blue.50, orange.100, cyan.50)"
        >
          <Sidebar
            toggleSideMenu={toggleSideMenu}
            setToggleSideMenu={setToggleSideMenu}
            data={data}
          />

          <Box
            display={'flex'}
            flexDir={'column'}
            h={'100vh'}
            w={'100vw'}
            overflow={'hidden'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              my={'3'}
              mx={'4'}
            >
              <Box>
                <IconButton
                  bgColor={'white'}
                  color={'gray.800'}
                  _focus={{ boxShadow: 'none' }}
                  rounded={'xl'}
                  icon={
                    toggleSideMenu ? (
                      <BiChevronLeftSquare size={25} />
                    ) : (
                      <BiChevronRightSquare size={25} />
                    )
                  }
                  onClick={() => setToggleSideMenu(!toggleSideMenu)}
                />
              </Box>
              <Box>
                <Navbar
                  navItems={navItems}
                  activeButton={activeButton}
                  toggleMenu={toggleMenu}
                />
              </Box>
              <Box>
                <Button
                  rounded={'2xl'}
                  variant={'ghost'}
                  colorScheme={'orange'}
                >
                  Log In
                </Button>
              </Box>
            </Box>
            <Box mx={'2'}>
              <Routes>
                <Route
                  path="/spaceDetail"
                  element={<SpaceDetail data={data} setState={setState} />}
                />
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
                <Route
                  path="snippets"
                  element={<SnippetManager snippets={snippets.data} />}
                />
                <Route
                  path="spaces"
                  element={<Spaces data={data} setState={setState} />}
                />
              </Routes>
            </Box>
          </Box>
        </Box>
      </DragDropContext>
    </ChakraProvider>
  );
}

export default Newtab;

//? We can get a back up lets say every 15 times the user loads the app or use the app??

//TODO: make it so the Catcher apears beside the Column-1 Space not at the end
