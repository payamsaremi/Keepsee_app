import React from 'react';
import {
  useColorMode,
  Button,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { BiMoon, BiSun } from 'react-icons/bi';
import BasicIconButton from './BasicIconButton';
export default function DarkModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <BasicIconButton
        icon={useColorModeValue(<BiMoon size={'20'} />, <BiSun size={'20'} />)}
        onClick={toggleColorMode}
      />
    </>
  );
}
