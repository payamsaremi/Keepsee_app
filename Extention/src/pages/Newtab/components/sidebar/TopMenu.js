import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';
import SignIn from '../auth/SignIn';
import SignOut from '../auth/SignOut';
function TopMenu({ setToggleSideMenu, data, setState }) {
  const { user, profile, signOut, signIn } = useAuth();
  return (
    <>
      <Box>
        <Menu>
          <MenuButton>
            <Box
              px={'5'}
              py={'4'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text color={'gray.700'} fontSize={'xl'} fontWeight={'medium'}>
                👋 Hello, {profile?.full_name ?? 'There'}
              </Text>
            </Box>
          </MenuButton>
          <MenuList rounded={'2xl'}>
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
          </MenuList>
        </Menu>
      </Box>
    </>
  );
}
export default TopMenu;
