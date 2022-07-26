import React from 'react';
import {
  Box,
  Text,
  Image,
  SimpleGrid,
  useColorModeValue,
  HStack
} from '@chakra-ui/react';
import BasicPopOver from '../tabManager/components/BasicPopOver';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import SpaceEditButton from '../tabManager/components/SpaceEditButton';
import SpaceDeleteButton from '../tabManager/components/SpaceDeleteButton';
import formattedDate from '../utils/getFormattedDate';
function SpaceCard({ columnId, data }) {
  const spaceData = data.spaces[columnId];
  const color = spaceData.color;
  console.log(spaceData);
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
          bgColor={useColorModeValue('gray.10', `${'gray'}.800`)}
          px={'2'}
          py={'1'}
          rounded={'2xl'}
          shadow={'sm'}
        >
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            bgColor={useColorModeValue(`${color}.200`, `${color}.300`)}
            w={'10'}
            h={'10'}
            rounded={'2xl'}
          >
            <Text fontSize={'2xl'}>{spaceData.emoji?.native}</Text>
          </Box>
          <Box>
            <Text
              rounded={'full'}
              fontSize={'xl'}
              fontWeight={'semibold'}
              color={useColorModeValue('gray.600', 'gray.100')}
            >
              {spaceData?.title}
            </Text>
            <Box minH={'20px'}>
              <Text color={useColorModeValue('gray.400', 'gray.600')}>
                {spaceData.dateCreated
                  ? formattedDate(spaceData.dateCreated)
                  : ''}
              </Text>
            </Box>
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

export default SpaceCard;
