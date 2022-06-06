import React from 'react';
import { Box, Divider, IconButton, Text } from '@chakra-ui/react';
import { useAuth } from '../../hooks/Auth';

import { FiChevronRight } from 'react-icons/fi';
function BottonMenu() {
  const { user, profile, signOut } = useAuth();
  return (
    <>
      {user ? (
        <>
          <Box
            cursor={'pointer'}
            px={'5'}
            py={'4'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text color={'gray.600'} fontSize={'md'}>
              Send feedback
            </Text>
            <IconButton
              variant={'unstyled'}
              color={'gray.600'}
              icon={<FiChevronRight size={'18'} />}
            />
          </Box>
          <Divider />
        </>
      ) : (
        <Box></Box>
      )}
    </>
  );
}
export default BottonMenu;
