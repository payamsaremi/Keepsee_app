import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import TabManager from './components/tabManager';
import Navbar from './components/navbar';
import SnippetManager from './components/snippetManager';
import useQueryFromSupabase from './hooks/useQueryFromSupabase';
import Sidebar from './components/sidebar';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import useSetState from './hooks/useSetState';
import SpaceDetail from './components/spaces/SpaceDetail';
import { DragDropContext } from 'react-beautiful-dnd';
import useDragDrop from './hooks/useDragDrop';
import { motion } from 'framer-motion';
import SignUp from './components/auth/SignUp';
import { useAuth } from './hooks/Auth';
import Spaces from './components/spaces';
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
  const { user, profile, loading } = useAuth();
  //Query data using custom hook
  const snippets = useQueryFromSupabase('snippets', '*');
  const { data, setState } = useSetState();
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
        bg={'gray.100'}
        overflow={'hidden'}
        // bgGradient="linear(to-r, green.50, blue.100, cyan.50)"
        // bgGradient="linear(to-r, orange.50, orange.100, orange.50)"
        // bgGradient="linear(to-r, gray.800, gray.900, gray.800)"
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
            SignUp={SignUp}
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

//? We can get a back up lets say every 15 times the user loads the app or use the app??

//TODO: make it so the Catcher apears beside the Column-1 Space not at the end
