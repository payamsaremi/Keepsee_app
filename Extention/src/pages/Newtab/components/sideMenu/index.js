import React from 'react';
import SpacesSideMenu from '../tabManager/components/SpacesSideMenu';
import { Box } from '@chakra-ui/react';
import SettingsMenuButton from './SettingsMenuButton';
export default function SideMenu({ data, setState }) {
  return (
    <>
      <SpacesSideMenu data={data} />
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mb={'4'}
      >
        <SettingsMenuButton data={data} setState={setState} />
      </Box>
    </>
  );
}
