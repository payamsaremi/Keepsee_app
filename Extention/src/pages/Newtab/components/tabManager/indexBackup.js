import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function TabManager() {
  const [tabsList, setTabsList] = useState(null);
  useEffect(() => {
    getTabs();
  }, []);

  const getTabs = () => {
    chrome.runtime.sendMessage({ message: 'tabsList' }, function (response) {
      console.log(response);
      setTabsList(response);
    });
  };
  const openTheTab = (url) => {
    console.log(url);
  };
  return (
    <>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Box bg={'gray.300'} overflow={'clip'} mx={2} rounded={'xl'}>
          {tabsList &&
            tabsList.map((tab) => (
              <Box
                display={'flex'}
                flexDir={'row'}
                bgColor={'white'}
                rounded={'2xl'}
                p={3}
                m={3}
                cursor={'grab'}
                alignItems={'center'}
                justifyContent={'start'}
                shadow={'sm'}
                onClick={() => openTheTab(tab.url)}
                key={tab.id}
              >
                <Image
                  borderRadius={'xl'}
                  boxSize="45px"
                  src={tab.favIconUrl}
                  fallbackSrc="https://via.placeholder.com/150"
                  mr={5}
                />
                <Text fontSize={'lg'} noOfLines={2}>
                  {tab.title}
                </Text>
              </Box>
            ))}
        </Box>
      </Box>
    </>
  );
}

export default TabManager;
