import React, { useEffect } from 'react';
import {
  Box,
  Tooltip,
  Divider,
  Fade,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';
import { Link } from 'react-router-dom';
const Sidebar = ({ toggleSideMenu, setToggleSideMenu, data }) => {
  //TODO: when creating new spaces or changing their names it doesnt reflect  the changes inside sidebar.

  return (
    <>
      <Box
        bgColor={'white'}
        rounded={'xl'}
        h={'98vh'}
        w={'500px'}
        transition={'all'}
        transitionDuration={'1.5s'}
        display={toggleSideMenu ? 'block' : 'none'}
        // display={'block'}
      >
        <Box m={'5'}>
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            👋 Hello, Payam!
          </Text>
        </Box>
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
                      fontSize={'sm'}
                    >
                      {data.columns['column-1'].taskIds.length}
                    </Text>
                  </Box>
                </Box>
              </Link>
            </Tooltip>
          </Box>

          <Divider />

          <Box>
            <Box
              p={'5'}
              display={'flex'}
              flexDir={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
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

            <Box px={'5'} display={'flex'} flexDir={'column'}>
              {Object.keys(data.columns).map((column_key) => {
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
                    <Text fontSize={'lg'}>
                      {data.columns[column_key].title}
                    </Text>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
