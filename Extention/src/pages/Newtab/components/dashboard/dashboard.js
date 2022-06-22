import React, { useEffect, useState } from 'react';
import {
  Link,
  Box,
  Circle,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FiSettings, FiUsers } from 'react-icons/fi';

import { BiLineChart, BiHome, BiMenuAltLeft, BiWorld } from 'react-icons/bi';
const LinkItems = [
  {
    name: 'Notes',
    icon: FiUsers,
    link: '/dashboard/audience',
  },
  { name: 'Nuggets', icon: BiWorld, link: '/dashboard/events' },
  {
    name: 'Tasks',
    icon: BiLineChart,
    link: '/dashboard/insights',
  },
  {
    name: 'Settings',
    icon: FiSettings,
    link: '/dashboard//settings',
  },
];
export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [component, setComponent] = useState('');

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent
        onClose={() => onClose}
        setComponent={(value) => setComponent(value)}
        display={{ base: 'none', md: 'flex' }}
        overflow={'hidden'}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent
            onClose={onClose}
            onClick={onClose}
            setComponent={(value) => setComponent(value)}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        display={{ base: 'flex', md: 'none' }}
        onOpen={onOpen}
        setComponent={(value) => setComponent(value)}
      />
      <Box h={'100vh'} overflowY={'scroll'} w={'full'} p="2">
        {/* {component} */}
        {children}
      </Box>
    </Flex>
  );
}

const SidebarContent = ({ onClose, setComponent, ...rest }) => {
  return (
    <Flex
      // transition="0.5s ease"
      bg={useColorModeValue('white', 'gray.800')}
      w={{ base: 'full', md: 'lg' }}
      pos="sticky"
      h="100vh"
      justifyContent={'space-between'}
      flexDir={'column'}
      {...rest}
    >
      <Flex
        mx={{ base: '8', md: '8' }}
        my="8"
        justifyContent={{ base: 'space-between', md: 'right' }}
      >
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Flex
        flexDir={'column'}
        alignItems={{ base: 'flex-start', md: 'flex-end' }}
      >
        <Box mr={'18px'}>
          <Flex align="center" p="4" mx="4" mb={'16'}>
            {/* <CreateButton /> */}
          </Flex>

          {LinkItems &&
            LinkItems.map((link) => (
              <NavItem
                key={link.name}
                icon={link.icon}
                // onClick={() => setComponent(link.component)}
                onClick={() =>
                  router.push(link.link, undefined, { shallow: true })
                }
              >
                <Text fontSize={'xl'} fontWeight={'semibold'} lineHeight="1">
                  {link.name}
                </Text>
              </NavItem>
            ))}
        </Box>
      </Flex>

      <Flex my={0}></Flex>
      <Flex
        flexDir={{ base: 'row-reverse', md: 'row' }}
        mt={4}
        mx={8}
        align={'left'}
        pos="sticky"
        bottom={'5'}
        justifyContent={'space-between'}
        alignItems={{ base: 'flex-start', md: 'flex-end' }}
      >
        {/* <DarkModeToggle pos={'fixed'} left={'0'} /> */}
        <Menu>
          <MenuButton
            py={2}
            // transition="all 0.5s"
            _focus={{ boxShadow: 'none' }}
          ></MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <Link href={'/dashboard/settings'}>
              <MenuItem>Profile</MenuItem>
            </Link>
            <Link href={'/account'}>
              <MenuItem>Account</MenuItem>
            </Link>
            {/* <MenuItem>Billing</MenuItem> */}
            <MenuDivider />
            <Link href={'/account'}>
              <MenuItem>Sign out</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="2xl"
      role="group"
      color={useColorModeValue('blue.800', 'blue.100')}
      // transition="background"
      // transitionDuration="100ms"
      // transitionTimingFunction={'ease-in'}
      cursor="pointer"
      _hover={{
        color: 'blue.500',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="25"
          _groupHover={{
            color: 'blue.500',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, setComponent, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 0 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Circle
        color="gray"
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
      >
        <BiMenuAltLeft size={'30px'} />
      </Circle>

      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}></Flex>
      </HStack>
      {/* <CreateButton /> */}
    </Flex>
  );
};
