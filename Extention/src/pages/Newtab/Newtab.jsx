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
  BiCarousel,
} from 'react-icons/bi';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import useQueryFromSupabase from './hooks/useQueryFromSupabase';
import Sidebar from './components/sidebar';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import useSetState from './hooks/useSetState';
import SpaceDetail from './components/spaces/SpaceDetail';
import { DragDropContext } from 'react-beautiful-dnd';
import Spaces from './components/spaces';
import useDragDrop from './hooks/useDragDrop';

import { motion } from 'framer-motion';
import SignUp from './components/auth/SignUp';
import useDailyBackup from './hooks/useDailyBackup';
import { useAuth } from './hooks/Auth';
import UserProfileMenu from './components/auth/UserProfileMenu';
import { cuteScrollbar } from '../../../utils/cuteScrollbar';
import SignOut from './components/auth/SignOut';
const PageLayout = ({ children }) => children;

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'linear',
  duration: 0.03,
  delay: 0.2,
};

const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};

function Newtab() {
  const { user, profile, loading } = useAuth();

  const navItems = [
    // {
    //   name: 'Spaces',
    //   icon: <BiWindows size={25} />,
    //   link: '/spaces',
    // },
    {
      name: 'tabManager',
      icon: <BiCarousel size={25} />,
      link: '/tabManager',
    },
    // {
    //   name: 'Mind',
    //   icon: <BiNetworkChart size={25} />,
    //   link: '/Mind',
    // },
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

  // makes daily backups
  // const dailyBackup = useDailyBackup(data, setState);

  return (
    <ChakraProvider>
      <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
        <Box
          display={'flex'}
          flexDir={'row'}
          boxShadow={'inner'}
          bg={'gray.100'}
          h={'100vh'}
          // overflow={'hidden'}
          // bgGradient="linear(to-r, green.50, blue.100, cyan.50)"
          // bgGradient="linear(to-r, orange.100, yellow.50, orange.100)"
          // bgGradient="linear(to-r, gray.800, gray.900, gray.800)"
        >
          <Sidebar
            toggleSideMenu={toggleSideMenu}
            setToggleSideMenu={setToggleSideMenu}
            data={data}
            setState={setState}
          />
          <Box
            display={'flex'}
            flexDir={'column'}
            h={'100vh'}
            w={'100vw'}
            overflow={'auto'}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              my={'3'}
              mx={'4'}
            >
              <Box w={'330px'}>
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
              <Box w={'330px'} display={'flex'} justifyContent={'center'}>
                <Navbar
                  navItems={navItems}
                  activeButton={activeButton}
                  toggleMenu={toggleMenu}
                />
              </Box>

              <Box w={'330px'} display={'flex'} justifyContent={'end'}>
                {user ? (
                  <UserProfileMenu />
                ) : (
                  <SignUp data={data} setState={setState} />
                )}
              </Box>
            </Box>
            <Box overflow={'auto'} h={'100vh'} sx={cuteScrollbar}>
              <Routes>
                <Route element={<AnimationLayout />}>
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
                  {/* <Route
                    path="spaces"
                    element={<Spaces data={data} setState={setState} />}
                  /> */}
                </Route>
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
