import React, { useEffect, useState } from 'react';
import { IconButton, Box, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function TopMenu({ navItems, activeButton, toggleMenu }) {
  const [currentpath, setCurrentPath] = useState('');
  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
    setCurrentPath(location.pathname);
  }, [location]);
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
              navItems.map((item) => (
                <Link key={item.name} to={item.link}>
                  <IconButton
                    _focus={{ boxShadow: 'none' }}
                    onClick={() => toggleMenu(item)}
                    size={'sm'}
                    m={'1'}
                    p={'2'}
                    // colorScheme={'gray'}
                    color={useColorModeValue('gray.300', 'gray.700')}
                    bgColor={useColorModeValue(
                      currentpath === item.link ? 'white' : '',
                      currentpath === item.link ? 'gray.800' : ''
                    )}
                    aria-label="Call Segun"
                    variant={'link'}
                    icon={item.icon}
                    isActive={currentpath === item.link}
                    rounded={'xl'}
                    shadow={currentpath === item.link ? 'sm' : ''}
                  />
                </Link>
              ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TopMenu;
