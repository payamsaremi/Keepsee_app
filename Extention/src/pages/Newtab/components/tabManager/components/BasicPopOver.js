import React from 'react';
import { BiDotsVerticalRounded, BiPlus } from 'react-icons/bi';
import { Box, IconButton, useColorModeValue } from '@chakra-ui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
function BasicPopOver({ children, color = 'gray', Icon }) {
  return (
    <>
      <Popover placement={'right'}>
        <PopoverTrigger>
          <IconButton
            _focus={{ boxShadow: 'none' }}
            _hover={useColorModeValue(
              { bgColor: `${color}.300`, color: `${color}.50` },
              { bgColor: `${color}.800`, color: `${color}.50` }
            )}
            variant={'ghost'}
            size={'sm'}
            color={`${color}.400`}
            rounded={'xl'}
            icon={Icon}
          />
        </PopoverTrigger>
        <PopoverContent
          _focus={{ boxShadow: 'xl', outline: '0' }}
          outline={'none'}
          w={'full'}
          rounded={'2xl'}
          bg={useColorModeValue('white', 'gray.800')}
        >
          <PopoverArrow bg={useColorModeValue('white', 'gray.800')} />
          <PopoverBody>
            <Box
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              {children}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default BasicPopOver;
