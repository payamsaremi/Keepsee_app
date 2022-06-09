import React from 'react';
import './Onboarding.css';
import logo from '../../assets/img/icon-128.png';
import { Box, Text, Link } from '@chakra-ui/react';
function Onboarding() {
  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'}
      w={'100vw'}
    >
      <Box
        bgGradient="radial(cyan.100, blue.50 ,white 60%)"
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'98vh'}
        h={'98vh'}
      >
        <Box mb={'8'}>
          <img src={logo} className="App-logo" alt="logo" />
        </Box>
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontWeight={'bold'} fontSize={'3xl'}>
            Welcome to Keepsee.
          </Text>
          <a href="/NewTab.html">
            {' '}
            <Box
              my={'5'}
              p={'4'}
              bgColor={'cyan.200'}
              rounded={'2xl'}
              w={'180px'}
            >
              <Text
                fontSize={'xl'}
                textAlign={'center'}
                textColor={'cyan.700'}
                fontWeight={'bold'}
              >
                Lets Start!
              </Text>
            </Box>
          </a>
        </Box>
      </Box>
    </Box>
  );
}

export default Onboarding;
