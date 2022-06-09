import React, { useEffect, useState } from 'react';
import { IconButton, Box, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserProfileMenu from '../auth/UserProfileMenu';
import TopMenu from './TopMenu';
import {
  BiChevronRightSquare,
  BiChevronLeftSquare,
  BiCarousel,
} from 'react-icons/bi';
function NavBar({
  toggleSideMenu,
  setToggleSideMenu,
  user,
  SignUp,
  data,
  setState,
}) {
  const navItems = [
    // {
    //   name: 'Spaces',
    //   icon: <BiWindows size={25} />,
    //   link: '/spaces',
    // },
    {
      name: 'tabManager',
      icon: <BiCarousel size={25} />,
      link: '/tabManager',
    },
    // {
    //   name: 'Mind',
    //   icon: <BiNetworkChart size={25} />,
    //   link: '/Mind',
    // },
  ];
  const [activeButton, setActiveButton] = useState(null);
  const toggleMenu = (item) => {
    setActiveButton(item.link);
  };
  return (
    <>
      <Box
        display={'flex'}
        position={'fixed'}
        w={'full'}
        justifyContent={'space-between'}
        alignItems={'center'}
        py={'2'}
        px={'4'}
      >
        <Box w={'330px'}>
          <IconButton
            bgColor={'white'}
            color={'gray.800'}
            _focus={{ boxShadow: 'none' }}
            rounded={'xl'}
            icon={
              toggleSideMenu ? (
                <BiChevronLeftSquare size={25} />
              ) : (
                <BiChevronRightSquare size={25} />
              )
            }
            onClick={() => setToggleSideMenu(!toggleSideMenu)}
          />
        </Box>
        <Box w={'330px'} display={'flex'} justifyContent={'center'}>
          <TopMenu
            navItems={navItems}
            activeButton={activeButton}
            toggleMenu={toggleMenu}
          />
        </Box>

        <Box w={'330px'} display={'flex'} justifyContent={'end'}>
          {user ? (
            <UserProfileMenu />
          ) : (
            <SignUp data={data} setState={setState} />
          )}
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
