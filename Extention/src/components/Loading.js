import React from 'react';
import { Box, Spinner, useColorModeValue } from '@chakra-ui/react';
function Loading() {
  return (
    <>
      <Box
        display={'flex'}
        position={'fixed'}
        left={'50vw'}
        right={'50vw'}
        top={'50vh'}
        bottom={'50vh'}
        justifyContent={'center'}
        alignItems={'center'}
        maxH={'100vh'}
        maxW={'100vw'}
      >
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          bgColor={useColorModeValue('gray.50', 'gray.900')}
          p={'8'}
          rounded={'2xl'}
          shadow={'sm'}
        >
          <Spinner size="xl" color={useColorModeValue('gray.400', 'gray.50')} />
        </Box>
      </Box>
    </>
  );
}
export default Loading;
