import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

function Editor() {
  const [tabsList, setTabsList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
        Editor...
      </Box>
    </>
  );
}

export default Editor;
