import React, { useEffect, useState } from 'react';
import { Box, useColorModeValue, Text } from '@chakra-ui/react';
import TabManager from './components/tabManager';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import useQueryFromSupabase from './hooks/useQueryFromSupabase';
import Sidebar from './components/sidebar';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import SpaceDetail from './components/spaces/SpaceDetail';
import { DragDropContext } from 'react-beautiful-dnd';
import useDragDrop from './hooks/useDragDrop';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/Auth';
import useDailyBackup from './hooks/useDailyBackup';
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
  //Query data using custom hook
  const snippets = useQueryFromSupabase('snippets', '*');
  const { user, profile, loading, data, setState } = useAuth();
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const { onDragEnd, onBeforeCapture, showCatcher } = useDragDrop(
    data,
    setState
  );
  // makes daily backups
  //? It checks if its a new day with every render
  //? so if its a new day it makes a backup. but Still needs testing
  useEffect(() => {
    const dailyBackup = useDailyBackup(data, setState, user);
    console.log(dailyBackup());
  }, []);

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
        <Sidebar
          toggleSideMenu={toggleSideMenu}
          setToggleSideMenu={setToggleSideMenu}
          data={data}
          setState={setState}
        />
        <Box>
          <Navbar
            toggleSideMenu={toggleSideMenu}
            setToggleSideMenu={setToggleSideMenu}
            user={user}
            // SignUp={SignUp}
            data={data}
            setState={setState}
          />
        </Box>
        <Box display={'flex'} flexDir={'column'}>
          <Box>
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
                  path="signUp"
                  element={<SignUp data={data} setState={setState} />}
                /> */}
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
  );
}

export default Newtab;
