import kipLogo from '../assets/img/icon-128.png';
import React from 'react';
import { Image, Box } from '@chakra-ui/react';

function Logo() {
  return (
    <>
      {/* <Image src={kipLogo} boxSize="200px" objectFit="contain" /> */}
      <img src={kipLogo} className="App-logo" alt="logo" />
    </>
  );
}

export default Logo;
