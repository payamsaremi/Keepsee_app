import React from 'react';
import { Box } from '@chakra-ui/react';
function TinyBadge({ text, color = 'cyan' }) {
  return (
    <>
      <Box
        py={'1'}
        px={'2'}
        ml={'1'}
        cursor={'default'}
        ring={'0.1px'}
        ringColor={`${color}.500`}
        bg={`${color}.50`}
        color={`${color}.500`}
        maxW={'xs'}
        // w={'80px'}
        rounded={'3xl'}
      >
        {text}
      </Box>
    </>
  );
}

export default TinyBadge;
