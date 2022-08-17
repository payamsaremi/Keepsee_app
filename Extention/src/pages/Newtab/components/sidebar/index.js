import React, { useEffect, useState } from 'react';
import {
  Box,
  Tooltip,
  Divider,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import SignOut from '../auth/SignOut';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import TopMenu from './TopMenu';
const Sidebar = ({ toggleSideMenu, setToggleSideMenu, data, setState }) => {
  const { unManagedTabs } = useAuth();
  const currentTabsToManage = unManagedTabs?.length;
  return (
    <>
      <Box
        alignItems={'center'}
        flexDir={'row'}
        h={'100vh'}
        display={toggleSideMenu ? 'flex' : 'none'}
      >
        <Box
          bgColor={useColorModeValue('white', 'gray.800')}
          rounded={'2xl'}
          w={'xs'}
          h={'97%'}
        >
          <TopMenu
            setToggleSideMenu={setToggleSideMenu}
            data={data}
            setState={setState}
          />

          <Box>
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'space-between'}
              h={'83vh'}
            >
              {/* '''' */}
              <Box
                display={'flex'}
                flexDir={'row'}
                cursor={'pointer'}
                _hover={{ bg: 'gray.900' }}
                alignItems={'center'}
                rounded={'lg'}
                justifyContent={'space-between'}
                mx={'3'}
              >
                <Box display={'flex'} flexDir={'column'}>
                  <Text
                    fontWeight={'medium'}
                    p={'2'}
                    rounded={'md'}
                    textColor={'gray.500'}
                    fontSize={'lg'}
                  >
                    Boards
                  </Text>
                </Box>
                <Box
                  bg={'gray.900'}
                  rounded={'lg'}
                  w={'2'}
                  h={'2'}
                  p={'3'}
                  mx={'5'}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <Text
                    fontWeight={'bold'}
                    fontSize={'xs'}
                    textColor={'gray.50'}
                  >
                    {'0'}
                  </Text>
                </Box>
              </Box>
              {/* '''' */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
