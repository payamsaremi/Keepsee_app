import React, { useState } from 'react';
import useSpace from '../../../hooks/useSpace';
import { Box, Text, VStack } from '@chakra-ui/react';
import BasicIconButton from '../../utils/BasicIconButton';
import { BiCog, BiMessageSquare, BiPlus } from 'react-icons/bi';
import CreateSpaceButton from './CreateSpaceButton';
import BasicToolTip from './BasicToolTip';
import { useLocation } from 'react-router-dom';
import SpacesSelectorButton from './SpacesSelectorButton';
export default function SpacesSideMenu({ data }) {
  const { navigateToSpace, create } = useSpace();
  const location = useLocation();
  const currentActiveId =
    location.pathname.split('/')[location.pathname.split('/').length - 1];
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
      <Box m={'3'} h={'100%'} rounded={'2xl'}>
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
                      <BasicToolTip label={data.spaces[spaceKey].title}>
                        <SpacesSelectorButton
                          title={data.spaces[spaceKey].title}
                          onClick={() => navigateToSpace(spaceKey)}
                          isActive={
                            currentActiveId === data.spaces[spaceKey].id
                          }
                          emoji={data.spaces[spaceKey].emoji}
                          color={data.spaces[spaceKey].color}
                        />
                      </BasicToolTip>
                    </Box>
                  ))}
                </VStack>
              </Box>

              <CreateSpaceButton create={create} data={data} />
            </VStack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
