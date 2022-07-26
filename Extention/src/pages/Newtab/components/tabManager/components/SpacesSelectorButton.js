import React from 'react';
import { IconButton, useColorModeValue, Box, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';

function SpacesSelectorButton({
  onClick,
  notification,
  isActive,
  title,
  color = 'gray',
  emoji
}) {
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        border={isActive ? '2px' : ''}
        borderColor={`${color}.500`}
        shadow={isActive ? 'lg' : 'none'}
        bgColor={
          isActive
            ? useColorModeValue(`${color}.100`, `${color}.300`)
            : useColorModeValue(`white`, `${'gray'}.800`)
        }
        rounded={'2xl'}
        onClick={onClick}
        cursor={'pointer'}
        w={'10'}
        h={'10'}
      >
        <Text fontSize={'xl'}>{emoji?.native}</Text>
      </Box>
    </>
  );
}

export default SpacesSelectorButton;
