import { Box, HStack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import formattedDate from '../../utils/getFormattedDate';
import BasicPopOver from './BasicPopOver';
import SpaceDeleteButton from './SpaceDeleteButton';
import SpaceEditButton from '../components/SpaceEditButton';

function SpaceTopSection({ spaceData }) {
  return (
    <>
      <Box
        display={'flex'}
        flexDir={'row'}
        alignItems={'center'}
        justifyContent={'start'}
        mx={'60px'}
        my={'4'}
        minH={'50px'}
      >
        <HStack
          spacing={'3'}
          _hover={{ shadow: '1px' }}
          cursor={'pointer'}
          bgColor={useColorModeValue('gray.10', 'gray.900')}
          px={'2'}
          py={'1'}
          rounded={'2xl'}
        >
          <Box bgColor={'blue.800'} w={'10'} h={'10'} rounded={'3xl'}></Box>
          <Box>
            <Text
              rounded={'full'}
              fontSize={'xl'}
              fontWeight={'semibold'}
              color={useColorModeValue('gray.600', 'gray.100')}
            >
              {spaceData?.title}
            </Text>
            <Text color={useColorModeValue('gray.400', 'gray.600')}>
              {spaceData.dateCreated
                ? formattedDate(spaceData.dateCreated)
                : ''}
            </Text>
          </Box>
          <Box>
            <Box>
              {/* <BasicPopOver task={task} removeTab={removeTab} /> */}
              <BasicPopOver Icon={<BiDotsVerticalRounded size={'20'} />}>
                <HStack>
                  <SpaceEditButton spaceData={spaceData} />
                  <SpaceDeleteButton spaceData={spaceData} />
                </HStack>
              </BasicPopOver>
            </Box>
          </Box>
        </HStack>
      </Box>
    </>
  );
}

export default SpaceTopSection;
