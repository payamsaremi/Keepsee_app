import React, { useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import DetailModal from '../editor/DetailModal';
function SnippetCard({ snippet }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <DetailModal data={snippet} opened={opened} setOpened={setOpened} />
      <Box
        display={'flex'}
        flexDir={'column'}
        justifyContent={'space-between'}
        rounded={'xl'}
        cursor={'pointer'}
        h={'250px'}
        p={'6'}
        m={'2'}
        color={'black'}
        bg={'gray.50'}
        onClick={() => {
          setOpened(true);
        }}
      >
        <Box>
          <Text fontWeight={'normal'} fontSize={'lg'} noOfLines={5}>
            {snippet.content}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default SnippetCard;
