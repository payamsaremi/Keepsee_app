import React from 'react';
import Logo from '../../../compponents/Logo';
import { useNavigate } from 'react-router-dom';
import { Box, Text, Link } from '@chakra-ui/react';
function GreetingPage() {
  const navigate = useNavigate();

  const launchApp = async () => {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [currentTab] = await chrome.tabs.query(queryOptions);

    chrome.tabs.create({ url: 'chrome://newtab' }); //create new tab
    chrome.tabs.remove(currentTab.id); // remove the onBoarding tab
  };
  return (
    <Box
      display={'flex'}
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      h={'100vh'}
      w={'100vw'}
    >
      <Box
        bgGradient="radial(cyan.100, blue.50 ,white 60%)"
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        w={'98vh'}
        h={'98vh'}
      >
        <Box>
          <Logo />
        </Box>
        <Box
          display={'flex'}
          flexDir={'column'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Text fontWeight={'bold'} fontSize={'3xl'} textColor={'cyan.800'}>
            Welcome to Kip.
          </Text>

          <Box
            as={'button'}
            cursor={'pointer'}
            my={'5'}
            p={'4'}
            bgColor={'cyan.200'}
            rounded={'2xl'}
            w={'180px'}
            onClick={() => launchApp()}
          >
            <Text
              fontSize={'xl'}
              textAlign={'center'}
              textColor={'cyan.700'}
              fontWeight={'bold'}
            >
              Let's Start!
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default GreetingPage;
