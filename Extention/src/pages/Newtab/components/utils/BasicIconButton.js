import React from 'react';
import { IconButton, useColorModeValue } from '@chakra-ui/react';
function BasicIconButton({ icon, onClick }) {
  return (
    <>
      <IconButton
        bgColor={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.700', 'gray.300')}
        _focus={{ boxShadow: 'none' }}
        size={'sm'}
        rounded={'xl'}
        icon={icon}
        onClick={onClick}
      />
    </>
  );
}

export default BasicIconButton;
