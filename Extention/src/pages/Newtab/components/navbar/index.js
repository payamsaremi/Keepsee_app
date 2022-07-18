import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import UserProfileMenu from '../auth/UserProfileMenu';
import TopMenu from './TopMenu';
import {
  BiNetworkChart,
  BiCarousel,
  BiWindow,
  BiChevronLeft,
  BiChevronRight
} from 'react-icons/bi';
import Auth from '../auth';
import DarkModeToggle from '../utils/DarkModeToggle';
import BasicIconButton from '../utils/BasicIconButton';
function NavBar({ toggleSideMenu, setToggleSideMenu, user, data, setState }) {
  const navItems = [
    // {
    //   name: 'Spaces',
    //   icon: <BiWindows size={25} />,
    //   link: '/spaces',
    // },
    {
      name: 'tabManager',
      icon: <BiCarousel size={'20'} />,
      link: '/tabManager'
    }
    // {
    //   name: 'Mind',
    //   icon: <BiNetworkChart size={'20'} />,
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
          <Box>
            <BasicIconButton
              icon={
                toggleSideMenu ? (
                  <BiChevronLeft size={'20'} />
                ) : (
                  <BiChevronRight size={'20'} />
                )
              }
              onClick={() => setToggleSideMenu(!toggleSideMenu)}
            />
          </Box>
        </Box>
        <Box w={'330px'} display={'flex'} justifyContent={'center'}>
          <TopMenu
            navItems={navItems}
            activeButton={activeButton}
            toggleMenu={toggleMenu}
          />
        </Box>

        <Box
          w={'330px'}
          display={'flex'}
          justifyContent={'end'}
          alignItems={'center'}
        >
          <Box mr={'1'}>
            {' '}
            <DarkModeToggle />
          </Box>
          {user ? (
            <UserProfileMenu />
          ) : (
            <Auth data={data} setState={setState} type={'signUp'} />
          )}
        </Box>
      </Box>
    </>
  );
}

export default NavBar;
