import React from 'react';
import { IconButton, Box, Image } from '@chakra-ui/react';
function Navbar({ navItems, activeButton, toggleMenu }) {
  return (
    <>
      {' '}
      <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          rounded={'full'}
        >
          <Box>
            {navItems &&
              navItems.map((items) => (
                <IconButton
                  _focus={{ boxShadow: 'none' }}
                  onClick={() => toggleMenu(items)}
                  key={items.name}
                  m={'1'}
                  p={'2'}
                  colorScheme={'gray'}
                  bgColor={activeButton === items.name ? 'white' : ''}
                  aria-label="Call Segun"
                  variant={'link'}
                  size="md"
                  icon={items.icon}
                  isActive={activeButton === items.name}
                  rounded={'xl'}
                  shadow={activeButton === items.name ? 'sm' : ''}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Navbar;
