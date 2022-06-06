import React from 'react';
import SpaceCard from './SpaceCard';
import { Box, IconButton, SimpleGrid, Text } from '@chakra-ui/react';
import { BiPlus } from 'react-icons/bi';

function Spaces({ data, setState }) {
  return (
    <Box display={'flex'} flexDir={'column'} justifyContent={'center'}>
      <Box
        display={'flex'}
        maxH={'80vh'}
        h={'80vh'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box maxH={'100vh'} overflow={'auto'}>
          <SimpleGrid columns={[1, null, 3]}>
            {data.columnOrder.map((columnId) => {
              if (columnId === 'column-1') {
                return;
              }
              return (
                <Box key={columnId}>
                  <SpaceCard columnId={columnId} data={data} />
                </Box>
              );
            })}
            <Box
              display={'flex'}
              flexDir={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              rounded={'2xl'}
              p={'4'}
              m={'2'}
              bg={'white'}
              maxH={'sm'}
              maxW={'sm'}
              w={'xs'}
              h={'150px'}
              ring={'3px'}
              boxShadow={'inner'}
              cursor={'pointer'}
              opacity={'0.3'}
              ringColor={`gray.500`}
            >
              <IconButton
                variant={'unstyled'}
                icon={<BiPlus size={25} />}
                _focus={{ boxShadow: 'none' }}
              />
              <Text fontSize={'lg'}>Add new things</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

export default Spaces;
