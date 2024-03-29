import React, { useState, useRef } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { Box, IconButton, Text, useColorModeValue } from '@chakra-ui/react';
import FocusLock from 'react-focus-lock';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/react';
function MenuPopOver({
  children,
  color = 'gray',
  title,
  isOpen,
  setIsOpen,
  placement = 'bottom',
}) {
  return (
    <>
      <Popover
        isOpen={isOpen}
        placement={placement}
        closeOnBlur={false}
        onClose={() => setIsOpen(false)}
      >
        <PopoverTrigger>
          <Text
            textColor={useColorModeValue(`${color}.500`, `${color}.300`)}
            fontWeight={'semibold'}
            fontSize={'lg'}
            textAlign={'center'}
            p={1}
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
          </Text>
        </PopoverTrigger>
        <PopoverContent
          // _focus={{ boxShadow: 'xl', outline: '0' }}
          outline={'none'}
          boxShadow="xl"
          w={'full'}
          rounded={'2xl'}
          bg={useColorModeValue('white', `gray.700`)}
        >
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow bg={useColorModeValue('white', `gray.700`)} />
            <PopoverBody>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                {children}
              </Box>
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default MenuPopOver;
