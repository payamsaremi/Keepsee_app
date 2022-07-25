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
import SpacesSelector from './SpacesSelector';
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
              onClick={() => setToggleSideMenu(false)}
              p={'2'}
              display={'flex'}
              flexDir={'column'}
            >
              <Tooltip
                rounded={'3xl'}
                p={'4'}
                hasArrow
                arrowSize={15}
                label={`You have ${currentTabsToManage} open tabs, You can manage them from here.`}
                placement="top"
              >
                <Link to={'/tabManager'}>
                  <Box
                    display={'flex'}
                    flexDir={'row'}
                    cursor={'pointer'}
                    _hover={{ bg: 'gray.900' }}
                    alignItems={'center'}
                    rounded={'lg'}
                    justifyContent={'space-between'}
                  >
                    <Box display={'flex'} flexDir={'column'}>
                      <Text
                        fontWeight={'medium'}
                        p={'2'}
                        rounded={'md'}
                        textColor={'gray.600'}
                        fontSize={'lg'}
                      >
                        {'Unmanaged tabs'} {/* Unmanaged Tabs */}
                      </Text>
                    </Box>
                    <Box
                      bg={currentTabsToManage > 0 ? 'orange.400' : 'gray.900'}
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
                        {currentTabsToManage}
                      </Text>
                    </Box>
                  </Box>
                </Link>
              </Tooltip>
            </Box>

            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'space-between'}
              h={'83vh'}
            >
              {/* <SpacesSelector
                setState={setState}
                data={data}
                setToggleSideMenu={setToggleSideMenu}
              /> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
