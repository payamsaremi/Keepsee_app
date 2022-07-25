import React, { useEffect, useState } from 'react';
import { Box, Button, useColorModeValue, VStack } from '@chakra-ui/react';
import Navbar from './components/navbar';
import Sidebar from './components/sidebar';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from './hooks/Auth';
import useDailyBackup from './hooks/useDailyBackup';
import Space from './components/space';
import SideMenu from './components/sideMenu';
function Newtab() {
  const [toggleSideMenu, setToggleSideMenu] = useState(false);
  const { user, data, setState } = useAuth();

  // makes daily backups
  //? It checks if its a new day with every render
  //? so if its a new day it makes a backup. but Still needs testing
  useEffect(() => {
    const dailyBackup = useDailyBackup(data, setState, user);
    console.log(dailyBackup());
  }, []);

  return (
    <Box
      display={'flex'}
      flexDir={'row'}
      bg={useColorModeValue('gray.50', 'blackAlpha.600')}
      overflow={'hidden'}
      h={'100vh'}
    >
      <Box display={'flex'} flexDir={'column'} justifyContent={'space-between'}>
        <Box h={'50px'} mr={'16'} bgColor={'orange.400'}>
          <Navbar
            toggleSideMenu={toggleSideMenu}
            setToggleSideMenu={setToggleSideMenu}
            user={user}
            data={data}
            setState={setState}
          />
        </Box>
        <SideMenu data={data} setState={setState} />
      </Box>

      <Box>
        <Sidebar
          toggleSideMenu={toggleSideMenu}
          setToggleSideMenu={setToggleSideMenu}
          data={data}
          setState={setState}
        />
      </Box>

      <Box display={'flex'} flexDir={'column'} h={'100%'}>
        <Box>
          <Routes>
            {/* <Route element={<AnimationLayout />}> */}
            <Route
              path="/space/*"
              element={<Space data={data} setState={setState} />}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default Newtab;
