import React, { useState } from 'react';
import { Menu, useColorModeValue, Box, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';
import SignIn from '../auth/SignIn';
import SignOut from '../auth/SignOut';
import MenuPopOver from '../tabManager/components/MenuPopOver';
function TopMenu({ setToggleSideMenu, data, setState }) {
  const { user, profile, signOut, signIn } = useAuth();
  const [isOpen, setIsOpen] = useState();
  return (
    <>
      <Box>
        <Box
          px={'5'}
          py={'4'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <Text
            color={useColorModeValue('gray.700', 'gray.100')}
            fontSize={'xl'}
            fontWeight={'medium'}
          >
            Space name
          </Text>
        </Box>

        <MenuPopOver isOpen={isOpen} setIsOpen={setIsOpen}>
          {user ? (
            <SignOut
              setToggleSideMenu={setToggleSideMenu}
              data={data}
              setState={setState}
            />
          ) : (
            <Text fontSize={'md'} color={'red.600'}>
              <SignIn
                setToggleSideMenu={setToggleSideMenu}
                data={data}
                setState={setState}
              />
            </Text>
          )}
        </MenuPopOver>
      </Box>
    </>
  );
}
export default TopMenu;
