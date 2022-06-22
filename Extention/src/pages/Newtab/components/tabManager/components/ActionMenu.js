import React from 'react';
import { Box, ScaleFade, IconButton, Text } from '@chakra-ui/react';
import { BiEdit, BiNote, BiCheckSquare } from 'react-icons/bi';
function ActionMenu() {
  return (
    <>
      <Box
        p={2}
        m={2}
        minH={'50px'}
        rounded={'md'}
        // bgColor={'gray.50'}

        ring={'1'}
        ringColor={'gray.300'}
        cursor={'pointer'}
        // transition={'all'}
        // transitionDuration={'0.2s'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <IconButton
          colorScheme="gray"
          aria-label="Call Segun"
          variant={'link'}
          size="sm"
          mx={'2'}
          icon={<BiEdit size={25} />}
        />
        <IconButton
          colorScheme="gray"
          aria-label="Call Segun"
          variant={'link'}
          size="sm"
          mx={'2'}
          icon={<BiNote size={25} />}
        />
        <IconButton
          colorScheme="gray"
          aria-label="Call Segun"
          variant={'link'}
          size="sm"
          mx={'2'}
          icon={<BiCheckSquare size={25} />}
        />
      </Box>
    </>
  );
}

export default ActionMenu;
