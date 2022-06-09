import React, { useEffect, useState } from 'react';
import {
  Box,
  Tooltip,
  Divider,
  Fade,
  IconButton,
  Text,
  Slide,
} from '@chakra-ui/react';
import SignOut from '../auth/SignOut';

import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import SignIn from '../auth/SignIn';
import BottonMenu from './BottonMenu';
import TopMenu from './TopMenu';
import SpacesSelector from './SpacesSelector';
const Sidebar = ({ toggleSideMenu, setToggleSideMenu, data, setState }) => {
  const { user, profile } = useAuth();

  return (
    <>
      <Box
        bgColor={'white'}
        rounded={'xl'}
        h={'99vh'}
        minW={'sm'}
        transition={'all'}
        transitionDuration={'1.5s'}
        display={toggleSideMenu ? 'block' : 'none'}
        // display={'block'}
      >
        <TopMenu
          setToggleSideMenu={setToggleSideMenu}
          data={data}
          setState={setState}
        />
        <Divider />

        <Box>
          <Box
            onClick={() => setToggleSideMenu(false)}
            p={'5'}
            display={'flex'}
            flexDir={'column'}
          >
            <Tooltip
              rounded={'3xl'}
              p={'4'}
              hasArrow
              arrowSize={15}
              label={`You have ${data.columns['column-1'].taskIds.length} open tabs, You can manage them from here.`}
              placement="top"
            >
              <Link to={'/tabManager'}>
                <Box
                  display={'flex'}
                  flexDir={'row'}
                  cursor={'pointer'}
                  _hover={{ bg: 'gray.50' }}
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
                      {data.columns['column-1'].title} {/* Unmanaged Tabs */}
                    </Text>
                  </Box>
                  <Box
                    bg={'orange.400'}
                    rounded={'full'}
                    w={'2'}
                    h={'2'}
                    p={'3'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Text
                      textColor={'white'}
                      fontWeight={'bold'}
                      fontSize={'xs'}
                    >
                      {data.columns['column-1'].taskIds.length}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Tooltip>
          </Box>

          <Divider />

          <Box
            display={'flex'}
            flexDir={'column'}
            justifyContent={'space-between'}
            h={'83vh'}
          >
            <SpacesSelector
              setState={setState}
              data={data}
              setToggleSideMenu={setToggleSideMenu}
            />
            {/* botton Menu */}
            <Box>
              <Divider />
              <BottonMenu />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
