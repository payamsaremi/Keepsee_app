import {
  Button,
  Text,
  Box,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
} from '@chakra-ui/react';
import SignUp from './SignUp';
import React, { useState } from 'react';

function Authenticate({ data, setState }) {
  return (
    <>
      <Box
        h={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        bgGradient="linear(to-r, cyan.50, cyan.100, blue.50)"
      >
        <SignUp />
      </Box>
    </>
  );
}

export default Authenticate;
