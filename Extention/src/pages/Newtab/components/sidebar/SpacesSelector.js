import React, { useState } from 'react';
import { Box, IconButton, Text, useColorModeValue } from '@chakra-ui/react';

import CreateColumnButton from './CreateColumnButton';
function SpacesSelector({ setState, data, setToggleSideMenu }) {
  const [toggleSpaces, setToggleSpaces] = useState(true);
  return (
    <>
      <Box>
        <Box
          p={'5'}
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          cursor={'pointer'}
          // onClick={() => setToggleSpaces(!toggleSpaces)}
        >
          <Text
            px={'2'}
            rounded={'md'}
            textColor={useColorModeValue('gray.400', 'gray.300')}
            fontSize={'lg'}
          >
            Spaces
          </Text>
          {/* <IconButton
                  size={'xs'}
                  variant={'link'}
                  icon={<BiPlus size={20} />}
                /> */}
        </Box>

        <Box
          display={toggleSpaces ? 'flex' : 'none'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            display={'flex'}
            alignItems={'center'}
            cursor={'pointer'}
            justifyContent={'space-between'}
            _hover={useColorModeValue(
              { bg: `${'gray'}.50` },
              { bg: `${'gray'}.900` }
            )}
            // bgColor={useColorModeValue('gray.50', 'gray.800')}
            w={'full'}
            rounded={'lg'}
            mx={'3'}
            px={'4'}
            py={'2'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Box
                p={'1'}
                bgColor={`${'blue'}.200`}
                rounded={'full'}
                maxW={1}
                maxH={1}
                mr={'3'}
              ></Box>
              <Text
                fontSize={'md'}
                fontWeight={'normal'}
                textColor={useColorModeValue('gray.700', 'gray.100')}
              >
                My tabs
              </Text>
            </Box>
            <Box onClick={() => setToggleSideMenu(false)}>
              <CreateColumnButton setState={setState} data={data} />
            </Box>
          </Box>
        </Box>

        {/* <Box display={toggleSpaces ? 'block' : 'none'}>
                <Box m={'3'} px={'5'} display={'flex'} flexDir={'column'}>
                  {data.columnOrder.map((column_key) => {
                    if (column_key === 'column-1') {
                      return;
                    }
                    return (
                      <Box
                        key={column_key}
                        display={'flex'}
                        alignItems={'center'}
                        cursor={'pointer'}
                        _active={{ bg: `${data.columns[column_key].color}.50` }}
                        rounded={'lg'}
                      >
                        <Box
                          bgColor={`${data.columns[column_key].color}.200`}
                          rounded={'full'}
                          p={'1'}
                          maxW={1}
                          maxH={1}
                          mr={'2'}
                          mx={'4'}
                          my={'4'}
                        ></Box>
                        <Text fontSize={'md'} textColor={'gray.600'}>
                          {data.columns[column_key].title}
                        </Text>
                      </Box>
                    );
                  })}
                </Box>
              </Box> */}
      </Box>
    </>
  );
}

export default SpacesSelector;
