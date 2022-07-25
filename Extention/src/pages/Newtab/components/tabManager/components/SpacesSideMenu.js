import React, { useState } from 'react';
import useSpace from '../../../hooks/useSpace';
import { Box, Text, VStack } from '@chakra-ui/react';
import BasicIconButton from '../../utils/BasicIconButton';
import { BiCog, BiMessageSquare, BiPlus } from 'react-icons/bi';
import BasicModal from '../../modal/BasicModal';
import CreateSpaceButton from './CreateSpaceButton';
export default function SpacesSideMenu({ data }) {
  const { navigateToSpace, create } = useSpace();

  return (
    <Box
      h={'100%'}
      display={'flex'}
      flexDir={'column'}
      justifyContent={'space-between'}
      alignItems={'center'}
      py={'2'}
      mb={'1'}
    >
      <Box p={'1'} m={'3'} h={'100%'} rounded={'2xl'}>
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent="space-between"
          h={'100%'}
        >
          <Box>
            <VStack spacing={1.5}>
              <Box>
                <VStack spacing={1.5}>
                  {Object.keys(data.spaces).map((spaceKey) => (
                    <Box key={spaceKey}>
                      <BasicIconButton
                        onClick={() => navigateToSpace(spaceKey)}
                        notification={''}
                        icon={<BiMessageSquare size={'18'} />}
                        title={data.spaces[spaceKey].title}
                      />
                    </Box>
                  ))}
                </VStack>
              </Box>

              <CreateSpaceButton create={create} />
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
