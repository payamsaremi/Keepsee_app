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
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/Auth';
import SignIn from '../auth/SignIn';
import BottonMenu from './BottonMenu';
import TopMenu from './TopMenu';
const Sidebar = ({ toggleSideMenu, setToggleSideMenu, data, setState }) => {
  const { user, profile } = useAuth();
  const [toggleSpaces, setToggleSpaces] = useState(false);

  return (
    <>
      <Box
        bgColor={'white'}
        rounded={'xl'}
        h={'99vh'}
        w={'500px'}
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
            <Box>
              <Box
                p={'5'}
                display={'flex'}
                flexDir={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                onClick={() => setToggleSpaces(!toggleSpaces)}
                cursor={'pointer'}
              >
                <Text
                  px={'2'}
                  rounded={'md'}
                  textColor={'gray.400'}
                  fontSize={'lg'}
                >
                  Spaces
                </Text>
                <IconButton size={'xs'} icon={<BiPlus size={20} />} />
              </Box>
              <Box display={toggleSpaces ? 'block' : 'none'}>
                <Box px={'5'} display={'flex'} flexDir={'column'}>
                  {/* {data.columnOrder.map((column_key) => {
                    if (column_key === 'column-1') {
                      return;
                    }
                    return (
                      <Box
                        key={column_key}
                        display={'flex'}
                        alignItems={'center'}
                        cursor={'pointer'}
                        _hover={{ bg: `${data.columns[column_key].color}.50` }}
                        p={'2'}
                        rounded={'lg'}
                      >
                        <Box
                          p={'1'}
                          bgColor={`${data.columns[column_key].color}.200`}
                          rounded={'full'}
                          maxW={1}
                          maxH={1}
                          mr={'2'}
                        ></Box>
                        <Text fontSize={'md'} textColor={'gray.700'}>
                          {data.columns[column_key].title}
                        </Text>
                      </Box>
                    );
                  })} */}
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    cursor={'pointer'}
                    _hover={{ bg: `${'blue'}.50` }}
                    p={'2'}
                    rounded={'lg'}
                  >
                    <Box
                      p={'1'}
                      bgColor={`${'blue'}.200`}
                      rounded={'full'}
                      maxW={1}
                      maxH={1}
                      mr={'2'}
                    ></Box>
                    <Text
                      fontSize={'md'}
                      fontWeight={'semibold'}
                      textColor={'gray.700'}
                    >
                      {'My tabs'}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
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
