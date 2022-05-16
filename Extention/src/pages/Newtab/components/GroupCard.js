import React from 'react';

import { Box, Text, Tag } from '@chakra-ui/react';
function GroupCard({}) {
  return (
    <>
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-between'}
        ring={'0.5px'}
        rounded={'lg'}
        ringColor={'gray.400'}
        p={'10'}
        m={'2.5'}
        w={'400px'}
        h={'200px'}
        cursor={'pointer'}
      >
        <Box>
          <Text fontWeight={'medium'} fontSize={'xl'}>
            AI
          </Text>
          <div>
            <Box>
              <Tag mx={'1'}>ML</Tag>
              <Tag colorScheme={'blue'} mx={'1'}>
                DeepLearning
              </Tag>
              <Tag colorScheme={'green'} mx={'1'}>
                AI
              </Tag>
              <Tag mx={'1'}>Linear Algebra</Tag>
              {/* <Text>{snippet.pageUrl}</Text> */}
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default GroupCard;
